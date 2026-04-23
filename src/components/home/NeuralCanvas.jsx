import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralNetwork = () => {
  const points = useRef();
  const particleCount = 2000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color gradient from primary to secondary
      const mix = Math.random();
      cols[i * 3] = mix * 0.38 + (1 - mix) * 0.65; // Mix of primary-purple and light-blue
      cols[i * 3 + 1] = mix * 0.4 + (1 - mix) * 0.52;
      cols[i * 3 + 2] = 0.94;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.1;
    points.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    
    // Animate points slightly
    const posArray = points.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3 + 1] += Math.sin(time + posArray[i3]) * 0.002;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default function NeuralCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#050b1a']} />
        <NeuralNetwork />
        <ambientLight intensity={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
    </div>
  );
}
