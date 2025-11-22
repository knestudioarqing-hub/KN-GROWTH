import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// Interactive Cubes Component (InstancedMesh for Performance)
// -----------------------------------------------------------------------------
const CubeGrid = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, mouse } = useThree();
  
  // Configuration
  const countX = 20; // Number of cubes horizontally
  const countY = 15; // Number of cubes vertically
  const count = countX * countY;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Store initial positions to reset them or oscillate around them
  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width;
    const height = viewport.height;
    
    // Calculate spacing based on viewport size
    const xSpace = width / (countX - 1);
    const ySpace = height / (countY - 1);

    for (let i = 0; i < count; i++) {
      const x = (i % countX) * xSpace - width / 2;
      const y = Math.floor(i / countX) * ySpace - height / 2;
      // Randomize Z slightly for depth texture
      const z = (Math.random() - 0.5) * 2; 
      
      temp.push({ x, y, z, mx: x, my: y });
    }
    return temp;
  }, [viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Convert normalized mouse coordinates (-1 to 1) to world units based on viewport
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      const { x, y, z } = particle;

      // 1. Base Animation: Gentle floating wave
      // We use sine waves based on position to create a "rolling" effect
      const floatingZ = Math.sin(time * 0.5 + x * 0.5) * 0.5 + Math.cos(time * 0.3 + y * 0.5) * 0.5;

      // 2. Interaction Logic
      // Calculate distance from this specific cube to the mouse position
      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Interaction radius (how far the mouse affects cubes)
      const radius = 6; 
      
      let scale = 1;
      let rotX = time * 0.2;
      let rotY = time * 0.3;
      let posX = x;
      let posY = y;
      let posZ = z + floatingZ;

      if (dist < radius) {
        // Calculate force (0 to 1) based on distance
        const force = (radius - dist) / radius;
        
        // Apply effects based on force
        // Scale up
        scale = 1 + force * 1.5; 
        
        // Move towards camera (Z-axis pop)
        posZ += force * 3; 
        
        // Rotate faster when hovered
        rotX += force * 5;
        rotY += force * 5;
        
        // Repel slightly from mouse (liquid-like displacement)
        // posX -= (dx / dist) * force * 0.5;
        // posY -= (dy / dist) * force * 0.5;
      }

      // Update the dummy object
      dummy.position.set(posX, posY, posZ);
      dummy.rotation.set(rotX, rotY, 0);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      // Apply matrix to the instance
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    // Tell Three.js the instances have been updated
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Geometry: A simple cube */}
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      
      {/* Material: Metallic Black */}
      <meshStandardMaterial 
        color="#111111"
        roughness={0.4}
        metalness={0.8}
      />
    </instancedMesh>
  );
};

// -----------------------------------------------------------------------------
// Mouse Light: A light that follows the cursor
// -----------------------------------------------------------------------------
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      // Map mouse to viewport coordinates
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      // Smoothly verify positions or just set directly
      lightRef.current.position.set(x, y, 2);
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      distance={12} 
      decay={2} 
      intensity={40} 
      color="#3B82F6" // Electric Blue Accent
    />
  );
};

// -----------------------------------------------------------------------------
// Main Scene Wrapper
// -----------------------------------------------------------------------------
const TechBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-kn-bg">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 2]} // Handle pixel density
        gl={{ antialias: true, alpha: false }} // Alpha false for better performance on dark bg
      >
        {/* Background Color attached to scene */}
        <color attach="background" args={['#050505']} />
        
        {/* FOG: Adds depth by fading distant objects */}
        <fog attach="fog" args={['#050505', 8, 25]} />

        {/* AMBIENT LIGHT: General low light */}
        <ambientLight intensity={0.5} color="#ffffff" />
        
        {/* DIRECTIONAL LIGHT: Fixed light source for definition */}
        <directionalLight position={[10, 10, 5]} intensity={1} color="#444444" />

        {/* DYNAMIC LIGHT: Follows mouse */}
        <MouseLight />

        {/* CONTENT: The interactive grid */}
        <CubeGrid />
      </Canvas>
      
      {/* Gradient overlay for smooth transition to content */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-kn-bg to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TechBackground;
