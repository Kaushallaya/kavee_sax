import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// 3D Saxophone Model Loader
function SaxophoneModel({ mousePosition }) {
  const groupRef = useRef();
  const gltf = useLoader(GLTFLoader, '/saxophone.glb');

  useFrame((state) => {
    if (groupRef.current) {
      // Auto-rotation
      groupRef.current.rotation.y += 0.003;
      
      // Mouse interaction - subtle tilt
      const targetRotationX = mousePosition.y * 0.15;
      const targetRotationZ = mousePosition.x * 0.15;
      
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (targetRotationZ - groupRef.current.rotation.z) * 0.05;
    }
  });

  useEffect(() => {
    if (gltf && gltf.scene) {
      // Apply gold metallic material to all meshes
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#d4af37',
            metalness: 0.9,
            roughness: 0.2,
            emissive: '#8b7355',
            emissiveIntensity: 0.3,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf]);

  return (
    <group ref={groupRef} scale={[2.5, 2.5, 2.5]} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#d4af37" wireframe />
    </mesh>
  );
}

const Saxophone3D = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup for metallic look */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          color="#ffffff"
        />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#d4af37"
        />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#ff6b35" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#f5c842" />
        
        <Suspense fallback={<LoadingFallback />}>
          <SaxophoneModel mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Saxophone3D;
