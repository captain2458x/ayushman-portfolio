import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'kalam-pragati',
    organisation: 'Kalam Pragati',
    programme: 'MakeX Program',
    role: 'Rapid Prototyping Intern',
    startDate: 'Aug 2025',
    endDate: 'Sep 2025',
    location: 'Lucknow, UP, India',
    coordinates: '26.8467° N, 80.9462° E',
    verifiedContext: 'MakeX internship program powered by ERA Foundation in Association with Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow.',
    tools: ['AutoCAD', 'CO2 Laser Cutting', '3D Printing (FDM)', 'ESP8266', 'Arduino IDE'],
    description: [
      'Gained hands-on exposure to computer-aided engineering tools and rapid digital prototyping workflows.',
      'Designed bespoke laser-cut acrylic chassis and mounting enclosures using AutoCAD, factoring in material kerf tolerances.',
      'Utilized FDM 3D printing for structural brackets and precision hardware standoffs.',
      'Supported IoT-based avionics and telemetry projects using Arduino IDE and ESP8266 for automated sensor data acquisition.',
      'Collaborated in a multidisciplinary sprint team environment to conceptualize, fabricate, and iteratively test physical mechanisms.'
    ]
  },
  {
    id: 'star-aerospace',
    organisation: 'Space Technology & Aeronautical Rocketry (STAR)',
    role: 'Spacecraft Trajectory Intern',
    startDate: 'Aug 2024',
    endDate: 'Sep 2024',
    location: 'Surat, Gujarat, India',
    coordinates: '21.1702° N, 72.8311° E',
    verifiedContext: 'Internship focused on celestial mechanics, satellite orbital dynamics, and mission planning tools.',
    tools: ['NASA GMAT', 'Keplerian Mechanics', 'MATLAB', 'Orbital Propagation'],
    description: [
      'Developed and simulated satellite orbital trajectories using NASA\'s General Mission Analysis Tool (GMAT).',
      'Configured spacecraft physical properties, drag coefficients, and gravitational perturbations (J2 geopotential models).',
      'Modeled Keplerian orbital elements to compute mission delta-v budgets and verify ground-track coverage cycles in Low Earth Orbit.',
      'Analyzed spacecraft eclipse entry and exit timelines to support solar array power budgeting.'
    ]
  }
];
