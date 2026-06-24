import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, ChevronDown, ChevronUp, File, Download } from 'lucide-react';
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
  telemetry?: {
    stressMax: string;
    forceName: string;
    thrustVal: string;
  };
  reportDetails?: ReportDetail[];
}

const projects: Project[] = [
  {
    title: 'Quadcopter UAV — Design, CFD & PID Flight Simulation',
    subtitle: 'Solo Project | FGIET Rae Bareli',
    description: 'A comprehensive, multi-physics engineering project involving the complete structural design, transient CFD analysis, and control loop formulation of an X-450 quadcopter to achieve stable flight dynamics and aerodynamic efficiency.',
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
    title: 'CubeSat Structure Design & Thermal Analysis — LEO Mission',
    subtitle: 'Solo Project | FGIET Rae Bareli',
    description: 'An aerospace simulation mapping the design, structural limits under launch loads, and radiative thermal environment of a 1U CubeSat orbiting in LEO, validated by trajectory ground track simulation in MATLAB.',
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
    title: 'CardioGuard – Real-Time Heart Monitoring & Alert System',
    subtitle: 'IoT Project | Kalam Pragati Internship',
    description: 'A wearable IoT healthcare device designed to monitor patient vitals in real time, featuring integrated ECG/sensor data visualization, Telegram emergency broadcasting, and an optimized 3D-printed enclosure designed in Onshape.',
    tech: ['Arduino', 'ESP8266', 'ThingSpeak', 'AD8232 ECG', 'MAX30102', 'Telegram API', 'Onshape', '3D Printing'],
    featured: true,
    date: 'Aug 2025 – Sep 2025',
    bullets: [
      'Built wearable IoT device using AD8232 ECG + MAX30102 sensors with ThingSpeak dashboard and Telegram emergency alerts',
      'Designed 3D-printed casing in Onshape — successfully built and tested complete working prototype'
    ],
    images: [
      { src: '/projects/cardioguard/1757696137634.jpg', alt: 'Hardware prototype front view' },
      { src: '/projects/cardioguard/circuit.jpg', alt: 'Circuit wiring and sensors' },
      { src: '/projects/cardioguard/thingskepak.jpg', alt: 'ThingSpeak dashboard with vitals' },
      { src: '/projects/cardioguard/1757696150800.jpg', alt: 'Figma UI prototype Screenshot' },
      { src: '/projects/cardioguard/1757696179914.jpg', alt: 'Telegram alert message' }
    ],
    telemetry: {
      stressMax: 'N/A (Wearable)',
      forceName: 'BPM_RATE',
      thrustVal: '60-100 Hz'
    }
  },
  {
    title: 'ANSYS Mastery — Sudden Contraction Pipe Flow Simulation',
    subtitle: 'Solo Project | ANSYS CFD Mastery',
    description: 'A comprehensive, transient CFD analysis modeling the flow dynamics, velocity acceleration, and pressure distribution of an incompressible fluid through a pipe experiencing a sudden cross-sectional area contraction.',
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
    title: 'Aerospace CAD Models',
    description: 'Parametric 3D models of aerospace components designed for simulation and manufacturing purposes using Onshape, AutoCAD, and SolidWorks.',
    tech: ['Onshape', 'AutoCAD', 'SolidWorks'],
    featured: false,
    isCadModels: true,
  },
  {
    title: 'MATLAB Flight Dynamics',
    description: 'Simulated basic longitudinal dynamics and aircraft response to analyze stability and control characteristics using MATLAB & Simulink.',
    tech: ['MATLAB', 'Simulink', 'Flight Dynamics'],
    featured: false,
    bullets: [
      'Simulated short-period and phugoid modes of aircraft to determine dynamic stability boundaries.',
      'Developed Simulink control loops using PID tuning algorithms to achieve robust attitude stabilization.',
      'Generated transfer functions and state-space models to analyze eigenvalue trajectories and root-locus dynamics.'
    ]
  },
  {
    title: 'Laser-cut Avionics Panel',
    description: 'Miniature avionics panel with precision-engraved labels using laser cutting technology, designed in AutoCAD for rapid prototyping.',
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
  onViewAll?: () => void;
  onBack?: () => void;
}

export default function Projects({ viewMode = 'full', onViewAll, onBack }: ProjectsProps) {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  
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

  if (viewMode === 'teaser') {
    return (
      <motion.section 
        id="projects" 
        className="scroll-mt-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-200 flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xl font-normal">03.</span> Featured Projects
          </h2>
          <div className="h-px bg-slate-800 flex-grow max-w-xs"></div>
        </div>

        {/* Small Featured Project Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              onClick={onViewAll}
              className="bg-slate-900/40 border border-slate-800 hover:border-cyan-400/45 p-6 rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              {/* Scanline hover effect */}
              <div className="absolute inset-0 h-[2px] w-full bg-cyan-400/10 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] text-cyan-400 tracking-wider uppercase font-semibold">
                    CFD // SIMULATION // 0{idx + 1}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{project.date}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans mb-6">
                  {project.description}
                </p>
              </div>

              <ul className="flex flex-wrap gap-1.5 font-mono text-[9px] text-slate-500 mt-auto">
                {project.tech.map(t => (
                  <li key={t} className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-850/50">{t}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Supersonic Launch Hangar Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (onViewAll) onViewAll();
            }}
            className="group px-6 py-3 border border-cyan-400/60 hover:border-cyan-400 text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-cyan-500/5 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]"
          >
            <span>[ENTER_HANGAR_DECK]</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-bold font-sans">▸</span>
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="projects" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {onBack && (
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-slate-800/80">
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 border border-slate-800 rounded bg-slate-900/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all font-mono text-[10px] cursor-pointer flex items-center gap-1.5"
          >
            <span>◂ [RETURN_TO_COMMAND_CENTER]</span>
          </button>
          <div className="font-mono text-[10px] text-cyan-400/80 flex items-center gap-1.5 bg-cyan-400/5 px-2.5 py-0.5 rounded border border-cyan-400/10">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>HANGAR DECK OPERATIONAL</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-200 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl font-normal">03.</span> {onBack ? "Project Hangar & Analysis Deck" : "Some Things I've Built"}
        </h2>
        <div className="h-px bg-slate-800 flex-grow max-w-xs"></div>
      </div>

      {/* Featured Projects Showcase */}
      <div className="space-y-32 mb-32">
        {featuredProjects.map((project, i) => {
          // Unique interactive CAD workstation layout for Quadcopter and CubeSat
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
              <div key={i} className="flex flex-col gap-8">
                <div className="border border-slate-800/80 bg-slate-950/80 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  {/* Neon header divider band */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent"></div>
                  
                  {/* Header metadata */}
                  <div className={`flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 ${isFeaturedExpanded ? 'border-b border-slate-800/80 pb-6 mb-6' : ''}`}>
                    <div className="flex flex-col text-left flex-grow">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`h-2 w-2 rounded-full bg-cyan-400 ${isFeaturedExpanded ? 'animate-pulse' : ''}`}></span>
                        <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
                          ANALYTICAL WORKSTATION // {isFeaturedExpanded ? 'ENGINE_RUNNING' : 'STANDBY'}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-slate-100 leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-slate-400 mt-1">{project.subtitle} // {project.date}</p>
                    </div>

                    {/* Operational Category Selector Tabs and Expand button */}
                    <div className="flex items-center gap-4 self-stretch xl:self-auto justify-between sm:justify-start">
                      {isFeaturedExpanded && (
                        <div className="flex flex-wrap gap-1.5 bg-slate-900/95 p-1.5 rounded-lg border border-slate-800/80 overflow-x-auto select-none sm:scrollbar-none">
                          {project.categories.map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                SoundManager.playClick();
                                setActiveCatIds(prev => ({ ...prev, [i]: cat.id }));
                                setActiveImgIdxs(prev => ({ ...prev, [i]: 0 }));
                                setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                              }}
                              className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200 cursor-pointer text-nowrap select-none font-semibold ${
                                activeCatId === cat.id
                                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/10'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
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
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-pointer flex items-center gap-1.5 font-mono text-[10px] shrink-0"
                      >
                        <span>{isFeaturedExpanded ? '[COLLAPSE]' : '[EXPAND]'}</span>
                        {isFeaturedExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-800/35">
                          <div className="flex flex-col text-left max-w-lg">
                            <p className="font-sans text-xs text-slate-400">
                              {assetSource === 'preview' 
                                ? 'Showing high-resolution engineering design previews (Hosted Sandbox Mode).'
                                : 'Attempting to load original screenshots directly from local workspaces folder.'}
                            </p>
                          </div>
                          <div className="flex gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg shrink-0">
                            <button
                              onClick={() => {
                                SoundManager.playClick();
                                setAssetSources(prev => ({ ...prev, [i]: 'preview' }));
                                setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                              }}
                              className={`py-1 px-2.5 rounded-md text-[10px] font-mono transition-all duration-200 font-semibold cursor-pointer ${
                                assetSource === 'preview'
                                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow shadow-cyan-500/10'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              [MODE: MOCK_PREVIEW]
                            </button>
                            <button
                              onClick={() => {
                                SoundManager.playClick();
                                setAssetSources(prev => ({ ...prev, [i]: 'local' }));
                                setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                              }}
                              className={`py-1 px-2.5 rounded-md text-[10px] font-mono transition-all duration-200 font-semibold cursor-pointer ${
                                assetSource === 'local'
                                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow shadow-cyan-500/10'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              [MODE: LOCAL_ASSETS]
                            </button>
                          </div>
                        </div>

                        {/* Operational Display Screen Layout */}
                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                          {/* Viewport (Left) */}
                          <div className="lg:col-span-7 flex flex-col gap-4">
                            <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-slate-950 aspect-video flex items-center justify-center shadow-inner group">
                              {/* Interactive Scope Crosshair / Border Overlays */}
                              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 z-20 m-3 pointer-events-none"></div>
                              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40 z-20 m-3 pointer-events-none"></div>
                              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/40 z-20 m-3 pointer-events-none"></div>
                              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40 z-20 m-3 pointer-events-none"></div>
                              
                              <div className="absolute inset-0 bg-cyan-400/[0.02] group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-multiply pointer-events-none"></div>
                              
                              {assetSource === 'local' && localLoadError ? (
                                (() => {
                                  const projectDir = currentImage.src.split('/')[2] || 'project';
                                  return (
                                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center border border-dashed border-red-500/30 rounded-xl overflow-y-auto z-30">
                                      <div className="h-10 w-10 text-red-400 bg-red-500/10 rounded-full flex items-center justify-center mb-3 border border-red-500/20">
                                        <Folder className="h-5 w-5" />
                                      </div>
                                      <h4 className="text-xs font-mono font-bold text-slate-100 tracking-wider uppercase mb-1 font-semibold">
                                        ENG_ASSET // MISSING_RAW_FILE
                                      </h4>
                                      <p className="font-sans text-[11px] text-slate-450 max-w-md mb-3 leading-normal text-slate-400">
                                        Expected file under project directory <code>public/projects/{projectDir}/</code> was not found. Images are loaded via <b>Mock Previews</b> by default.
                                      </p>
                                      <div className="w-full max-w-sm bg-slate-900 border border-slate-800/80 rounded-lg p-3 text-left font-mono text-[10px] text-slate-300 space-y-2">
                                        <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1.5 mb-1.5 flex justify-between items-center text-[9px]">
                                          <span>📁 RESOURCE PATH EXPECTED:</span>
                                          <span className="text-red-400 shrink-0 font-bold">[NOT_FOUND]</span>
                                        </div>
                                        <div className="bg-slate-950 p-1.5 rounded select-all border border-slate-850/50 text-[9px] text-cyan-300 font-mono overflow-x-auto scrollbar-none whitespace-pre-wrap word-break-all break-all">
                                          public/projects/{projectDir}/{currentImage.src.split('/').pop()}
                                        </div>
                                        <div className="text-slate-400 text-[10px] space-y-1.5 leading-relaxed pt-1 font-sans">
                                          <p className="flex items-start gap-1.5">
                                            <span className="text-cyan-400 font-bold">1.</span>
                                            <span>Left sidebar block explorer me <code>public/</code> folder expand karke right-click karein, aur <code>projects</code> ke andar ek <b><code>{projectDir}</code></b> folder banayein.</span>
                                          </p>
                                          <p className="flex items-start gap-1.5">
                                            <span className="text-cyan-400 font-bold">2.</span>
                                            <span>Apne computer se snapshots ko is naye directory path folder me upload kar dein aur unke names coding pattern matching ke anusaar rakhein!</span>
                                          </p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => {
                                          SoundManager.playClick();
                                          setAssetSources(prev => ({ ...prev, [i]: 'preview' }));
                                          setLocalLoadErrors(prev => ({ ...prev, [i]: false }));
                                        }}
                                        className="mt-4 px-3.5 py-1.5 bg-cyan-500 text-slate-950 rounded font-mono text-[10px] font-bold hover:bg-cyan-400 transition cursor-pointer"
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
                                      className="w-full h-full object-cover rounded"
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
                                      className="w-full h-full object-cover transition-all duration-300 rounded"
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
                              <div className="absolute top-3 left-10 z-20 bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 rounded font-mono text-[9px] text-cyan-400/90 tracking-wider pointer-events-none">
                                SYS_VIEW: {activeCatId.toUpperCase()} // CAD_IMG_0{activeImgIdx + 1}
                              </div>
                            </div>

                            {/* Display Status Bar */}
                            <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3.5 text-left font-mono text-[11px] text-slate-300 leading-relaxed flex gap-2.5">
                              <span className="text-cyan-400 shrink-0 font-bold select-none">[SYS_REPORT]</span>
                              <span>
                                <strong className="text-slate-100">{currentImage.title}:</strong> {currentImage.alt}
                              </span>
                            </div>

                            {/* Viewport Sub-Thumbnails Strip */}
                            <div className="grid grid-cols-5 gap-2 select-none">
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
                                    className={`relative rounded-md overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                                      activeImgIdx === idx ? 'border-cyan-400 shadow-md shadow-cyan-400/10' : 'border-slate-900 opacity-40 hover:opacity-100'
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
                          <div className="lg:col-span-5 relative z-20 flex flex-col items-start text-left gap-4">
                            {/* Description Bullet Summary */}
                            <div className="bg-slate-905/70 border border-slate-800/60 backdrop-blur-sm p-6 rounded-xl text-slate-300 text-sm relative w-full shadow-md">
                              <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-cyan-400"></div>
                              <p className="font-sans mb-4 text-slate-400 leading-relaxed text-sm font-normal">
                                {project.description}
                              </p>
                              
                              {project.bullets && (
                                <ul className="space-y-3.5 text-xs text-slate-300 font-sans border-t border-slate-800/60 pt-4 mt-4">
                                  {project.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                                      <span className="text-cyan-400 select-none font-bold shrink-0">▸</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            {/* Technical Blueprint Specifications Sheet */}
                            <div className="w-full bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10px] text-slate-400">
                              <div className="text-slate-300 font-bold border-b border-slate-900 pb-2 mb-3 mt-1 flex justify-between">
                                <span>// AEROSPACE TEST FLIGHT REPORT</span>
                                <span className="text-cyan-400 tracking-widest font-bold uppercase select-none">STABLE // CONFIRMED</span>
                              </div>
                              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                                {project.reportDetails ? (
                                  project.reportDetails.map((detail, dIdx) => (
                                    <div key={dIdx}>
                                      <span className="text-slate-500">{detail.label}:</span> {detail.value}
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    <div><span className="text-slate-500">Status:</span> Detailed analysis completed</div>
                                    <div><span className="text-slate-550">Telemetry:</span> Active</div>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Technical Badges List */}
                            <ul className="flex flex-wrap gap-2 font-mono text-[10px] text-slate-400 w-full">
                              {project.tech.map(t => (
                                <li key={t} className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-slate-400 font-medium">
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
            <div key={i} className="flex flex-col gap-8">
              <div className="border border-slate-800/80 bg-slate-950/80 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                {/* Neon header divider band */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent"></div>
                
                {/* Header metadata */}
                <div className={`flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 ${isFeaturedExpanded ? 'border-b border-slate-800/80 pb-6 mb-6' : ''}`}>
                  <div className="flex flex-col text-left flex-grow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`h-2 w-2 rounded-full bg-cyan-400 ${isFeaturedExpanded ? 'animate-pulse' : ''}`}></span>
                      <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
                        MISSION LOG // {isFeaturedExpanded ? 'PROJECT_OPERATIONAL' : 'STANDBY'}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-slate-100 leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-slate-400 mt-1">{project.subtitle} // {project.date}</p>
                  </div>

                  {/* Collapse/Expand Dropdown Button */}
                  <div className="flex items-center gap-4 self-stretch xl:self-auto justify-end">
                    <button
                      onClick={() => {
                        SoundManager.playClick();
                        setExpandedFeatured(prev => ({ ...prev, [i]: !isFeaturedExpanded }));
                      }}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-pointer flex items-center gap-1.5 font-mono text-[10px] shrink-0"
                    >
                      <span>{isFeaturedExpanded ? '[COLLAPSE]' : '[EXPAND]'}</span>
                      {isFeaturedExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                      <div className="relative grid md:grid-cols-12 gap-8 items-start pt-2">
                        {/* Image Column */}
                        <div className="md:col-span-7 relative group flex flex-col gap-4">
                          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center shadow-lg">
                            {/* HUD Corner Accents */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 z-20 m-2"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40 z-20 m-2"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/40 z-20 m-2"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40 z-25 m-2"></div>
                            
                            <div className="absolute inset-0 bg-cyan-400/5 group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-multiply"></div>
                            <img 
                              src={currentImage.src} 
                              alt={currentImage.alt} 
                              className="w-full h-full object-cover transition-all duration-500 rounded"
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
                            <div className="grid grid-cols-5 gap-2">
                              {project.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    SoundManager.playClick();
                                    setActiveImages(prev => ({ ...prev, [i]: idx }));
                                  }}
                                  className={`relative rounded-md overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                                    activeImgIdx === idx ? 'border-cyan-400' : 'border-slate-800 opacity-40 hover:opacity-100'
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
                          <div className="bg-slate-900 border border-slate-800/60 backdrop-blur-sm p-6 rounded-xl text-slate-300 text-sm mb-6 relative w-full shadow-md font-sans">
                            <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-cyan-400"></div>
                            <p className="font-sans mb-4 text-slate-400 leading-relaxed text-sm font-normal">{project.description}</p>
                            
                            {project.bullets && (
                              <ul className="space-y-3 text-xs text-slate-300 font-sans border-t border-slate-800/80 pt-4 mt-4">
                                {project.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                                    <span className="text-cyan-400 select-none font-bold shrink-0">▸</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          
                          <ul className="flex flex-wrap gap-2 font-mono text-[10px] text-slate-400 w-full">
                            {project.tech.map(t => (
                              <li key={t} className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-slate-400 font-medium">{t}</li>
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

      {/* Other Projects Grid */}
      <h3 className="text-xl font-display font-bold text-slate-200 mb-8 text-center">Other Noteworthy Projects</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {otherProjects.map((project, i) => {
          const isExpanded = expandedCard === i;
          return (
            <motion.div 
              key={i}
              layout="position"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-slate-900 border rounded-xl p-8 flex flex-col transition-all duration-300 relative overflow-hidden group select-none ${
                isExpanded 
                  ? 'md:col-span-2 lg:col-span-3 border-cyan-400 bg-slate-950/90 shadow-[0_0_30px_rgba(6,182,212,0.05)]' 
                  : 'border-slate-800 hover:border-cyan-400/30'
              }`}
            >
              {/* Scanline effect on hover */}
              {!isExpanded && (
                <div className="absolute inset-0 h-[2px] w-full bg-cyan-400/20 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>
              )}
              
              <div className="flex justify-between items-center mb-6">
                <Folder className="text-cyan-400" size={40} strokeWidth={1.5} />
                <button
                  onClick={() => {
                    SoundManager.playClick();
                    setExpandedCard(isExpanded ? null : i);
                  }}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-pointer flex items-center gap-1.5 font-mono text-[10px]"
                >
                  <span>{isExpanded ? '[COLLAPSE]' : '[EXPAND]'}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <h4 
                onClick={() => {
                  SoundManager.playClick();
                  setExpandedCard(isExpanded ? null : i);
                }}
                className="text-xl font-display font-bold text-slate-200 mb-3 group-hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {project.title}
              </h4>
              <p className="text-slate-400 text-sm mb-6 font-sans">
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
                    className="border-t border-slate-800/80 pt-6 mt-2 mb-6 overflow-hidden text-left"
                  >
                    {project.isCadModels ? (
                      /* RENDER INTERACTIVE CAD EXPLORER */
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                          <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
                            MODEL REPOSITORY // LOCAL_DISK
                          </span>
                        </div>

                        {/* File Explorer Tab Selector */}
                        <div className="flex flex-wrap gap-1.5 bg-slate-900/95 p-1 rounded-lg border border-slate-800/80">
                          {cadFolders.map(folder => (
                            <button
                              key={folder.id}
                              onClick={() => {
                                SoundManager.playClick();
                                setActiveFolderId(folder.id);
                              }}
                              className={`px-3 py-1.5 rounded-md font-mono text-[10px] transition-all duration-200 cursor-pointer ${
                                activeFolderId === folder.id
                                  ? 'bg-cyan-500 text-slate-950 font-bold'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {folder.label} ({folder.files.length})
                            </button>
                          ))}
                        </div>

                        {/* Files Grid View */}
                        <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 max-h-[300px] overflow-y-auto">
                          <div className="grid sm:grid-cols-2 gap-3">
                            {cadFolders.find(f => f.id === activeFolderId)?.files.map((file, fIdx) => {
                              const folderPath = cadFolders.find(f => f.id === activeFolderId)?.path;
                              const downloadUrl = `/cad-cam/${folderPath}/${file.name}`;
                              return (
                                <div 
                                  key={fIdx}
                                  className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-900 hover:border-cyan-400/20 transition-all font-mono text-[11px]"
                                >
                                  <div className="flex items-center gap-2 truncate pr-2">
                                    <File className="text-cyan-400/60 shrink-0" size={14} />
                                    <span className="text-slate-300 truncate" title={file.name}>{file.name}</span>
                                  </div>
                                  <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-[10px] text-slate-550 font-semibold">{file.size}</span>
                                    <a 
                                      href={downloadUrl}
                                      download
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={() => SoundManager.playSuccess()}
                                      className="p-1 rounded text-cyan-400 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
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
                      <ul className="space-y-3">
                        {project.bullets?.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-350 leading-relaxed font-sans">
                            <span className="text-cyan-400 select-none font-bold shrink-0">▸</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <ul className="flex flex-wrap gap-2.5 font-mono text-[10px] text-slate-500 mt-auto">
                {project.tech.map(t => (
                  <li key={t} className="bg-slate-950/40 px-2 py-0.5 rounded border border-slate-800/40">{t}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

