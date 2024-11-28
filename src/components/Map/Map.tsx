import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define the types for the props
interface MapProps {
  coordinates: { lat: number; lon: number } | null;
  location: string;
}

// Corrigir ícones padrão do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map: React.FC<MapProps> = ({ coordinates, location }) => {
  if (!coordinates) {
    return null; // Não renderiza o mapa se as coordenadas não existirem
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]}
      zoom={10}
      style={{
        height: "50vh",
        width: "50%",
        marginTop: "20px"
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <TileLayer
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
        opacity={0.6}
        zIndex={2}
      />
      <Marker position={[coordinates.lat, coordinates.lon]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;