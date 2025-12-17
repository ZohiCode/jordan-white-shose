
import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, Float, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ShoeSceneProps {
  color: string;
}

const MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf';

const SneakerModel: React.FC<ShoeSceneProps> = ({ color }) => {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  // Smooth color interpolation logic
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          // Target the main body meshes
          if (mesh.name.toLowerCase().includes('shoe') || mesh.name.toLowerCase().includes('upper')) {
             // Animate color transition
             const targetColor = new THREE.Color(color);
             mat.color.lerp(targetColor, 0.1); 
          }
          mat.roughness = 0.45;
          mat.metalness = 0.15;
          mat.envMapIntensity = 1.2;
        }
      }
    });
  }, [scene, color]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      // Professional product presentation float
      groupRef.current.position.y = Math.sin(t / 2) * 0.08 + 0.1;
      groupRef.current.rotation.z = Math.sin(t / 3) * 0.05;
      
      // Reactive look-at (slight)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        -Math.PI / 2 + (state.mouse.x * 0.2),
        0.1
      );
    }
  });

  return (
    <primitive 
      ref={groupRef} 
      object={scene} 
      scale={11.5} 
      position={[-0.2, 0, 0]} 
      rotation={[0.1, -Math.PI / 2, 0]} 
    />
  );
};

const ShoeScene: React.FC<ShoeSceneProps> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas shadows dpr={[1, 2]} className="pointer-events-auto">
        <PerspectiveCamera makeDefault position={[0, 0.2, 5]} fov={32} />
        
        <Environment preset="studio" />
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} castShadow />
        <directionalLight position={[-5, 5, 2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color={color} />
        
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
            <SneakerModel color={color} />
          </Float>
          <ContactShadows 
            position={[0, -1.1, 0]} 
            opacity={0.35} 
            scale={12} 
            blur={2.8} 
            far={5} 
            color="#000000"
          />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload(MODEL_URL);

export default ShoeScene;
