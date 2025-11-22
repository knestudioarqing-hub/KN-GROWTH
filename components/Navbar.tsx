import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
        isScrolled ? 'bg-kn-bg/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Left Placeholder for balance */}
          <div className="hidden md:flex w-1/3 text-sm text-kn-muted tracking-widest">
            PORTFOLIO 4.0
          </div>

          {/* Centered Logo */}
          <div className="w-full md:w-1/3 flex justify-center">
            <a href="#" className="group relative">
              <h1 className="text-2xl font-bold tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-kn-muted transition-all duration-300">
                KN GROWTH
              </h1>
              <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-kn-accent group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </a>
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex w-1/3 justify-end gap-8 text-sm font-medium text-kn-muted">
            <a href="#projects" className="hover:text-white transition-colors">Proyectos</a>
            <a href="#ai-lab" className="hover:text-kn-accent transition-colors flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kn-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kn-accent"></span>
              </span>
              AI Lab
            </a>
            <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-kn-surface border-b border-kn-border p-6 flex flex-col gap-4 text-center">
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-kn-muted hover:text-white py-2">Proyectos</a>
          <a href="#ai-lab" onClick={() => setIsMobileMenuOpen(false)} className="text-kn-accent font-semibold py-2">AI Lab</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-kn-muted hover:text-white py-2">Contacto</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;