import React from 'react';

import { Order } from '../../../types';

import Ticket from './Ticket';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, styled } from '@material-ui/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what the font-size on the html element is.
    htmlFontSize: 19,
  },
});

const _TicketList: React.FC<{ orders: Array<Order> }> = ({ orders }) => (
  <Box height="100%">
    <List>
      <Box
        /* Flex parent props */
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        alignContent="flex-start"
      >
        {orders.map(order => (
          <React.Fragment key={order.id}>
            <Box>
              <ListItem>
                <Ticket {...order} />
              </ListItem>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </List>
  </Box>
);

const TicketGridList = styled(GridList)({
  flexDirection: 'column',
});

const TicketList: React.FC<{ orders: Array<Order> }> = ({ orders }) => (
  <TicketGridList cellHeight="auto">
    {orders.map(order => (
      <React.Fragment key={order.id}>
        <Box>
          <ListItem>
            <Ticket {...order} />
          </ListItem>
        </Box>
      </React.Fragment>
    ))}
  </TicketGridList>
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
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Container>
        <Box p="1rem" height="100vh" display="flex" flexDirection="column">
          <Typography variant="h1">Tickets</Typography>

          {orders.length === 0 ? <NoTickets /> : <TicketList orders={orders} />}
        </Box>
      </Container>
    </ThemeProvider>
  </>
);

export default Presentational;
