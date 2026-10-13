import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';
import SoundManager from '../../utils/audio';

interface OrbitVisualizer3DProps {
  inclinationDeg: number;
  altitudeKm: number;
}

export default function OrbitVisualizer3D({
  inclinationDeg,
  altitudeKm
}: OrbitVisualizer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to dynamic Three.js objects
  const orbitLineRef = useRef<THREE.Line | null>(null);
  const satelliteMeshRef = useRef<THREE.Mesh | null>(null);
  const orbitGroupRef = useRef<THREE.Group | null>(null);
  const earthRadius = 1.2;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(2.8, 2.2, 3.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Earth Sphere
    const earthGeo = new THREE.SphereGeometry(earthRadius, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x0f2b48,
      metalness: 0.3,
      roughness: 0.8,
      wireframe: false
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Earth wireframe latitude/longitude rings
    const earthWireGeo = new THREE.WireframeGeometry(earthGeo);
    const earthWireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15
    });
    const earthWire = new THREE.LineSegments(earthWireGeo, earthWireMat);
    earth.add(earthWire);

    // Orbit Group (rotates with inclination)
    const orbitGroup = new THREE.Group();
    orbitGroupRef.current = orbitGroup;
    scene.add(orbitGroup);

    // Orbit Ellipse Path
    const normalizedRadius = earthRadius + (altitudeKm / 500) * 0.45;
    const points: THREE.Vector3[] = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * normalizedRadius, 0, Math.sin(theta) * normalizedRadius));
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLineRef.current = orbitLine;
    orbitGroup.add(orbitLine);

    // Satellite (CubeSat Box + Solar wings)
    const satGroup = new THREE.Group();
    const satBodyGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const satBodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.9, roughness: 0.2 });
    const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
    satGroup.add(satBody);

    const wingGeo = new THREE.BoxGeometry(0.24, 0.01, 0.08);
    const wingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.x = -0.18;
    satGroup.add(leftWing);
    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.x = 0.18;
    satGroup.add(rightWing);

    satelliteMeshRef.current = satBody;
    orbitGroup.add(satGroup);

    // Rotate orbit group to match inclination
    orbitGroup.rotation.z = (inclinationDeg * Math.PI) / 180;

    // Mouse drag rotation controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
    let rotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
    };
    const onMouseUp = () => (isDragging = false);

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let satAngle = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Earth rotation
      earth.rotation.y += 0.001;

      // Satellite orbit propagation
      satAngle += 0.02;
      const r = earthRadius + (altitudeKm / 500) * 0.45;
      satGroup.position.set(Math.cos(satAngle) * r, 0, Math.sin(satAngle) * r);
      satGroup.rotation.y = satAngle + Math.PI / 2;

      // Camera view rotation
      scene.rotation.y = rotY;
      scene.rotation.x = rotX;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      earthGeo.dispose();
      earthMat.dispose();
      earthWireGeo.dispose();
      earthWireMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
      satBodyGeo.dispose();
      satBodyMat.dispose();
      wingGeo.dispose();
      wingMat.dispose();
      renderer.dispose();
    };
  }, [inclinationDeg, altitudeKm]);

  return (
    <div ref={containerRef} className="w-full h-[280px] sm:h-[320px] relative rounded-xl overflow-hidden bg-background/50 border border-border">
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-2 left-2 font-mono text-[9px] bg-surface/80 px-2 py-1 rounded border border-border text-text-secondary">
        3D LEO Orbit · Drag to rotate Earth perspective
      </div>
    </div>
  );
}
