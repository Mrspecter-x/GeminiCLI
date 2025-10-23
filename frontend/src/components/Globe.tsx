import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const GlobeMesh = ({ isInteracting }: { isInteracting: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Public domain texture from Wikimedia Commons
  const textureUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1280px-Equirectangular_projection_SW.jpg';
  const texture = useLoader(TextureLoader, textureUrl);

  // This hook will run on every frame
  useFrame((_, delta) => { // FIX 1: 'state' parameter is changed to '_' because it's unused
    // Only rotate if the user is not interacting with the globe
    if (meshRef.current && !isInteracting) {
      // Rotate at a consistent speed, independent of frame rate
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

const Globe = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  // FIX 2: The type for setTimeout in browser is 'number', not 'NodeJS.Timeout'
  const timeoutRef = useRef<number | null>(null);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    // Set a timeout to resume rotation after 2.5 seconds of inactivity
    timeoutRef.current = window.setTimeout(() => { // Using window.setTimeout for clarity
      setIsInteracting(false);
    }, 2500);
  };
  
  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


  return (
    <Canvas style={{ height: '500px', width: '500px', background: '#111' }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <GlobeMesh isInteracting={isInteracting} />
      <OrbitControls 
        enableZoom={true} 
        autoRotate={false} 
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />
    </Canvas>
  );
};

export default Globe;
