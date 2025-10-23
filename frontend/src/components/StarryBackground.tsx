import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const ShootingStars = () => {
  const ref = useRef<THREE.Group>(null!);

  const particles = useMemo(() => {
    const count = 15;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = 100 + Math.random() * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      for (let i = 0; i < particles.length / 3; i++) {
        const i3 = i * 3;
        ref.current.children[i].position.x -= delta * (20 + Math.random() * 30);
        ref.current.children[i].position.y -= delta * (15 + Math.random() * 20);

        if (ref.current.children[i].position.y < -100) {
          ref.current.children[i].position.x = (Math.random() - 0.5) * 200;
          ref.current.children[i].position.y = 100 + Math.random() * 100;
        }
      }
    }
  });

  return (
    <group ref={ref}>
      {Array.from({ length: particles.length / 3 }).map((_, i) => (
        <mesh key={i} position={[particles[i*3], particles[i*3+1], particles[i*3+2]]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

const StarryBackground = () => {
  return (
    <div className="starry-background">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ShootingStars />
      </Canvas>
    </div>
  );
};

export default StarryBackground;
