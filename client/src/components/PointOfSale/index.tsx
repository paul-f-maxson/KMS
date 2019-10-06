import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';

import Ticket from '../Ticket';
import TicketBuilder from './TicketBuilder';

import orderReducer, { defaultState as defaultOrder } from './orderReducer';

import mealReducer, { defaultState as defaultMeal } from './currentMealReducer';
import { Box, Paper } from '@material-ui/core';
import Meal from '../Ticket/Meal';

const PointOfSale = () => {
  const [order, orderDispatch] = useReducer(orderReducer, defaultOrder);

  const [currentMeal, currentMealDispatch] = useReducer(
    mealReducer,
    defaultMeal
  );

  const ticketBuilderProps = {
    order,
    orderDispatch,
    currentMeal,
    currentMealDispatch,
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TicketBuilder {...ticketBuilderProps} />
      </Grid>

      <Grid item>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Box
              p={1}
              borderColor="text.primary"
              borderRadius="borderRadius"
              border={1}
            >
              <Ticket {...order} PaperProps={{ elevation: 0 }} />
            </Box>
          </Grid>

          <Grid item>
            {/* Display the meal that is being added only if it is not empty */}
            {currentMeal.seat || currentMeal.dish ? (
              <Box
                p={1}
                borderColor="text.primary"
                borderRadius="borderRadius"
                border={1}
              >
                <Paper elevation={0}>
                  <Box p={1}>
                    <Meal {...currentMeal} />
                  </Box>
                </Paper>
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PointOfSale;
