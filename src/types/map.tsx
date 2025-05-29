// src/types/map.ts

import { LatLngExpression } from 'leaflet';

export type LatLng = {
  lat: number;
  lng: number;
};

export type Coordenada = LatLng | LatLngExpression;

export type BusStop = {
  id: string;
  name: string;
  location: LatLng;
  buses: string[];
  isFavorite?: boolean;
};

export type Incident = {
  id: string;
  type: 'accident' | 'traffic';
  location: LatLng;
  description: string;
};
