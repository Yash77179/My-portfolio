// src/components/Lanyard.jsx
/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';
import yashPhoto from '../assets/yash.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const cardFaceTexture = useTexture(yashPhoto);
  
  // Create a proper repeating texture for the card
  useEffect(() => {
    // We want to see the whole width of the image, even if it leaves space top/bottom, 
    // OR just center it better so the face (on the right) is visible.
    
    cardFaceTexture.wrapS = THREE.RepeatWrapping;
    cardFaceTexture.wrapT = THREE.RepeatWrapping;
    
    // Zoom out (scale > 1 makes texture smaller/tiles it, so we see more of it)
    // Trial and error: 1.5 zooms out enough to likely show full width on a narrow card
    cardFaceTexture.repeat.set(1.4, 1.4); 
    
    // Pivot around the center
    cardFaceTexture.center.set(0.5, 0.5); 
    
    // Fine tune position
    // If the face is on the right and we see the left, we might need to shift x.
    // Try shifting slightly to favor the right side if centering isn't enough.
    cardFaceTexture.offset.set(0.1, 0.05); 
    
    cardFaceTexture.flipY = false;
    cardFaceTexture.needsUpdate = true;
  }, [cardFaceTexture]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0] // Adjusted slightly to match the mesh offset tightly
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.classList.add(dragged ? 'cursor-grabbing' : 'cursor-grab');
      return () => void document.body.classList.remove('cursor-grabbing', 'cursor-grab');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleUp = () => {
      if (dragged) drag(false);
    };
    window.addEventListener('pointerup', handleUp);
    return () => window.removeEventListener('pointerup', handleUp);
  }, [dragged]);

  // CRITICAL FIX: React-Three-Rapier v2 does not update rigidbody type dynamically via props!
  useEffect(() => {
    if (card.current) {
      // 2 is KinematicPositionBased, 0 is Dynamic
      card.current.setBodyType(dragged ? 2 : 0, true);
    }
  }, [dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    
    // We only update if physics is running
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        
        // Prevent strictly `.copy()` from crashing if translation is an object Instead of Vector3
        const trans = ref.current.translation();
        const currentPos = new THREE.Vector3(trans.x, trans.y, trans.z);
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(currentPos)));
        
        ref.current.lerped.lerp(
          currentPos,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      const t3 = j3.current.translation();
      curve.points[0].copy(new THREE.Vector3(t3.x, t3.y, t3.z));
      
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      
      const tf = fixed.current.translation();
      curve.points[3].copy(new THREE.Vector3(tf.x, tf.y, tf.z));
      
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      
      // Prevent original Rapier `.angvel` and `.rotation` crash in V2
      const av = card.current.angvel();
      ang.set(av.x, av.y, av.z);
      
      const cr = card.current.rotation();
      rot.set(cr.x, cr.y, cr.z);
      
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              try { e.target.releasePointerCapture(e.pointerId); } catch(err) {}
              drag(false);
            }}
            onPointerDown={(e) => {
              try { e.target.setPointerCapture(e.pointerId); } catch(err) {}
              const t = card.current.translation();
              drag(new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(t.x, t.y, t.z)));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardFaceTexture}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
                // Fix for cropping: force the texture to use proper repeating and centering
                // If it's still cropped, you might need to adjust the UVs of the model or scale the texture
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#111111"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={false}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
