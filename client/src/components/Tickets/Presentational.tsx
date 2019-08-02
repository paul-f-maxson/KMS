import React from 'react';

import { Order } from 'kms-types';

import Ticket from './Ticket';

import { styled } from '@material-ui/styles';

import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const ColumnGridList = styled(GridList)({
  flexDirection: 'column',
});

const TicketList: React.FC<{ orders: Array<Order> }> = ({ orders }) => (
  <ColumnGridList cellHeight="auto">
    {orders.map(order => (
      /* Not using a Fragment here because GridList does not accept them as children */
      <Box key={order.id}>
        <ListItem>
          <Ticket {...order} />
        </ListItem>
      </Box>
    ))}
  </ColumnGridList>
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
    <Box p="1rem" height="100vh" display="flex" flexDirection="column">
      <Typography variant="h1">Tickets</Typography>

      {orders.length === 0 ? <NoTickets /> : <TicketList orders={orders} />}
    </Box>
  </Container>
);

export default Presentational;
