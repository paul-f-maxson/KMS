import React from 'react';

import { Order } from 'kms-types';

import Ticket from './Ticket';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TicketList: React.FC<{ orders: Array<Order> }> = ({ orders }) => (
  <List>
    <Box
      height="80vh"
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      alignContent="flex-start"
    >
      {orders.map(order => (
        <Box p="0.25rem" component="li" key={order.id}>
          <Ticket {...order} />
        </Box>
      ))}
    </Box>
  </List>
);

const NoTickets: React.FC = () => (
  <Box
    /* Flex child props */
    flexGrow="1"
    /* Flex parent props */
    display="flex"
    alignItems="center"
  >
    <Typography variant="h2" color="textSecondary">
      No tickets to display
    </Typography>
  </Box>
);

const Presentational: React.FC<{ orders: Array<Order> }> = ({ orders }) => (
  <Container>
    <Box display="flex" flexDirection="column">
      <Typography variant="h1">Tickets</Typography>

      {orders.length === 0 ? <NoTickets /> : <TicketList orders={orders} />}
    </Box>
  </Container>
);

export default Presentational;
