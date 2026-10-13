import React from 'react';
import { PenTool, Wind, Compass, Globe2, Cpu, ArrowRight } from 'lucide-react';
import SoundManager from '../../../utils/audio';

interface HangarSkill {
  id: string;
  category: string;
  tools: string[];
  description: string;
  projectSlug: string;
  projectTitle: string;
  badge: string;
  color: string;
}

const HANGAR_SKILLS: HangarSkill[] = [
  {
    id: 'cad',
    category: 'CAD & Design',
    tools: ['SolidWorks', 'AutoCAD', 'Onshape', 'Fusion 360'],
    description: 'Parametric solid modelling, tolerance stacking, and precision engineering drawings.',
    projectSlug: 'aerospace-cad-modelling',
    projectTitle: 'Aerospace CAD Modelling',
    badge: 'MODELING',
    color: '#0284C7'
  },
  {
    id: 'cfd',
    category: 'Simulation & CFD',
    tools: ['ANSYS Fluent', 'Meshing', 'CFD-Post', 'MATLAB'],
    description: 'Compressible and incompressible computational fluid dynamics with boundary layer physics.',
    projectSlug: 'uav-propeller-cfd',
    projectTitle: 'UAV Propeller CFD',
    badge: 'AERODYNAMICS',
    color: '#0EA5E9'
  },
  {
    id: 'flight',
    category: 'Flight Dynamics',
    tools: ['MATLAB / Simulink', 'Control Systems', 'Flight Mechanics'],
    description: 'Second-order state-space formulation, altitude PID loops, and aerodynamic stability.',
    projectSlug: 'matlab-flight-dynamics',
    projectTitle: 'MATLAB Flight Dynamics',
    badge: 'DYNAMICS',
    color: '#D97706'
  },
  {
    id: 'space',
    category: 'Space Technology',
    tools: ['NASA GMAT', 'Keplerian Elements', 'Orbital Propagation'],
    description: 'LEO spacecraft trajectories, delta-v budgeting, and celestial gravity harmonics.',
    projectSlug: 'satellite-orbital-simulation',
    projectTitle: 'Satellite Orbital Simulation',
    badge: 'ORBITAL',
    color: '#6366F1'
  },
  {
    id: 'prototyping',
    category: 'Hardware & Prototyping',
    tools: ['Python', 'C/C++', 'ESP8266', '3D Printing', 'Laser Cutting'],
    description: 'Microcontroller bus wiring, telemetry streaming, and rapid mechanical fabrication.',
    projectSlug: 'iot-health-monitoring',
    projectTitle: 'CardioGuard IoT System',
    badge: 'EMBEDDED',
    color: '#059669'
  }
];

interface HangarSkillsDisplayProps {
  onSelectProject: (slug: string) => void;
}

export default function HangarSkillsDisplay({ onSelectProject }: HangarSkillsDisplayProps) {
  return (
    <div className="space-y-6">
      
      {/* Hangar Title Banner */}
      <div className="text-center max-w-xl mx-auto space-y-1">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block">
          TOOLING BAYS & PROFICIENCIES
        </span>
        <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">
          Engineering Toolkits & Capabilities
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-600">
          The software packages, physics codes, and prototyping tools Ayushman uses in practice.
        </p>
      </div>

      {/* 5 Hangar Display Bays (Compact, clean cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HANGAR_SKILLS.map((skill, idx) => (
          <div
            key={skill.id}
            className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            {/* Top Bay Indicator Accent */}
            <div 
              className="absolute top-0 inset-x-0 h-1"
              style={{ backgroundColor: skill.color }}
            />

            <div className="space-y-2.5">
              {/* Header Icon & Badge */}
              <div className="flex items-center justify-between">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: skill.color }}
                >
                  {skill.id === 'cad' && <PenTool size={18} />}
                  {skill.id === 'cfd' && <Wind size={18} />}
                  {skill.id === 'flight' && <Compass size={18} />}
                  {skill.id === 'space' && <Globe2 size={18} />}
                  {skill.id === 'prototyping' && <Cpu size={18} />}
                </div>

                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  BAY 0{idx + 1} • {skill.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="font-display font-bold text-base text-slate-900">
                  {skill.category}
                </h4>
                <p className="font-sans text-xs text-slate-600 mt-1 leading-snug">
                  {skill.description}
                </p>
              </div>

              {/* Tools Pill List */}
              <div className="flex flex-wrap gap-1 pt-1">
                {skill.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-800 border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Jump to Related Project Link */}
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between font-mono text-[11px]">
              <button
                type="button"
                onClick={() => {
                  SoundManager.playClick();
                  onSelectProject(skill.projectSlug);
                }}
                className="inline-flex items-center gap-1 font-bold text-sky-600 hover:text-sky-800 transition-colors cursor-pointer"
              >
                <span>View {skill.projectTitle}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
