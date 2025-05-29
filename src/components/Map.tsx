import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { BusStop, Incident } from '@/types/map';

// Ícones personalizados
const defaultIcon = new L.Icon({
  iconUrl: '/icons/bus-stop.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const favoriteIcon = new L.Icon({
  iconUrl: '/icons/favorite-stop.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const incidentIcon = new L.Icon({
  iconUrl: '/icons/incident.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Dados simulados
const dummyStops: BusStop[] = [
  { id: '1', name: 'Salesiano - AV', location: { lat: -20.31662, lng: -40.32382 }, buses: ['999', '123', '456'], isFavorite: false },
  { id: '2', name: 'Santa Martha', location: { lat: -23.56, lng: -46.65 }, buses: ['999', '789'], isFavorite: true },
  { id: '3', name: 'Terminal Central', location: { lat: -23.54, lng: -46.63 }, buses: ['999', '123', '321'], isFavorite: false },
];

const dummyIncidents: Incident[] = [
  { id: '1', type: 'accident', location: { lat: -23.57, lng: -46.66 }, description: 'Acidente na via principal' },
];

const MapComponent: React.FC = () => {
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[-20.3166, -40.3238]}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-screen z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Paradas de ônibus */}
        {dummyStops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.location.lat, stop.location.lng]}
            icon={stop.isFavorite ? favoriteIcon : defaultIcon}
            eventHandlers={{ click: () => setSelectedStop(stop) }}
          >
            <Popup>
              <strong>{stop.name}</strong>
              <br />
              Linhas: {stop.buses.join(', ')}
              {stop.isFavorite && <div className="text-yellow-500 mt-1">★ Favorito</div>}
            </Popup>
          </Marker>
        ))}

        {/* Incidentes */}
        {dummyIncidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.location.lat, incident.location.lng]}
            icon={incidentIcon}
          >
            <Popup>
              <strong>Incidente:</strong> {incident.type}
              <br />
              {incident.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
