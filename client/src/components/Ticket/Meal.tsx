import React from 'react';
import Box from '@material-ui/core/Box';

import { styled } from '@material-ui/styles';

import { theme } from '../ThemeWrapper';

// TODO: Actually make a style for this, don't just copy and mod
const MealContent = styled('p')({
  ...theme.typography.body1,
  textTransform: 'uppercase',
  margin: 0,
});

// TODO: Actually make a style for this, don't just copy and mod
const SeatNumber = styled('h3')({
  ...theme.typography.h5,
  margin: 0,
});

// TODO: Actually make a style for this, don't just copy and mod
const SeatNumberLabel = styled('div')({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  fontSize: 12,
  margin: 0,
});

/** A component rendering a single meal and its associated seat number */
const Meal: React.FC<{ dish: string; seat: number }> = ({ dish, seat }) => (
  <>
    <Box display="flex" width="100%" justifyContent="space-between">
      {/* Dish */}
      <MealContent>{dish}</MealContent>

      {/* Seat */}
      <SeatNumber>
        {/* Box makes text stack */}
        <Box textAlign="center">
          <SeatNumberLabel>seat&nbsp;#</SeatNumberLabel>
          <span>{seat}</span>
        </Box>
      </SeatNumber>
    </Box>
  </>
);

export default Meal;
