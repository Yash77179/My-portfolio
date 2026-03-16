import React, { useRef, useMemo, useCallback, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Preload } from '@react-three/drei';
import * as THREE from 'three';

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

const createClothMaterial = () => {
    return new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide, // Make sure we can see it from back if necessary
        uniforms: {
            map: { value: null },
            opacity: { value: 1.0 },
            blurAmount: { value: 0.0 },
            scrollForce: { value: 0.0 },
            time: { value: 0.0 },
            isHovered: { value: 0.0 },
        },
        vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Create smooth curving based on scroll force
        // Apply force only when it's significant, otherwise stay flat
        float curveForce = (abs(scrollForce) < 0.2) ? 0.0 : scrollForce;
        
        // Increased intensity for effect when moving fast
        float curveIntensity = clamp(curveForce * 0.2, -5.0, 5.0); 
        
        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.05;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.04;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity);
        
        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        // Apply Z displacement
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
    });
};

function ImagePlane({ texture, position, scale, material, forwardRef }) {
    const meshRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (material && texture) material.uniforms.map.value = texture;
    }, [material, texture]);
    
    useEffect(() => {
        if (forwardRef) {
             if (typeof forwardRef === 'function') forwardRef(meshRef.current);
             else forwardRef.current = meshRef.current;
        }
    }, [forwardRef]);

    useEffect(() => {
        if (material && material.uniforms) {
            material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
        }
    }, [material, isHovered]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={scale}
            material={material}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
        </mesh>
    );
}

