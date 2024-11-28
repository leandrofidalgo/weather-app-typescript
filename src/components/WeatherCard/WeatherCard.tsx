import React from "react";
import styled from "styled-components";

const WeatherCardContainer = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  flex-basis: 100%;
  text-align: left;
  color: #333;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }
  
  @media (min-width: 768px) {
    flex-basis: 45%;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #1a73e8;
  text-align: center;
`;


interface WeatherCardProps {
  currentWeather: {
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  } | null; // currentWeather pode ser nulo se não estiver disponível
  unit: "metric" | "imperial";
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentWeather, unit }) => {
  if (!currentWeather) {
    return null;
  }

  return (
    <WeatherCardContainer>
      <CardTitle>Current Weather</CardTitle>
      <img 
        src={currentWeather.icon} 
        alt="Weather Icon"
      />
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
