import React from 'react';
import { Card,CardContent, Typography, Grid, Divider } from '@mui/material';
import styled from 'styled-components';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
// import Brightness3Icon from '@mui/icons-material/Brightness3'; // Moon icon for night

const WeatherCard = styled(Card)(({ theme }) => ({
  margin: '1rem',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  padding: '1rem',
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
}));

const TemperatureWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TemperatureIcon = styled(WbSunnyIcon)(({ theme }) => ({
  fontSize: 48,
  marginRight: '1rem',
}));

const CloudinessWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const CloudIconStyled = styled(CloudIcon)(({ theme }) => ({
  fontSize: 36,
  marginRight: '0.5rem',
}));

const CurrentWeather = ({ weather }) => {
  const isDay = weather.weather[0].icon.includes('d'); // Check if it's day or night based on icon

  return (
    <WeatherCard>
      <CardContent>
        <Typography variant="h5">{weather.name}</Typography>
        <Typography variant="h6">{weather.weather[0].main}</Typography>
        <Typography>{weather.weather[0].description}</Typography>
        <Divider style={{ margin: '1rem 0' }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>Temperature:</Typography>
            <TemperatureWrapper>
              <TemperatureIcon />
              <Typography variant="h4">{(weather.main.temp).toFixed(1)}°C</Typography>
            </TemperatureWrapper>
            <Typography>Feels Like: {(weather.main.feels_like).toFixed(1)}°C</Typography>
            <Typography>Min Temp: {(weather.main.temp_min).toFixed(1)}°C</Typography>
            <Typography>Max Temp: {(weather.main.temp_max).toFixed(1)}°C</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Humidity: {weather.main.humidity}%</Typography>
            <Typography>Pressure: {weather.main.pressure} hPa</Typography>
            <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
            <Typography>Wind Direction: {weather.wind.deg}°</Typography>
            <Divider style={{ margin: '1rem 0' }} />
            <Typography>Visibility: {weather.visibility / 1000} km</Typography>
            <Typography>Cloudiness: {weather.clouds.all}%</Typography>
          </Grid>
        </Grid>
        <Divider style={{ margin: '1rem 0' }} />
        <Typography>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Typography>
        <Typography>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Typography>
        <CloudinessWrapper>
          <CloudIconStyled />
          <Typography>
            Cloudiness: {weather.clouds.all}% 
            {isDay ? ' (Day)' : ' (Night)'}
          </Typography>
        </CloudinessWrapper>
      </CardContent>
    </WeatherCard>
  );
};

export default CurrentWeather;
