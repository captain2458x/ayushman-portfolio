import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Plane, Compass, Sparkles, Orbit, Wind, Volume2, VolumeX } from 'lucide-react';
import SoundManager from '../../../utils/audio';

interface CinematicFlightCompanionProps {
  currentChapterId: string;
  onJumpToChapter?: (id: string) => void;
}

interface ChapterAtmosphere {
  name: string;
  stageLabel: string;
  cameraPos: [number, number, number];
  aircraftPitch: number;
  aircraftRoll: number;
  aircraftY: number;
  skyGradient: string;
  lightColor: number;
  ambientColor: number;
  isSpace: boolean;
}

const CHAPTER_CONFIGS: Record<string, ChapterAtmosphere> = {
  'ch1-pilot': {
    name: 'Island Airfield',
    stageLabel: 'CLIMBING OUT // MORNING SUNRISE',
    cameraPos: [2.8, 1.3, 3.2],
    aircraftPitch: 0.12,
    aircraftRoll: 0.05,
    aircraftY: 0.1,
    skyGradient: 'from-amber-100/80 via-sky-100/70 to-white',
    lightColor: 0xffeedd,
    ambientColor: 0xfff8f0,
    isSpace: false
  },
  'ch2-hangar': {
    name: 'Engineering Hangar',
    stageLabel: 'ENTERING WORKSHOP HANGAR DOORS',
    cameraPos: [2.5, 1.1, 3.0],
    aircraftPitch: -0.04,
    aircraftRoll: -0.08,
    aircraftY: -0.05,
    skyGradient: 'from-sky-100/80 via-slate-100/90 to-white',
    lightColor: 0xffe0b2,
    ambientColor: 0xe0f2fe,
    isSpace: false
  },
  'ch3-projects': {
    name: 'Missions Flight Deck',
    stageLabel: 'CRUISING OVER PROJECT EXHIBITS',
    cameraPos: [2.7, 1.2, 3.1],
    aircraftPitch: 0.02,
    aircraftRoll: 0.04,
    aircraftY: 0,
    skyGradient: 'from-sky-200/60 via-slate-50 to-white',
    lightColor: 0xe0f2fe,
    ambientColor: 0xf0f9ff,
    isSpace: false
  },
  'ch4-space': {
    name: 'Low Earth Orbit',
    stageLabel: 'BEYOND THE ATMOSPHERE // ZERO-G ORBIT',
    cameraPos: [3.0, 1.5, 3.4],
    aircraftPitch: 0.22,
    aircraftRoll: -0.15,
    aircraftY: 0.2,
    skyGradient: 'from-[#0B132B] via-[#1C2541] to-[#0A0E1A]',
    lightColor: 0x818cf8,
    ambientColor: 0x38bdf8,
    isSpace: true
  },
  'ch5-experience': {
    name: 'Sunset Waypoint',
    stageLabel: 'GOLDEN EVENING APPROACH // CREDENTIALS',
    cameraPos: [2.6, 1.2, 3.0],
    aircraftPitch: -0.06,
    aircraftRoll: 0.08,
    aircraftY: -0.02,
    skyGradient: 'from-amber-200/60 via-purple-100/50 to-white',
    lightColor: 0xfed7aa,
    ambientColor: 0xfef08a,
    isSpace: false
  },
  'ch6-contact': {
    name: 'Coastal Runway',
    stageLabel: 'TOUCHDOWN // COASTAL RUNWAY TERMINAL',
    cameraPos: [2.4, 0.9, 2.9],
    aircraftPitch: -0.08,
    aircraftRoll: 0,
    aircraftY: -0.18,
    skyGradient: 'from-orange-100/80 via-amber-50 to-white',
    lightColor: 0xffedd5,
    ambientColor: 0xfff7ed,
    isSpace: false
  }
};

