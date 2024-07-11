import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: '#ffffff', // Replace with your desired background color
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Example shadow effect
  borderRadius: '8px', // Example border radius
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '16px', // Example margin top
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: '#14f666',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
}));

const RecentSearches = ({ recentCities, onCityClick }) => {
  return (
    <StyledList>
      <Typography variant="h6" gutterBottom>
        Recent Searches
      </Typography>
      {recentCities.map((city, index) => (
        <React.Fragment key={index}>
          <StyledListItem
            button
            onClick={() => onCityClick(city)}
          >
            <ListItemText primary={city} />
          </StyledListItem>
          {index < recentCities.length - 1 && <StyledDivider />}
        </React.Fragment>
      ))}
    </StyledList>
  );
};

export default RecentSearches;
