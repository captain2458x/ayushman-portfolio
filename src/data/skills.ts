import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    title: 'CAD & Engineering Design',
    description: 'Parametric solid modelling, assembly constraints, GD&T, and engineering drawing production.',
    skills: [
      'SolidWorks',
      'AutoCAD',
      'Onshape',
      'Autodesk Fusion 360',
      'Tinkercad',
      'Orthographic Drafting'
    ],
    exampleProjects: [
      { title: 'Aerospace CAD Modelling', slug: 'aerospace-cad-modelling' },
      { title: 'Laser-Cut Avionics Panel', slug: 'avionics-panel-prototype' }
    ]
  },
  {
    title: 'Simulation & Computational Analysis',
    description: 'Computational fluid dynamics, finite element structural analysis, and control loop formulation.',
    skills: [
      'ANSYS Fluent (CFD)',
      'ANSYS Mechanical (FEA)',
      'ANSYS Workbench',
      'CFD-Post',
      'MATLAB',
      'Simulink'
    ],
    exampleProjects: [
      { title: 'UAV Propeller Aerodynamics', slug: 'uav-propeller-cfd' },
      { title: 'MATLAB Flight Dynamics', slug: 'matlab-flight-dynamics' },
      { title: 'Pipe Flow Contraction CFD', slug: 'sudden-contraction-pipe-flow' }
    ]
  },
  {
    title: 'Space Technology & Orbital Mechanics',
    description: 'Trajectory propagation, Keplerian elements, ground track plotting, and mission delta-v budgets.',
    skills: [
      'NASA GMAT',
      'Orbital Trajectory Propagation',
      'Keplerian Orbit Mechanics',
      'LEO Mission Analysis',
      'Remote Sensing (ISRO / IIRS)'
    ],
    exampleProjects: [
      { title: 'Satellite Orbital Simulation', slug: 'satellite-orbital-simulation' }
    ]
  },
  {
    title: 'Programming & Computation',
    description: 'Engineering numerical scripts, algorithmic controls, firmware, and scientific computing.',
    skills: [
      'Python',
      'MATLAB Scripting',
      'C / C++',
      'HTML / CSS',
      'Git & Version Control'
    ],
    exampleProjects: [
      { title: 'MATLAB Flight Dynamics', slug: 'matlab-flight-dynamics' }
    ]
  },
  {
    title: 'Embedded Systems & Prototyping',
    description: 'Microcontroller hardware interfacing, sensor bus telemetry, and digital fabrication.',
    skills: [
      'ESP8266 NodeMCU',
      'Arduino IDE',
      'Sensor Integration (I2C / ADC / UART)',
      'ThingSpeak Cloud IoT',
      'FDM 3D Printing',
      'Laser Cutting (CO2)'
    ],
    exampleProjects: [
      { title: 'CardioGuard IoT Health Monitor', slug: 'iot-health-monitoring' },
      { title: 'Avionics Prototyping Panel', slug: 'avionics-panel-prototype' }
    ]
  }
];
