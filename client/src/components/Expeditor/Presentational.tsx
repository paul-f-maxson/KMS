import React from 'react';

import { Order } from 'kms-types';

import Ticket from '../Ticket';

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
        <Box p={0.5} component="li" key={order.id}>
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
  <>{orders.length === 0 ? <NoTickets /> : <TicketList orders={orders} />}</>
);

export default Presentational;
