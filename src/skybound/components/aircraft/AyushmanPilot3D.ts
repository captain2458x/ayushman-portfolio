import * as THREE from 'three';

/**
 * Creates a stylized Pixar-inspired 3D character of Ayushman Srivastava
 * designed to sit inside the cockpit of the cartoon aircraft.
 * 
 * Features modeled accurately from his portrait (profile.jpg):
 * - Warm golden-tan Indian skin tone (#d49c7b)
 * - Signature voluminous side-swept pompadour dark hair (#181311)
 * - Neatly trimmed chin/jawline beard and moustache (#1a1412)
 * - Modern glasses with subtle blue anti-reflective sheen (#60a5fa)
 * - Sky-blue aeronautical shirt matching his photo with collar & gold aerospace wings pin
 * - Pilot shoulder safety harness with central buckle
 * - Arms and hands gripping the airplane's flight yoke
 * - Full cockpit avionics dashboard with glowing PFD/MFD screens
 * - Aeronautical pilot bucket seat with headrest
 * - Dedicated cockpit interior warm point-light for crystal-clear visibility
 */
export function createAyushmanPilot(): THREE.Group {
  const pilotRoot = new THREE.Group();
  pilotRoot.name = 'AyushmanPilotRoot';

  // 1. Shared Materials
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd49c7b, // Warm golden-tan skin tone
    roughness: 0.55,
    metalness: 0.05,
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x181311, // Deep dark brown / black hair
    roughness: 0.65,
    metalness: 0.05,
  });

  const beardMat = new THREE.MeshStandardMaterial({
    color: 0x1e1715, // Trimmed beard tone
    roughness: 0.7,
    metalness: 0.02,
  });

  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeIrisMat = new THREE.MeshBasicMaterial({ color: 0x1f140e });
  const eyeHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Glasses frame & blue-tinted anti-reflective lenses (matching his real photo)
  const glassesFrameMat = new THREE.MeshStandardMaterial({
    color: 0x2d3748, // Gunmetal titanium frame
    roughness: 0.3,
    metalness: 0.7,
  });

  const glassesLensMat = new THREE.MeshPhysicalMaterial({
    color: 0x60a5fa, // Blue anti-glare reflection
    roughness: 0.08,
    metalness: 0.2,
    transmission: 0.75,
    opacity: 0.4,
    transparent: true,
    ior: 1.35,
  });

  // Clothing: Signature sky-blue shirt from his photo
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0x64a0cb, // Ayushman's sky-blue shirt
    roughness: 0.5,
    metalness: 0.05,
  });

  const shirtCollarMat = new THREE.MeshStandardMaterial({
    color: 0x82b5dc, // Light crisp sky-blue collar
    roughness: 0.45,
    metalness: 0.05,
  });

  const goldPinMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Golden aerospace insignia
    roughness: 0.25,
    metalness: 0.85,
  });

  const harnessMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Dark slate safety harness
    roughness: 0.7,
    metalness: 0.1,
  });

  const buckleMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0, // Chrome central harness lock
    roughness: 0.2,
    metalness: 0.85,
  });

  // Aviation Headset
  const headsetMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Dark aviation earpads
    roughness: 0.4,
    metalness: 0.3,
  });

  const headsetAccentMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, // Aviation cyan accent stripe
    roughness: 0.3,
    metalness: 0.5,
  });

  // Cockpit seat & controls
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x1e222d, // Dark cockpit bucket seat
    roughness: 0.8,
    metalness: 0.1,
  });

  const dashMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Slate avionics console
    roughness: 0.85,
    metalness: 0.2,
  });

  const avionicsScreenMat = new THREE.MeshBasicMaterial({
    color: 0x0284c7, // Glowing cyan glass display
  });

  const avionicsGreenMat = new THREE.MeshBasicMaterial({
    color: 0x10b981, // Glowing emerald HUD symbology
  });

  // ==========================================
  // A. PILOT BUCKET SEAT
  // ==========================================
  const seatGroup = new THREE.Group();
  
  // Seat backrest
  const backrestGeo = new THREE.BoxGeometry(0.08, 0.26, 0.22);
  const backrestMesh = new THREE.Mesh(backrestGeo, seatMat);
  backrestMesh.position.set(-0.11, 0.09, 0);
  seatGroup.add(backrestMesh);

  // Seat headrest
  const headrestGeo = new THREE.BoxGeometry(0.07, 0.1, 0.15);
  const headrestMesh = new THREE.Mesh(headrestGeo, seatMat);
  headrestMesh.position.set(-0.09, 0.25, 0);
  seatGroup.add(headrestMesh);

  // Seat base
  const seatBaseGeo = new THREE.BoxGeometry(0.18, 0.06, 0.22);
  const seatBaseMesh = new THREE.Mesh(seatBaseGeo, seatMat);
  seatBaseMesh.position.set(-0.04, -0.04, 0);
  seatGroup.add(seatBaseMesh);

  pilotRoot.add(seatGroup);

  // ==========================================
  // B. TORSO & SIGNATURE SHIRT (Ayushman's Look)
  // ==========================================
  const torsoGroup = new THREE.Group();

  // Main torso in sky-blue shirt
  const torsoGeo = new THREE.CylinderGeometry(0.085, 0.095, 0.17, 16);
  torsoGeo.scale(1.0, 1.0, 1.25);
  const torsoMesh = new THREE.Mesh(torsoGeo, shirtMat);
  torsoMesh.position.set(0, 0.04, 0);
  torsoGroup.add(torsoMesh);

  // Shirt Collar (V-neck button down collar)
  const collarLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.035), shirtCollarMat);
  collarLeft.position.set(0.045, 0.115, 0.035);
  collarLeft.rotation.set(-0.25, 0.2, -0.4);
  torsoGroup.add(collarLeft);

  const collarRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.035), shirtCollarMat);
  collarRight.position.set(0.045, 0.115, -0.035);
  collarRight.rotation.set(0.25, -0.2, -0.4);
  torsoGroup.add(collarRight);

  // Gold Aerospace Wings Pin on chest
  const pinGeo = new THREE.BoxGeometry(0.015, 0.01, 0.035);
  const pinMesh = new THREE.Mesh(pinGeo, goldPinMat);
  pinMesh.position.set(0.08, 0.07, 0.05);
  torsoGroup.add(pinMesh);

  // Pilot Safety Harness Straps
  const strapLeft = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.16, 0.025), harnessMat);
  strapLeft.position.set(0.05, 0.04, 0.042);
  strapLeft.rotation.z = -0.08;
  torsoGroup.add(strapLeft);

  const strapRight = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.16, 0.025), harnessMat);
  strapRight.position.set(0.05, 0.04, -0.042);
  strapRight.rotation.z = -0.08;
  torsoGroup.add(strapRight);

  // Chrome Central Harness Rotary Buckle
  const buckleGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.012, 16);
  buckleGeo.rotateZ(Math.PI / 2);
  const buckleMesh = new THREE.Mesh(buckleGeo, buckleMat);
  buckleMesh.position.set(0.078, 0.03, 0);
  torsoGroup.add(buckleMesh);

  pilotRoot.add(torsoGroup);

  // ==========================================
  // C. ARMS & HANDS HOLDING FLIGHT CONTROLS
  // ==========================================
  const armsGroup = new THREE.Group();

  // Left & Right Arms (sky-blue sleeves reaching forward to yoke)
  [-0.095, 0.095].forEach((zOffset, idx) => {
    // Upper arm
    const upperArmGeo = new THREE.CylinderGeometry(0.03, 0.028, 0.11, 12);
    const upperArm = new THREE.Mesh(upperArmGeo, shirtMat);
    upperArm.position.set(0.02, 0.03, zOffset);
    upperArm.rotation.set(idx === 0 ? 0.2 : -0.2, 0, -0.6);
    armsGroup.add(upperArm);

    // Forearm
    const forearmGeo = new THREE.CylinderGeometry(0.027, 0.024, 0.1, 12);
    const forearm = new THREE.Mesh(forearmGeo, shirtMat);
    forearm.position.set(0.08, 0.02, zOffset * 0.7);
    forearm.rotation.set(idx === 0 ? 0.35 : -0.35, 0, -1.25);
    armsGroup.add(forearm);

    // Cute Stylized Hand gripping yoke
    const handGeo = new THREE.SphereGeometry(0.025, 12, 12);
    handGeo.scale(1.2, 0.8, 0.9);
    const handMesh = new THREE.Mesh(handGeo, skinMat);
    handMesh.position.set(0.14, 0.02, zOffset * 0.45);
    armsGroup.add(handMesh);
  });

  pilotRoot.add(armsGroup);

  // ==========================================
  // D. HEAD, STYLIZED HAIR, BEARD & GLASSES (AYUSHMAN)
  // ==========================================
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.18, 0); // Positioned comfortably above torso

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.036, 0.04, 0.06, 12);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.set(0, -0.035, 0);
  headGroup.add(neckMesh);

  // Head Base (Charming rounded stylized head)
  const headGeo = new THREE.SphereGeometry(0.086, 24, 24);
  headGeo.scale(1.0, 1.06, 0.96);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headGroup.add(headMesh);

  // Stylized Nose
  const noseGeo = new THREE.ConeGeometry(0.016, 0.032, 12);
  noseGeo.rotateZ(-Math.PI / 2);
  const noseMesh = new THREE.Mesh(noseGeo, skinMat);
  noseMesh.position.set(0.088, -0.005, 0);
  headGroup.add(noseMesh);

  // Eyes (Expressive Pixar cartoon style)
  [-0.033, 0.033].forEach((zEye) => {
    // Sclera (White)
    const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.019, 12, 12), eyeWhiteMat);
    eyeWhite.scale.set(0.6, 1.0, 1.0);
    eyeWhite.position.set(0.076, 0.014, zEye);
    headGroup.add(eyeWhite);

    // Dark Brown Iris / Pupil
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.011, 10, 10), eyeIrisMat);
    iris.scale.set(0.4, 1.0, 1.0);
    iris.position.set(0.086, 0.014, zEye);
    headGroup.add(iris);

    // Cute specular twinkle highlight
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.0035, 8, 8), eyeHighlightMat);
    glint.position.set(0.091, 0.018, zEye + 0.003);
    headGroup.add(glint);

    // Eyebrow (neat modern arch)
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.006, 0.028), hairMat);
    brow.position.set(0.078, 0.036, zEye);
    brow.rotation.z = -0.15;
    headGroup.add(brow);
  });

  // ==========================================
  // AYUSHMAN'S BEARD & MOUSTACHE (From profile.jpg)
  // ==========================================
  // Trimmed Moustache right under nose
  const stacheGeo = new THREE.BoxGeometry(0.015, 0.01, 0.046);
  const stacheMesh = new THREE.Mesh(stacheGeo, beardMat);
  stacheMesh.position.set(0.083, -0.024, 0);
  headGroup.add(stacheMesh);

  // Jawline & Chin Trim Beard (accurately matching his photo)
  const beardJawGeo = new THREE.TorusGeometry(0.065, 0.016, 10, 18, Math.PI * 0.85);
  beardJawGeo.rotateZ(Math.PI / 1.7);
  beardJawGeo.rotateX(Math.PI / 2);
  const beardJawMesh = new THREE.Mesh(beardJawGeo, beardMat);
  beardJawMesh.position.set(0.02, -0.042, 0);
  headGroup.add(beardJawMesh);

  // Chin beard puff
  const chinBeardGeo = new THREE.SphereGeometry(0.03, 12, 12);
  chinBeardGeo.scale(1.1, 0.7, 1.1);
  const chinBeardMesh = new THREE.Mesh(chinBeardGeo, beardMat);
  chinBeardMesh.position.set(0.068, -0.055, 0);
  headGroup.add(chinBeardMesh);

  // ==========================================
  // AYUSHMAN'S SIGNATURE HAIR (From profile.jpg)
  // Voluminous side-swept pompadour quiff
  // ==========================================
  const hairGroup = new THREE.Group();

  // Skull cap hair base (covering back and sides)
  const hairBaseGeo = new THREE.SphereGeometry(0.092, 18, 18, 0, Math.PI * 2, 0, Math.PI * 0.65);
  const hairBaseMesh = new THREE.Mesh(hairBaseGeo, hairMat);
  hairBaseMesh.position.set(-0.008, 0.02, 0);
  hairBaseMesh.rotation.x = Math.PI;
  hairGroup.add(hairBaseMesh);

  // Signature Pompadour Crest (Swept up and backward with rich volume)
  const crestGeo = new THREE.SphereGeometry(0.075, 16, 16);
  crestGeo.scale(1.25, 0.75, 1.15);
  const crestMesh = new THREE.Mesh(crestGeo, hairMat);
  crestMesh.position.set(0.022, 0.076, 0.005);
  crestMesh.rotation.set(-0.1, 0.05, -0.3);
  hairGroup.add(crestMesh);

  // Front Swept Quiff Lock (giving the high stylish front line from photo)
  const quiffGeo = new THREE.BoxGeometry(0.065, 0.038, 0.095);
  const quiffMesh = new THREE.Mesh(quiffGeo, hairMat);
  quiffMesh.position.set(0.055, 0.065, 0.008);
  quiffMesh.rotation.set(-0.12, 0.08, -0.55);
  hairGroup.add(quiffMesh);

  // Side taper hair volume
  const sideHairL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.02), hairMat);
  sideHairL.position.set(-0.01, 0.03, 0.082);
  hairGroup.add(sideHairL);

  const sideHairR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.02), hairMat);
  sideHairR.position.set(-0.01, 0.03, -0.082);
  hairGroup.add(sideHairR);

  headGroup.add(hairGroup);

  // ==========================================
  // AYUSHMAN'S GLASSES (From profile.jpg)
  // Thin frame with anti-reflective blue reflection
  // ==========================================
  const glassesGroup = new THREE.Group();

  [-0.033, 0.033].forEach((zEye) => {
    // Lens Frame (Sleek rim)
    const frameGeo = new THREE.TorusGeometry(0.022, 0.0032, 8, 20);
    frameGeo.rotateY(Math.PI / 2);
    const frameMesh = new THREE.Mesh(frameGeo, glassesFrameMat);
    frameMesh.position.set(0.088, 0.014, zEye);
    glassesGroup.add(frameMesh);

    // Blue-tint anti-reflective lens
    const lensGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.002, 16);
    lensGeo.rotateZ(Math.PI / 2);
    const lensMesh = new THREE.Mesh(lensGeo, glassesLensMat);
    lensMesh.position.set(0.088, 0.014, zEye);
    glassesGroup.add(lensMesh);
  });

  // Nose bridge between the lenses
  const bridgeGeo = new THREE.CylinderGeometry(0.0025, 0.0025, 0.028, 8);
  const bridgeMesh = new THREE.Mesh(bridgeGeo, glassesFrameMat);
  bridgeMesh.position.set(0.09, 0.016, 0);
  glassesGroup.add(bridgeMesh);

  // Side temples going back to ears
  [-0.048, 0.048].forEach((zSide) => {
    const templeGeo = new THREE.CylinderGeometry(0.002, 0.002, 0.08, 8);
    templeGeo.rotateZ(Math.PI / 2);
    const templeMesh = new THREE.Mesh(templeGeo, glassesFrameMat);
    templeMesh.position.set(0.045, 0.018, zSide);
    glassesGroup.add(templeMesh);
  });

  headGroup.add(glassesGroup);

  // ==========================================
  // AVIATION HEADSET (Pilot Gear)
  // ==========================================
  const headsetGroup = new THREE.Group();

  // Padded earcups on sides of head
  [-0.088, 0.088].forEach((zEar) => {
    const earpadGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.022, 16);
    earpadGeo.rotateX(Math.PI / 2);
    const earpad = new THREE.Mesh(earpadGeo, headsetMat);
    earpad.position.set(0, 0.015, zEar);
    headsetGroup.add(earpad);

    // Cyan accent ring
    const ringGeo = new THREE.TorusGeometry(0.028, 0.004, 8, 16);
    ringGeo.rotateY(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, headsetAccentMat);
    ring.position.set(0, 0.015, zEar + (zEar > 0 ? 0.008 : -0.008));
    headsetGroup.add(ring);
  });

  // Curved Headband arch over the hair
  const headbandGeo = new THREE.TorusGeometry(0.095, 0.008, 8, 24, Math.PI * 0.82);
  headbandGeo.rotateY(Math.PI / 2);
  headbandGeo.rotateZ(Math.PI * 0.09);
  const headband = new THREE.Mesh(headbandGeo, headsetMat);
  headband.position.set(-0.01, 0.02, 0);
  headsetGroup.add(headband);

  // Pilot Microphone Boom extending from left earpiece towards mouth
  const micBoomGeo = new THREE.CylinderGeometry(0.0025, 0.0025, 0.09, 8);
  micBoomGeo.rotateZ(Math.PI / 2.8);
  const micBoom = new THREE.Mesh(micBoomGeo, headsetMat);
  micBoom.position.set(0.045, -0.01, -0.078);
  headsetGroup.add(micBoom);

  // Foam microphone head
  const micTipGeo = new THREE.SphereGeometry(0.008, 8, 8);
  const micTip = new THREE.Mesh(micTipGeo, headsetMat);
  micTip.position.set(0.078, -0.022, -0.042);
  headsetGroup.add(micTip);

  headGroup.add(headsetGroup);

  pilotRoot.add(headGroup);

  // ==========================================
  // E. FLIGHT CONTROLS & AVIONICS DASHBOARD
  // ==========================================
  const cockpitFront = new THREE.Group();
  cockpitFront.position.set(0.18, 0, 0);

  // Slanted dashboard console
  const dashGeo = new THREE.BoxGeometry(0.12, 0.16, 0.28);
  const dashMesh = new THREE.Mesh(dashGeo, dashMat);
  dashMesh.position.set(0, 0.04, 0);
  dashMesh.rotation.z = -0.35; // Slanted towards pilot
  cockpitFront.add(dashMesh);

  // Primary Flight Display (PFD) - Cyan glowing avionics screen
  const pfdScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.065, 0.05), avionicsScreenMat);
  pfdScreen.position.set(-0.042, 0.09, -0.055);
  pfdScreen.rotation.set(0, -Math.PI / 2, 0.35);
  cockpitFront.add(pfdScreen);

  // Multi-Function Display (MFD) - Emerald glowing radar/horizon screen
  const mfdScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.065, 0.05), avionicsGreenMat);
  mfdScreen.position.set(-0.042, 0.09, 0.055);
  mfdScreen.rotation.set(0, -Math.PI / 2, 0.35);
  cockpitFront.add(mfdScreen);

  // Flight Control Column (Stick/Yoke)
  const yokeColGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8);
  const yokeCol = new THREE.Mesh(yokeColGeo, dashMat);
  yokeCol.position.set(-0.04, -0.01, 0);
  yokeCol.rotation.z = 0.25;
  cockpitFront.add(yokeCol);

  // Flight Yoke Steering Handles (Held by Ayushman's hands)
  const yokeHandleGeo = new THREE.TorusGeometry(0.038, 0.007, 8, 16, Math.PI * 0.9);
  yokeHandleGeo.rotateY(Math.PI / 2);
  yokeHandleGeo.rotateX(Math.PI / 2);
  const yokeHandle = new THREE.Mesh(yokeHandleGeo, headsetMat);
  yokeHandle.position.set(-0.04, 0.04, 0);
  cockpitFront.add(yokeHandle);

  pilotRoot.add(cockpitFront);

  // ==========================================
  // F. COCKPIT INTERIOR WARM ILLUMINATION
  // Gives Ayushman's face, hair & glasses a gorgeous golden glow
  // ensuring he is clearly visible through the glass canopy!
  // ==========================================
  const cockpitLight = new THREE.PointLight(0xfff3e0, 1.3, 1.5);
  cockpitLight.position.set(0.12, 0.22, 0);
  pilotRoot.add(cockpitLight);

  return pilotRoot;
}
