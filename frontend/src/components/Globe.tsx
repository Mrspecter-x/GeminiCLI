import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Custom Glow Shader
const vertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize( normalMatrix * normal );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
varying vec3 vNormal;
void main() {
  float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 );
  gl_FragColor = vec4( 0.3, 0.6, 1.0, 1.0 ) * intensity;
}
`;

const Earth = ({ isInteracting }: { isInteracting: boolean }) => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);

  // High-resolution textures
  const earthTexture = useLoader(TextureLoader, 'https://upload.wikimedia.org/wikipedia/commons/5/56/Blue_Marble_Next_Generation_%2B_topography_%2B_bathymetry.jpg');
  const cloudTexture = useLoader(TextureLoader, 'https://clouds.matteason.co.uk/images/8192x4096/clouds.jpg');

  useFrame((_, delta) => {
    if (!isInteracting) {
      if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
      if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      {/* Atmosphere */}
      <Sphere args={[2.05, 64, 64]}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Earth Sphere */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>

      {/* Cloud Layer */}
      <Sphere ref={cloudsRef} args={[2.03, 64, 64]}>
        <meshStandardMaterial map={cloudTexture} transparent={true} opacity={0.4} />
      </Sphere>
    </group>
  );
};

const Globe = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleInteractionEnd = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 2500);
  };

  useEffect(() => {
    const timeout = timeoutRef.current;
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Earth isInteracting={isInteracting} />
      <OrbitControls
        enablePan={false} // Disables panning as requested
        enableDamping={true} // Makes controls feel smoother
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={10}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />
    </Canvas>
  );
};

export default Globe;