function GalleryScene({
    images,
    speed = 1,
    visibleCount = 8,
    fadeSettings = { fadeIn: { start: 0.05, end: 0.15 }, fadeOut: { start: 0.85, end: 0.95 } },
    blurSettings = { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 3.0 },
    scrollProgress = null, // Add support for external scroll control
}) {
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const [autoPlay, setAutoPlay] = useState(!scrollProgress && true);
    const lastInteraction = useRef(Date.now());
    
    // For external scroll tracking - ensuring we store a number, not the ref object
    const lastScrollProgress = useRef(typeof scrollProgress === 'number' ? scrollProgress : 0);
    // Add smoothing ref for visual velocity (shader effect)
    const smoothedVelocityRef = useRef(0);

    const normalizedImages = useMemo(
        () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
        [images]
    );

    const textures = useTexture(normalizedImages.map((img) => img.src));

    const materials = useMemo(
        () => Array.from({ length: visibleCount }, () => createClothMaterial()),
        [visibleCount]
    );

    const spatialPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < visibleCount; i++) {
            const horizontalAngle = (i * 2.618) % (Math.PI * 2);
            const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
            const horizontalRadius = (i % 3) * 1.2;
            const verticalRadius = ((i + 1) % 4) * 0.8;
            positions.push({
                x: (Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) / 3,
                y: (Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) / 4,
            });
        }
        return positions;
    }, [visibleCount]);

    const totalImages = normalizedImages.length;
    const depthRange = DEFAULT_DEPTH_RANGE;
    
    // Store references to the meshes
    const meshRefs = useRef([]);

    const planesData = useRef(
        Array.from({ length: visibleCount }, (_, i) => ({
            index: i,
            z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
            imageIndex: totalImages > 0 ? i % totalImages : 0,
            x: spatialPositions[i]?.x ?? 0,
            y: spatialPositions[i]?.y ?? 0,
        }))
    );

    useEffect(() => {
        planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
            index: i,
            z: visibleCount > 0 ? ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange : 0,
            imageIndex: totalImages > 0 ? i % totalImages : 0,
            x: spatialPositions[i]?.x ?? 0,
            y: spatialPositions[i]?.y ?? 0,
        }));
    }, [depthRange, spatialPositions, totalImages, visibleCount]);

    const handleWheel = useCallback((event) => {
        event.preventDefault();
        setScrollVelocity((prev) => prev + event.deltaY * 0.01 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
    }, [speed]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            setScrollVelocity((prev) => prev - 2 * speed);
            setAutoPlay(false);
            lastInteraction.current = Date.now();
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            setScrollVelocity((prev) => prev + 2 * speed);
            setAutoPlay(false);
            lastInteraction.current = Date.now();
        }
    }, [speed]);

    useEffect(() => {
        if (scrollProgress !== null) return; // Disable internal listeners if controlled
        
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                canvas.removeEventListener('wheel', handleWheel);
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [handleWheel, handleKeyDown, scrollProgress]);

    useEffect(() => {
        if (scrollProgress !== null) return;
        const interval = setInterval(() => {
            if (Date.now() - lastInteraction.current > 3000) setAutoPlay(true);
        }, 1000);
        return () => clearInterval(interval);
    }, [scrollProgress]);

    useFrame((state, delta) => {
        let moveDistance = 0;
        let visualVelocity = scrollVelocity;
        
        // Check if scrollProgress is provided (either as number or ref)
        let progressValue = null;
        if (typeof scrollProgress === 'number') {
            progressValue = scrollProgress;
        } else if (scrollProgress && typeof scrollProgress === 'object' && 'current' in scrollProgress) {
            progressValue = scrollProgress.current;
        }

        if (progressValue !== null) {
            // External control mode (GSAP)
            const totalTravel = depthRange * 4; // Traversing the depth multiple times
            const currentPos = progressValue * totalTravel;
            
            // Calculate movement since last frame
            // We use a separate internal tracker for the previous frame's progress
            // to calculate delta correctly
            const prevPos = (lastScrollProgress.current || 0) * totalTravel;
             
            moveDistance = currentPos - prevPos;
            
            // Calculate a fake velocity for the shader effects, but CLAMP IT TIGHTLY
            // delta is time in seconds (approx 0.016). dividing by it gives units/sec.
            const rawVelocity = moveDistance / (delta || 0.016);
            
            // Limit the visual velocity to avoid distortion
            // The shader uses this for curving. > 2.0 starts looking weird.
            const targetVisualVelocity = Math.max(-5, Math.min(5, rawVelocity));
            
            // Apply smoothing (Lerp) to the visual velocity
            // This prevents sudden jumps and jittering when scrolling stops or changes speed
            smoothedVelocityRef.current = THREE.MathUtils.lerp(smoothedVelocityRef.current, targetVisualVelocity, 0.1);
            
            // Apply a deadzone: if the smoothed velocity is very small, treat it as 0
            // This ensures the images are flat when scrolling stops or is very slow
            visualVelocity = Math.abs(smoothedVelocityRef.current) < 0.1 ? 0 : smoothedVelocityRef.current;
            
            lastScrollProgress.current = progressValue;
        } else {
            // Internal control mode
            if (autoPlay) setScrollVelocity((prev) => prev + 0.3 * delta);
            setScrollVelocity((prev) => prev * 0.95);
            
            visualVelocity = scrollVelocity;
            moveDistance = scrollVelocity * delta * 10;
        }

        const time = state.clock.getElapsedTime();
        
        // This loop updates materials if they are shared or if we missed one below
        materials.forEach((material) => {
            if (material && material.uniforms) {
                material.uniforms.time.value = time;
                material.uniforms.scrollForce.value = visualVelocity;
            }
        });

        const totalRange = depthRange;
        const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;

        planesData.current.forEach((plane, i) => {
            let newZ = plane.z + moveDistance;
            
            // Infinite looping logic
            let wrapsForward = 0;
            let wrapsBackward = 0;

            if (newZ >= totalRange) {
                wrapsForward = Math.floor(newZ / totalRange);
                newZ -= totalRange * wrapsForward;
            } else if (newZ < 0) {
                wrapsBackward = Math.ceil(-newZ / totalRange);
                newZ += totalRange * wrapsBackward;
            }
            
            // Only update index if we wrapped
            if (wrapsForward > 0 && totalImages > 0) {
                plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
            }
            if (wrapsBackward > 0 && totalImages > 0) {
                const step = plane.imageIndex - wrapsBackward * imageAdvance;
                plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
            }

            plane.z = ((newZ % totalRange) + totalRange) % totalRange;
            
            // Opacity & Blur calculations
            const normalizedPosition = plane.z / totalRange;
            let opacity = 1;
            
            // Fixed Fade Logic
            if (normalizedPosition < fadeSettings.fadeIn.start) opacity = 0;
            else if (normalizedPosition < fadeSettings.fadeIn.end)
                opacity = (normalizedPosition - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
            else if (normalizedPosition > fadeSettings.fadeOut.end) opacity = 0;
            else if (normalizedPosition > fadeSettings.fadeOut.start)
                opacity = 1 - (normalizedPosition - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);

            let blur = 0;
            if (normalizedPosition < blurSettings.blurIn.start) blur = blurSettings.maxBlur;
            else if (normalizedPosition < blurSettings.blurIn.end)
                blur = blurSettings.maxBlur * (1 - (normalizedPosition - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start));
            else if (normalizedPosition > blurSettings.blurOut.end) blur = blurSettings.maxBlur;
            else if (normalizedPosition > blurSettings.blurOut.start)
                blur = blurSettings.maxBlur * ((normalizedPosition - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start));

            // Apply updates to the Mesh directly
            const mesh = meshRefs.current[i];
            if (mesh) {
                 const worldZ = plane.z - depthRange / 2;
                 mesh.position.set(plane.x, plane.y, worldZ);
                 
                 const targetTexture = textures[plane.imageIndex];
                 if (mesh.material && mesh.material.uniforms) {
                     mesh.material.uniforms.opacity.value = Math.max(0, Math.min(1, opacity));
                     mesh.material.uniforms.blurAmount.value = Math.max(0, Math.min(blurSettings.maxBlur, blur));
                     
                     if (targetTexture && mesh.material.uniforms.map.value !== targetTexture) {
                         mesh.material.uniforms.map.value = targetTexture;
                         
                         // Update aspect ratio scale
                         if (targetTexture.image) {
                             const aspect = targetTexture.image.width / targetTexture.image.height;
                             const scaleX = aspect > 1 ? 2 * aspect : 2;
                             const scaleY = aspect > 1 ? 2 : 2 / aspect;
                             mesh.scale.set(scaleX, scaleY, 1);
                         }
                     }
                     // Keep mesh material uniforms in sync with global time/velocity
                     mesh.material.uniforms.time.value = time;
                     mesh.material.uniforms.scrollForce.value = visualVelocity;
                 }
            }
        });
    });

    if (normalizedImages.length === 0) return null;

    return (
        <>
            {planesData.current.map((plane, i) => {
                const texture = textures[plane.imageIndex];
                const material = materials[i];
                if (!texture || !material) return null;

                const worldZ = plane.z - depthRange / 2;
                const aspect = texture.image ? texture.image.width / texture.image.height : 1;
                const scale = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];

                return (
                    <ImagePlane
                        key={i}
                        forwardRef={(el) => (meshRefs.current[i] = el)}
                        texture={texture}
                        position={[plane.x, plane.y, worldZ]}
                        scale={scale}
                        material={material}
                    />
                );
            })}
        </>
    );
}

function FallbackGallery({ images }) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
             <p>Fallback Gallery</p>
        </div>
    );
}

export default function InfiniteGallery({
    images,
    className = 'h-96 w-full',
    style,
    fadeSettings,
    blurSettings,
    speed = 1,
    visibleCount = 8,
    scrollProgress = null,
}) {
    const [webglSupported, setWebglSupported] = useState(true);
    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            if (!canvas.getContext('webgl')) setWebglSupported(false);
        } catch (e) { setWebglSupported(false); }
    }, []);

    if (!webglSupported) return <div className={className}><FallbackGallery images={images} /></div>;

    // Use a simpler fallback during loading to ensure container doesn't collapse
    return (
        <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
            <Canvas 
                camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 1000 }} 
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Use dpr for sharper rendering on high-DPI screens
            >
                {/* Add ambient light to ensure visibility */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                
                <Suspense fallback={null}>
                    <GalleryScene
                        images={images}
                        speed={speed}
                        visibleCount={visibleCount}
                        fadeSettings={fadeSettings}
                        blurSettings={blurSettings}
                        scrollProgress={scrollProgress}
                    />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}