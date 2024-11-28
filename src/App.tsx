import React, { useState } from "react";
import styled from "styled-components";
import Map from "./components/Map/Map";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import TemperatureGraph from './components/TemperatureGraph/TemperatureGraph';
import ForecastContainer from './components/Forecast/ForecastContainer';

// Styled Components
const AppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom right, #00aaff, #0044cc);
  padding: 20px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h1`
  color: #ffffff;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: 500;
`;


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 40px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.4s ease, transform 0.2s ease-in-out;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }

  @media (max-width: 599px) {
    width: 100%;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const ToggleLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const ToggleInput = styled.input`
  width: 60px;
  height: 30px;
  border-radius: 50px;
  appearance: none;
  background-color: #ccc;
  position: relative;
  transition: background-color 0.3s ease;
  
  &:checked {
    background-color: #4caf50;
  }

  &:checked::before {
    left: 30px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: white;
  color: black;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1000;
`;

// Definindo os tipos para os dados do tempo
interface WeatherData {
  metric: {
    currentWeather: {
      temp: number;
      description: string;
      humidity: number;
      windSpeed: number;
      icon: string;
    };
    forecastData: ForecastData[];
  };
  imperial: {
    currentWeather: {
      temp: number;
      description: string;
      humidity: number;
      windSpeed: number;
      icon: string;
    };
    forecastData: ForecastData[];
  };
}

interface ForecastData {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  humidity: number;
  windSpeed: string;
  icon: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null); // Estado para coordenadas
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setWeatherData(null);
      setCoordinates(null); // Resetando as coordenadas

      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData.length) {
        alert("Location not found");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];
      setCoordinates({ lat, lon }); // Armazenando as coordenadas

      const currentResponseMetric = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const currentResponseImperial = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );

      const currentDataMetric = await currentResponseMetric.json();
      const currentDataImperial = await currentResponseImperial.json();

      const forecastResponseMetric = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastResponseImperial = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );

      const forecastDataMetric = await forecastResponseMetric.json();
      const forecastDataImperial = await forecastResponseImperial.json();

      const weatherIconCode = currentDataMetric.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

      setWeatherData({
        metric: {
          currentWeather: {
            temp: Math.round(currentDataMetric.main.temp),
            description: currentDataMetric.weather[0].description,
            humidity: currentDataMetric.main.humidity,
            windSpeed: currentDataMetric.wind.speed,
            icon: iconUrl,
          },
          forecastData: processForecastData(forecastDataMetric),
        },
        imperial: {
          currentWeather: {
            temp: Math.round(currentDataImperial.main.temp),
            description: currentDataImperial.weather[0].description,
            humidity: currentDataImperial.main.humidity,
            windSpeed: currentDataImperial.wind.speed,
            icon: iconUrl,
          },
          forecastData: processForecastData(forecastDataImperial),
        },
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (forecastData: any): ForecastData[] => {
    const dailyData: { [key: string]: any } = {};
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temps: [],
          descriptions: [],
          humidities: [],
          windSpeeds: [],
          icons: [], // Adicionando um campo para os ícones
        };
      }
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].descriptions.push(item.weather[0].description);
      dailyData[date].humidities.push(item.main.humidity);
      dailyData[date].windSpeeds.push(item.wind.speed);
      dailyData[date].icons.push(item.weather[0].icon); // Adicionando o código do ícone
    });

    return Object.values(dailyData)
      .slice(0, 5)
      .map((day: any) => ({
        date: day.date,
        minTemp: Math.round(Math.min(...day.temps)),
        maxTemp: Math.round(Math.max(...day.temps)),
        description: day.descriptions[0],
        humidity: Math.round(
          day.humidities.reduce((sum: number, humidity: number) => sum + humidity, 0) /
          day.humidities.length
        ),
        windSpeed: (
          day.windSpeeds.reduce((sum: number, speed: number) => sum + speed, 0) /
          day.windSpeeds.length
        ).toFixed(2),
        icon: day.icons[0], // Retornando o primeiro ícone do dia
      }));
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <AppContainer>
      <Title>Weather App</Title>
      <InputContainer>
        <Input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
        />
        <Button onClick={fetchWeatherData} disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </Button>
      </InputContainer>

      <ToggleContainer>
        <ToggleLabel style={{ color: '#ffffff' }}>
          {unit === "metric" ? "Celsius" : "Fahrenheit"}
        </ToggleLabel>
        <ToggleInput
          type="checkbox"
          checked={unit === "imperial"}
          onChange={toggleUnit}
        />
      </ToggleContainer>

      {weatherData && weatherData[unit] && (
        <>
          <WeatherCard
            currentWeather={weatherData[unit]?.currentWeather}
            unit={unit}
          />
          <h3 style={{ color: 'white' }}>5 Days Forecast</h3>
          {weatherData[unit].forecastData.length > 0 && (
            <ForecastContainer
              forecastData={weatherData[unit].forecastData}
              unit={unit}
            />
          )}
          <h3 style={{ color: 'white' }}>Current Location</h3>
          {coordinates && (
            <Map coordinates={coordinates} location={location} />
          )}
          <h3 style={{ color: 'white' }}>Graph of 5 Days Forecast</h3>
          {weatherData[unit].forecastData.length > 0 && (
            <TemperatureGraph forecastData={weatherData[unit]?.forecastData} unit={unit} />
          )}
        </>
      )}
      <Footer>
        Made by Leandro Fidalgo
      </Footer>
    </AppContainer>
  );
};

export default WeatherApp;
