
import React from 'react';
import { ArrowUpRight, Code2, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative h-[500px] w-full bg-black overflow-hidden border border-white/10 rounded-[2.5rem]">
      
      {/* 1. Background Image with Tech Filters */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
        />
        {/* Scanline/Grid Overlay Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        
        {/* Gradient darkening for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500 z-10" />
      </div>

      {/* 2. Tech/HUD Decorations */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between pointer-events-none">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          {/* Index / ID */}
          <div className="font-mono text-xs text-kn-accent/90 tracking-widest border border-kn-accent/20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full">
            PRJ_0{project.id}
          </div>
          
          {/* Category Tag */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-kn-accent animate-pulse"></span>
            <span className="font-mono text-xs text-gray-300 tracking-widest uppercase">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Content Slide-Up Panel - Floating Island Style */}
      <div className="absolute bottom-2 left-2 right-2 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        
        <div className="relative overflow-hidden backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-[2rem]">
          {/* Hover Highlight Line */}
          <div className="absolute top-0 left-0 w-full h-full rounded-[2rem] border border-kn-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* Title & Action */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-white leading-none tracking-tighter">
              {project.title}
            </h3>
            
            <a 
              href={project.link} 
              className="group/btn relative flex items-center justify-center h-10 w-10 bg-white text-black rounded-full hover:bg-kn-accent hover:text-white transition-colors duration-300 shrink-0 ml-4"
            >
              <ArrowUpRight size={20} className="transition-transform duration-300 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
            </a>
          </div>

          {/* Description */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
            <div className="overflow-hidden">
              <p className="text-sm text-gray-300 mb-4 leading-relaxed opacity-90">
                {project.description}
              </p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-kn-accent bg-kn-accent/10 px-3 py-1.5 rounded-full border border-kn-accent/20"
                  >
                    {idx % 2 === 0 ? <Code2 size={12} /> : <Layers size={12} />}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Preview Hint (Visible when collapsed) */}
          <div className="absolute bottom-7 right-20 text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:opacity-0 transition-opacity duration-300">
            Expand
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
