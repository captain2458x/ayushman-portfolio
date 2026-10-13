import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, Wrench } from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import { projectsData } from '../data/projects';
import { ProjectCategoryKey } from '../types';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

const FILTER_OPTIONS: { id: ProjectCategoryKey; label: string }[] = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'cfd-aerodynamics', label: 'CFD & Aerodynamics' },
  { id: 'aerospace-cad', label: 'CAD & Design' },
  { id: 'space-technology', label: 'Space Technology' },
  { id: 'flight-dynamics', label: 'Flight Dynamics' },
  { id: 'avionics', label: 'Avionics Prototyping' },
  { id: 'embedded-systems', label: 'Embedded Systems' }
];

export default function ProjectsPage() {
  useDocumentTitle('Engineering Projects', 'Comprehensive aerospace engineering project gallery of Ayushman Srivastava.');

  const [activeCategory, setActiveCategory] = useState<ProjectCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<string>('all');

  // Extract all unique tools
  const allTools = useMemo(() => {
    const toolsSet = new Set<string>();
    projectsData.forEach((p) => p.tools.forEach((t) => toolsSet.add(t)));
    return ['all', ...Array.from(toolsSet)];
  }, []);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category match
      const categoryMatch = activeCategory === 'all' || project.category === activeCategory;

      // Tool match
      const toolMatch = selectedTool === 'all' || project.tools.includes(selectedTool);

      // Search query match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.tools.some((t) => t.toLowerCase().includes(query)) ||
        project.categoryLabel.toLowerCase().includes(query);

      return categoryMatch && toolMatch && searchMatch;
    });
  }, [activeCategory, selectedTool, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
          ENGINEERING GALLERY // TECHNICAL DOSSIERS
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
          Aerospace Engineering Projects
        </h1>
        <p className="text-text-secondary text-base max-w-2xl font-sans">
          Rigorous case studies covering computational fluid dynamics (CFD), multirotor flight dynamics, satellite orbital mechanics, parametric CAD design, and embedded IoT hardware.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        
        {/* Search Bar + Tool Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by keywords, tools (e.g. Fluent, GMAT, SolidWorks)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border focus:border-primary/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition-colors font-sans"
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <Wrench size={14} className="text-primary shrink-0" />
            <select
              value={selectedTool}
              onChange={(e) => {
                SoundManager.playClick();
                setSelectedTool(e.target.value);
              }}
              className="bg-surface border border-border text-text-primary rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary cursor-pointer"
            >
              <option value="all">Filter by Software/Tool (All)</option>
              {allTools.filter((t) => t !== 'all').map((tool) => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = activeCategory === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  SoundManager.playClick();
                  setActiveCategory(opt.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? 'border-primary bg-primary/15 text-primary font-bold shadow-sm'
                    : 'border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 rounded-2xl bg-surface border border-border technical-corner p-8">
          <Layers size={36} className="text-text-secondary mx-auto opacity-50" />
          <h3 className="font-display font-bold text-lg text-text-primary">
            No engineering projects match the current filter criteria.
          </h3>
          <p className="font-sans text-xs text-text-secondary max-w-sm mx-auto">
            Try resetting your search query or selecting "All Disciplines" to view the complete catalog.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSelectedTool('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-primary text-background font-mono text-xs font-bold uppercase cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
