import axios from 'axios';

const OPENWEATHER_API_KEY = 'd3c9aa0eaaa3117bd8e6dbd1d2c3a7f3';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getCurrentWeather = async (city) => {
  const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
    params: {
      q: city,
      appid: OPENWEATHER_API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};

export const getForecast = async (lat, lon) => {
  const response = await axios.get(`${OPEN_METEO_BASE_URL}`, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max',
    },
  });
  return response.data.daily;
};
