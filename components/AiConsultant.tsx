import React, { useState } from 'react';
import { Sparkles, Loader2, Send, ChevronRight } from 'lucide-react';
import { generateGrowthStrategy } from '../services/geminiService';
import { AiStrategyResponse, LoadState } from '../types';

const AiConsultant: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [status, setStatus] = useState<LoadState>(LoadState.IDLE);
  const [strategy, setStrategy] = useState<AiStrategyResponse | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setStatus(LoadState.LOADING);
    setStrategy(null);

    try {
      const result = await generateGrowthStrategy(niche);
      setStrategy(result);
      setStatus(LoadState.SUCCESS);
    } catch (error) {
      setStatus(LoadState.ERROR);
    }
  };

  return (
    <section id="ai-lab" className="py-24 border-y border-kn-border relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-kn-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-kn-accent/30 text-kn-accent text-xs tracking-widest uppercase bg-kn-accent/5 mb-4">
            <Sparkles size={14} /> KN Intelligence 4.0
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Generador de Estructura <span className="text-kn-muted">Web</span>
          </h2>
          <p className="text-kn-muted max-w-xl mx-auto">
            Introduce el nicho de tu negocio. Nuestra IA diseñará la estructura de conversión perfecta para tu Landing Page en segundos.
          </p>
        </div>

        {/* Input Area */}
        <div className="bg-kn-surface border border-kn-border p-2 md:p-4 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto mb-12 shadow-2xl shadow-black/50">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Ej: Inmobiliaria de lujo, Venta de Café, SaaS B2B..."
            className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none placeholder-kn-muted/50"
          />
          <button
            onClick={handleGenerate}
            disabled={status === LoadState.LOADING || !niche.trim()}
            className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wide hover:bg-kn-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === LoadState.LOADING ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Generar <Send size={16} />
              </>
            )}
          </button>
        </div>

        {/* Result Display */}
        {strategy && (
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up">
            <div className="bg-kn-surface border border-kn-border p-6 hover:border-kn-accent/30 transition-colors group">
              <div className="h-10 w-10 bg-kn-bg border border-kn-border flex items-center justify-center mb-4 text-kn-accent group-hover:bg-kn-accent group-hover:text-white transition-colors">01</div>
              <h4 className="text-sm text-kn-muted uppercase tracking-wider mb-2">Titular Principal</h4>
              <p className="text-lg text-white font-medium leading-snug">{strategy.headline}</p>
            </div>

            <div className="bg-kn-surface border border-kn-border p-6 hover:border-kn-accent/30 transition-colors group">
              <div className="h-10 w-10 bg-kn-bg border border-kn-border flex items-center justify-center mb-4 text-kn-accent group-hover:bg-kn-accent group-hover:text-white transition-colors">02</div>
              <h4 className="text-sm text-kn-muted uppercase tracking-wider mb-2">Argumentos Clave</h4>
              <ul className="space-y-2">
                {strategy.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <ChevronRight size={14} className="mt-1 text-kn-accent shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-kn-surface border border-kn-border p-6 hover:border-kn-accent/30 transition-colors group">
              <div className="h-10 w-10 bg-kn-bg border border-kn-border flex items-center justify-center mb-4 text-kn-accent group-hover:bg-kn-accent group-hover:text-white transition-colors">03</div>
              <h4 className="text-sm text-kn-muted uppercase tracking-wider mb-2">Call To Action</h4>
              <p className="text-xl text-white font-bold italic">"{strategy.callToAction}"</p>
            </div>
          </div>
        )}

        {status === LoadState.ERROR && (
          <div className="text-center text-red-500 mt-4 bg-red-500/10 py-2 border border-red-500/20">
            Ocurrió un error al conectar con la inteligencia. Inténtalo de nuevo.
          </div>
        )}
      </div>
    </section>
  );
};

export default AiConsultant;