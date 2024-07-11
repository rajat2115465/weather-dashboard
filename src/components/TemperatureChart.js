import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart
} from 'recharts';

const TemperatureChart = ({ forecast }) => {
  // Convert the daily temperature data to be suitable for the chart
  const chartData = forecast.time.map((date, index) => ({
    date: new Date(date).toLocaleDateString(),
    maxTemp: forecast.temperature_2m_max[index],
    minTemp: forecast.temperature_2m_min[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis unit="°C" />
        <Tooltip />
        <Legend />
        <Bar dataKey="maxTemp" fill="#8884d8" />
        <Bar dataKey="minTemp" fill="#82ca9d" />
        <Line type="monotone" dataKey="maxTemp" stroke="#8884d8" />
        <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
