import { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import { Planet, Sun, Stars } from './components/ThreeComponents';
import { PlanetInfo } from './components/PlanetInfo';
import { planets, PlanetData } from './data/planets';
import { Home } from 'lucide-react';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl font-thin tracking-widest whitespace-nowrap">
        CARGANDO EL UNIVERSO {Math.round(progress)}%
      </div>
    </Html>
  );
}

export function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const controlsRef = useRef<any>(null);

  // Focus camera on selected planet
  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    
    // Calculate target position for camera focus
    const targetPosition = {
      x: planet.distance * 1.5,
      y: planet.distance * 0.5,
      z: planet.distance * 1.5
    };
    
    // Animate camera to focus on planet
    if (controlsRef.current) {
      controlsRef.current.target.set(planet.distance, 0, 0);
      controlsRef.current.object.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
      controlsRef.current.update();
    }
  };

  // Reset camera when no planet is selected
  const handleClosePlanetInfo = () => {
    setSelectedPlanet(null);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.object.position.set(30, 30, 30);
      controlsRef.current.update();
    }
  };

  return (
    <div className="w-full h-screen bg-[#050505] overflow-hidden relative">
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h1 className="text-4xl font-light text-white tracking-widest uppercase mb-2">
          Sistema Solar <span className="font-bold text-blue-500">3D</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Haz clic en un planeta para explorar sus secretos
        </p>
      </div>

      {/* Selected Planet Indicator */}
      {selectedPlanet && (
        <div className="absolute top-8 right-8 z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 pointer-events-none">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedPlanet.color }}
            />
            <span className="text-white font-medium">{selectedPlanet.name}</span>
            <span className="text-gray-400 text-sm">seleccionado</span>
          </div>
        </div>
      )}

      {/* Reset View Button */}
      {selectedPlanet && (
        <button
          onClick={handleClosePlanetInfo}
          className="absolute top-16 right-8 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 hover:bg-white/20 transition-colors"
          title="Volver a vista general"
        >
          <Home size={20} className="text-white" />
        </button>
      )}

      {/* 3D Scene */}
      <Canvas shadows onPointerMissed={handleClosePlanetInfo}>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[30, 30, 30]} fov={50} />
          <OrbitControls 
            ref={controlsRef}
            enablePan={true} 
            enableZoom={true} 
            maxDistance={100} 
            minDistance={2}
          />
          
          <Stars />
          <Sun />
          
          {planets.map((planet) => (
            <Planet 
              key={planet.name} 
              data={planet} 
              onSelect={handlePlanetSelect} 
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Info Sidebar */}
      <PlanetInfo 
        planet={selectedPlanet} 
        onClose={handleClosePlanetInfo} 
      />

      {/* Planet Quick Select */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex gap-2">
        {planets.map((p) => (
          <button
            key={p.name}
            onClick={() => handlePlanetSelect(p)}
            className={`px-3 py-1 border text-xs rounded-full uppercase tracking-widest transition-all ${
              selectedPlanet?.name === p.name 
                ? 'bg-white/20 border-white/30 text-white' 
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Help Instructions - Moved to top right to avoid button interference */}
      <div className="absolute top-48 right-8 text-white/70 text-xs flex flex-col gap-1 uppercase tracking-tighter bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-4 max-w-xs shadow-lg">
        <h3 className="text-blue-400 font-medium mb-2 text-sm">CONTROLES</h3>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">•</span>
          <span>Arrastra para rotar la vista</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">•</span>
          <span>Rueda del ratón para hacer zoom</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">•</span>
          <span>Haz clic en cualquier planeta</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">•</span>
          <span>Planetas centrales orbitan más lento</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">•</span>
          <span>Enfoque automático al seleccionar</span>
        </div>
      </div>
    </div>
  );
}
