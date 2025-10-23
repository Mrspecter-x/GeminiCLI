import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const GlobeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // This hook will run on every frame
  useFrame(() => {
    if (meshRef.current) {
      // This will make the globe rotate
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshStandardMaterial color="royalblue" />
    </Sphere>
  );
};

const Globe = () => {
  return (
    <Canvas style={{ height: '500px', width: '500px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <GlobeMesh />
      <OrbitControls enableZoom={false} autoRotate={false} />
    </Canvas>
  );
};

export default Globe;
