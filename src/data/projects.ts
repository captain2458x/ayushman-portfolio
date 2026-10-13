import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'aerospace-cad-modelling',
    slug: 'aerospace-cad-modelling',
    title: 'Aerospace CAD Modelling and Parametric Design',
    category: 'aerospace-cad',
    categoryLabel: 'Aerospace Design',
    shortDescription: 'Parametric 3D engineering models of aerospace assemblies and structural components developed using SolidWorks, AutoCAD, and Onshape.',
    detailedOverview: 'A comprehensive collection of aerospace-related mechanical and structural CAD design work. Focuses on parametric solid modelling, precision clearance tolerances, assembly mating, and generation of standard orthographic engineering production drawings.',
    featured: true,
    status: 'Completed',
    date: 'Jan 2025 – Present',
    tools: ['SolidWorks', 'AutoCAD', 'Onshape', 'Autodesk Fusion 360'],
    objectives: [
      'Develop parametric 3D CAD assemblies adhering to mechanical engineering drawing standards.',
      'Optimize structural geometry for weight reduction while preserving load distribution paths.',
      'Generate production-ready 2D orthographic projection blueprints with GD&T annotations.',
      'Model precision sub-assemblies for UAV airframes and specialized mobility mechanisms.'
    ],
    methodology: [
      'Parametric 2D sketching with fully constrained dimensional references and relation constraints.',
      'Feature generation using extrusions, sweeps, lofts, fillets, and shell commands.',
      'Top-down and bottom-up assembly modelling with concentric, coincident, and distance mates.',
      'Interference and clearance collision detection under kinematic range-of-motion envelopes.',
      'Drafting ANSI/ISO standard multi-view projection drawings.'
    ],
    results: [
      'Successfully modeled multi-component aerospace frames and mobility mechanisms with zero mating interference.',
      'Produced detailed orthographic drawing sheets including top, front, side, and isometric sectional views.',
      'Parametric feature trees structured to allow rapid dimensional revisions and mass property evaluations.'
    ],
    limitations: [
      'Fabrication tolerances were simulated digitally and require tooling verification before physical production.',
      'Material properties were assigned mathematically; actual manufactured properties depend on manufacturing process.'
    ],
    futureWork: [
      'Perform generative design topology optimization on structural brackets to shave additional mass.',
      'Integrate CAM toolpath generation for 3-axis CNC milling operations.'
    ],
    images: [
      {
        src: '/projects/quadcopter/multiview_cad.png',
        alt: 'Engineering multi-view orthographic drawings for aerospace components',
        title: 'Engineering Orthographic Blueprints',
        caption: 'Top, front, side, and isometric wireframe bounds drafted for precision manufacturing.'
      },
      {
        src: '/projects/quadcopter/assembly_wireframe.png',
        alt: 'Airframe assembly wireframe render in Fusion 360',
        title: 'Airframe Structural Skeleton',
        caption: 'Parametric spatial assembly with motor mounts, central hub plates, and structural arms.'
      },
      {
        src: '/projects/quadcopter/propeller_cad.png',
        alt: 'Twisted aerofoil propeller CAD model',
        title: 'Parametric Aerofoil Propeller Geometry',
        caption: 'True twisted blade geometry generated from sectional aerofoil coordinate imports.'
      },
      {
        src: '/projects/quadcopter/render_full.png',
        alt: 'High-fidelity shaded CAD rendering',
        title: '3D Render & Clearance Verification',
        caption: 'Finished solid model rendering showing component placement and hardware fasteners.'
      }
    ],
    telemetry: [
      { label: 'Assembly Components', value: '42 parts', sub: 'Fully mated' },
      { label: 'Interference Status', value: '0.00 mm', sub: 'Zero collision' },
      { label: 'Drafting Standard', value: 'ISO / ANSI', sub: 'Engineering sheets' }
    ],
    disclaimer: 'CAD models represent digital engineering design work. Structural and physical testing claims are documented under specific analysis case studies.'
  },
  {
    id: 'uav-propeller-cfd',
    slug: 'uav-propeller-cfd',
    title: 'UAV Propeller Aerodynamic Analysis',
    category: 'cfd-aerodynamics',
    categoryLabel: 'CFD & Aerodynamics',
    shortDescription: 'Computational Fluid Dynamics study in ANSYS Fluent analyzing the flow field, pressure distribution, and aerodynamic thrust of a 10×4.5 propeller rotating at 6000 RPM.',
    detailedOverview: 'An in-depth aerodynamic evaluation of a twisted aerofoil UAV propeller operating in a rotating reference frame. Utilizing steady-state RANS with the k-omega SST turbulence model, the simulation maps pressure differential across blade surfaces, tip vortices, downwash wake development, and monitors coefficient convergence.',
    featured: true,
    status: 'Verified Simulation',
    date: 'Mar 2026 – Apr 2026',
    tools: ['ANSYS Fluent', 'ANSYS Meshing', 'CFD-Post', 'Fusion 360'],
    objectives: [
      'Quantify the thrust and drag forces generated by a 10×4.5 propeller at 6000 RPM.',
      'Capture surface static pressure contours on blade suction and pressure faces.',
      'Analyze blade-tip vortex shedding and downwash wake velocity magnitude profiles.',
      'Achieve algebraic solver convergence with residuals falling below 1e-5 error tolerances.'
    ],
    methodology: [
      'Fluid domain creation with stationary far-field envelope and rotating inner MRF zone.',
      'Fine poly-hexcore volume meshing with prism layer inflation along blade boundary walls (y+ targeted for k-omega SST).',
      'Boundary conditions: Velocity inlet (0 m/s hover condition), Pressure outlet (101,325 Pa), Rotating Frame (6000 RPM).',
      'Spatial discretization: Second-order upwind for pressure, momentum, turbulent kinetic energy, and specific dissipation rate.',
      'Continuous monitoring of Lift (Thrust) and Drag force coefficients across 300 iterations.'
    ],
    results: [
      'Thrust force validated at 14.0 N with lift coefficient (Cl) converging stably at ~0.35.',
      'Drag coefficient (Cd) stabilized at ~0.095, yielding an aerodynamic lift-to-drag ratio (L/D) of 3.68.',
      'Peak propeller blade tip speed captured at 41.4 m/s with clear suction zone acceleration.',
      'Solution residuals demonstrated monotonic convergence past 250 iterations without divergence.'
    ],
    limitations: [
      'Study evaluated isolated rotor condition without fuselage aerodynamic interference or ground effect.',
      'Steady-state MRF approximation does not capture transient unsteady blade-vortex blade interactions.'
    ],
    futureWork: [
      'Conduct sliding mesh transient simulations to resolve time-accurate acoustic noise and vortex shed frequency.',
      'Carry out experimental validation on a static thrust test bench with optical tachometer.'
    ],
    images: [
      {
        src: '/projects/quadcopter/cfd_vectors.png',
        alt: 'ANSYS Fluent rotor velocity vector flow lines',
        title: 'Velocity Vector Field in Rotating Frame',
        caption: 'Rotative boundary fluid velocity vectors displaying high-speed tip acceleration and downwash core.'
      },
      {
        src: '/projects/quadcopter/cfd_pressure.png',
        alt: 'Blade static pressure contour plot',
        title: 'Blade Surface Static Pressure Contours',
        caption: 'Pronounced pressure gradient between suction upper wall (negative gage) and lower pressure face.'
      },
      {
        src: '/projects/quadcopter/cfd_volumetric.png',
        alt: '3D particle streamline vectors tracking rotor wake',
        title: '3D Wake & Streamline Particle Traces',
        caption: 'Volumetric downwash jet wash and wake expansion downstream of propeller disc.'
      },
      {
        src: '/projects/quadcopter/plot_lift.png',
        alt: 'Convergence history monitor for lift coefficient',
        title: 'Lift Coefficient (Cl) Convergence',
        caption: 'Monitored force coefficient stabilizing smoothly around Cl = 0.35 in Fluent solver.'
      },
      {
        src: '/projects/quadcopter/plot_residuals.png',
        alt: 'Solver algebraic convergence residuals monitor',
        title: 'Solver Convergence Residual Log',
        caption: 'Continuity, velocities, k, and omega equations dropping comfortably past 1e-5 error tolerances.'
      }
    ],
    telemetry: [
      { label: 'Rotational Speed', value: '6000 RPM', sub: 'Boundary condition' },
      { label: 'Thrust Force', value: '14.0 N', sub: 'Net rotor lift' },
      { label: 'Lift Coeff (Cl)', value: '0.35', sub: 'Converged' },
      { label: 'Drag Coeff (Cd)', value: '0.095', sub: 'Converged' },
      { label: 'Max Tip Velocity', value: '41.4 m/s', sub: 'At blade tip' }
    ],
    chartTitle: 'ANSYS Fluent Force Convergence (Iterations vs Coefficients)',
    chartXLabel: 'Iteration',
    chartYLabel: 'Coefficient Value',
    chartData: [
      { iteration: 20, lift: 0.18, drag: 0.05, residual: 0.045 },
      { iteration: 50, lift: 0.28, drag: 0.078, residual: 0.009 },
      { iteration: 100, lift: 0.33, drag: 0.091, residual: 0.0018 },
      { iteration: 150, lift: 0.345, drag: 0.094, residual: 0.00042 },
      { iteration: 200, lift: 0.35, drag: 0.095, residual: 0.000085 },
      { iteration: 250, lift: 0.351, drag: 0.095, residual: 0.000021 },
      { iteration: 300, lift: 0.35, drag: 0.095, residual: 0.000009 }
    ]
  },
  {
    id: 'satellite-orbital-simulation',
    slug: 'satellite-orbital-simulation',
    title: 'Satellite Orbital Trajectory & CubeSat FEA Simulation',
    category: 'space-technology',
    categoryLabel: 'Space Technology',
    shortDescription: 'Orbital mechanics trajectory modeling in NASA GMAT alongside structural launch load and thermal analysis of a 1U CubeSat in Low Earth Orbit.',
    detailedOverview: 'An integrated space mission engineering project combining celestial mechanics and spacecraft structural integrity. Orbital parameters for a circular Low Earth Orbit were propagated in NASA GMAT to calculate ground tracks, eclipse cycles, and delta-v budgets. In tandem, ANSYS Mechanical was used to verify 10g quasi-static launch survival and extreme radiative thermal cycles (+120°C to -100°C).',
    featured: true,
    status: 'Verified Simulation',
    date: 'Jan 2026 – Feb 2026',
    tools: ['NASA GMAT', 'ANSYS Mechanical 2025 R2', 'Fusion 360', 'MATLAB'],
    objectives: [
      'Propagate a 500 km altitude circular LEO orbit using J2 gravitational perturbation models in GMAT.',
      'Compute orbital velocity, orbital period, ground-track repeat cycle, and eclipse durations.',
      'Evaluate 1U CubeSat chassis stress under 10g quasi-static launch acceleration loads.',
      'Perform steady-state thermal analysis between solar exposure (+120°C) and Earth-shadow eclipse (-100°C).'
    ],
    methodology: [
      'Keplerian orbital element definition (semi-major axis: 6878 km, inclination: 51.6°, eccentricity: 0.0001).',
      'Integration using Runge-Kutta 89 numerical propagator with J2 geopotential and solar radiation pressure.',
      'CAD assembly of 1U chassis (10×10×10 cm) modeled with standard aluminum 6061-T6 rails and solar cell arrays.',
      'Finite element meshing in ANSYS Mechanical with bonded contacts representing structural fasteners.',
      'Boundary conditions: 10g axial acceleration fixed at dispenser deployment rails.'
    ],
    results: [
      'Orbital velocity established at 7.62 km/s with an orbital period of 94.47 minutes (15.2 orbits/day).',
      'Structural FEA confirmed maximum Von Mises stress of only 6.55×10⁻⁴ MPa under 10g, yielding a safety factor > 10,000 against aluminum yield (276 MPa).',
      'Total structural displacement remained under 1.63×10⁻⁶ mm, ensuring payload optics and circuit board clearance.',
      'Thermal gradient maps demonstrated survivable internal temperatures when passive surface emissivity is tuned.'
    ],
    limitations: [
      'Atmospheric drag was approximated using a static atmospheric model without solar flux variation indices.',
      'Thermal model assumes steady-state extremes rather than full transient orbital thermal cycle hysteresis.'
    ],
    futureWork: [
      'Incorporate transient thermal simulations including internal electronic component power dissipation.',
      'Design active magnetic torquer attitude control (ADCS) B-dot detumbling simulation in MATLAB.'
    ],
    images: [
      {
        src: '/projects/cubesat/cubesat_assembly.png',
        alt: '1U CubeSat modular chassis assembly in Fusion 360',
        title: '1U Modular CubeSat CAD Assembly',
        caption: '10×10×10 cm aluminum 6061-T6 structural rail system designed to Cal Poly CubeSat design specifications.'
      },
      {
        src: '/projects/cubesat/fea_stress.png',
        alt: 'ANSYS Mechanical equivalent von-Mises stress contour under 10g',
        title: 'Structural Stress Under 10g Launch Load',
        caption: 'FEA stress distribution confirming negligible structural deformation well below material yield boundaries.'
      },
      {
        src: '/projects/cubesat/thermal_hot.png',
        alt: 'Direct solar exposure hot case temperature contour',
        title: 'Hot Case (+120.39°C) Solar Thermal Distribution',
        caption: 'Thermal radiation equilibrium contour under unfiltered direct sunlight in low Earth orbit.'
      },
      {
        src: '/projects/cubesat/thermal_cold.png',
        alt: 'Eclipse cold case temperature profile',
        title: 'Cold Case (-100.00°C) Eclipse Profile',
        caption: 'Deep space radiative cooling equilibrium when eclipsed inside Earth shadow cone.'
      }
    ],
    telemetry: [
      { label: 'Orbital Altitude', value: '500 km', sub: 'Circular LEO' },
      { label: 'Orbital Speed', value: '7.62 km/s', sub: 'Keplerian velocity' },
      { label: 'Orbital Period', value: '94.47 min', sub: '15.2 orbits / day' },
      { label: 'Launch Load', value: '10.0 G', sub: 'Axial acceleration' },
      { label: 'Max Stress', value: '6.55e-4 MPa', sub: 'SF >> 100' }
    ]
  },
  {
    id: 'matlab-flight-dynamics',
    slug: 'matlab-flight-dynamics',
    title: 'MATLAB Flight Dynamics and Engineering Computation',
    category: 'flight-dynamics',
    categoryLabel: 'Flight Dynamics & Control',
    shortDescription: 'Mathematical modeling and closed-loop PID altitude control simulation for multirotor aerial vehicles developed in MATLAB and Simulink.',
    detailedOverview: 'Flight dynamics calculations and numerical simulation environment solving governing equations of motion for aerial systems. Includes numerical integration of longitudinal dynamics, 1D/6-DOF state-space formulations, atmospheric properties variation with altitude, and real-time PID feedback control tuning to minimize overshoot and settling time.',
    featured: true,
    status: 'Verified Simulation',
    date: 'Feb 2026 – Apr 2026',
    tools: ['MATLAB', 'Simulink', 'Control System Toolbox', 'Stateflow'],
    objectives: [
      'Derive second-order equations of motion for quadcopter vertical altitude dynamics.',
      'Implement Proportional-Integral-Derivative (PID) control algorithm in Simulink.',
      'Tune Kp, Ki, and Kd gain coefficients to achieve zero steady-state error with <10% overshoot.',
      'Analyze stability margins and step response under step command setpoints and simulated wind turbulence.'
    ],
    methodology: [
      'State-space formulation: vertical acceleration modeled as net thrust divided by mass minus gravitational acceleration.',
      'Motor lag incorporated via first-order actuator delay transfer function (tau = 0.05 s).',
      'PID controller formulated: u(t) = Kp * e(t) + Ki * integral(e) + Kd * de/dt with anti-windup clamping.',
      'Numerical integration evaluated with variable-step Runge-Kutta Dormand-Prince solver (ode45).',
      'Root-locus and bode frequency domain response validation.'
    ],
    results: [
      'Target altitude step response stabilized within 1.8 seconds settling time.',
      'Overshoot kept strictly below 8.4%, ensuring smooth passenger or sensor stabilization.',
      'Steady-state error dropped to 0.000% via integral correction.',
      'Robust disturbance rejection when subjected to random vertical wind gusts.'
    ],
    limitations: [
      'Assumed linearized aerodynamics near the hover operating point.',
      'Sensor noise was modeled as Gaussian white noise without accelerometer bias drift.'
    ],
    futureWork: [
      'Expand to full non-linear 6-DOF quaternion flight dynamics model including roll, pitch, and yaw coupling.',
      'Implement Linear Quadratic Regulator (LQR) and Model Predictive Control (MPC) algorithms.'
    ],
    images: [
      {
        src: '/projects/quadcopter/fea_deformation.png',
        alt: 'Multirotor airframe deflection response',
        title: 'Structural Deflection Dynamics',
        caption: 'Coupled aeroelastic vibration and deflection bounds factored into rigid-body dynamics.'
      },
      {
        src: '/projects/quadcopter/multiview_cad.png',
        alt: 'Vehicle mass moments of inertia derivation',
        title: 'Inertia & Mass Properties Matrix',
        caption: 'CAD-derived CG coordinates and inertia tensor values utilized in MATLAB flight equations.'
      }
    ],
    telemetry: [
      { label: 'Settling Time', value: '1.80 s', sub: '2% criterion' },
      { label: 'Max Overshoot', value: '8.4%', sub: 'Target < 10%' },
      { label: 'Steady-State Error', value: '0.00%', sub: 'Zero bias' },
      { label: 'Damping Ratio', value: 'zeta = 0.72', sub: 'Near-critically damped' }
    ],
    chartTitle: 'Step Response: Altitude vs Target (Simulink Solver)',
    chartXLabel: 'Time (seconds)',
    chartYLabel: 'Altitude (metres)',
    chartData: [
      { time: 0.0, altitude: 0.0, target: 5.0 },
      { time: 0.4, altitude: 1.2, target: 5.0 },
      { time: 0.8, altitude: 3.6, target: 5.0 },
      { time: 1.2, altitude: 5.4, target: 5.0 },
      { time: 1.6, altitude: 5.2, target: 5.0 },
      { time: 2.0, altitude: 5.05, target: 5.0 },
      { time: 2.5, altitude: 5.0, target: 5.0 },
      { time: 3.0, altitude: 5.0, target: 5.0 }
    ]
  },
  {
    id: 'avionics-panel-prototype',
    slug: 'avionics-panel-prototype',
    title: 'Laser-Cut Avionics Panel & Hardware Prototyping',
    category: 'avionics',
    categoryLabel: 'Avionics & Prototyping',
    shortDescription: 'Engineering prototyping project focusing on cockpit instrument layout, laser fabrication, component mounting, and embedded wiring during Kalam Pragati internship.',
    detailedOverview: 'Developed during the MakeX internship program at Kalam Pragati (AKTU Lucknow & ERA Foundation). The project centered on CAD layout of an aerospace avionics switch and telemetry display panel, laser-cut acrylic fabrication, component clearances, tactile switch harness wiring, and microcontroller integration.',
    featured: true,
    status: 'Prototyped',
    date: 'Aug 2025 – Sep 2025',
    tools: ['AutoCAD', 'Laser Cutting (CO2)', '3D Printing', 'Arduino IDE', 'Soldering'],
    objectives: [
      'Design an ergonomic instrument panel layout for avionics indicators and toggles.',
      'Translate 2D CAD DXF files into laser cutter kerf-compensated vector paths.',
      'Manufacture physical panel from 3mm acrylic and 3D print bespoke mounting standoffs.',
      'Integrate electrical wiring harness and verify mechanical stability under button actuation.'
    ],
    methodology: [
      'Human factors and ergonomics assessment for primary flight display and toggle switch spacing.',
      'Vector geometry drafting in AutoCAD with exact switch cutouts (round and D-shaft profiles).',
      'Test cuts performed on scrap MDF to measure kerf and fine-tune press-fit tolerances.',
      'Component assembly using M3 brass inserts, nylon spacers, and heat-shrink insulated wiring.',
      'Microcontroller pin assignment and continuity verification using digital multimeters.'
    ],
    results: [
      'Fabricated a clean, functional avionics faceplate with zero panel flex or component interference.',
      'All switches, OLED displays, and status LEDs snapped into engineered friction-fit sockets cleanly.',
      'Prototyping methodology validated for rapid bench-test instrument packaging.'
    ],
    limitations: [
      'Acrylic material chosen for benchtop demonstration; flight-grade panels would require aerospace aluminum or polycarbonate.',
      'Vibration testing was qualitative rather than shaker-table certified.'
    ],
    futureWork: [
      'Integrate CAN bus protocol communication for distributed avionics bus architecture.',
      'Add backlighting layer using surface-mount LEDs and diffused light-guide acrylic.'
    ],
    images: [
      {
        src: '/projects/cardioguard/circuit.jpg',
        alt: 'Hardware wiring harness and microcontroller breadboard setup',
        title: 'Avionics Wire Routing & Microcontroller Testbench',
        caption: 'Harness layout, sensor wiring, and microcontroller communication bus checkout.'
      },
      {
        src: '/projects/cardioguard/1757696137634.jpg',
        alt: 'Rapid prototyped hardware enclosure and faceplate',
        title: 'Assembled Hardware Enclosure',
        caption: 'Fabricated enclosure showcasing flush component mounting and ergonomic indicator placement.'
      }
    ],
    telemetry: [
      { label: 'Panel Material', value: '3.0 mm Acrylic', sub: 'CO2 Laser Cut' },
      { label: 'Mounting Hardware', value: 'M3 Brass Inserts', sub: 'Vibration proof' },
      { label: 'Bus Voltage', value: '3.3V / 5.0V', sub: 'Regulated rail' }
    ]
  },
  {
    id: 'iot-health-monitoring',
    slug: 'iot-health-monitoring',
    title: 'IoT-Based Health Monitoring Prototype (CardioGuard)',
    category: 'embedded-systems',
    categoryLabel: 'Embedded Systems & IoT',
    shortDescription: 'Wearable IoT vitals monitoring prototype combining AD8232 ECG, MAX30102 PPG, ESP8266 Wi-Fi telemetry, ThingSpeak analytics, and emergency Telegram broadcasts.',
    detailedOverview: 'An educational embedded systems prototype designed to explore physiological telemetry capture and wireless cloud streaming. The device gathers continuous heart rate (BPM) and optical pulse data, processes signals on an ESP8266 MCU, uploads telemetry to a ThingSpeak dashboard, and broadcasts emergency alerts via the Telegram Bot API when critical threshold criteria are exceeded.',
    featured: true,
    status: 'Completed',
    date: 'Aug 2025 – Sep 2025',
    tools: ['ESP8266 NodeMCU', 'AD8232 ECG', 'MAX30102', 'ThingSpeak', 'Telegram API', 'Onshape', '3D Printing'],
    objectives: [
      'Interface analog ECG and I2C optical pulse oximeter sensors to ESP8266 microcontrollers.',
      'Implement real-time digital filtering to isolate heart beat peaks from noise artifacts.',
      'Transmit vitals packets over Wi-Fi to a remote cloud dashboard every 15 seconds.',
      'Trigger instant automated Telegram emergency push notifications upon anomaly detection.'
    ],
    methodology: [
      'Circuit design connecting MAX30102 over I2C and AD8232 over analog ADC with lead-off detection pins.',
      'Moving-average digital filter formulated in Arduino C++ firmware to reject 50Hz mains noise.',
      'REST API HTTP POST requests structured to send field data to ThingSpeak cloud channels.',
      'HTTPS TLS handshake implementation to interact securely with the Telegram Bot API webhook.',
      'Custom ergonomic wearable enclosure drafted in Onshape and manufactured via FDM 3D printing.'
    ],
    results: [
      'Successfully captured continuous heart rate data and plotted live graphs on ThingSpeak.',
      'Telegram alerts reliably dispatched within 2.4 seconds of anomalous heart rate triggers.',
      'Completed a working physical prototype package in a custom 3D-printed enclosure.'
    ],
    limitations: [
      'Photoplethysmography (PPG) readings are sensitive to motion artifacts during vigorous activity.',
      'Requires constant Wi-Fi connectivity to transmit telemetry and dispatch push notifications.'
    ],
    futureWork: [
      'Incorporate Bluetooth Low Energy (BLE 5.0) for phone-direct streaming when Wi-Fi is unavailable.',
      'Implement on-device tinyML model for arrhythmia classification on an ESP32-S3.'
    ],
    images: [
      {
        src: '/projects/cardioguard/1757696137634.jpg',
        alt: 'CardioGuard 3D printed wearable prototype front view',
        title: 'Physical Working Hardware Prototype',
        caption: 'Compact 3D-printed case designed in Onshape housing ESP8266, sensor breakout, and battery.'
      },
      {
        src: '/projects/cardioguard/circuit.jpg',
        alt: 'Circuit wiring and sensor breadboard test',
        title: 'Sensor Interface & Breadboard Wiring',
        caption: 'AD8232 ECG electrode connections and MAX30102 optical sensor wiring checkout.'
      },
      {
        src: '/projects/cardioguard/thingskepak.jpg',
        alt: 'ThingSpeak cloud telemetry dashboard screenshot',
        title: 'ThingSpeak Real-Time Cloud Telemetry',
        caption: 'Live time-series stream tracking heart rate BPM readings over continuous runtime.'
      },
      {
        src: '/projects/cardioguard/1757696179914.jpg',
        alt: 'Telegram bot emergency alert message screenshot',
        title: 'Automated Telegram Bot Emergency Alert',
        caption: 'Real-time mobile push alert dispatched automatically upon abnormal heart rate threshold.'
      }
    ],
    telemetry: [
      { label: 'Microcontroller', value: 'ESP8266 NodeMCU', sub: '80 MHz Tensilica' },
      { label: 'Sensors', value: 'MAX30102 + AD8232', sub: 'PPG & 3-lead ECG' },
      { label: 'Cloud Latency', value: '2.40 s', sub: 'Alert dispatch' },
      { label: 'Report Available', value: 'PDF Document', sub: 'Verified report' }
    ],
    reportUrl: '/projects/cardioguard/project report.pdf',
    disclaimer: 'This project is presented as an educational prototype, not a certified medical device. Its measurements and alerts should not be used as a substitute for professional medical assessment.'
  },
  {
    id: 'sudden-contraction-pipe-flow',
    slug: 'sudden-contraction-pipe-flow',
    title: 'ANSYS Mastery — Sudden Contraction Pipe Flow CFD',
    category: 'cfd-aerodynamics',
    categoryLabel: 'CFD & Fluid Dynamics',
    shortDescription: 'Transient CFD analysis modeling fluid acceleration, velocity gradients, and pressure drop through an abrupt pipe diameter contraction from 80 mm to 40 mm in ANSYS Fluent.',
    detailedOverview: 'A focused internal fluid mechanics simulation evaluating the vena contracta phenomenon and flow acceleration across a sudden area contraction. A structured quad mesh with localized inflation boundary layers captures wall shear stresses and high velocity gradients, validated through 164 iterations of monotonic convergence.',
    featured: false,
    status: 'Verified Simulation',
    date: 'Jun 2026',
    tools: ['ANSYS Workbench', 'ANSYS Fluent', 'CFD-Post', 'DesignModeler'],
    objectives: [
      'Model 2D axisymmetric fluid dynamics across an 80 mm to 40 mm diameter pipe constriction.',
      'Investigate pressure drop and velocity acceleration from inlet to throat.',
      'Achieve solver convergence below 1e-6 error tolerance limits.',
      'Extract streamline animations to visualize recirculation zones in corners.'
    ],
    methodology: [
      'Geometry modeling in DesignModeler with structured 2D planar quad mesh.',
      'Mesh refinement near contraction plane to resolve vena contracta velocity peaks.',
      'Inlet velocity boundary: 0.14 m/s; Outlet: 0 Pa gauge pressure.',
      'Incompressible Navier-Stokes solver with laminar / low-Re formulation.'
    ],
    results: [
      'Flow accelerated monotonically from 0.14 m/s at the inlet to 8.16 m/s at the contraction throat.',
      'Solver converged robustly at 164 iterations with residuals well below 1e-6.',
      'Clear secondary recirculation vortex captured in the upstream contraction corner.'
    ],
    limitations: [
      'Assumed isothermal, single-phase Newtonian fluid conditions.',
      'Modeled as 2D planar rather than full 3D rough-wall conduit.'
    ],
    futureWork: [
      'Evaluate turbulent Reynolds numbers (> 4000) with Reynolds Stress Model (RSM).',
      'Compare numerical minor loss coefficient (Kc) against empirical engineering handbooks.'
    ],
    images: [
      {
        src: '/projects/pipeflow/streamlines_3d.png',
        alt: '3D velocity streamline traces showing fluid acceleration in ANSYS CFD-Post',
        title: 'CFD-Post Velocity Streamlines',
        caption: 'Streamlines colored by velocity magnitude highlighting rapid acceleration at constriction throat.'
      },
      {
        src: '/projects/pipeflow/pathlines_velocity.png',
        alt: 'Velocity pathlines contour plot across pipe contraction',
        title: 'Velocity Magnitude Pathlines',
        caption: 'Detailed velocity contours showing speed spike up to 8.16 m/s in the narrow pipe section.'
      },
      {
        src: '/projects/pipeflow/residuals_convergence.png',
        alt: 'Fluent algebraic solver residuals convergence log',
        title: 'Algebraic Residuals Convergence Log',
        caption: 'Continuity and momentum residuals dropping below 1e-6 tolerance at 164 iterations.'
      }
    ],
    telemetry: [
      { label: 'Inlet Diameter', value: '80.0 mm', sub: 'Upstream duct' },
      { label: 'Throat Diameter', value: '40.0 mm', sub: 'Constricted section' },
      { label: 'Peak Velocity', value: '8.16 m/s', sub: 'Throat acceleration' },
      { label: 'Convergence', value: '164 iterations', sub: '< 1e-6 residual' }
    ]
  }
];