export default function CinematicFlightCompanion({
  currentChapterId,
  onJumpToChapter
}: CinematicFlightCompanionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const aircraftGroupRef = useRef<THREE.Group | null>(null);
  const propellerRef = useRef<THREE.Group | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const animIdRef = useRef<number | null>(null);

  const config = CHAPTER_CONFIGS[currentChapterId] || CHAPTER_CONFIGS['ch1-pilot'];

  // Initialize Three.js scene once
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(...config.cameraPos);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Lighting
    const amb = new THREE.AmbientLight(config.ambientColor, 1.4);
    ambientLightRef.current = amb;
    scene.add(amb);

    const dir = new THREE.DirectionalLight(config.lightColor, 2.2);
    dir.position.set(4, 5, 3);
    dirLightRef.current = dir;
    scene.add(dir);

    // Rim light for cartoon outline
    const rim = new THREE.DirectionalLight(0xa7d8f5, 1.0);
    rim.position.set(-3, -2, -2);
    scene.add(rim);

    // Aircraft Group
    const aircraftGroup = new THREE.Group();
    aircraftGroupRef.current = aircraftGroup;
    scene.add(aircraftGroup);

    // Materials
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf7,
      roughness: 0.35,
      metalness: 0.05
    });

    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x4d91c6,
      roughness: 0.3,
      metalness: 0.1
    });

    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0xbceaf0,
      roughness: 0.15,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85
    });

    const propMat = new THREE.MeshStandardMaterial({
      color: 0xffb878,
      roughness: 0.4
    });

    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8
    });

    // 1. Fuselage
    const bodyGeo = new THREE.SphereGeometry(0.5, 24, 24);
    bodyGeo.scale(1.7, 0.95, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, whiteMat);
    aircraftGroup.add(bodyMesh);

    // 2. Lower Belly Stripe
    const stripeGeo = new THREE.CylinderGeometry(0.48, 0.46, 0.9, 20);
    stripeGeo.rotateZ(Math.PI / 2);
    const stripeMesh = new THREE.Mesh(stripeGeo, blueMat);
    stripeMesh.position.set(0.1, -0.05, 0);
    aircraftGroup.add(stripeMesh);

    // 3. Canopy
    const canopyGeo = new THREE.SphereGeometry(0.32, 16, 16);
    canopyGeo.scale(1.2, 0.85, 0.85);
    const canopyMesh = new THREE.Mesh(canopyGeo, canopyMat);
    canopyMesh.position.set(0.35, 0.3, 0);
    aircraftGroup.add(canopyMesh);

    // 4. Wings
    const wingGeo = new THREE.BoxGeometry(0.65, 0.06, 2.5);
    const wingMesh = new THREE.Mesh(wingGeo, whiteMat);
    wingMesh.position.set(0.05, 0.02, 0);
    aircraftGroup.add(wingMesh);

    [-1.25, 1.25].forEach((zPos) => {
      const tipGeo = new THREE.SphereGeometry(0.07, 12, 12);
      tipGeo.scale(2.5, 0.5, 1);
      const tipMesh = new THREE.Mesh(tipGeo, blueMat);
      tipMesh.position.set(0.05, 0.02, zPos);
      aircraftGroup.add(tipMesh);
    });

    // 5. Tail Fin (AS monogram inspiration)
    const tailShape = new THREE.Shape();
    tailShape.moveTo(0, 0);
    tailShape.lineTo(-0.45, 0);
    tailShape.lineTo(-0.25, 0.55);
    tailShape.lineTo(0.05, 0.52);
    tailShape.closePath();

    const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.05, bevelEnabled: false });
    tailGeo.translate(0, 0, -0.025);
    const tailMesh = new THREE.Mesh(tailGeo, blueMat);
    tailMesh.position.set(-0.55, 0.25, 0);
    aircraftGroup.add(tailMesh);

    // Horizontal tail
    const hTailGeo = new THREE.BoxGeometry(0.35, 0.04, 0.95);
    const hTailMesh = new THREE.Mesh(hTailGeo, whiteMat);
    hTailMesh.position.set(-0.65, 0.2, 0);
    aircraftGroup.add(hTailMesh);

    // 6. Propeller at Nose
    const propGroup = new THREE.Group();
    propellerRef.current = propGroup;
    propGroup.position.set(0.88, 0, 0);
    aircraftGroup.add(propGroup);

    const spinnerGeo = new THREE.ConeGeometry(0.12, 0.2, 16);
    spinnerGeo.rotateZ(-Math.PI / 2);
    const spinnerMesh = new THREE.Mesh(spinnerGeo, propMat);
    propGroup.add(spinnerMesh);

    const bladeGeo = new THREE.BoxGeometry(0.02, 0.65, 0.08);
    const blade1 = new THREE.Mesh(bladeGeo, blueMat);
    propGroup.add(blade1);
    const blade2 = new THREE.Mesh(bladeGeo, blueMat);
    blade2.rotation.x = Math.PI / 2;
    propGroup.add(blade2);

    // 7. Wheels
    [[-0.2, -0.4, 0.35], [-0.2, -0.4, -0.35], [0.45, -0.38, 0]].forEach(([x, y, z]) => {
      const strutGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25, 8);
      const strut = new THREE.Mesh(strutGeo, whiteMat);
      strut.position.set(x, y + 0.1, z);
      aircraftGroup.add(strut);

      const wheelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
      wheelGeo.rotateX(Math.PI / 2);
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(x, y, z);
      aircraftGroup.add(wheel);
    });

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fast spinning propeller
      if (propellerRef.current) {
        propellerRef.current.rotation.x += 0.45;
      }

      // Gentle cartoon floating bob
      if (aircraftGroupRef.current) {
        const floatOffset = Math.sin(elapsedTime * 2.2) * 0.04;
        const targetPitch = config.aircraftPitch + Math.sin(elapsedTime * 1.5) * 0.02;
        const targetRoll = config.aircraftRoll + Math.cos(elapsedTime * 1.2) * 0.03;
        const targetY = config.aircraftY + floatOffset;

        // Smooth lerping to chapter target pose
        aircraftGroupRef.current.position.y += (targetY - aircraftGroupRef.current.position.y) * 0.08;
        aircraftGroupRef.current.rotation.z += (targetPitch - aircraftGroupRef.current.rotation.z) * 0.08;
        aircraftGroupRef.current.rotation.x += (targetRoll - aircraftGroupRef.current.rotation.x) * 0.08;
      }

      // Smooth camera position lerping
      if (cameraRef.current) {
        cameraRef.current.position.x += (config.cameraPos[0] - cameraRef.current.position.x) * 0.06;
        cameraRef.current.position.y += (config.cameraPos[1] - cameraRef.current.position.y) * 0.06;
        cameraRef.current.position.z += (config.cameraPos[2] - cameraRef.current.position.z) * 0.06;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Smooth light color updates
      if (dirLightRef.current && ambientLightRef.current) {
        dirLightRef.current.color.setHex(config.lightColor);
        ambientLightRef.current.color.setHex(config.ambientColor);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 180;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm p-4 transition-all duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm">
            <Plane size={15} className="-rotate-45" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-sky-700 tracking-wider block">
              CINEMATIC FLIGHT COMPANION
            </span>
            <span className="font-display font-bold text-sm text-slate-900 block leading-tight">
              {config.name}
            </span>
          </div>
        </div>

        <div className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold self-start sm:self-auto border border-slate-200">
          {config.stageLabel}
        </div>
      </div>

      {/* 3D Animated Viewport with atmospheric gradient */}
      <div 
        ref={containerRef} 
        className={`relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-gradient-to-b ${config.skyGradient} transition-colors duration-700 flex items-center justify-center`}
      >
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Ambient Overlay Badges */}
        <div className="absolute top-2.5 left-2.5 font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm border border-slate-200/60">
          AS-2027 • CONTINUOUS FLIGHT
        </div>

        {config.isSpace && (
          <div className="absolute bottom-2.5 right-2.5 font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-sky-300 border border-indigo-700">
            ORBIT VELOCITY: 7.61 KM/S
          </div>
        )}
      </div>

      {/* Narrative Flight Caption */}
      <div className="pt-2 text-center">
        <p className="font-sans text-xs text-slate-600">
          The cartoon aircraft accompanies your journey through Ayushman's academic and engineering story.
        </p>
      </div>
    </div>
  );
}
