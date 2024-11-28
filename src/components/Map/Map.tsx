import React from "react";
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

// Corrigir ícones padrão do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Define estilos do MapContainer
const StyledMapContainer = styled(LeafletMapContainer)`
  height: 40vh;
  width: 60%; /* Largura padrão para ecrãs grandes */
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 90%; /* Para ecrãs pequenos, ocupa 90% */
  }

  @media (min-width: 1400px) {
    width: 45%; /* Em ecrãs muito grandes, limita a 60% */
    margin: 0 auto; /* Centraliza o mapa horizontalmente */
  }
`;

interface MapProps {
  coordinates: { lat: number; lon: number } | null;
  location: string;
}

const Map: React.FC<MapProps> = ({ coordinates, location }) => {
  if (!coordinates) {
    return null; // Não renderiza o mapa se as coordenadas não existirem
  }

  return (
    <StyledMapContainer center={[coordinates.lat, coordinates.lon]} zoom={10}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <TileLayer
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
        opacity={0.6}
        zIndex={2}
      />
      <Marker position={[coordinates.lat, coordinates.lon]}>
        <Popup>{location}</Popup>
      </Marker>
    </StyledMapContainer>
  );
};

export default Map;
