import React from 'react';
import { Card, CardContent, Typography, Grid, Tooltip } from '@mui/material';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

const StyledCard = styled(Card)`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  margin: 20px;
  background: linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const StyledCardContent = styled(CardContent)`
  text-align: center;
  padding: 30px;
`;

const dateTypography = css`
  margin: 10px 0;
  color: #00796b;
  font-weight: bold;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const maxTempTypography = css`
  color: #d32f2f;
  font-weight: bold;
  margin: 5px 0;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #b71c1c;
  }
`;

const minTempTypography = css`
  color: #1976d2;
  font-weight: bold;
  margin: 5px 0;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #0d47a1;
  }
`;

const defaultTypography = css`
  margin: 10px 0;
  color: #00796b;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #004d40;
  }
`;

const uvIndexTypography = css`
  color: #ffa000;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #ff6f00;
  }
`;

const iconStyles = css`
  vertical-align: middle;
  margin-right: 8px;
  color: #ffb74d;
  transition: transform 0.3s ease, color 0.3s ease;
  &:hover {
    transform: rotate(20deg);
    color: #ff9800;
  }
`;

const sectionStyles = css`
  margin: 15px 0;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

const Forecast = ({ forecast }) => {
  return (
    <Grid container spacing={4}>
      {forecast.time.map((date, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" css={dateTypography}>
                {new Date(date).toLocaleDateString()}
              </Typography>
              <div css={sectionStyles}>
                <Tooltip title="Maximum Temperature">
                  <Typography css={maxTempTypography}>
                    <ThermostatIcon css={iconStyles} />
                    Max Temp: {forecast.temperature_2m_max[index]}°C
                  </Typography>
                </Tooltip>
                <Tooltip title="Minimum Temperature">
                  <Typography css={minTempTypography}>
                    <DeviceThermostatIcon css={iconStyles} />
                    Min Temp: {forecast.temperature_2m_min[index]}°C
                  </Typography>
                </Tooltip>
              </div>
              <div css={sectionStyles}>
                <Typography css={defaultTypography}>
                  Feels Like Max: {forecast.apparent_temperature_max[index]}°C
                </Typography>
                <Typography css={defaultTypography}>
                  Feels Like Min: {forecast.apparent_temperature_min[index]}°C
                </Typography>
              </div>
              <div css={sectionStyles}>
                <Tooltip title="Sunrise Time">
                  <Typography css={defaultTypography}>
                    <WbSunnyIcon css={iconStyles} />
                    Sunrise: {new Date(forecast.sunrise[index]).toLocaleTimeString()}
                  </Typography>
                </Tooltip>
                <Tooltip title="Sunset Time">
                  <Typography css={defaultTypography}>
                    <Brightness2Icon css={iconStyles} />
                    Sunset: {new Date(forecast.sunset[index]).toLocaleTimeString()}
                  </Typography>
                </Tooltip>
              </div>
              <div css={sectionStyles}>
                <Typography css={defaultTypography}>
                  Daylight Duration: {(forecast.daylight_duration[index] / 3600).toFixed(2)} hours
                </Typography>
                <Tooltip title="Sunshine Duration">
                  <Typography css={defaultTypography}>
                    <WbTwilightIcon css={iconStyles} />
                    Sunshine Duration: {(forecast.sunshine_duration[index] / 3600).toFixed(2)} hours
                  </Typography>
                </Tooltip>
              </div>
              <Typography css={[defaultTypography, uvIndexTypography]}>
                UV Index Max: {forecast.uv_index_max[index]}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;
