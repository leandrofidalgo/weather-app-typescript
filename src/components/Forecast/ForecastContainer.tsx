import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ForecastCard = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  flex-basis: 100%;
  transition: box-shadow 0.3s ease;
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

// Definição de tipos para os dados de previsão
interface ForecastCardData {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  humidity: number;
  windSpeed: string;
  icon: string;
}

interface ForecastContainerProps {
  forecastData: ForecastCardData[];
  unit: "metric" | "imperial";
}

const ForecastContainer: React.FC<ForecastContainerProps> = ({ forecastData, unit }) => {
  return (
    <Container>
      {forecastData.map((day, index) => {
        const weatherIconCode = day.icon;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

        return (
          <ForecastCard key={index}>
            <CardTitle>{day.date}</CardTitle>
            <img src={iconUrl} alt={day.description} />
            <p>
              Min Temp: {day.minTemp}° {unit === "metric" ? "C" : "F"}
              <br />
              Max Temp: {day.maxTemp}° {unit === "metric" ? "C" : "F"}
              <br />
              Condition: {day.description}
              <br />
              Humidity: {day.humidity}%
              <br />
              Wind Speed: {day.windSpeed} m/s
            </p>
          </ForecastCard>
        );
      })}
    </Container>
  );
};

export default ForecastContainer;
