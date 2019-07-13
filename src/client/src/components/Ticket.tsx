import React from 'react';
import { Order } from '../../../types';
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
  <Paper>
    <Box width="15rem">
      {/* Table number */}
      <TicketContent py="0.7rem">
        <Typography variant="h2">{table}</Typography>
      </TicketContent>

      <Divider />

      <TicketContent>
        {/* Ticket header labels */}
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          py="0.7rem"
        >
          {/* Dish */}
          <Box>
            <Typography variant="h3">Dish</Typography>
          </Box>

          {/* Seat */}
          <Box>
            <Typography variant="h3">Seat</Typography>
          </Box>
        </Box>

        <Divider />

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
                  <Box>
                    <Typography variant="body1">{dish}</Typography>
                  </Box>

                  {/* Seat */}
                  <Box>
                    <Typography variant="h4">{seat}</Typography>
                  </Box>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </TicketContent>
    </Box>
  </Paper>
);

export default Ticket;
