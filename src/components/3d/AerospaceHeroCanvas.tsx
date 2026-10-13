import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Compass, Eye } from 'lucide-react';
import SoundManager from '../../utils/audio';

export default function AerospaceHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [pitch, setPitch] = useState(12);
  const [roll, setRoll] = useState(5);
  const [yaw, setYaw] = useState(25);
  const [isInteracting, setIsInteracting] = useState(false);

  // References for animation and disposal
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const craftGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(3.5, 2.2, 5.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // 3. Lighting (Aerospace Technical Lab - Muted & Balanced)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(5, 8, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 0.7);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    // 4. Aerospace Craft Group
    const craftGroup = new THREE.Group();
    craftGroupRef.current = craftGroup;
    scene.add(craftGroup);

    // Materials - Stealth Composite Dark Matte
    const hullMaterial = new THREE.MeshStandardMaterial({
      color: 0x081322,
      metalness: 0.6,
      roughness: 0.5
    });

    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    const exhaustMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6
    });

    // A. Fuselage (Tapered aerodynamic body)
    const fuselageGeo = new THREE.ConeGeometry(0.35, 3.2, 8);
    fuselageGeo.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeo, hullMaterial);
    fuselage.scale.set(1, 0.55, 1);
    craftGroup.add(fuselage);

    const fuselageWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(fuselageGeo),
      wireMaterial
    );
    fuselageWire.scale.copy(fuselage.scale);
    craftGroup.add(fuselageWire);

    // B. Delta Wings (Aerospace swept lifting surface)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0.8);
    wingShape.lineTo(2.2, -0.9);
    wingShape.lineTo(1.8, -1.2);
    wingShape.lineTo(0, -0.6);
    wingShape.lineTo(-1.8, -1.2);
    wingShape.lineTo(-2.2, -0.9);
    wingShape.closePath();

    const wingExtrude = new THREE.ExtrudeGeometry(wingShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    });
    wingExtrude.rotateX(Math.PI / 2);
    wingExtrude.translate(0, 0, 0);

    const wings = new THREE.Mesh(wingExtrude, hullMaterial);
    craftGroup.add(wings);

    const wingsWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(wingExtrude),
      wireMaterial
    );
    craftGroup.add(wingsWire);

    // C. Twin Vertical Stabilizers
    [-0.55, 0.55].forEach((xPos) => {
      const finGeo = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        xPos, 0.0, -0.5,
        xPos + (xPos > 0 ? 0.15 : -0.15), 0.7, -1.1,
        xPos, 0.0, -1.1,
      ]);
      finGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      finGeo.computeVertexNormals();

      const fin = new THREE.Mesh(finGeo, hullMaterial);
      craftGroup.add(fin);

      const finWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(finGeo),
        wireMaterial
      );
      craftGroup.add(finWire);
    });

    // D. Twin Exhaust Thrusters
    [-0.2, 0.2].forEach((xOffset) => {
      const exhaustGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.35, 12);
      exhaustGeo.rotateX(Math.PI / 2);
      const exhaust = new THREE.Mesh(exhaustGeo, exhaustMaterial);
      exhaust.position.set(xOffset, 0, -1.5);
      craftGroup.add(exhaust);
    });

    // E. Technical Coordinate Reticle Gimbal Rings
    const ringGeo1 = new THREE.RingGeometry(2.5, 2.51, 64);
    const ring1 = new THREE.Mesh(ringGeo1, glowMaterial);
    ring1.rotateX(Math.PI / 2);
    craftGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(2.3, 2.308, 64);
    const ring2 = new THREE.Mesh(ringGeo2, glowMaterial);
    craftGroup.add(ring2);

    // F. Technical Coordinate Base Grid
    const gridHelper = new THREE.GridHelper(6, 12, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -1.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.08;
    scene.add(gridHelper);

    // Mouse / Touch Interaction variables
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotX = -0.15;
    let rotY = 0.45;
    let targetRotX = -0.15;
    let targetRotY = 0.45;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.007;
      targetRotX += deltaY * 0.007;
      targetRotX = Math.max(-0.8, Math.min(0.8, targetRotX));
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      targetRotY += deltaX * 0.007;
      targetRotX += deltaY * 0.007;
      targetRotX = Math.max(-0.8, Math.min(0.8, targetRotX));
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth interpolation
      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;

      // Idle gentle aerodynamic oscillation
      if (!isDragging) {
        targetRotY += 0.0025; // Gentle continuous rotation
      }

      if (craftGroup) {
        craftGroup.rotation.x = rotX + Math.sin(time * 1.5) * 0.03;
        craftGroup.rotation.y = rotY;
        craftGroup.rotation.z = Math.sin(time * 1.2) * 0.04;
        craftGroup.position.y = Math.sin(time * 2.0) * 0.06;
      }

      // Update telemetry display every few frames
      frameCount++;
      if (frameCount % 6 === 0 && craftGroup) {
        setPitch(Math.round((-craftGroup.rotation.x * 180) / Math.PI));
        setRoll(Math.round((craftGroup.rotation.z * 180) / Math.PI));
        setYaw(Math.round(((craftGroup.rotation.y * 180) / Math.PI) % 360));
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      // Dispose Three.js objects
      fuselageGeo.dispose();
      wingExtrude.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      gridHelper.dispose();
      hullMaterial.dispose();
      wireMaterial.dispose();
      glowMaterial.dispose();
      exhaustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const handleResetCamera = () => {
    SoundManager.playClick();
    if (craftGroupRef.current) {
      craftGroupRef.current.rotation.set(-0.15, 0.45, 0);
    }
  };

  if (!webglSupported) {
    return (
      <div className="w-full h-[400px] lg:h-[480px] rounded-2xl bg-surface border border-border flex flex-col items-center justify-center p-6 text-center relative overflow-hidden technical-corner">
        <div className="absolute inset-0 aerospace-grid-bg opacity-30 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mx-auto text-primary">
            <Compass size={36} />
          </div>
          <h3 className="font-display font-bold text-lg text-text-primary">
            Aerospace Interceptor Blueprint
          </h3>
          <p className="text-text-secondary text-xs max-w-xs font-mono">
            Parametric Delta-Wing Geometry & CFD Surface Mesh Representation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] rounded-2xl bg-surface/60 border border-border overflow-hidden technical-corner group select-none shadow-2xl backdrop-blur-sm"
    >
      {/* Background Grid Pattern - Faint & Unobtrusive */}
      <div className="absolute inset-0 aerospace-grid-subtle opacity-15 pointer-events-none" />

      {/* Top HUD Diagnostics Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none font-mono text-[10px] text-text-secondary">
        <div className="flex items-center gap-2 bg-surface/80 px-2.5 py-1 rounded-md border border-border backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span className="text-primary font-semibold">UAV_INTERCEPTOR_3D</span>
          <span className="opacity-40">|</span>
          <span>MESH: POLY_CAD</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 bg-surface/80 px-2.5 py-1 rounded-md border border-border backdrop-blur-sm">
          <span>PITCH: <strong className="text-text-primary">{pitch}°</strong></span>
          <span>ROLL: <strong className="text-text-primary">{roll}°</strong></span>
          <span>YAW: <strong className="text-text-primary">{yaw}°</strong></span>
        </div>
      </div>

      {/* Interactive Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing focus:outline-none"
        title="Click and drag to rotate the aerospace 3D model"
      />

      {/* Bottom Controls & Interaction Hints */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 font-mono text-[10px] text-text-secondary pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-surface/85 px-2.5 py-1 rounded-md border border-border backdrop-blur-sm">
          <Eye size={12} className="text-primary" />
          <span>{isInteracting ? 'MANUAL ATTITUDE OVERRIDE' : 'DRAG TO ROTATE 360°'}</span>
        </div>

        <button
          type="button"
          onClick={handleResetCamera}
          className="flex items-center gap-1.5 bg-surface/85 hover:bg-surface-elevated hover:text-primary px-2.5 py-1 rounded-md border border-border text-text-secondary transition-colors cursor-pointer"
          title="Reset 3D camera orientation"
        >
          <RotateCcw size={11} />
          <span>RESET ATTITUDE</span>
        </button>
      </div>
    </div>
  );
}
