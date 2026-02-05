import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Thermometer, Wind, Zap, Info } from 'lucide-react';
import { PlanetData } from '../data/planets';

interface PlanetInfoProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, onClose }) => {
  if (!planet) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-black/80 backdrop-blur-md border-l border-white/10 p-8 text-white z-50 overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <header className="mb-8">
          <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {planet.name}
          </h2>
          <div className="h-1 w-20 bg-blue-500 rounded-full" />
        </header>

        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-blue-400">
              <Info size={18} /> Descripción
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {planet.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Thermometer size={14} /> Temperatura
              </h4>
              <p className="text-lg font-medium">{planet.temperature}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Wind size={14} /> Atmósfera
              </h4>
              <p className="text-sm font-medium">{planet.atmosphere}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Zap size={14} /> Gravedad
              </h4>
              <p className="text-lg font-medium">{planet.gravity}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                Distancia
              </h4>
              <p className="text-lg font-medium">{planet.distance} UA (Rel.)</p>
            </div>
          </div>

          <div className="pt-8 opacity-20 pointer-events-none select-none">
            <div 
              className="w-full h-64 rounded-full blur-3xl"
              style={{ backgroundColor: planet.color }}
            />
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};
