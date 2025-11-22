
import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Html, Sphere, Line, Environment } from '@react-three/drei';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
interface Benefit {
  id: number;
  title: string;
  description: string;
  position: [number, number, number];
}

const BENEFITS: Benefit[] = [
  {
    id: 1,
    title: "GROWTH ENGINE",
    description: "Arquitectura diseñada para maximizar la conversión y captura de leads cualificados.",
    position: [2.8, 1.2, 0]
  },
  {
    id: 2,
    title: "AI INTEGRATION",
    description: "Automatización inteligente y personalización dinámica en tiempo real.",
    position: [-2.8, 1.2, 0.5]
  },
  {
    id: 3,
    title: "DARK AESTHETIC",
    description: "Diseño visual de alto impacto que diferencia tu marca de la competencia convencional.",
    position: [-2.8, -1.2, -0.5]
  },
  {
    id: 4,
    title: "PERFORMANCE",
    description: "Optimización de código extrema para cargas instantáneas y fluidez absoluta.",
    position: [2.8, -1.2, 0]
  }
];

// -----------------------------------------------------------------------------
// Central Ferrofluid Sphere (The "Black Sun")
// -----------------------------------------------------------------------------
const FerrofluidSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Dynamic rotation for the sun
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Sphere args={[1.5, 128, 128]} ref={meshRef}>
      {/* Black Liquid Metal Look - Enhanced */}
      <MeshDistortMaterial
        color="#000000"
        attach="material"
        distort={0.55} // High distortion for lava effect
        speed={2.5} // Faster movement
        roughness={0.2}
        metalness={0.9}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
};

// -----------------------------------------------------------------------------
// Connecting Line (Node to Center)
// -----------------------------------------------------------------------------
const ConnectionLine = ({ start, end, active }: { start: [number, number, number], end: [number, number, number], active: boolean }) => {
  if (!active) return null;

  return (
    <Line
      points={[start, end]}       
      color="#3B82F6"                   
      lineWidth={2} // Thicker line for visibility                   
      transparent
      opacity={0.6}
    />
  );
};

// -----------------------------------------------------------------------------
// Orbital Node (The trigger points)
// -----------------------------------------------------------------------------

interface OrbitalNodeProps {
  item: Benefit;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const OrbitalNode: React.FC<OrbitalNodeProps> = ({ 
  item, 
  isActive, 
  onHover, 
  onLeave 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Floating Motion (Y-axis)
    if (groupRef.current) {
      groupRef.current.position.y = item.position[1] + Math.sin(t + item.id) * 0.15;
    }

    // 2. Pulsing Animation (Scale) - Only when NOT active
    // If active, it stays large. If idle, it breathes.
    if (meshRef.current && ringRef.current) {
      if (isActive) {
        meshRef.current.scale.setScalar(1.3);
        ringRef.current.scale.setScalar(1.8);
      } else {
        // Pulse math
        const pulse = 1 + Math.sin(t * 3) * 0.15; // 3x speed, +/- 15% size
        meshRef.current.scale.setScalar(pulse);
        ringRef.current.scale.setScalar(pulse * 1.2);
      }
    }
  });

  return (
    <group ref={groupRef} position={item.position}>
      {/* The Interactive Dot */}
      <mesh 
        ref={meshRef}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; onHover(); }} 
        onPointerOut={() => { document.body.style.cursor = 'auto'; onLeave(); }}
      >
        <sphereGeometry args={[0.12, 32, 32]} />
        {/* Bright White when idle to indicate "Touch Me", Blue when active */}
        <meshStandardMaterial 
          color={isActive ? "#3B82F6" : "#FFFFFF"} 
          emissive={isActive ? "#3B82F6" : "#FFFFFF"}
          emissiveIntensity={isActive ? 2 : 0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Outer Glow Ring (Halo) */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.18, 0.2, 32]} />
        <meshBasicMaterial 
          color={isActive ? "#3B82F6" : "#FFFFFF"} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={isActive ? 0.8 : 0.3} 
        />
      </mesh>

      {/* Line to center */}
      <ConnectionLine start={[0,0,0]} end={[item.position[0] * -1, item.position[1] * -1, item.position[2] * -1]} active={isActive} />

      {/* HTML Label */}
      <Html distanceFactor={10} position={[isActive ? 0.5 : 0, 0, 0]} style={{ pointerEvents: 'none' }}>
        <div 
          className={`w-72 transition-all duration-500 ease-out ${
            isActive 
              ? 'opacity-100 translate-x-4 scale-100' 
              : 'opacity-0 translate-x-0 scale-90 blur-sm pointer-events-none'
          }`}
        >
          <div className="bg-black/90 backdrop-blur-xl border-l-2 border-kn-accent p-5 rounded-r-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-kn-accent text-white text-[10px] font-bold font-mono">0{item.id}</span>
              <h3 className="text-white font-bold tracking-wider text-lg">{item.title}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
};

// -----------------------------------------------------------------------------
// Main Scene
// -----------------------------------------------------------------------------
const Scene = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <>
      {/* Environment is CRITICAL for the black sphere to look 3D/Metallic */}
      <Environment preset="studio" />

      {/* Lighting Setup */}
      <ambientLight intensity={0.2} />
      
      {/* Main Key Light */}
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
      
      {/* Rim Light (Backlight) - Creates the "Eclipse" effect around the black sun */}
      <spotLight position={[0, 0, -5]} angle={1} penumbra={1} intensity={5} color="#3B82F6" distance={15} />
      
      {/* Bottom Fill */}
      <pointLight position={[-5, -5, -5]} intensity={1} color="#3B82F6" />

      <FerrofluidSphere />

      {BENEFITS.map((benefit) => (
        <OrbitalNode
          key={benefit.id}
          item={benefit}
          isActive={activeId === benefit.id}
          onHover={() => setActiveId(benefit.id)}
          onLeave={() => setActiveId(null)}
        />
      ))}
    </>
  );
};

// -----------------------------------------------------------------------------
// Component Export
// -----------------------------------------------------------------------------
const SphereBenefits: React.FC = () => {
  return (
    <section className="w-full h-[700px] bg-[#020202] relative overflow-hidden border-y border-white/5">
      
      {/* Section Header */}
      <div className="absolute top-12 left-0 right-0 text-center z-10 pointer-events-none">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-kn-accent text-[10px] tracking-[0.3em] uppercase font-mono mb-3 backdrop-blur-md">
          System Core
        </span>
        <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight opacity-90">
          The KN Ecosystem
        </h2>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-10 w-full text-center pointer-events-none">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] animate-pulse">
          Hover nodes to explore
        </p>
      </div>
      
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020202] pointer-events-none"></div>
    </section>
  );
};

export default SphereBenefits;
