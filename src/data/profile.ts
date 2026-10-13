/**
 * Central Profile Data for Ayushman Srivastava
 * Note: Update verified fields here directly to reflect across the entire portfolio.
 */

export interface ProfileData {
  name: string;
  shortName: string;
  monogram: string;
  profession: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  classYear: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string; // Configurable field
  resumeUrl: string;
  isAvailableForOpportunities: boolean;
  availabilityLabel: string;
  hero: {
    eyebrow: string;
    headline: string;
    secondaryLine: string;
    introduction: string;
  };
  about: {
    headline: string;
    paragraphs: string[];
  };
  careerInterests: string[];
}

export const profileData: ProfileData = {
  name: "Ayushman Srivastava",
  shortName: "Ayushman",
  monogram: "AS",
  profession: "B.Tech Aeronautical Engineering Student",
  degree: "B.Tech in Aeronautical Engineering",
  institution: "Feroze Gandhi Institute of Engineering & Technology",
  location: "Rae Bareli, Uttar Pradesh, India",
  duration: "2023–2027",
  classYear: "Class of 2027",
  email: "ayushmansrivastava2506@gmail.com",
  phone: "+91 94735 12071",
  linkedin: "https://www.linkedin.com/in/ayushmansrivastavaofficial/",
  github: "https://github.com/captain2458x", // Configurable GitHub profile
  resumeUrl: "/resume/resume.pdf", // Verified PDF present in /public/resume/
  isAvailableForOpportunities: true,
  availabilityLabel: "Available for Aerospace Internships & Research (Summer 2026)",
  hero: {
    eyebrow: "AERONAUTICAL ENGINEERING | CLASS OF 2027",
    headline: "Designing the Future of Flight.",
    secondaryLine: "From aerodynamic concepts to engineering simulations.",
    introduction:
      "I am Ayushman Srivastava, a B.Tech Aeronautical Engineering student interested in aerospace design, computational fluid dynamics, flight dynamics, and space technology. I enjoy exploring engineering problems through CAD modelling, simulation, programming, and practical prototyping."
  },
  about: {
    headline: "Engineering Curiosity into Capability.",
    paragraphs: [
      "I am an Aeronautical Engineering undergraduate at Feroze Gandhi Institute of Engineering & Technology, Rae Bareli, Uttar Pradesh.",
      "My technical interests include aircraft design, aerodynamic analysis, computational simulation, flight dynamics, and space technology.",
      "Through academic projects, technical exploration, and practical prototyping, I aim to strengthen my ability to understand engineering problems and communicate technical solutions clearly.",
      "I am particularly interested in the relationship between engineering design, simulation results, and real-world performance."
    ]
  },
  careerInterests: [
    "Aerodynamics & CFD",
    "CAD Modelling & Parametric Design",
    "Flight Dynamics & Control Loops",
    "Space Technology & Orbital Mechanics",
    "UAV Systems & Propeller Aerodynamics",
    "Avionics & Embedded IoT Prototyping"
  ]
};
