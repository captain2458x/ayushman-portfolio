import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, ChevronDown, ChevronUp, File, Download, ArrowLeft, ArrowUpRight } from 'lucide-react';
import SoundManager from '../utils/audio';
import TelemetryOverlay from './TelemetryOverlay';

interface ProjectImage {
  src: string;
  alt: string;
  title?: string;
  placeholder?: string;
}

interface ProjectCategory {
  id: string;
  label: string;
  images: ProjectImage[];
}

interface ReportDetail {
  label: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  featured: boolean;
  date?: string;
  bullets?: string[];
  images?: ProjectImage[];
  categories?: ProjectCategory[];
  isCadModels?: boolean;
  previewImage?: string;
  categoryTag?: string;
  badgeColor?: string;
  keyMetrics?: string[];
  telemetry?: {
    stressMax: string;
    forceName: string;
    thrustVal: string;
  };
  reportDetails?: ReportDetail[];
}

const projects: Project[] = [
  {
    id: 'quadcopter',
    title: 'Quadcopter UAV — Design, CFD & PID Flight Simulation',
    subtitle: 'Solo Project | FGIET Rae Bareli',
    description: 'A comprehensive, multi-physics engineering project involving the complete structural design, transient CFD analysis, and control loop formulation of an X-450 quadcopter to achieve stable flight dynamics and aerodynamic efficiency.',
    previewImage: '/projects/quadcopter/render_full.png',
    categoryTag: 'UAV · CFD & Aerodynamics',
    badgeColor: 'sky',
    keyMetrics: ['14N Thrust', '6000 RPM CFD', '4.296 MPa FEA'],
    tech: ['Fusion 360', 'ANSYS 2026 R1', 'ANSYS Fluent', 'CFD', 'MATLAB', 'Simulink', 'PID Control'],
    featured: true,
    date: 'Mar 2026 – Apr 2026',
    bullets: [
      'Designed complete X-450 quadcopter assembly in Fusion 360 — CFRP hub, arms, motor mounts, landing gear & 10×4.5 twisted aerofoil propellers',
      'Static Structural FEA in ANSYS under 14N motor thrust — Max Von Mises: 4.296 MPa | CFRP yield: 600 MPa | Safety Factor: ~140×',
      'ANSYS Fluent CFD on propeller at 6000 RPM (k-omega SST) — Lift Cl: 0.35 | Drag Cd: 0.095 | L/D: 3.68 | Max tip velocity: 41.4 m/s',
      'PID altitude controller in MATLAB Simulink — stable hover with <10% overshoot'
    ],
    categories: [
      {
        id: 'cad',
        label: 'CAD Geometry',
        images: [
          { src: '/projects/quadcopter/assembly_wireframe.png', title: 'X-450 Assembly Wireframe', alt: 'Quadcopter complete assembly wireframe in Fusion 360 highlighting carbon fiber frame arms, motor casing, and landing gear layout.', placeholder: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/multiview_cad.png', title: '4-View Engineering Orthographics', alt: 'Interactive multiview layout displaying orthographic projections (top, front, side) alongside isometric wireframe bounds.', placeholder: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/render_full.png', title: 'Fusion 360 Shaded 3D Rendering', alt: 'Fidelity 3D shaded model render illustrating precision clearance boundaries, spatial motor placements, and geometric symmetry.', placeholder: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/propeller_cad.png', title: '10x4.5 Aerofoil Propeller CAD', alt: 'Under-side view modeling profile of the 10x4.5 twisted propeller blade designed parametrically in Fusion 360.', placeholder: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/propeller_multiview.png', title: 'Propeller Manufacturing Drawings', alt: 'Bi-axial top and sweep sections of the propeller detailing hubs, twist profiles, and aerofoil sweep distribution curves.', placeholder: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' }
        ]
      },
      {
        id: 'fea',
        label: 'Structural FEA',
        images: [
          { src: '/projects/quadcopter/fea_stress.png', title: 'Equivalent von-Mises Stress Analysis', alt: 'ANSYS Static Structural stress profile under peak thrust forces (highest stress at arm roots: 4.296 MPa vs CFRP Yield limit: 600 MPa).', placeholder: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/fea_deformation.png', title: 'Total Deformation Displacement Plot', alt: 'Deflection contours indicating absolute structural deflection limits safely localized at blades (Max deflection: 0.75 mm).', placeholder: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' }
        ]
      },
      {
        id: 'cfd',
        label: 'Aerodynamic CFD',
        images: [
          { src: '/projects/quadcopter/cfd_vectors.png', title: 'Rotor-Domain Boundary Velocity Vectors', alt: 'Rotative boundary fluid velocity vector flow lines within rotating domain at 6000 RPM in ANSYS Fluent.', placeholder: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/cfd_planar_vectors.png', title: 'Propeller Plane Velocity Magnitude Plot', alt: '2D plane vectors colored by speed capturing downwash acceleration layers (reaches peak blade tip speed of 41.4 m/s).', placeholder: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/cfd_pressure.png', title: 'Blade Static Pressure Contour Mapping', alt: 'Airflow static pressure field indicating suction boundaries over upper blade walls and positive lift pressure underneath.', placeholder: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/cfd_volumetric.png', title: 'Volumetric Jet-Wash Streamlines', alt: 'Complete 3D particle streamline vectors tracking rotor wake vortical zones and downwash jet profiles surrounding blades.', placeholder: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' }
        ]
      },
      {
        id: 'perf',
        label: 'Curves & Logs',
        images: [
          { src: '/projects/quadcopter/plot_lift.png', title: 'Lift Coefficient (Cl) Convergence', alt: 'ANSYS Fluent convergence monitor showing Lift Coefficient (Cl) stabilizing cleanly around Cl: 0.35 over 300 iterations.', placeholder: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/plot_drag.png', title: 'Drag Coefficient (Cd) Convergence', alt: 'ANSYS Fluent convergence monitor showing Drag Coefficient (Cd) stabilizing cleanly around Cd: 0.095 over 300 iterations.', placeholder: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/plot_residuals.png', title: 'Solver Convergence Residuals Monitor', alt: 'Fluent residuals logging confirming robust algebraic convergence meeting 1e-6 error limits across all key equations.', placeholder: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/quadcopter/force_report.png', title: 'ANSYS Fluent Raw Forces Report', alt: 'Console report printout detailing computed net forces, direction vectors, viscous moments, and final trust validation coefficients.', placeholder: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80' }
        ]
      }
    ],
    telemetry: {
      stressMax: '4.296 MPa',
      forceName: 'THRUST',
      thrustVal: '14.0 N'
    },
    reportDetails: [
      { label: 'Rotor Layout', value: '10x4.5 twisted aerofoil' },
      { label: 'Test RPM Rate', value: '6000 RPM boundary' },
      { label: 'Max von-Mises', value: '4.296 MPa' },
      { label: 'CFRP Yield Limit', value: '600 MPa range' },
      { label: 'Drag Coefficient', value: 'Cd = 0.095 (CFD verified)' },
      { label: 'Lift Coefficient', value: 'Cl = 0.35 (CFD verified)' },
      { label: 'Peak Tip Speed', value: '41.4 m/s limits' },
      { label: 'PID Overshoot', value: '< 10% (MATLAB solver)' }
    ]
  },
  {
    id: 'cubesat',
    title: 'CubeSat Structure Design & Thermal Analysis — LEO Mission',
    subtitle: 'Solo Project | FGIET Rae Bareli',
    description: 'An aerospace simulation mapping the design, structural limits under launch loads, and radiative thermal environment of a 1U CubeSat orbiting in LEO, validated by trajectory ground track simulation in MATLAB.',
    previewImage: '/projects/cubesat/cubesat_assembly.png',
    categoryTag: 'Space Tech · Thermal FEA',
    badgeColor: 'violet',
    keyMetrics: ['10g Launch Load', '+120°C / -100°C Thermal', 'LEO Orbit'],
    tech: ['Fusion 360', 'ANSYS Workbench 2025 R2', 'MATLAB', 'Thermal FEA', 'Orbital Mechanics'],
    featured: true,
    date: 'Jan 2026 – Feb 2026',
    bullets: [
      'Designed 1U CubeSat (10×10×10 cm) modular assembly in Fusion 360 with structural rails and solar panel placement',
      'Structural FEA under 10g launch load — Max Von Mises: 6.55×10⁻⁴ MPa | Safety Factor: ~420,000×',
      'Thermal analysis — Hot case: +120.39°C | Cold case (eclipse): -100°C uniform distribution',
      'MATLAB orbital simulation — Velocity: 7.62 km/s | Period: 94.47 min | 15.2 orbits/day | 3-orbit ground track'
    ],
    categories: [
      {
        id: 'cad',
        label: 'CAD Geometry',
        images: [
          { src: '/projects/cubesat/cubesat_assembly.png', title: '1U CubeSat CAD Assembly', alt: 'Modular 1U CubeSat (10x10x10 cm) structural assembly designed in Fusion 360 featuring aluminum alloy rails, side plates, and bolt fixtures.', placeholder: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' }
        ]
      },
      {
        id: 'fea',
        label: 'Structural FEA',
        images: [
          { src: '/projects/cubesat/fea_mesh.png', title: 'Finite Element Mesh Grid', alt: 'Dual quad-dominant meshing layout of the CubeSat structural frame in ANSYS Mechanical for localized stress computations.', placeholder: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/cubesat/fea_stress.png', title: 'von-Mises Stress Analysis', alt: 'Stress contours under 10g launch loads indicating absolute structural yield boundaries (Max stress: 6.55e-4 MPa vs Al-alloy Yield limit).', placeholder: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/cubesat/fea_deformation.png', title: 'Total Structural Deformation', alt: 'Deflection displacement contour rendering absolute safe structural limits (Max deflection displacement: 1.63e-6 mm).', placeholder: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/cubesat/fea_strain.png', title: 'Equivalent Elastic Strain', alt: 'Strain contour profiling confirming uniform stress distribution across structural frame boundaries and bolts.', placeholder: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80' }
        ]
      },
      {
        id: 'thermal',
        label: 'Thermal Analysis',
        images: [
          { src: '/projects/cubesat/thermal_hot.png', title: 'Steady-State Hot Case Temp', alt: 'Radiative heating profile under direct solar exposure in Low Earth Orbit showing peak frame temperatures of +120.39°C.', placeholder: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/cubesat/thermal_cold.png', title: 'Steady-State Cold Case Temp', alt: 'Radiation cooling profile inside Earth shadow eclipse showing uniform cold boundaries of -100.0°C.', placeholder: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' }
        ]
      }
    ],
    telemetry: {
      stressMax: '6.55e-4 MPa',
      forceName: 'LAUNCH_ACC',
      thrustVal: '10.0 G'
    },
    reportDetails: [
      { label: 'Dimensions', value: '1U (10×10×10 cm)' },
      { label: 'Launch Load', value: '10g acceleration' },
      { label: 'Max von-Mises', value: '6.55e-4 MPa' },
      { label: 'Thermal Hot case', value: '+120.39°C limit' },
      { label: 'Thermal Cold case', value: '-100.00°C eclipse' },
      { label: 'Orbital Altitude', value: 'Low Earth Orbit (LEO)' },
      { label: 'Orbital Period', value: '94.47 minutes' },
      { label: 'Orbits per day', value: '15.2 ground tracks' }
    ]
  },
  {
    id: 'cardioguard',
    title: 'CardioGuard – Aviator & High-G Biometric Telemetry System',
    subtitle: 'Avionics & Telemetry Project | Kalam Pragati Internship',
    description: 'A wearable bio-telemetry system developed for high-stress aerospace environments to monitor pilot and crew physiological vitals in real time, featuring integrated ECG/SpO2 sensor logging, telemetry dashboards, Telegram emergency distress signals, and a custom 3D-printed enclosure modeled in Onshape.',
    previewImage: '/projects/cardioguard/1757696137634.jpg',
    categoryTag: 'Avionics & Telemetry',
    badgeColor: 'rose',
    keyMetrics: ['ESP8266 IoT', 'AD8232 ECG', '3D Printed Enclosure'],
    tech: ['ESP8266', 'Avionics Telemetry', 'AD8232 ECG', 'MAX30102', 'ThingSpeak', 'Onshape CAD', 'Rapid Prototyping'],
    featured: true,
    date: 'Aug 2025 – Sep 2025',
    bullets: [
      'Engineered wearable bio-telemetry unit using AD8232 ECG + MAX30102 pulse oximetry sensors for real-time stress & vitals transmission',
      'Designed compact form-factor casing in Onshape — fabricated via additive manufacturing (3D printing) and validated under continuous sensor streaming'
    ],
    images: [
      { src: '/projects/cardioguard/1757696137634.jpg', alt: 'Hardware prototype front view' },
      { src: '/projects/cardioguard/circuit.jpg', alt: 'Circuit wiring and sensors' },
      { src: '/projects/cardioguard/thingskepak.jpg', alt: 'ThingSpeak dashboard with vitals' },
      { src: '/projects/cardioguard/1757696150800.jpg', alt: 'Figma UI prototype Screenshot' },
      { src: '/projects/cardioguard/1757696179914.jpg', alt: 'Telegram alert message' }
    ],
    telemetry: {
      stressMax: '3.3V Low-Power',
      forceName: 'HR_PULSE',
      thrustVal: '60-100 BPM'
    }
  },
  {
    id: 'pipeflow',
    title: 'ANSYS Mastery — Sudden Contraction Pipe Flow Simulation',
    subtitle: 'Solo Project | ANSYS CFD Mastery',
    description: 'A comprehensive, transient CFD analysis modeling the flow dynamics, velocity acceleration, and pressure distribution of an incompressible fluid through a pipe experiencing a sudden cross-sectional area contraction.',
    previewImage: '/projects/pipeflow/streamlines_3d.png',
    categoryTag: 'CFD · Fluid Dynamics',
    badgeColor: 'amber',
    keyMetrics: ['8.16 m/s Velocity', '164 Iters Converged', 'ANSYS Fluent'],
    tech: ['ANSYS Workbench', 'ANSYS Fluent', 'CFD-Post', 'Fluid Dynamics', 'Mesh Optimization'],
    featured: true,
    date: 'Jun 2026',
    bullets: [
      'Modeled 3D axisymmetric pipe geometry with sudden diameter contraction (e.g. from 80 mm to 40 mm)',
      'Generated a structured quad grid with localized refinements near the contraction plane to capture high velocity gradients and boundary layer separation',
      'Validated solver convergence at 164 iterations, successfully securing algebraic residuals well below the 1e-6 error tolerance limits',
      'Extracted pathlines and 3D streamlines highlighting significant velocity acceleration from 0.14 m/s at the inlet to 8.16 m/s at the contraction throat'
    ],
    categories: [
      {
        id: 'cfd',
        label: 'Flow Streamlines',
        images: [
          { src: '/projects/pipeflow/streamlines_3d.png', title: '3D CFD-Post Velocity Streamlines', alt: '3D streamlines colored by velocity magnitude demonstrating flow acceleration and particle trajectories through the sudden contraction.', placeholder: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
          { src: '/projects/pipeflow/pathlines_velocity.png', title: 'Velocity Pathlines Contour', alt: 'Detailed velocity magnitude pathlines showing acceleration up to 8.16 m/s in the narrow section of the pipe.', placeholder: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' }
        ]
      },
      {
        id: 'animation',
        label: 'Flow Animation',
        images: [
          { src: '/projects/pipeflow/simulation_video.mp4', title: 'Transient Flow Simulation Recording', alt: 'High-fidelity video recording of the transient flow streamline animation showing fluid acceleration in ANSYS Fluent.', placeholder: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' }
        ]
      },
      {
        id: 'convergence',
        label: 'Solver Logs',
        images: [
          { src: '/projects/pipeflow/residuals_convergence.png', title: 'Algebraic Solver Residuals & Convergence', alt: 'Fluent solver console logging confirming complete convergence of continuity and velocity equations at 164 iterations.', placeholder: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' }
        ]
      }
    ],
    telemetry: {
      stressMax: '164 Iters',
      forceName: 'MAX_VEL',
      thrustVal: '8.16 m/s'
    },
    reportDetails: [
      { label: 'Inlet Diameter', value: '80 mm' },
      { label: 'Outlet Diameter', value: '40 mm' },
      { label: 'Max Velocity', value: '8.16 m/s (Fluent verified)' },
      { label: 'Min Velocity', value: '0.14 m/s (Fluent verified)' },
      { label: 'Convergence Rate', value: '164 iterations (1e-6 error limit)' },
      { label: 'Solver Model', value: 'Laminar / Incompressible' },
      { label: 'Mesh Elements', value: 'Structured Quad Grid' },
      { label: 'Post-Process Software', value: 'ANSYS CFD-Post / Fluent Viewer' }
    ]
  },
  {
    id: 'cad-models',
    title: 'Aerospace CAD Models',
    description: 'Parametric 3D models of aerospace components designed for simulation and manufacturing purposes using Onshape, AutoCAD, and SolidWorks.',
    previewImage: '/projects/quadcopter/multiview_cad.png',
    categoryTag: 'Parametric CAD & Repositories',
    badgeColor: 'indigo',
    keyMetrics: ['40+ CAD Files', 'SolidWorks Assemblies', 'AutoCAD DWG'],
    tech: ['Onshape', 'AutoCAD', 'SolidWorks'],
    featured: false,
    isCadModels: true,
  },
  {
    id: 'matlab-dynamics',
    title: 'MATLAB Flight Dynamics',
    description: 'Simulated basic longitudinal dynamics and aircraft response to analyze stability and control characteristics using MATLAB & Simulink.',
    previewImage: '/projects/quadcopter/plot_residuals.png',
    categoryTag: 'Flight Dynamics & Control',
    badgeColor: 'sky',
    keyMetrics: ['Longitudinal Modes', 'State-Space', 'Root-Locus'],
    tech: ['MATLAB', 'Simulink', 'Flight Dynamics'],
    featured: false,
    bullets: [
      'Simulated short-period and phugoid modes of aircraft to determine dynamic stability boundaries.',
      'Developed Simulink control loops using PID tuning algorithms to achieve robust attitude stabilization.',
      'Generated transfer functions and state-space models to analyze eigenvalue trajectories and root-locus dynamics.'
    ]
  },
  {
    id: 'laser-cut-panel',
    title: 'Laser-cut Avionics Panel',
    description: 'Miniature avionics panel with precision-engraved labels using laser cutting technology, designed in AutoCAD for rapid prototyping.',
    previewImage: '/projects/quadcopter/propeller_multiview.png',
    categoryTag: 'Avionics Prototyping',
    badgeColor: 'emerald',
    keyMetrics: ['AutoCAD 2D Prints', 'Laser Engraved', 'Acrylic Mockups'],
    tech: ['AutoCAD', 'Laser Cutting', 'Prototyping'],
    featured: false,
    bullets: [
      'Drafted precision 2D CAD engineering prints for instrument mounting hole clearances in AutoCAD.',
      'Configured vector feeds and speeds for high-accuracy laser cutting and deep-label etching.',
      'Successfully manufactured clean acrylic dashboard templates for flight simulation system mockups.'
    ]
  }
];

const cadFolders = [
  {
    id: 'solidworks',
    label: 'SolidWorks Parts',
    path: 'solidworks parts',
    files: [
      { name: 'Actual assemble sheet and stand.SLDASM', size: '237.8 KB' },
      { name: 'FGIET 2.1.SLDPRT', size: '816.1 KB' },
      { name: 'FGIET 2.1.STL', size: '396.6 KB' },
      { name: 'FGP 2.1.SLDPRT', size: '500.0 KB' },
      { name: 'FGP 2.1.STL', size: '229.6 KB' },
      { name: 'Flower box.SLDPRT', size: '232.3 KB' },
      { name: 'GYAN SIR 2.SLDPRT', size: '580.1 KB' },
      { name: 'GYAN SIR.STL', size: '304.7 KB' },
      { name: 'Lamp cover plate back.SLDPRT', size: '620.6 KB' },
      { name: 'Lamp cover plate back.SLDPRT 1.1.SLDPRT', size: '622.1 KB' },
      { name: 'Lamp cover plate back.SLDPRT 1.1.STL', size: '233.0 KB' },
      { name: 'NANDINI MAM.SLDPRT', size: '426.9 KB' },
      { name: 'SIDDIMA MAAM.SLDPRT', size: '194.2 KB' },
      { name: 'SONI MAAM.SLDPRT', size: '162.9 KB' },
      { name: 'SONI MAAM.STL', size: '49.5 KB' },
      { name: 'Verma Sir.STL', size: '77.5 KB' },
      { name: 'lamp cover plate front.SLDPRT', size: '147.7 KB' },
      { name: 'lamp cover plate front.SLDPRT 1.2.SLDPRT', size: '835.2 KB' },
      { name: 'lamp cover plate front.SLDPRT 1.2.STL', size: '376.4 KB' },
      { name: 'truck.SLDPRT', size: '1.05 MB' },
      { name: 'uper body.SLDPRT', size: '49.2 KB' },
      { name: 'buttom body 2.SLDPRT', size: '57.0 KB' },
      { name: 'buttom body.SLDPRT', size: '56.6 KB' },
      { name: 'side body 1.SLDPRT', size: '90.4 KB' },
      { name: 'side body 2.SLDPRT', size: '90.8 KB' }
    ]
  },
  {
    id: 'autocad',
    label: 'AutoCAD Drawings',
    path: 'autocad',
    files: [
      { name: 'Drawing1.dwg', size: '33.0 KB' },
      { name: 'Drawing2.dwg', size: '32.1 KB' },
      { name: 'Drawing3.dwg', size: '38.1 KB' },
      { name: 'Drawing4.dwg', size: '36.3 KB' },
      { name: 'Drawing5.dwg', size: '36.7 KB' },
      { name: 'Drawing6.dwg', size: '38.9 KB' },
      { name: 'Drawing7.dwg', size: '37.9 KB' },
      { name: 'Drawing8.dwg', size: '38.1 KB' },
      { name: 'Drawing9.dwg', size: '33.7 KB' },
      { name: 'Drawing10.dwg', size: '34.5 KB' },
      { name: 'Drawing15.dwg', size: '37.5 KB' },
      { name: 'Drawing16.dwg', size: '40.9 KB' },
      { name: 'Drawing17.dwg', size: '41.4 KB' },
      { name: 'Drawing18.dwg', size: '42.0 KB' },
      { name: 'Drawing19.dwg', size: '40.7 KB' },
      { name: 'Drawing20.dwg', size: '32.7 KB' },
      { name: 'Drawing21.dwg', size: '42.0 KB' },
      { name: 'Drawing22.dwg', size: '37.6 KB' },
      { name: 'Drawing23.dwg', size: '36.7 KB' },
      { name: 'Drawing25.dwg', size: '37.8 KB' },
      { name: 'Drawing26.dwg', size: '34.7 KB' },
      { name: 'Drawing27.dwg', size: '37.0 KB' },
      { name: 'Drawing28.dwg', size: '42.3 KB' },
      { name: 'Drawing29.dwg', size: '33.3 KB' },
      { name: 'Drawing30.dwg', size: '38.0 KB' },
      { name: 'Drawing31.dwg', size: '33.1 KB' },
      { name: 'Drawing32.dwg', size: '37.0 KB' },
      { name: 'Drawing33.dwg', size: '38.8 KB' }
    ]
  },
  {
    id: 'fusion360',
    label: 'Fusion 360 Models',
    path: 'fusion 360',
    files: [
      { name: 'cubsat.step', size: '34.1 KB' },
      { name: 'design 1.step', size: '12.4 KB' },
      { name: '3.step', size: '310.2 KB' },
      { name: 'Untitled.step', size: '157.9 KB' },
      { name: 'Untitled1.step', size: '15.3 KB' },
      { name: 'Untitled2.step', size: '12.4 KB' },
      { name: 'Untitled3.step', size: '12.4 KB' },
      { name: 'Untitled4.step', size: '25.0 KB' },
      { name: 'Untitled5.step', size: '28.6 KB' }
    ]
  },
  {
    id: 'rapid',
    label: 'Rapid Prototyping (STL/DXF)',
    path: 'prototype rapid aktu',
    files: [
      { name: '3d.stl', size: '521.3 KB' },
      { name: 'BASE v3.dxf', size: '90.5 KB' },
      { name: 'Chasis v1.dxf', size: '433.6 KB' },
      { name: 'Chasis v2.dxf', size: '433.6 KB' },
      { name: 'Chassis_ILLUMIN-8.dxf', size: '50.2 KB' },
      { name: 'HANDLE.dxf', size: '57.9 KB' },
      { name: 'Heart Beat.gcode.3mf', size: '211.9 KB' },
      { name: 'ILLUMIN-8.dxf', size: '120.5 KB' },
      { name: 'MeArmV0.4.dxf', size: '604.2 KB' },
      { name: 'MeArmV0.4 ashutosh.dxf', size: '604.2 KB' },
      { name: 'Part Studio 1.stl', size: '36.9 KB' },
      { name: 'Part Studio 1 (1).stl', size: '641.2 KB' },
      { name: 'Part Studio 1 (2).stl', size: '68.7 KB' },
      { name: 'Part Studio 1 (3).stl', size: '163.8 KB' },
      { name: 'Part Studio 1 - Part 4.stl', size: '14.5 KB' },
      { name: 'Part Studio 1 - Part 4.3mf', size: '27.9 KB' },
      { name: 'Part Studio 2.stl', size: '97.1 KB' },
      { name: 'Part Studio 2 - Part 6 right.dxf', size: '55.3 KB' },
      { name: 'Part Studio 2 - Part 6 shivam.dxf', size: '55.3 KB' },
      { name: 'Part Studio 2 - Part 7 chusil.dxf', size: '56.8 KB' },
      { name: 'Part Studio 3.stl', size: '806.3 KB' },
      { name: 'Part Studio 3 - Part 1.dxf', size: '120.4 KB' },
      { name: 'Part Studio 4.stl', size: '893.3 KB' },
      { name: 'Part Studio 5.stl', size: '185.1 KB' },
      { name: 'Part Studio 6.stl', size: '3.98 MB' },
      { name: 'Part Studio 6.3mf', size: '3.32 MB' },
      { name: 'TEAM 9 SOLUTION SQUAD.stl', size: '1.17 MB' },
      { name: 'TOP v3.dwg', size: '261.9 KB' },
      { name: 'TOP v3.dwf', size: '21.1 KB' },
      { name: 'TOP v5 v1.dxf', size: '153.4 KB' },
      { name: 'cover1.stl', size: '147.6 KB' },
      { name: 'cover1.3mf', size: '62.0 KB' },
      { name: 'laser cut.dxf', size: '1.3 KB' },
      { name: 'team 3.dxf', size: '61.8 KB' }
    ]
  }
];

interface ProjectsProps {
  viewMode?: 'teaser' | 'full';
  onViewProject?: (projectId: string) => void;
  onViewAll?: () => void;
  onBack?: () => void;
  targetProjectId?: string;
}

export default function Projects({ viewMode = 'full', onViewProject, onViewAll, onBack, targetProjectId }: ProjectsProps) {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  const teaserProjects = projects.filter(p => p.featured || p.id === 'cad-models');
  
  // State for non-categorized images (maps project list indices securely)
  const [activeImages, setActiveImages] = React.useState<Record<number, number>>({});
  
  // State parameters for Interactive Workstations
  const [activeCatIds, setActiveCatIds] = React.useState<Record<number, string>>({});
  const [activeImgIdxs, setActiveImgIdxs] = React.useState<Record<number, number>>({});
  const [assetSources, setAssetSources] = React.useState<Record<number, 'preview' | 'local'>>({});
  const [localLoadErrors, setLocalLoadErrors] = React.useState<Record<number, boolean>>({});

  // State for expandable noteworthy cards
  const [expandedCard, setExpandedCard] = React.useState<number | null>(null);
  
  // State for expandable featured projects
  const [expandedFeatured, setExpandedFeatured] = React.useState<Record<number, boolean>>({});
  
  // State for selected folder in CAD model explorer
  const [activeFolderId, setActiveFolderId] = React.useState('solidworks');

  // Auto-scroll to target project when opened in full view
  useEffect(() => {
    if (viewMode === 'full') {
      const params = new URLSearchParams(window.location.search);
      const target = targetProjectId || params.get('id') || window.location.hash.replace('#', '').replace('project-', '');
      if (target) {
        setTimeout(() => {
          const el = document.getElementById(`project-${target}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    }
  }, [viewMode, targetProjectId]);

  if (viewMode === 'teaser') {
    return (
      <motion.section 
        id="projects" 
        className="scroll-mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 uppercase">
                05. PORTFOLIO SHOWCASE
              </span>
              <span className="text-slate-400 text-xs font-mono">// AEROSPACE WORKSTATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Featured Aerospace Projects
            </h2>
            <p className="text-slate-600 text-sm font-sans mt-1 max-w-2xl">
              Click any project preview to enter the dedicated interactive workstation with CAD models, CFD streamlines, and FEA stress contours.
            </p>
          </div>

          <button
            onClick={() => {
              SoundManager.playClick();
              if (onViewAll) onViewAll();
            }}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-mono text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
          >
            <span>View All Projects</span>
            <span className="text-sm">➔</span>
          </button>
        </div>

        {/* 5 Project Image Preview Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {teaserProjects.map((project) => {
            const dotColor = 
              project.badgeColor === 'violet' ? 'bg-indigo-500' :
              project.badgeColor === 'rose' ? 'bg-rose-500' :
              project.badgeColor === 'amber' ? 'bg-amber-500' :
              project.badgeColor === 'indigo' ? 'bg-blue-600' :
              'bg-sky-500';

            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  SoundManager.playClick();
                  if (onViewProject) {
                    onViewProject(project.id);
                  } else if (onViewAll) {
                    onViewAll();
                  }
                }}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Image Header with Aspect-Video */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-100">
                  <img
                    src={project.previewImage || project.images?.[0]?.src}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/800/450`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70"></div>
                  
                  {/* Category Pill floating on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[10px] font-mono font-bold shadow-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                    <span className="text-slate-800 uppercase tracking-wider">{project.categoryTag}</span>
                  </div>

                  {/* Corner Action Arrow */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all shadow-xs">
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Date badge on bottom-right of image */}
                  {project.date && (
                    <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-200 border border-white/10">
                      {project.date.split('–')[0].trim()}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow text-left">
                  <div className="text-[11px] font-mono text-slate-500 mb-1.5">{project.subtitle}</div>
                  
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Key Engineering Telemetry Badges */}
                  {project.keyMetrics && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.keyMetrics.map((metric, mIdx) => (
                        <span 
                          key={mIdx}
                          className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/90 text-slate-700"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech stack & Action Row */}
                  <div className="flex flex-wrap gap-1 font-mono text-[9px] text-slate-500 mt-auto pt-3.5 border-t border-slate-100 items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/70 text-slate-600 font-medium">{t}</span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-slate-400 self-center">+{project.tech.length - 3}</span>
                      )}
                    </div>

                    <span className="text-sky-600 font-mono text-[11px] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                      <span>View Full Project</span>
                      <span>➔</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supersonic Launch Hangar Banner */}
        <div className="mt-12 bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="space-y-1.5 text-center md:text-left z-10">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sky-600 font-mono text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span>COMPLETE AEROSPACE WORKSTATIONS DECK</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Need in-depth simulation curves, FEA stress plots & CAD files?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-xl">
              Enter the dedicated project deck to interact with full-resolution CAD geometry, 6000 RPM velocity vectors, flight telemetry overlays, and download 40+ CAD models.
            </p>
          </div>

          <button
            onClick={() => {
              SoundManager.playFlyby();
              if (onViewAll) onViewAll();
            }}
            className="z-10 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 shrink-0 cursor-pointer active:scale-95"
          >
            <span>Open Dedicated Projects Deck</span>
            <span className="text-sm">➔</span>
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="projects" 
      className="scroll-mt-24 space-y-8 sm:space-y-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Dedicated Project Deck Top Navigation Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xs space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              SoundManager.playClick();
              if (onBack) onBack();
              else window.location.href = '/#projects';
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
          >
            <ArrowLeft size={14} />
            <span>◂ Back to Portfolio (Home)</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-800 font-bold">5 AEROSPACE WORKSTATIONS ACTIVE</span>
          </div>
        </div>

        {/* Header Title & Description */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 uppercase">
              AEROSPACE WORKSTATION DECK
            </span>
            <span className="text-slate-400 text-[10px] sm:text-xs font-mono">// FULL SIMULATION & CAD DATA</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Aerospace Engineering Workstations & Hangar Deck
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-sans mt-1.5 max-w-2xl leading-relaxed">
            Examine in-depth CAD assemblies, transient CFD rotor aerodynamics at 6000 RPM, FEA structural stress distributions under launch loads, and download parametric CAD files.
          </p>
        </div>

        {/* Quick Jump Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 mr-1 select-none">Quick Jump:</span>
          {[
            { id: 'quadcopter', label: 'Quadcopter UAV' },
            { id: 'cubesat', label: 'CubeSat LEO' },
            { id: 'cardioguard', label: 'CardioGuard' },
            { id: 'pipeflow', label: 'Pipe Flow CFD' },
            { id: 'cad-models', label: 'CAD Vault (40+ Files)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                SoundManager.playClick();
                const el = document.getElementById(`project-${tab.id}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-300 font-mono text-[11px] font-medium transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects Showcase */}
      <div className="space-y-8 sm:space-y-10 mb-16">
        {featuredProjects.map((project, i) => {
          // Unique interactive CAD workstation layout for Quadcopter, CubeSat, PipeFlow
          if (project.categories) {
            const activeCatId = activeCatIds[i] || project.categories[0].id;
            const activeImgIdx = activeImgIdxs[i] || 0;
            const assetSource = assetSources[i] || 'local';
            const localLoadError = localLoadErrors[i] || false;

            const currentCat = project.categories.find(c => c.id === activeCatId) || project.categories[0];
            const currentImage = currentCat.images[activeImgIdx >= currentCat.images.length ? 0 : activeImgIdx];
            const activeImageSrc = assetSource === 'preview' ? (currentImage.placeholder || currentImage.src) : currentImage.src;

            const isFeaturedExpanded = expandedFeatured[i] !== false;

            return (
              <div key={i} id={`project-${project.id}`} className="scroll-mt-24 flex flex-col gap-6">
                <div className="border border-slate-200 bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all relative overflow-hidden">
                  
                  {/* Header metadata */}
                  <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3.5 ${isFeaturedExpanded ? 'border-b border-slate-100 pb-4 mb-4' : ''}`}>
                    <div className="flex flex-col text-left flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`h-1.5 w-1.5 rounded-full bg-sky-500 ${isFeaturedExpanded ? 'animate-pulse' : ''}`}></span>
                        <span className="font-mono text-[9px] tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold uppercase">
                          AEROSPACE WORKSTATION // {isFeaturedExpanded ? 'ENGINE_RUNNING' : 'STANDBY'}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-0.5">{project.subtitle} // {project.date}</p>
                    </div>

                    {/* Operational Category Selector Tabs and Expand button */}
                    <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-auto justify-between lg:justify-end">
                      {isFeaturedExpanded && (
                        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 select-none">
                          {project.categories.map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                SoundManager.playClick();
                                setActiveCatIds(prev => ({ ...prev, [i]: cat.id }));
                                setActiveImgIdxs(prev => ({ ...prev, [i]: 0 }));
                                setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                              }}
                              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all duration-200 cursor-pointer font-semibold ${
                                activeCatId === cat.id
                                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          SoundManager.playClick();
                          setExpandedFeatured(prev => ({ ...prev, [i]: !isFeaturedExpanded }));
                        }}
                        className="p-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-all cursor-pointer flex items-center gap-1 font-mono text-[10px] shrink-0"
                      >
                        <span>{isFeaturedExpanded ? '[COLLAPSE]' : '[EXPAND]'}</span>
                        {isFeaturedExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isFeaturedExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {/* Interactive Asset Source Control Selector */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                          <p className="font-sans text-[11px] text-slate-500">
                            {assetSource === 'preview' 
                              ? 'Showing high-resolution engineering design previews (Hosted Sandbox Mode).'
                              : 'Loaded original engineering screenshots directly from local workspaces folder.'}
                          </p>
                          <div className="flex gap-1 bg-slate-100 border border-slate-200/80 p-0.5 rounded-xl shrink-0">
                            <button
                              onClick={() => {
                                SoundManager.playClick();
                                setAssetSources(prev => ({ ...prev, [i]: 'preview' }));
                                setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                              }}
                              className={`py-0.5 px-2.5 rounded-lg text-[9px] font-mono transition-all duration-200 font-semibold cursor-pointer ${
                                assetSource === 'preview'
                                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              [PREVIEW_ASSETS]
                            </button>
                            <button
                              onClick={() => {
                                SoundManager.playClick();
                                setAssetSources(prev => ({ ...prev, [i]: 'local' }));
                                setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                              }}
                              className={`py-0.5 px-2.5 rounded-lg text-[9px] font-mono transition-all duration-200 font-semibold cursor-pointer ${
                                assetSource === 'local'
                                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              [LOCAL_DISK]
                            </button>
                          </div>
                        </div>

                        {/* Operational Display Screen Layout */}
                        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                          {/* Viewport (Left) - Compact and Height-Restricted */}
                          <div className="lg:col-span-7 flex flex-col gap-2.5 w-full overflow-hidden">
                            <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-slate-950 aspect-[16/10] max-h-[240px] sm:max-h-[270px] md:max-h-[290px] w-full flex items-center justify-center shadow-inner group">
                              {/* Interactive Scope Crosshair / Border Overlays */}
                              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400/40 z-20 m-2.5 pointer-events-none"></div>
                              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400/40 z-20 m-2.5 pointer-events-none"></div>
                              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400/40 z-20 m-2.5 pointer-events-none"></div>
                              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400/40 z-20 m-2.5 pointer-events-none"></div>
                              
                              <div className="absolute inset-0 bg-cyan-400/[0.02] group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-multiply pointer-events-none"></div>
                              
                              {assetSource === 'local' && localLoadError ? (
                                (() => {
                                  const projectDir = currentImage.src.split('/')[2] || 'project';
                                  return (
                                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4 text-center border border-dashed border-red-500/30 rounded-xl overflow-y-auto z-30">
                                      <div className="h-8 w-8 text-red-400 bg-red-500/10 rounded-full flex items-center justify-center mb-2 border border-red-500/20">
                                        <Folder className="h-4 w-4" />
                                      </div>
                                      <h4 className="text-[11px] font-mono font-bold text-slate-100 tracking-wider uppercase mb-1">
                                        ENG_ASSET // MISSING_RAW_FILE
                                      </h4>
                                      <p className="font-sans text-[10px] text-slate-400 max-w-sm mb-2 leading-tight">
                                        Expected file under <code>public/projects/{projectDir}/</code> not found.
                                      </p>
                                      <button
                                        onClick={() => {
                                          SoundManager.playClick();
                                          setAssetSources(prev => ({ ...prev, [i]: 'preview' }));
                                          setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                                        }}
                                        className="px-3 py-1 bg-cyan-500 text-slate-950 rounded font-mono text-[9px] font-bold hover:bg-cyan-400 transition cursor-pointer"
                                      >
                                        [USE_SANDBOX_PREVIEWS_MODE]
                                      </button>
                                    </div>
                                  );
                                })()
                              ) : (
                                <>
                                  {activeImageSrc.endsWith('.mp4') ? (
                                    <video
                                      src={activeImageSrc}
                                      controls
                                      autoPlay
                                      loop
                                      muted
                                      className="w-full h-full object-contain sm:object-cover rounded"
                                      onError={() => {
                                        if (assetSource === 'local') {
                                          setLocalLoadErrors(prev => ({ ...prev, [i]: true }));
                                          SoundManager.playWarning();
                                        }
                                      }}
                                    />
                                  ) : (
                                    <img 
                                      src={activeImageSrc} 
                                      alt={currentImage.alt} 
                                      className="w-full h-full object-contain sm:object-cover transition-all duration-300 rounded"
                                      referrerPolicy="no-referrer"
                                      onError={() => {
                                        if (assetSource === 'local') {
                                          setLocalLoadErrors(prev => ({ ...prev, [i]: true }));
                                          SoundManager.playWarning();
                                        }
                                      }}
                                    />
                                  )}
                                  <TelemetryOverlay 
                                    stressMax={project.telemetry?.stressMax} 
                                    forceName={project.telemetry?.forceName} 
                                    thrustVal={project.telemetry?.thrustVal} 
                                  />
                                </>
                              )}

                              {/* Telemetry Overlay text */}
                              <div className="absolute top-2.5 left-8 z-20 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded font-mono text-[8px] sm:text-[9px] text-sky-400 tracking-wider pointer-events-none">
                                SYS_VIEW: {activeCatId.toUpperCase()} // CAD_IMG_0{activeImgIdx + 1}
                              </div>
                            </div>

                            {/* Display Status Bar */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-left font-mono text-[10px] sm:text-[11px] text-slate-700 leading-snug flex items-center gap-2">
                              <span className="text-sky-600 shrink-0 font-bold select-none">[SYS_REPORT]</span>
                              <span className="truncate">
                                <strong className="text-slate-900">{currentImage.title}:</strong> {currentImage.alt}
                              </span>
                            </div>

                            {/* Viewport Sub-Thumbnails Strip */}
                            <div className="grid grid-cols-5 gap-1.5 select-none">
                              {currentCat.images.map((img, idx) => {
                                const thumbSrc = assetSource === 'preview' ? (img.placeholder || img.src) : img.src;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      SoundManager.playClick();
                                      setActiveImgIdxs(prev => ({ ...prev, [i]: idx }));
                                      setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                                    }}
                                    className={`relative rounded-lg overflow-hidden h-10 sm:h-11 border-2 transition-all cursor-pointer ${
                                      activeImgIdx === idx ? 'border-sky-500 ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    {thumbSrc.endsWith('.mp4') ? (
                                      <video
                                        src={thumbSrc}
                                        muted
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <img 
                                        src={thumbSrc} 
                                        alt={img.title} 
                                        className="w-full h-full object-cover" 
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                          if (assetSource === 'local') {
                                            setLocalLoadErrors(prev => ({ ...prev, [i]: true }));
                                          } else {
                                            const imgEl = e.target as HTMLImageElement;
                                            if (imgEl.src !== img.placeholder) {
                                              imgEl.src = img.placeholder || '';
                                            }
                                          }
                                        }}
                                      />
                                    )}
                                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 border-t border-slate-900 text-[8px] text-slate-400 truncate font-mono text-center px-1 hidden xs:block">
                                      0{idx + 1}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Operational Details Side-Console (Right) */}
                          <div className="lg:col-span-5 relative z-20 flex flex-col items-start text-left gap-3 w-full">
                            {/* Description Bullet Summary */}
                            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-slate-700 text-xs sm:text-sm relative w-full shadow-2xs">
                              <div className="absolute top-0 left-0 bottom-0 w-1 bg-sky-500 rounded-l-2xl"></div>
                              <p className="font-sans mb-3 text-slate-600 leading-relaxed text-xs sm:text-sm font-normal">
                                {project.description}
                              </p>
                              
                              {project.bullets && (
                                <ul className="space-y-2 text-xs text-slate-700 font-sans border-t border-slate-200/80 pt-3 mt-3">
                                  {project.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                                      <span className="text-sky-500 font-bold select-none shrink-0">•</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            {/* Technical Blueprint Specifications Sheet */}
                            <div className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 font-mono text-[10px] sm:text-[11px] text-slate-700 shadow-2xs">
                              <div className="text-slate-800 font-bold border-b border-slate-100 pb-1.5 mb-2.5 flex justify-between">
                                <span className="font-display">// AEROSPACE TEST FLIGHT REPORT</span>
                                <span className="text-sky-600 tracking-wider font-bold uppercase select-none">CONFIRMED</span>
                              </div>
                              <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                                {project.reportDetails ? (
                                  project.reportDetails.map((detail, dIdx) => (
                                    <div key={dIdx}>
                                      <span className="text-slate-400">{detail.label}:</span> <span className="text-slate-900 font-semibold">{detail.value}</span>
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    <div><span className="text-slate-400">Status:</span> Completed</div>
                                    <div><span className="text-slate-400">Telemetry:</span> Active</div>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Technical Badges List */}
                            <ul className="flex flex-wrap gap-1 font-mono text-[9px] text-slate-600 w-full">
                              {project.tech.map(t => (
                                <li key={t} className="bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium">
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          }

          // STANDARD LAYOUT FOR NON-CATEGORIZED FEATURED PROJECTS (like CardioGuard)
          const activeImgIdx = activeImages[i] || 0;
          const currentImage = project.images?.[activeImgIdx] || { src: '', alt: '' };
          const isFeaturedExpanded = expandedFeatured[i] !== false;

          return (
            <div key={i} id={`project-${project.id}`} className="scroll-mt-28 flex flex-col gap-6">
              <div className="border border-slate-200 bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all relative overflow-hidden">
                
                {/* Header metadata */}
                <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 ${isFeaturedExpanded ? 'border-b border-slate-100 pb-4 mb-4' : ''}`}>
                  <div className="flex flex-col text-left flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`h-2 w-2 rounded-full bg-rose-500 ${isFeaturedExpanded ? 'animate-pulse' : ''}`}></span>
                      <span className="font-mono text-[10px] tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold uppercase">
                        AVIONICS & BIO-TELEMETRY // {isFeaturedExpanded ? 'PROJECT_OPERATIONAL' : 'STANDBY'}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[11px] text-slate-500 mt-0.5">{project.subtitle} // {project.date}</p>
                  </div>

                  {/* Collapse/Expand Dropdown Button */}
                  <div className="flex items-center gap-3 self-stretch lg:self-auto justify-end">
                    <button
                      onClick={() => {
                        SoundManager.playClick();
                        setExpandedFeatured(prev => ({ ...prev, [i]: !isFeaturedExpanded }));
                      }}
                      className="p-1.5 sm:p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-all cursor-pointer flex items-center gap-1.5 font-mono text-[10px] shrink-0"
                    >
                      <span>{isFeaturedExpanded ? '[COLLAPSE]' : '[EXPAND]'}</span>
                      {isFeaturedExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isFeaturedExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="relative grid md:grid-cols-12 gap-5 sm:gap-6 items-start pt-1">
                        {/* Image Column */}
                        <div className="md:col-span-7 relative group flex flex-col gap-3">
                          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10] max-h-[240px] sm:max-h-[270px] md:max-h-[290px] w-full flex items-center justify-center shadow-md">
                            <img 
                              src={currentImage.src} 
                              alt={currentImage.alt} 
                              className="w-full h-full object-contain sm:object-cover transition-all duration-300 rounded"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/project-${i}-${activeImgIdx}/800/500`;
                              }}
                            />
                            <TelemetryOverlay 
                              stressMax={project.telemetry?.stressMax} 
                              forceName={project.telemetry?.forceName} 
                              thrustVal={project.telemetry?.thrustVal} 
                            />
                          </div>
                          {/* Thumbnails */}
                          {project.images && project.images.length > 1 && (
                            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                              {project.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    SoundManager.playClick();
                                    setActiveImages(prev => ({ ...prev, [i]: idx }));
                                  }}
                                  className={`relative rounded-md overflow-hidden h-10 sm:h-11 w-full border-2 transition-all cursor-pointer ${
                                    activeImgIdx === idx ? 'border-rose-500 ring-2 ring-rose-200' : 'border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <img 
                                    src={img.src} 
                                    alt={img.alt} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/project-${i}-${idx}/100/100`;
                                    }}
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-5 relative z-20 flex flex-col items-start text-left">
                          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-slate-700 text-xs sm:text-sm mb-3 relative w-full shadow-2xs font-sans">
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-rose-500 rounded-l-2xl"></div>
                            <p className="font-sans mb-3 text-slate-600 leading-relaxed text-xs sm:text-sm font-normal">{project.description}</p>
                            
                            {project.bullets && (
                              <ul className="space-y-2 text-xs text-slate-700 font-sans border-t border-slate-200/80 pt-3 mt-3">
                                {project.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-1.5 leading-relaxed">
                                    <span className="text-rose-500 select-none font-bold shrink-0">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          
                          <ul className="flex flex-wrap gap-1 font-mono text-[9px] sm:text-[10px] text-slate-600 w-full">
                            {project.tech.map(t => (
                              <li key={t} className="bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium">{t}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Other Projects Grid & CAD Repository */}
      <div id="project-cad-models" className="scroll-mt-28">
        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-6 text-center">Aerospace CAD Models & Engineering Repositories</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start">
          {otherProjects.map((project, i) => {
            const isExpanded = expandedCard === i;
            return (
              <motion.div 
                key={i}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`bg-white border rounded-2xl p-4 sm:p-5 flex flex-col transition-all duration-300 relative overflow-hidden group select-none shadow-xs ${
                  isExpanded 
                    ? 'md:col-span-2 lg:col-span-3 border-sky-400 shadow-md ring-2 ring-sky-100' 
                    : 'border-slate-200 hover:border-sky-300 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <Folder size={22} strokeWidth={1.5} />
                  </div>
                  <button
                    onClick={() => {
                      SoundManager.playClick();
                      setExpandedCard(isExpanded ? null : i);
                    }}
                    className="p-1.5 sm:p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-all cursor-pointer flex items-center gap-1.5 font-mono text-[10px]"
                  >
                    <span>{isExpanded ? '[COLLAPSE]' : '[EXPAND]'}</span>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </div>

                <h4 
                  onClick={() => {
                    SoundManager.playClick();
                    setExpandedCard(isExpanded ? null : i);
                  }}
                  className="text-base sm:text-lg font-display font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors cursor-pointer"
                >
                  {project.title}
                </h4>
                <p className="text-slate-600 text-xs mb-4 font-sans leading-relaxed">
                  {project.description}
                </p>

                {/* Expandable Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 pt-4 mt-1 mb-4 overflow-hidden text-left"
                    >
                      {project.isCadModels ? (
                        /* RENDER INTERACTIVE CAD EXPLORER */
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
                            <span className="font-mono text-[10px] tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold uppercase">
                              MODEL REPOSITORY // SOLIDWORKS · CATIA · STEP · STL
                            </span>
                          </div>

                          {/* File Explorer Tab Selector */}
                          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80">
                            {cadFolders.map(folder => (
                              <button
                                key={folder.id}
                                onClick={() => {
                                  SoundManager.playClick();
                                  setActiveFolderId(folder.id);
                                }}
                                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all duration-200 cursor-pointer font-semibold ${
                                  activeFolderId === folder.id
                                    ? 'bg-sky-600 text-white font-bold shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                                }`}
                              >
                                {folder.label} ({folder.files.length})
                              </button>
                            ))}
                          </div>

                          {/* Files Grid View */}
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 max-h-[240px] overflow-y-auto">
                            <div className="grid sm:grid-cols-2 gap-2">
                              {cadFolders.find(f => f.id === activeFolderId)?.files.map((file, fIdx) => {
                                const folderPath = cadFolders.find(f => f.id === activeFolderId)?.path;
                                const downloadUrl = `/cad-cam/${folderPath}/${file.name}`;
                                return (
                                  <div 
                                    key={fIdx}
                                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-sky-300 transition-all font-mono text-[11px]"
                                  >
                                    <div className="flex items-center gap-2 truncate pr-2">
                                      <File className="text-sky-500 shrink-0" size={13} />
                                      <span className="text-slate-800 font-medium truncate" title={file.name}>{file.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-[10px] text-slate-400 font-semibold">{file.size}</span>
                                      <a 
                                        href={downloadUrl}
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => SoundManager.playSuccess()}
                                        className="p-1 rounded text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                                        title="Download Model File"
                                      >
                                        <Download size={13} />
                                      </a>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* RENDER BULLET LIST FOR DYNAMICS AND AVIONICS PANEL */
                        <ul className="space-y-2">
                          {project.bullets?.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed font-sans">
                              <span className="text-sky-500 select-none font-bold shrink-0">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <ul className="flex flex-wrap gap-1 font-mono text-[9px] sm:text-[10px] text-slate-500 mt-auto">
                  {project.tech.map(t => (
                    <li key={t} className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-slate-600">{t}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Return to Portfolio Navigation Banner */}
      <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="text-center sm:text-left">
          <h4 className="font-display font-bold text-base sm:text-lg text-slate-900">Finished Exploring Workstations?</h4>
          <p className="text-xs text-slate-600 font-sans mt-0.5">Return to the portfolio home or get in touch for aerospace collaboration.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              SoundManager.playClick();
              if (onBack) onBack();
              else window.location.href = '/#projects';
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 font-mono text-xs font-semibold transition-all cursor-pointer bg-slate-50"
          >
            ◂ Return to Portfolio (Home)
          </button>
          <a
            href="/#contact"
            onClick={() => SoundManager.playClick()}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-semibold shadow-xs transition-all"
          >
            Contact Ayushman ➔
          </a>
        </div>
      </div>
    </motion.section>
  );
}

