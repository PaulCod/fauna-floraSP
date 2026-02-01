"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import type { SpecieResponseDTO } from "@/dtos/species.dto";

// --- Configuração de Ícones Customizados ---
const createIcon = (color: string) => new L.DivIcon({
  html: `<svg width="30" height="30" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`,
  className: "custom-pin",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const icons = {
  ANIMAL: createIcon("#3b82f6"), 
  PLANTA: createIcon("#22c55e"), 
};

interface Props {
  species: SpecieResponseDTO[];
}

export default function SpeciesMap({ species }: Props) {
  const [geoData, setGeoData] = useState<any>(null);
  const [filters, setFilters] = useState({ ANIMAL: true, PLANTA: true });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const spBounds: LatLngBoundsExpression = [[-25.5, -53.5], [-19.5, -44.0]];

  useEffect(() => {
    fetch("/geo/sao-paulo.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredSpecies = useMemo(() => {
    return species.filter(s => filters[s.category as unknown as keyof typeof filters]);
  }, [species, filters]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-50">
      
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-[2000] w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border border-gray-200 transition-all duration-300 active:scale-90"
      >
        {isMenuOpen ? (
          <span className="text-xl font-bold text-gray-800">✕</span>
        ) : (
          <span className="text-xl text-gray-800">☰</span>
        )}
      </button>

      <div className={`
        fixed z-[1000] flex flex-col gap-4 transition-all duration-500 ease-in-out
        /* Desktop: Fixo na Esquerda */
        md:top-6 md:left-6 md:right-auto md:translate-x-0 md:opacity-100 md:pointer-events-auto
        /* Mobile: Flutua abaixo do botão no canto direito */
        ${isMenuOpen 
          ? 'top-20 right-6 opacity-100 translate-y-0 pointer-events-auto' 
          : 'top-20 right-6 opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0'}
      `}>
        
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-200 min-w-[200px]">
          <h1 className="text-xl font-black tracking-tighter text-gray-800 leading-none">
            FAUNA&FLORA <span className="text-blue-600">SP</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">
            Monitoramento Ambiental
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-200 w-48">
          <span className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Camadas</span>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.ANIMAL} 
                onChange={() => setFilters(f => ({ ...f, ANIMAL: !f.ANIMAL }))}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition">🐾 Animais</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.PLANTA} 
                onChange={() => setFilters(f => ({ ...f, PLANTA: !f.PLANTA }))}
                className="w-4 h-4 accent-green-600 rounded"
              />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition">🌿 Plantas</span>
            </label>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-200 w-48">
          <span className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Contribua</span>
          <div className="flex flex-col gap-2">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSdsV__-VxwzfY_11i1evXXCTvSIrdV4d-SLsbw7n1KaDGGs6w/viewform?usp=dialog" 
              target="_blank" 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center gap-2 transition"
            >
              <span>💬</span> Feedback
            </a>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSc_ndZ3NIKrOFlrrbTm_qSL_sNhMobUgSTDNE_TGaHUPKHtPw/viewform?usp=dialog" 
              target="_blank" 
              className="text-sm font-medium text-gray-600 hover:text-red-600 flex items-center gap-2 transition"
            >
              <span>🐛</span> Reportar bug
            </a>
            <div className="pt-2 mt-1 border-t border-gray-100">
              <a 
                href="https://github.com/PaulCod/fauna-floraSP" 
                target="_blank" 
                className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-2 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <MapContainer
        center={[-23.5, -48.5]}
        zoom={7}
        minZoom={6}
        maxBounds={spBounds}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={{ color: "#000", weight: 2, fillOpacity: 0.03, interactive: false }} 
          />
        )}

        {filteredSpecies.map((s) => (
          <Marker 
            key={s.id} 
            position={[s.latitude, s.longitude]}
            icon={icons[s.category as unknown as keyof typeof icons] || icons.ANIMAL}
          >
            <Popup minWidth={260} maxWidth={260} className="custom-popup">
              <div className="overflow-hidden rounded-t-lg relative w-full h-40 bg-gray-50 border-b border-gray-100">
                {s.imageUrl ? (
                  <Image 
                    src={s.imageUrl} 
                    alt={s.name} 
                    fill
                    sizes="260px"
                    className="object-contain p-1" 
                    priority={false}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs italic">
                    Sem imagem disponível
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-base text-gray-800 leading-tight">{s.name}</h3>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full text-white font-black uppercase shadow-sm ${
                      s.status.toLowerCase().includes('criticamente') ? 'bg-red-600' : 'bg-orange-500'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                  <p className="text-[10px] italic text-gray-400">{s.category}</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-4">
                  {s.details}
                </p>
                
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[9px] text-gray-400 font-mono">
                  <span>COORDENADAS</span>
                  <span>{s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}