import React from 'react';

import { Order } from 'kms-types';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box, { BoxProps } from '@material-ui/core/Box';

const TicketContent: React.FC<BoxProps> = ({ children, ...restProps }) => (
  <Box px="0.7rem" {...restProps}>
    {children}
  </Box>
);

const Ticket: React.FC<Order> = ({ table, meals }) => (
  <Box width="12rem">
    <Paper>
      {/* Table number */}
      <TicketContent py="0.7rem">
        <Typography variant="h2">{table}</Typography>
      </TicketContent>

      <Divider variant="fullWidth" />

      <TicketContent>
        {/* Meals */}
        <List>
          {meals.map(({ seat, dish, id }, index) => (
            <React.Fragment key={id}>
              {/* A divider above every meal except the first one */}
              {index === 0 ? null : <Divider />}
              <ListItem>
                {/* Meal content */}
                <Box display="flex" width="100%" justifyContent="space-between">
                  {/* Dish */}
                  <Typography variant="body1">{dish}</Typography>

                  {/* Seat */}
                  <Typography variant="h4">{seat}</Typography>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </TicketContent>
    </Paper>
  </Box>
);

export default Ticket;
