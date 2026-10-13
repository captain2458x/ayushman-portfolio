import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createAyushmanPilot } from '../aircraft/AyushmanPilot3D';

interface CinematicMovieStageProps {
  scrollProgress: number; // 0.0 to 5.0 (continuous flight timeline across the 6 scenes)
}

// 6 Master Keyframe Presets along the continuous zigzag flight path
const FLIGHT_KEYFRAMES = [
  // Keyframe 0 (Scene 1: About Me - Card on LEFT, Plane in open space on RIGHT)
  {
    camPos: new THREE.Vector3(3.3, 0.95, -0.3),
    camLook: new THREE.Vector3(0.0, 0.0, 0.0),
    aircraftPos: new THREE.Vector3(0.3, -0.1, -1.45), // Clear of card: prominently on Screen RIGHT
    aircraftRot: new THREE.Euler(0, -0.10, 0.04, 'YXZ'), // Level cruise, nose subtly center
    bgColor: 0x080e1c,
    lightColor: 0xffddaa,
    lightIntensity: 2.2,
    ambColor: 0x1e293b,
    isSpace: false,
    windStream: false
  },
  // Keyframe 1 (Scene 2: Experience - Card on RIGHT, Plane in open space on LEFT)
  {
    camPos: new THREE.Vector3(3.3, 0.95, 0.3),
    camLook: new THREE.Vector3(0.0, 0.0, 0.0),
    aircraftPos: new THREE.Vector3(-0.1, 0.05, 1.45), // Clear of card: prominently on Screen LEFT
    aircraftRot: new THREE.Euler(0, 0.10, 0.05, 'YXZ'), // Level cruise, nose subtly center
    bgColor: 0x040814,
    lightColor: 0x38bdf8,
    lightIntensity: 2.6,
    ambColor: 0x0f172a,
    isSpace: false,
    windStream: true
  },
  // Keyframe 2 (Scene 3: Projects - Card on LEFT, Plane in open space on RIGHT)
  {
    camPos: new THREE.Vector3(3.3, 1.05, -0.3),
    camLook: new THREE.Vector3(0.0, 0.0, 0.0),
    aircraftPos: new THREE.Vector3(0.3, -0.05, -1.45), // Clear of card: prominently on Screen RIGHT
    aircraftRot: new THREE.Euler(0, -0.10, 0.04, 'YXZ'), // Level cruise, nose subtly center
    bgColor: 0x070c18,
    lightColor: 0xfbbf24,
    lightIntensity: 2.4,
    ambColor: 0x182438,
    isSpace: false,
    windStream: false
  },
  // Keyframe 3 (Scene 4: Skills - Card on RIGHT, Plane in open space on LEFT)
  {
    camPos: new THREE.Vector3(3.3, 1.15, 0.3),
    camLook: new THREE.Vector3(0.0, 0.1, 0.0),
    aircraftPos: new THREE.Vector3(-0.1, 0.35, 1.45), // Clear of card: climbs high on Screen LEFT
    aircraftRot: new THREE.Euler(0, 0.10, 0.18, 'YXZ'), // High orbital pitch
    bgColor: 0x020308,
    lightColor: 0x818cf8,
    lightIntensity: 2.7,
    ambColor: 0x0f172a,
    isSpace: true,
    windStream: false
  },
  // Keyframe 4 (Scene 5: Certifications - Card on LEFT, Plane in open space on RIGHT)
  {
    camPos: new THREE.Vector3(3.3, 1.0, -0.3),
    camLook: new THREE.Vector3(0.0, 0.0, 0.0),
    aircraftPos: new THREE.Vector3(0.3, 0.1, -1.45), // Clear of card: glides on Screen RIGHT
    aircraftRot: new THREE.Euler(0, -0.10, 0.03, 'YXZ'), // Sunset glide attitude
    bgColor: 0x140c1a,
    lightColor: 0xf97316,
    lightIntensity: 2.4,
    ambColor: 0x27173a,
    isSpace: false,
    windStream: false
  },
  // Keyframe 5 (Scene 6: Contact & Resume - Card on RIGHT, Plane in open space on LEFT)
  {
    camPos: new THREE.Vector3(3.3, 0.75, 0.2),
    camLook: new THREE.Vector3(0.0, -0.1, 0.0),
    aircraftPos: new THREE.Vector3(-0.1, -0.25, 1.35), // Clear of card: lands on Screen LEFT
    aircraftRot: new THREE.Euler(0, 0.08, 0.06, 'YXZ'), // Touchdown flare
    bgColor: 0x0a0c16,
    lightColor: 0xfef08a,
    lightIntensity: 2.0,
    ambColor: 0x1e1e2f,
    isSpace: false,
    windStream: false
  }
];

