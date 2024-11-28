import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TemperatureGraphContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

interface TemperatureGraphProps {
  forecastData: { date: string; minTemp: number; maxTemp: number }[];
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ forecastData }) => {
  const labels = forecastData.map(day => day.date);
  const minTemps = forecastData.map(day => day.minTemp);
  const maxTemps = forecastData.map(day => day.maxTemp);

  // Prepare the chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Min Temperature (°C)',
        data: minTemps,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Max Temperature (°C)',
        data: maxTemps,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <TemperatureGraphContainer>
      <ChartTitle>Temperature Evolution per Day</ChartTitle>
      <Line data={data} />
    </TemperatureGraphContainer>
  );
};

export default TemperatureGraph;
