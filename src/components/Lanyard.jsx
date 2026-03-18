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

import { Color, Vector3, ClampToEdgeWrapping, CatmullRomCurve3, RepeatWrapping } from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true, inView = true, isLoading = false }) {
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
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} paused={isLoading}>
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
  const vec = new Vector3(),
    ang = new Vector3(),
    rot = new Vector3(),
    dir = new Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const cardFaceTexture = useTexture(yashPhoto);

  // Fix texture mapping - the card model's UVs expect a different aspect ratio
  // than our tall portrait photo, causing extreme zoom. We scale down vertically.
  useEffect(() => {
    if (cardFaceTexture) {
      cardFaceTexture.flipY = false;
      // Precision math for centering without squishing:
      // Using repeat.x = 1.2 stretches the image out, using 60% of original image width.
      // And we center that 60% with offset.x = 0.2
      cardFaceTexture.repeat.set(1.2, 1.2); 
      cardFaceTexture.offset.set(0.2, -0.1);
      cardFaceTexture.wrapS = ClampToEdgeWrapping;
      cardFaceTexture.wrapT = ClampToEdgeWrapping;
      cardFaceTexture.needsUpdate = true;
    }
  }, [cardFaceTexture]);

  const [curve] = useState(
    () =>
      new CatmullRomCurve3([new Vector3(), new Vector3(), new Vector3(), new Vector3()])
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
      // CRITICAL FIX: Clamp the time delta! 
      // Background tabs can freeze JS execution and return deltas of many seconds, causing simulation NaN blowouts.
      const safeDelta = Math.min(delta, 0.1);

      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new Vector3().copy(ref.current.translation());
        
        // Prevent strictly `.copy()` from crashing if translation is an object Instead of Vector3
        const trans = ref.current.translation();
        const currentPos = new Vector3(trans.x, trans.y, trans.z);
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(currentPos)));
        
        ref.current.lerped.lerp(
          currentPos,
          safeDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      const t3 = j3.current.translation();
      curve.points[0].copy(new Vector3(t3.x, t3.y, t3.z));
      
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      
      const tf = fixed.current.translation();
      curve.points[3].copy(new Vector3(tf.x, tf.y, tf.z));
      
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
  texture.wrapS = texture.wrapT = RepeatWrapping;

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
            onPointerOver={() => { if(!isMobile) hover(true) }}
            onPointerOut={() => { if(!isMobile) hover(false) }}
            onPointerUp={(e) => {
              if (isMobile) return;
              try { e.target.releasePointerCapture(e.pointerId); } catch(err) {}
              drag(false);
            }}
            onPointerDown={(e) => {
              if (isMobile) return;
              try { e.target.setPointerCapture(e.pointerId); } catch(err) {}
              const t = card.current.translation();
              drag(new Vector3().copy(e.point).sub(new Vector3(t.x, t.y, t.z)));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshStandardMaterial
                map={cardFaceTexture}
                map-anisotropy={16}
                roughness={0.6}
                metalness={0.25}
                envMapIntensity={0.3}
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
