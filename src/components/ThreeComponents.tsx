import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Float, Ring, Html } from "@react-three/drei";
import * as THREE from "three";
import { PlanetData } from "../data/planets";

interface PlanetProps {
  data: PlanetData;
  onSelect: (data: PlanetData) => void;
}

export const Planet: React.FC<PlanetProps> = ({ data, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += data.speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group>
      {/* Orbit Line */}
      <Ring args={[data.distance - 0.02, data.distance + 0.02, 128]} rotation-x={Math.PI / 2}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} side={THREE.DoubleSide} />
      </Ring>

      <group ref={orbitRef}>
        <group position={[data.distance, 0, 0]}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            {/* Larger invisible sphere for easier clicking */}
            <Sphere
              args={[data.size * 1.5, 16, 16]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(data);
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            >
              <meshBasicMaterial color={data.color} transparent opacity={0} />
            </Sphere>
            
            {/* Actual visible planet */}
            <Sphere
              ref={meshRef}
              args={[data.size, 32, 32]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(data);
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            >
              <meshStandardMaterial
                color={data.color}
                emissive={data.color}
                emissiveIntensity={hovered ? 1.2 : 0.3}
                roughness={0.6}
                metalness={0.4}
              />
            </Sphere>
            
            {/* Hover effect ring */}
            {hovered && (
              <Ring args={[data.size + 0.1, data.size + 0.3, 32]} rotation-x={Math.PI / 2}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} side={THREE.DoubleSide} />
              </Ring>
            )}
            
            {/* Planet name label on hover */}
            {hovered && (
              <Html center position={[0, data.size + 0.5, 0]}>
                <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 whitespace-nowrap">
                  <span className="text-white text-sm font-medium">{data.name}</span>
                </div>
              </Html>
            )}
            
            {/* Saturn's Rings */}
            {data.name === "Saturno" && (
              <Ring args={[data.size + 0.3, data.size + 1.2, 64]} rotation-x={Math.PI / 2.5}>
                <meshStandardMaterial color={data.color} transparent opacity={0.4} side={THREE.DoubleSide} />
              </Ring>
            )}

            {/* Earth's Moon */}
            {data.name === "Tierra" && (
              <group ref={moonOrbitRef}>
                <Sphere args={[0.2, 16, 16]} position={[1.5, 0, 0]}>
                  <meshStandardMaterial color="#888888" />
                </Sphere>
              </group>
            )}
          </Float>
        </group>
      </group>
    </group>
  );
};

export const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <Sphere ref={sunRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={2}
        />
      </Sphere>
      {/* Sun Glow Effect */}
      <Sphere args={[2.7, 64, 64]}>
        <meshBasicMaterial color="#FDB813" transparent opacity={0.15} />
      </Sphere>
      <Sphere args={[3.2, 64, 64]}>
        <meshBasicMaterial color="#FDB813" transparent opacity={0.05} />
      </Sphere>
      
      <pointLight intensity={500} distance={100} decay={2} color="#FDB813" />
      <ambientLight intensity={0.1} />
    </group>
  );
};

export const Stars = () => {
  const count = 3000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
};
