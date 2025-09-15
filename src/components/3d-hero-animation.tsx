import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <Sphere ref={meshRef} position={position} args={[0.8]} material-color="#a855f7" />
    </Float>
  );
}

function AnimatedBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.3}>
      <Box ref={meshRef} position={position} args={[1.2, 1.2, 1.2]} material-color="#06b6d4" />
    </Float>
  );
}

function AnimatedTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={0.8}>
      <Torus ref={meshRef} position={position} args={[0.6, 0.3, 16, 32]} material-color="#f97316" />
    </Float>
  );
}

export default function HeroAnimation() {
  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Animated 3D Objects */}
        <AnimatedSphere position={[-3, 1, 0]} />
        <AnimatedBox position={[3, -1, 0]} />
        <AnimatedTorus position={[0, 2, -2]} />
        <AnimatedSphere position={[2, 3, -1]} />
        <AnimatedBox position={[-2, -2, 1]} />
        
        {/* Main Text */}
        <Text
          position={[0, 0, 0]}
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          FlashBrand
        </Text>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-20 pointer-events-none" />
    </div>
  );
}