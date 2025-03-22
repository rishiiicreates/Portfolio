import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, Color } from 'three';

interface StrawHatProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

// A simple straw hat model created with primitive shapes
const StrawHat: React.FC<StrawHatProps> = ({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0] 
}) => {
  const hatRef = useRef<THREE.Group>(null);
  const hatMaterial = new MeshStandardMaterial({
    color: new Color('#F59E0B'),
    roughness: 0.8,
    metalness: 0.1,
  });
  
  const redBandMaterial = new MeshStandardMaterial({
    color: new Color('#EF4444'),
    roughness: 0.5,
    metalness: 0.1,
  });
  
  useFrame(({ clock }) => {
    if (hatRef.current) {
      // Subtle floating animation
      hatRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.05;
      // Subtle rotation
      hatRef.current.rotation.y = rotation[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={hatRef} position={position} scale={scale} rotation={rotation}>
      {/* Hat brim - wide flat cylinder */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <primitive object={hatMaterial} />
      </mesh>
      
      {/* Hat crown - hemisphere */}
      <mesh position={[0, 0.15, 0]}>
        <hemisphereGeometry args={[0.4, 0.4, 16, 8, 0, Math.PI]} />
        <primitive object={hatMaterial} />
      </mesh>
      
      {/* Hat band */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.41, 0.05, 16, 32]} />
        <primitive object={redBandMaterial} />
      </mesh>
    </group>
  );
};

export default StrawHat;
