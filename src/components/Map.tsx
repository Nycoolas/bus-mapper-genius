
import React, { useState } from 'react';
import { MapPin, AlertTriangle, Search, Star, Bus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BusStop = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  buses: string[];
  isFavorite?: boolean;
};

type Incident = {
  id: string;
  type: 'accident' | 'traffic';
  location: { lat: number; lng: number };
  description: string;
};

const dummyStops: BusStop[] = [
  { id: '1', name: 'Salesiano - AV', location: { lat: -23.55, lng: -46.64 }, buses: ['999', '123', '456'], isFavorite: false },
  { id: '2', name: 'Santa Martha', location: { lat: -23.56, lng: -46.65 }, buses: ['999', '789'], isFavorite: true },
  { id: '3', name: 'Terminal Central', location: { lat: -23.54, lng: -46.63 }, buses: ['999', '123', '321'], isFavorite: false },
];

const dummyIncidents: Incident[] = [
  { id: '1', type: 'accident', location: { lat: -23.57, lng: -46.66 }, description: 'Acidente na via principal' },
];

const MapComponent: React.FC = () => {
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  return (
    <div className="relative w-full h-full bg-bus-map">
      {/* Mapa */}
      <div className="w-full h-full bg-[url('/lovable-uploads/ae5f9bc9-67a9-4f8e-a121-31b49d013eb9.png')] bg-center bg-cover bg-no-repeat opacity-80"></div>

      {/* Botão de seleção */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="bg-bus-cyan text-black font-medium rounded-full px-4 py-2 text-sm shadow-lg"
        >
          Selecione o ponto
        </motion.button>
      </div>

      {/* Marcadores no mapa */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <MapPin className="text-bus-point w-8 h-8 cursor-pointer" fill="#3B82F6" stroke="#ffffff" strokeWidth={2} />
      </div>
      
      <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <MapPin className="text-bus-point w-8 h-8 cursor-pointer" fill="#3B82F6" stroke="#ffffff" strokeWidth={2} />
      </div>
      
      <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <MapPin className="text-bus-point w-8 h-8 cursor-pointer" fill="#3B82F6" stroke="#ffffff" strokeWidth={2} />
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <MapPin className="text-bus-point w-8 h-8 cursor-pointer" fill="#3B82F6" stroke="#ffffff" strokeWidth={2} />
      </div>

      {/* Incidente no mapa */}
      <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <AlertTriangle className="text-bus-warning w-8 h-8 cursor-pointer" fill="#FF4848" stroke="#ffffff" strokeWidth={2} />
      </div>

      {/* Favorito no mapa */}
      <div className="absolute bottom-1/5 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <Star className="text-bus-favorite w-8 h-8 cursor-pointer" fill="#FFB800" stroke="#ffffff" strokeWidth={2} />
      </div>

      {/* Controles inferiores */}
      <div className="absolute bottom-4 left-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white rounded-full p-3 shadow-lg"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>
    </div>
  );
};

export default MapComponent;
