import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface IslandProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

// This component uses primitives to create a floating island
const FloatingIsland: React.FC<IslandProps> = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1 
}) => {
  const islandRef = useRef<THREE.Group>(null);
  
  const islandColors = {
    land: new THREE.Color('#1E3A8A'), // Dark blue
    beach: new THREE.Color('#F59E0B'), // Secondary color
    vegetation: new THREE.Color('#065F46'), // Dark green
  };
  
  useFrame(({ clock }) => {
    if (islandRef.current) {
      // Floating motion
      islandRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      // Subtle rotation
      islandRef.current.rotation.y = rotation[1] + clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={islandRef} position={position} rotation={rotation} scale={scale}>
      {/* Island base (irregular shape) */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1, 1]} />
        <MeshWobbleMaterial 
          color={islandColors.land} 
          factor={0.2} 
          speed={0.3} 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Beach/shore areas */}
      <mesh position={[0, 0.1, 0]} rotation={[0.1, 0.5, 0]}>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshStandardMaterial 
          color={islandColors.beach} 
          roughness={1} 
          metalness={0} 
        />
      </mesh>
      
      {/* Trees/vegetation */}
      {[
        [0.5, 0.3, 0.3],
        [-0.3, 0.5, 0.4],
        [0.2, 0.4, -0.5],
        [-0.4, 0.3, -0.3]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <coneGeometry args={[0.2, 0.4, 5]} />
          <meshStandardMaterial 
            color={islandColors.vegetation} 
            roughness={0.8} 
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingIsland;
