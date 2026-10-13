import { ResearchInterestItem } from '../types';

export const researchInterestsData: ResearchInterestItem[] = [
  {
    id: 'uav-aerodynamics',
    title: 'UAV Rotor Aerodynamics & Wake Interactions',
    type: 'Completed Project',
    summary: 'Investigation of small-scale multirotor propeller aerodynamics under varying advance ratios and high angular velocities (6000 RPM). Focuses on surface boundary layer development, pressure differentials, and tip vortex shedding.',
    keyTopics: [
      'Rotating Reference Frame (MRF) formulation in CFD',
      'k-omega Shear Stress Transport (SST) turbulence modelling',
      'Downwash wake contraction and ground effect interactions',
      'Thrust and power coefficient quantification'
    ],
    applicableTools: ['ANSYS Fluent', 'CFD-Post', 'Fusion 360']
  },
  {
    id: 'orbital-mechanics',
    title: 'Satellite Trajectory Propagation & Mission Analysis',
    type: 'Completed Project',
    summary: 'Simulation of Low Earth Orbit (LEO) trajectories using numerical integrators to evaluate perturbation effects, Keplerian orbital element drift, eclipse duration windows, and ground station pass intervals.',
    keyTopics: [
      'J2 geopotential zonal harmonic perturbation modelling',
      'Keplerian to Cartesian state vector coordinate transformation',
      'Orbital lifetime estimation and atmospheric drag decay',
      'Delta-V budget formulation for orbital plane adjustments'
    ],
    applicableTools: ['NASA GMAT', 'MATLAB', 'Keplerian Ephemeris']
  },
  {
    id: 'flight-control-systems',
    title: 'Closed-Loop Flight Dynamics & Control Loop Formulation',
    type: 'Current Learning Activity',
    summary: 'Mathematical formulation of non-linear rigid-body aircraft equations of motion. Exploring feedback attitude stabilization, altitude control algorithms, and sensor fusion for autonomous aerial systems.',
    keyTopics: [
      'Second-order state-space dynamic modelling',
      'PID gain tuning, anti-windup, and damping ratio optimization',
      'Transfer function analysis and root locus frequency response',
      'Disturbance rejection under atmospheric turbulence gusts'
    ],
    applicableTools: ['MATLAB / Simulink', 'Control System Toolbox', 'Python']
  },
  {
    id: 'cubesat-thermal-structural',
    title: 'SmallSat Structural Integrity & Orbital Thermal Dynamics',
    type: 'Current Learning Activity',
    summary: 'Coupled multiphysics analysis of standard 1U/3U CubeSat bus frames. Evaluating structural survivability during high-g rocket launch phase and deep-space radiative equilibrium cycling.',
    keyTopics: [
      'Quasi-static launch load acceleration FEA (10g axial/lateral)',
      'Solar radiation absorption vs deep-space infrared emission',
      'Thermal gradient management across avionics payload stacks',
      'Aluminum 6061-T6 structural rail and fastener design'
    ],
    applicableTools: ['ANSYS Mechanical', 'Fusion 360', 'Thermal FEA']
  },
  {
    id: 'hypersonic-and-reentry',
    title: 'High-Speed Aerodynamics & Compressible Flow',
    type: 'Future Research Interest',
    summary: 'Theoretical exploration of supersonic and hypersonic flow regimes, shock wave boundary layer interactions (SWBLI), aerodynamic heating, and atmospheric re-entry vehicle trajectories.',
    keyTopics: [
      'Oblique shocks and Prandtl-Meyer expansion waves',
      'Stagnation temperature and aerothermodynamic heating loads',
      'Waverider waverider and lifting body aerodynamic concepts',
      'High-enthalpy real gas effects in re-entry regimes'
    ],
    applicableTools: ['Compressible Flow Theory', 'CFD Solvers', 'MATLAB']
  },
  {
    id: 'ai-in-aerospace',
    title: 'Machine Learning for Aerodynamic Surrogate Modeling',
    type: 'Future Research Interest',
    summary: 'Applying physics-informed neural networks (PINNs) and surrogate regression models to accelerate computational fluid dynamics evaluations and real-time flight telemetry anomaly detection.',
    keyTopics: [
      'Aerodynamic coefficient prediction from aerofoil coordinates',
      'Reduced-order modeling (ROM) for rapid design space exploration',
      'Telemetry anomaly detection for embedded avionics',
      'Reinforcement learning for adaptive flight control'
    ],
    applicableTools: ['Python', 'PyTorch / Scikit-learn', 'CFD Dataset Synthesis']
  }
];
