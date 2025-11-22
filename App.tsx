import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import AiConsultant from './components/AiConsultant';
import TechBackground from './components/TechBackground';
import { Project } from './types';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

// Placeholder data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web Site",
    image: "https://picsum.photos/800/600?random=1",
    description: "Plataforma integral para gestión de activos digitales con interfaz minimalista y actualizaciones en tiempo real.",
    tags: ["React", "Tailwind", "Data Viz"],
    link: "#"
  },
  {
    id: 2,
    title: "Neon Energy Drink",
    category: "Landing Page",
    image: "https://picsum.photos/800/600?random=2",
    description: "Landing page de alta conversión para lanzamiento de producto, enfocada en animaciones de scroll.",
    tags: ["GSAP", "Conversion", "Dark Mode"],
    link: "#"
  },
  {
    id: 3,
    title: "Arkiteqtura Studio",
    category: "Web Site",
    image: "https://picsum.photos/800/600?random=3",
    description: "Portfolio inmersivo para estudio de arquitectura, destacando fotografía y tipografía editorial.",
    tags: ["Minimal", "UX/UI", "Gallery"],
    link: "#"
  },
  {
    id: 4,
    title: "Crypto Exchange LP",
    category: "Landing Page",
    image: "https://picsum.photos/800/600?random=4",
    description: "Página de aterrizaje optimizada para captación de leads en el sector Web3.",
    tags: ["Web3", "Growth", "Form Validation"],
    link: "#"
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-kn-bg text-kn-text selection:bg-kn-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        
        {/* 3D Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-kn-bg" />}>
          <TechBackground />
        </Suspense>

        {/* Vignette Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pointer-events-none">
          <div className="max-w-4xl pointer-events-auto">
            <h2 className="text-kn-accent font-semibold tracking-widest uppercase mb-6 animate-pulse-slow">
              Growth & Development Agency
            </h2>
            <h1 className="text-5xl md:text-8xl font-extrabold leading-tight tracking-tighter text-white mb-8 mix-blend-screen">
              Diseñamos el <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                Futuro Digital.
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
              Especialistas en Landing Pages de alta conversión y Sitios Web corporativos. 
              Combinamos estética dark minimalista con estrategias de crecimiento agresivas.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <a href="#projects" className="bg-white text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-kn-accent hover:text-white transition-colors flex items-center gap-3">
                Ver Proyectos <ArrowRight size={20} />
              </a>
              <a href="#contact" className="backdrop-blur-md bg-black/30 border border-kn-border text-white px-8 py-4 font-bold uppercase tracking-wide hover:border-white hover:bg-black/50 transition-colors">
                Contactar
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-kn-muted text-xs tracking-widest animate-bounce z-20 pointer-events-none">
          SCROLL
          <div className="w-[1px] h-12 bg-gradient-to-b from-kn-muted to-transparent"></div>
        </div>
      </header>

      {/* Projects Grid */}
      <section id="projects" className="py-32 bg-[#080808] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-kn-border pb-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Trabajos Seleccionados</h2>
              <p className="text-kn-muted">Landing Pages y Sitios Web que convierten.</p>
            </div>
            <div className="text-kn-accent font-mono text-sm mt-4 md:mt-0">
              // 2023 - 2024
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <AiConsultant />

      {/* Footer/Contact */}
      <footer id="contact" className="py-24 border-t border-kn-border bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                Let's Work <br /> Together.
              </h2>
              <p className="text-kn-muted text-lg max-w-md mb-8">
                ¿Listo para escalar tu marca? Hablemos sobre cómo una landing page estratégica puede cambiar tu negocio.
              </p>
              <a href="mailto:hello@kngrowth.com" className="inline-block border-b border-white text-2xl text-white hover:text-kn-accent hover:border-kn-accent transition-colors pb-1">
                hello@kngrowth.com
              </a>
            </div>

            <div className="flex flex-col justify-between h-full gap-8">
              <div className="flex gap-6 justify-start md:justify-end">
                <a href="#" className="p-4 border border-kn-border rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
                  <Github size={24} />
                </a>
                <a href="#" className="p-4 border border-kn-border rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-4 border border-kn-border rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
                  <Mail size={24} />
                </a>
              </div>
              
              <div className="text-left md:text-right text-kn-muted text-sm">
                <p>&copy; {new Date().getFullYear()} KN Growth.</p>
                <p>Todos los derechos reservados.</p>
                <p className="mt-2 text-xs opacity-50">Designed with Code & Intelligence.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;