import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createAyushmanPilot } from './AyushmanPilot3D';

interface CartoonAircraft3DProps {
  flightState?: 'taxi' | 'takeoff' | 'cruising' | 'space' | 'landing';
  pitchAngle?: number;
  rollAngle?: number;
  className?: string;
}

export default function CartoonAircraft3D({
  flightState = 'cruising',
  pitchAngle = 0,
  rollAngle = 0,
  className = ''
}: CartoonAircraft3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglOk, setWebglOk] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const aircraftGroupRef = useRef<THREE.Group | null>(null);
  const propellerRef = useRef<THREE.Group | null>(null);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const test = document.createElement('canvas');
      const gl = test.getContext('webgl') || test.getContext('experimental-webgl');
      if (!gl) {
        setWebglOk(false);
        return;
      }
    } catch {
      setWebglOk(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(2.8, 1.4, 3.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Warm, soft cinematic animated-film lighting
    const ambientLight = new THREE.AmbientLight(0xfffdf7, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    sunLight.position.set(4, 6, 3);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xa7d8f5, 1.2);
    rimLight.position.set(-4, -2, -2);
    scene.add(rimLight);

    // Aircraft Group
    const aircraftGroup = new THREE.Group();
    aircraftGroupRef.current = aircraftGroup;
    scene.add(aircraftGroup);

    // Materials - Soft Cartoon Matte Finishes
    const whiteBodyMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf7,
      roughness: 0.35,
      metalness: 0.05
    });

    const blueAccentMat = new THREE.MeshStandardMaterial({
      color: 0x4d91c6,
      roughness: 0.3,
      metalness: 0.1
    });

    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0xdff4fc,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.9,
      opacity: 0.38,
      transparent: true,
      ior: 1.33
    });

    const propMat = new THREE.MeshStandardMaterial({
      color: 0xffb878,
      roughness: 0.4,
      metalness: 0.1
    });

    const darkWheelMat = new THREE.MeshStandardMaterial({
      color: 0x24364b,
      roughness: 0.8
    });

    // 1. Cute Rounded Fuselage (Capsule shape)
    const bodyGeo = new THREE.SphereGeometry(0.5, 24, 24);
    bodyGeo.scale(1.7, 0.95, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, whiteBodyMat);
    aircraftGroup.add(bodyMesh);

    // 2. Blue Underside / Stripe
    const stripeGeo = new THREE.CylinderGeometry(0.48, 0.46, 0.9, 20);
    stripeGeo.rotateZ(Math.PI / 2);
    const stripeMesh = new THREE.Mesh(stripeGeo, blueAccentMat);
    stripeMesh.position.set(0.1, -0.05, 0);
    aircraftGroup.add(stripeMesh);

    // 3. Cute Cartoon Canopy / Cockpit Window
    const canopyGeo = new THREE.SphereGeometry(0.32, 16, 16);
    canopyGeo.scale(1.2, 0.85, 0.85);
    const canopyMesh = new THREE.Mesh(canopyGeo, canopyMat);
    canopyMesh.position.set(0.35, 0.3, 0);
    aircraftGroup.add(canopyMesh);

    // 3D Model of Ayushman (Pilot Character)
    const ayushmanPilot = createAyushmanPilot();
    ayushmanPilot.position.set(0.32, 0.2, 0);
    aircraftGroup.add(ayushmanPilot);

    // 4. Smooth Cartoon Wings
    const wingGeo = new THREE.BoxGeometry(0.65, 0.06, 2.5);
    // Rounded wing tips
    const wingMesh = new THREE.Mesh(wingGeo, whiteBodyMat);
    wingMesh.position.set(0.05, 0.02, 0);
    aircraftGroup.add(wingMesh);

    // Blue Wingtip Caps
    [-1.25, 1.25].forEach((zPos) => {
      const tipGeo = new THREE.SphereGeometry(0.07, 12, 12);
      tipGeo.scale(2.5, 0.5, 1);
      const tipMesh = new THREE.Mesh(tipGeo, blueAccentMat);
      tipMesh.position.set(0.05, 0.02, zPos);
      aircraftGroup.add(tipMesh);
    });

    // 5. Stylized Vertical Tail Fin
    const tailShape = new THREE.Shape();
    tailShape.moveTo(0, 0);
    tailShape.lineTo(-0.45, 0);
    tailShape.lineTo(-0.25, 0.55);
    tailShape.lineTo(0.05, 0.52);
    tailShape.closePath();

    const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.05, bevelEnabled: false });
    tailGeo.translate(0, 0, -0.025);
    const tailMesh = new THREE.Mesh(tailGeo, blueAccentMat);
    tailMesh.position.set(-0.55, 0.25, 0);
    aircraftGroup.add(tailMesh);

    // Horizontal Stabilizers
    const hTailGeo = new THREE.BoxGeometry(0.35, 0.04, 0.95);
    const hTailMesh = new THREE.Mesh(hTailGeo, whiteBodyMat);
    hTailMesh.position.set(-0.65, 0.2, 0);
    aircraftGroup.add(hTailMesh);

    // 6. Spinning Propeller at Nose
    const propGroup = new THREE.Group();
    propellerRef.current = propGroup;
    propGroup.position.set(0.88, 0, 0);
    aircraftGroup.add(propGroup);

    // Spinner Dome
    const spinnerGeo = new THREE.ConeGeometry(0.12, 0.2, 16);
    spinnerGeo.rotateZ(-Math.PI / 2);
    const spinnerMesh = new THREE.Mesh(spinnerGeo, propMat);
    propGroup.add(spinnerMesh);

    // 2 Propeller Blades
    const bladeGeo = new THREE.BoxGeometry(0.02, 0.65, 0.08);
    const blade1 = new THREE.Mesh(bladeGeo, blueAccentMat);
    propGroup.add(blade1);
    const blade2 = new THREE.Mesh(bladeGeo, blueAccentMat);
    blade2.rotation.x = Math.PI / 2;
    propGroup.add(blade2);

    // 7. Small Landing Gear (Cute Wheels)
    [[-0.2, -0.4, 0.35], [-0.2, -0.4, -0.35], [0.45, -0.38, 0]].forEach(([x, y, z]) => {
      const strutGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25, 8);
      const strut = new THREE.Mesh(strutGeo, whiteBodyMat);
      strut.position.set(x, y + 0.1, z);
      aircraftGroup.add(strut);

      const wheelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
      wheelGeo.rotateX(Math.PI / 2);
      const wheel = new THREE.Mesh(wheelGeo, darkWheelMat);
      wheel.position.set(x, y, z);
      aircraftGroup.add(wheel);
    });

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Spin propeller rapidly
      if (propellerRef.current) {
        propellerRef.current.rotation.x += 0.45;
      }

      // Gentle floating / cruising bobbing
      if (aircraftGroupRef.current) {
        const floatY = Math.sin(t * 2.2) * 0.04;
        const bankZ = Math.sin(t * 1.5) * 0.05 + (rollAngle * Math.PI) / 180;
        const pitchX = Math.cos(t * 1.8) * 0.03 + (pitchAngle * Math.PI) / 180;

        aircraftGroupRef.current.position.y = floatY;
        aircraftGroupRef.current.rotation.z = bankZ;
        aircraftGroupRef.current.rotation.x = pitchX;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', onResize);

      bodyGeo.dispose();
      stripeGeo.dispose();
      canopyGeo.dispose();
      wingGeo.dispose();
      tailGeo.dispose();
      hTailGeo.dispose();
      spinnerGeo.dispose();
      bladeGeo.dispose();
      whiteBodyMat.dispose();
      blueAccentMat.dispose();
      canopyMat.dispose();
      propMat.dispose();
      darkWheelMat.dispose();
      renderer.dispose();
    };
  }, [pitchAngle, rollAngle]);

  if (!webglOk) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <svg viewBox="0 0 160 100" className="w-48 h-auto drop-shadow-lg">
          <ellipse cx="80" cy="50" rx="45" ry="22" fill="#FFFDF7" stroke="#4D91C6" strokeWidth="3" />
          <path d="M50 48 L110 48 L105 60 L55 60 Z" fill="#4D91C6" />
          <ellipse cx="102" cy="42" rx="14" ry="10" fill="#BCEAF0" />
          <polygon points="40,48 20,48 28,26 42,28" fill="#4D91C6" />
          <rect x="70" y="44" width="22" height="6" rx="3" fill="#FFB878" />
        </svg>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative select-none pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
