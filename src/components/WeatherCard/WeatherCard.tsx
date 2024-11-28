import React from "react";
import styled from "styled-components";

const WeatherCardContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
  text-align: left;
  color: #333;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #1a73e8;
`;

// Define the types for the props
interface WeatherCardProps {
  currentWeather: {
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
  } | null; // currentWeather can be null if not available
  unit: "metric" | "imperial"; // unit can be either "metric" or "imperial"
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentWeather, unit }) => {
  if (!currentWeather) {
    return null; // Não renderiza nada se `currentWeather` for nulo/indefinido
  }

  return (
    <WeatherCardContainer>
      <CardTitle>Current Weather</CardTitle>
      <p>
        Temperature: {currentWeather.temp}°{unit === "metric" ? "C" : "F"}
        <br />
        Condition: {currentWeather.description}
        <br />
        Humidity: {currentWeather.humidity}%
        <br />
        Wind Speed: {currentWeather.windSpeed} m/s
      </p>
    </WeatherCardContainer>
  );
};

export default WeatherCard;