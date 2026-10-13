export type ThemeId = 'deep-space' | 'aerospace-light' | 'midnight-violet';

export type ProjectCategoryKey = 
  | 'all'
  | 'aerospace-cad'
  | 'cfd-aerodynamics'
  | 'flight-dynamics'
  | 'space-technology'
  | 'avionics'
  | 'embedded-systems';

export interface ProjectImage {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  placeholder?: string;
}

export interface TelemetryDatum {
  label: string;
  value: string;
  sub?: string;
}

export interface SimulationChartPoint {
  iteration: number;
  residual?: number;
  lift?: number;
  drag?: number;
  time?: number;
  altitude?: number;
  target?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategoryKey;
  categoryLabel: string;
  shortDescription: string;
  detailedOverview: string;
  featured: boolean;
  status: 'Completed' | 'Verified Simulation' | 'Prototyped' | 'Documentation in progress' | 'Awaiting verified results';
  date: string;
  tools: string[];
  objectives: string[];
  methodology: string[];
  results: string[];
  limitations: string[];
  futureWork: string[];
  images: ProjectImage[];
  telemetry?: TelemetryDatum[];
  chartData?: SimulationChartPoint[];
  chartTitle?: string;
  chartXLabel?: string;
  chartYLabel?: string;
  isIllustrativeData?: boolean;
  reportUrl?: string;
  githubUrl?: string;
  disclaimer?: string;
}

export interface ExperienceItem {
  id: string;
  organisation: string;
  programme?: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  coordinates: string;
  description: string[];
  tools: string[];
  verifiedContext: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  exampleProjects?: { title: string; slug: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score?: string;
  coursework?: string[];
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
  description: string;
}

export interface ResearchInterestItem {
  id: string;
  title: string;
  type: 'Completed Project' | 'Current Learning Activity' | 'Future Research Interest';
  summary: string;
  keyTopics: string[];
  applicableTools: string[];
}
