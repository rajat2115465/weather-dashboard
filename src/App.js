import React, { useState, useEffect } from 'react';
import {Routes,Route, Router} from "react-router-dom";
import { Container, Grid, Alert } from '@mui/material';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Navbar from './components/Navbar';
// import SignIn from './components/SignIn';
import Forecast from './components/Forecast';
import TemperatureChart from './components/TemperatureChart';
import RecentSearch from './components/RecentSearch';
import { getCurrentWeather, getForecast } from './services/weatherService';
const App = () => {
  const [weather, setWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [recentCities, setRecentCities] = useState([]);
  const handleSearch = async (city) => {
    try {
      const currentWeather = await getCurrentWeather(city);
      setWeather(currentWeather);

      const { coord } = currentWeather;
      const forecast = await getForecast(coord.lat, coord.lon);
      setDailyForecast(forecast);
      setRecentCities(prevCities => [city, ...prevCities.filter(c => c !== city)]);
      setError(null);
    } catch (err) {
      setError('please enter correct city name or pincode');
    }
  };
  const handleCityClick = (city) => {
    // Logic to handle clicking on a recent city search
    handleSearch(city);
  };
  useEffect(() => {
    handleSearch('Moradabad'); // Default city for initial load
  }, []);
  useEffect(() => {
    // Load recent cities from local storage on component mount
    const storedCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    setRecentCities(storedCities);
  }, []);

  useEffect(() => {
    // Save recent cities to local storage when updated
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
  }, [recentCities]);
  return (
    <>
    <Navbar onSearch={handleSearch} />
    {/* <Container sx={{padding:0}}> */}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={0}>
        <Grid xs={12} md={2} sx={{padding:0 ,width:80,marginLeft:10,marginRight:10}}>
          <RecentSearch  recentCities={recentCities} onCityClick={handleCityClick} />
         </Grid>
        <Grid item xs={10} md={7} sx={{marginLeft:10,marginRight:10}}>
          {weather && <CurrentWeather weather={weather} />}
        </Grid>
        <Grid item xs={12} sx={{marginLeft:10,marginRight:10}}  >
          {dailyForecast.time  && <Forecast forecast={dailyForecast} />}
        </Grid>
        <Grid item xs={12} sx={{marginLeft:10,marginRight:10}}>
          {dailyForecast.time && <TemperatureChart forecast={dailyForecast} />}
        </Grid>
      </Grid>
    {/* </Container> */}
    </>
  );
};

export default App;