function CinematicMovieStage({ scrollProgress }: CinematicMovieStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef<number>(scrollProgress);
  const currentProgressRef = useRef<number>(scrollProgress);

  // Smoothly set target scroll progress
  useEffect(() => {
    targetProgressRef.current = Math.max(0, Math.min(5, scrollProgress));
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let handleResize: (() => void) | null = null;
    const disposables: { dispose: () => void }[] = [];

    try {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(FLIGHT_KEYFRAMES[0].bgColor);
      scene.fog = new THREE.FogExp2(FLIGHT_KEYFRAMES[0].bgColor, 0.06);

      // 2. Camera setup
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.copy(FLIGHT_KEYFRAMES[0].camPos);
      camera.lookAt(FLIGHT_KEYFRAMES[0].camLook);

      // 3. High performance renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

    // 4. Lighting
    const ambLight = new THREE.AmbientLight(FLIGHT_KEYFRAMES[0].ambColor, 1.2);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(FLIGHT_KEYFRAMES[0].lightColor, 2.2);
    dirLight.position.set(5, 6, 4);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 5. Aircraft 3D Model Group (Compact proportions for clean viewport fit)
    const aircraftGroup = new THREE.Group();
    aircraftGroup.position.copy(FLIGHT_KEYFRAMES[0].aircraftPos);
    aircraftGroup.rotation.copy(FLIGHT_KEYFRAMES[0].aircraftRot);
    aircraftGroup.scale.setScalar(0.70);
    scene.add(aircraftGroup);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05
    });

    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Aerospace Blue
      roughness: 0.2,
      metalness: 0.15
    });

    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.15,
      metalness: 0.2
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdff4fc,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.9,
      opacity: 0.38,
      transparent: true,
      ior: 1.33
    });

    const propMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8
    });

    // Fuselage
    const bodyGeo = new THREE.SphereGeometry(0.5, 32, 32);
    bodyGeo.scale(1.8, 0.96, 0.96);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    aircraftGroup.add(bodyMesh);

    // Blue Belly
    const bellyGeo = new THREE.CylinderGeometry(0.48, 0.46, 1.1, 24);
    bellyGeo.rotateZ(Math.PI / 2);
    const bellyMesh = new THREE.Mesh(bellyGeo, blueMat);
    bellyMesh.position.set(0.12, -0.06, 0);
    aircraftGroup.add(bellyMesh);

    // Cockpit Canopy (Transparent Crystal-Clear Aero Canopy)
    const canopyGeo = new THREE.SphereGeometry(0.33, 24, 24);
    canopyGeo.scale(1.25, 0.88, 0.88);
    const canopyMesh = new THREE.Mesh(canopyGeo, glassMat);
    canopyMesh.position.set(0.38, 0.32, 0);
    aircraftGroup.add(canopyMesh);

    // 3D Model of Ayushman (Pilot Character) inside the Cockpit
    const ayushmanPilot = createAyushmanPilot();
    ayushmanPilot.position.set(0.35, 0.22, 0);
    aircraftGroup.add(ayushmanPilot);

    // Wings
    const wingGeo = new THREE.BoxGeometry(0.68, 0.05, 2.6);
    const wingMesh = new THREE.Mesh(wingGeo, bodyMat);
    wingMesh.position.set(0.06, 0.02, 0);
    aircraftGroup.add(wingMesh);

    // Wingtips & Nav Lights
    [-1.3, 1.3].forEach((zPos, idx) => {
      const tipGeo = new THREE.SphereGeometry(0.08, 16, 16);
      tipGeo.scale(2.2, 0.45, 1);
      const tipMesh = new THREE.Mesh(tipGeo, blueMat);
      tipMesh.position.set(0.06, 0.02, zPos);
      aircraftGroup.add(tipMesh);

      const lightColor = idx === 0 ? 0xef4444 : 0x10b981;
      const navLightMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 8, 8),
        new THREE.MeshBasicMaterial({ color: lightColor })
      );
      navLightMesh.position.set(0.06, 0.04, zPos);
      aircraftGroup.add(navLightMesh);
    });

    // Tail Fin
    const tailShape = new THREE.Shape();
    tailShape.moveTo(0, 0);
    tailShape.lineTo(-0.48, 0);
    tailShape.lineTo(-0.28, 0.58);
    tailShape.lineTo(0.06, 0.55);
    tailShape.closePath();

    const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.06, bevelEnabled: false });
    tailGeo.translate(0, 0, -0.03);
    const tailMesh = new THREE.Mesh(tailGeo, blueMat);
    tailMesh.position.set(-0.58, 0.25, 0);
    aircraftGroup.add(tailMesh);

    // Cyan Tail Accent
    const flashGeo = new THREE.BoxGeometry(0.2, 0.04, 0.08);
    const flashMesh = new THREE.Mesh(flashGeo, cyanMat);
    flashMesh.position.set(-0.7, 0.45, 0);
    aircraftGroup.add(flashMesh);

    // Horizontal Stabilizer
    const hTailGeo = new THREE.BoxGeometry(0.38, 0.04, 1.0);
    const hTailMesh = new THREE.Mesh(hTailGeo, bodyMat);
    hTailMesh.position.set(-0.68, 0.22, 0);
    aircraftGroup.add(hTailMesh);

    // Propeller
    const propGroup = new THREE.Group();
    propGroup.position.set(0.92, 0, 0);
    aircraftGroup.add(propGroup);

    const spinnerGeo = new THREE.ConeGeometry(0.13, 0.22, 20);
    spinnerGeo.rotateZ(-Math.PI / 2);
    const spinnerMesh = new THREE.Mesh(spinnerGeo, propMat);
    propGroup.add(spinnerMesh);

    const bladeGeo = new THREE.BoxGeometry(0.02, 0.7, 0.09);
    const b1 = new THREE.Mesh(bladeGeo, blueMat);
    propGroup.add(b1);
    const b2 = new THREE.Mesh(bladeGeo, blueMat);
    b2.rotation.x = Math.PI / 2;
    propGroup.add(b2);

    // Landing Gear
    [[-0.22, -0.42, 0.36], [-0.22, -0.42, -0.36], [0.46, -0.38, 0]].forEach(([x, y, z]) => {
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.24, 8), bodyMat);
      strut.position.set(x, y + 0.1, z);
      aircraftGroup.add(strut);

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16), darkMat);
      wheel.rotateX(Math.PI / 2);
      wheel.position.set(x, y, z);
      aircraftGroup.add(wheel);
    });

    // 6. Environments
    // Starfield for Space
    const starsCount = 1400;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 70;
      starPos[i + 1] = (Math.random() - 0.5) * 70;
      starPos[i + 2] = (Math.random() - 0.5) * 70;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.16,
      transparent: true,
      opacity: 0.7
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Wind Tunnel Particle Streamlines
    const streamCount = 500;
    const streamGeo = new THREE.BufferGeometry();
    const streamPos = new Float32Array(streamCount * 3);
    for (let i = 0; i < streamCount * 3; i += 3) {
      streamPos[i] = (Math.random() - 0.5) * 10;
      streamPos[i + 1] = (Math.random() - 0.5) * 3;
      streamPos[i + 2] = (Math.random() - 0.5) * 4;
    }
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
    const streamMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.09,
      transparent: true,
      opacity: 0.85
    });
    const windStream = new THREE.Points(streamGeo, streamMat);
    scene.add(windStream);

    // Runway Strip
    const runwayGeo = new THREE.PlaneGeometry(70, 70);
    const runwayMat = new THREE.MeshStandardMaterial({
      color: 0x060a14,
      roughness: 0.9,
      metalness: 0.1
    });
    const runwayMesh = new THREE.Mesh(runwayGeo, runwayMat);
    runwayMesh.rotation.x = -Math.PI / 2;
    runwayMesh.position.y = -0.55;
    scene.add(runwayMesh);

    // Runway Centerline Dots
    const runwayDotsGeo = new THREE.BufferGeometry();
    const dotPos = [];
    for (let x = -30; x < 30; x += 1.5) {
      dotPos.push(x, -0.54, 0);
    }
    runwayDotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3));
    const runwayDots = new THREE.Points(runwayDotsGeo, new THREE.PointsMaterial({ color: 0xfbbf24, size: 0.14 }));
    scene.add(runwayDots);

    // 7. Silky-Smooth Responsive Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    // Cache maxScroll to completely prevent synchronous layout reflow during RAF
    let cachedMaxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight || 1) - window.innerHeight);
    const updateMaxScroll = () => {
      cachedMaxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight || 1) - window.innerHeight);
    };

    let currentPropSpeed = 0.45;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // Read scrollY without triggering layout reflow
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const liveTarget = Math.min(5.0, Math.max(0.0, (scrollY / cachedMaxScroll) * 5.0));
      targetProgressRef.current = liveTarget;

      // Snappy and organic aerodynamic damping (crisp, zero lag, smooth settle)
      const dampFactor = 1 - Math.exp(-delta * 11.0);
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * dampFactor;
      const t = Math.max(0, Math.min(5, currentProgressRef.current));

      // Calculate Keyframes Index and Fraction
      const idxA = Math.min(4, Math.floor(t));
      const idxB = idxA + 1;
      const rawFrac = t - idxA;

      // Perlin's C2-Continuous Smootherstep: 6s^5 - 15s^4 + 10s^3
      // Both 1st derivative (velocity) and 2nd derivative (acceleration) are ZERO at keyframe boundaries.
      // This mathematically guarantees 0 jerk/jolt across all 6 sections.
      const frac = rawFrac * rawFrac * rawFrac * (rawFrac * (rawFrac * 6 - 15) + 10);

      const kfA = FLIGHT_KEYFRAMES[idxA];
      const kfB = FLIGHT_KEYFRAMES[idxB];

      // Smooth C2 Turn Curve: sin^2(pi * rawFrac)
      const sinVal = Math.sin(rawFrac * Math.PI);
      const turnPeak = sinVal * sinVal;

      // Lateral displacement delta Z for dynamic zigzag banking
      const deltaZ = kfB.aircraftPos.z - kfA.aircraftPos.z;
      const turnDir = Math.sign(deltaZ); // -1 when turning RIGHT->LEFT, +1 when turning LEFT->RIGHT

      // Coordinated Aerodynamic Turn Physics:
      const zigzagRoll = turnDir * turnPeak * 0.48;  // ~27.5 deg smooth aerodynamic bank
      const zigzagYaw = -turnDir * turnPeak * 0.72;  // ~41 deg prominent nose heading into the turn
      const transitionPitch = turnPeak * (
        idxA === 0 ? 0.16 : idxA === 2 ? 0.22 : idxA === 4 ? -0.08 : 0.05
      );

      // Organic 3D trajectory arc (curving forward and lifting gracefully during bank)
      const arcLift = turnPeak * 0.08;
      const arcForward = turnPeak * 0.14;

      // Interpolate Aircraft Position with smooth curved path
      const acTargetPos = new THREE.Vector3().lerpVectors(kfA.aircraftPos, kfB.aircraftPos, frac);
      
      // Floating gentle aerodynamic idle bob (fades out during flight maneuvers)
      const flightActivity = Math.abs(targetProgressRef.current - currentProgressRef.current);
      const bobFactor = Math.max(0, 1 - flightActivity * 6) * (rawFrac < 0.12 || rawFrac > 0.88 ? 1 : 0);
      const bobY = Math.sin(elapsed * 1.8) * 0.02 * bobFactor;
      const bobRoll = Math.sin(elapsed * 1.4) * 0.012 * bobFactor;

      // Update aircraft position in direct lockstep with smootherstep
      aircraftGroup.position.set(
        acTargetPos.x + arcForward, 
        acTargetPos.y + bobY + arcLift, 
        acTargetPos.z
      );

      // Spherical quaternion slerp for base rotation
      const quatA = new THREE.Quaternion().setFromEuler(kfA.aircraftRot);
      const quatB = new THREE.Quaternion().setFromEuler(kfB.aircraftRot);
      const currentQuat = new THREE.Quaternion().slerpQuaternions(quatA, quatB, frac);
      
      // Apply coordinated aerodynamic zigzag roll, yaw and pitch using 'YXZ' order
      const dynamicBankQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(zigzagRoll + bobRoll, zigzagYaw, transitionPitch, 'YXZ')
      );
      currentQuat.multiply(dynamicBankQuat);
      aircraftGroup.quaternion.copy(currentQuat);

      // Camera smoothly tracks in lockstep with keyframe trajectory
      const camTargetPos = new THREE.Vector3().lerpVectors(kfA.camPos, kfB.camPos, frac);
      const camTargetLook = new THREE.Vector3().lerpVectors(kfA.camLook, kfB.camLook, frac);

      camera.position.set(camTargetPos.x, camTargetPos.y + bobY * 0.25, camTargetPos.z);
      camera.lookAt(camTargetLook);

      // Continuous Fast Propeller Throttle Response
      const targetPropSpeed = 0.45 + Math.min(1.0, flightActivity * 0.8);
      currentPropSpeed += (targetPropSpeed - currentPropSpeed) * (1 - Math.exp(-delta * 8.0));
      propGroup.rotation.x += currentPropSpeed;

      // Smooth Lighting & Background Transitions
      const targetBg = new THREE.Color(kfA.bgColor).lerp(new THREE.Color(kfB.bgColor), frac);
      const targetLight = new THREE.Color(kfA.lightColor).lerp(new THREE.Color(kfB.lightColor), frac);
      const targetAmb = new THREE.Color(kfA.ambColor).lerp(new THREE.Color(kfB.ambColor), frac);

      (scene.background as THREE.Color).lerp(targetBg, 1 - Math.exp(-delta * 5.5));
      if (scene.fog) {
        (scene.fog as THREE.FogExp2).color.copy(scene.background as THREE.Color);
      }
      dirLight.color.lerp(targetLight, 1 - Math.exp(-delta * 5.5));
      ambLight.color.lerp(targetAmb, 1 - Math.exp(-delta * 5.5));

      // Animate Wind Stream Particles in Scene 2
      const windInfluence = Math.max(0, 1 - Math.abs(t - 1));
      if (windInfluence > 0.05) {
        windStream.visible = true;
        (windStream.material as THREE.PointsMaterial).opacity = windInfluence * 0.85;
        const posArray = streamGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < streamCount * 3; i += 3) {
          posArray[i] -= 0.18;
          if (posArray[i] < -5) posArray[i] = 5;
        }
        streamGeo.attributes.position.needsUpdate = true;
      } else {
        windStream.visible = false;
      }

      // Animate Starfield in Scene 4
      const spaceInfluence = Math.max(0, 1 - Math.abs(t - 3));
      if (spaceInfluence > 0.05) {
        starField.visible = true;
        (starField.material as THREE.PointsMaterial).opacity = spaceInfluence * 0.75;
        starField.rotation.y = elapsed * 0.02;
        runwayMesh.visible = false;
        runwayDots.visible = false;
      } else {
        starField.visible = false;
        runwayMesh.visible = true;
        runwayDots.visible = true;
      }

      renderer.render(scene, camera);
    };

      animate();

      handleResize = () => {
        if (!container || !renderer) return;
        updateMaxScroll();
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);
    } catch (err) {
      console.warn('CinematicMovieStage WebGL warning:', err);
    }

    return () => {
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
      if (renderer) {
        try { renderer.dispose(); } catch (e) { /* ignore */ }
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Subtle cinematic vignette for Hollywood widescreen lighting */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(0,0,0,0) 45%, rgba(2,6,17,0.75) 100%)'
        }}
      />
    </div>
  );
}

export default React.memo(CinematicMovieStage);
