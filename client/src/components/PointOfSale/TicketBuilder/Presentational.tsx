import React, {
  useMemo,
  ChangeEventHandler,
  MouseEventHandler,
  ReactText,
} from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';

const dishButtonsConfig = ['Apples', 'Bananas', 'Grapes'];

const TicketBuilderForm: React.FC<{
  currentSeatNumber: ReactText;
  table: ReactText;
  handleTableChange: ChangeEventHandler<HTMLInputElement>;
  handleSeatNumberChange: ChangeEventHandler<HTMLInputElement>;
  handleNewMealClick: MouseEventHandler<HTMLButtonElement>;
  handleMealChangeClick: MouseEventHandler<HTMLButtonElement>;
  handleOrderSubmitClick: MouseEventHandler<HTMLButtonElement>;
}> = props => {
  const {
    currentSeatNumber,
    table,
    handleTableChange,
    handleSeatNumberChange,
    handleNewMealClick,
    handleMealChangeClick,
    handleOrderSubmitClick,
  } = props;

  const tableInput = useMemo(
    () => (
      <TextField
        required
        id="table"
        label="Table"
        type="text"
        value={table}
        onChange={handleTableChange}
        margin="normal"
      />
    ),
    [handleTableChange, table]
  );

  const seatInput = useMemo(
    () => (
      <TextField
        required
        id="seat-number"
        label="Seat Number"
        type="number"
        value={currentSeatNumber}
        onChange={handleSeatNumberChange}
        margin="normal"
      />
    ),
    [currentSeatNumber, handleSeatNumberChange]
  );

  const dishButtons = useMemo(
    () =>
      dishButtonsConfig.map(dish => (
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            value={dish}
            onClick={handleMealChangeClick}
          >
            {dish}
          </Button>
        </ListItem>
      )),
    [handleMealChangeClick]
  );

  const addToOrderButton = useMemo(
    () => (
      <Button
        size="large"
        variant="outlined"
        color="primary"
        onClick={handleNewMealClick}
      >
        Add to Order
      </Button>
    ),
    [handleNewMealClick]
  );

  const submitOrderButton = useMemo(
    () => (
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleOrderSubmitClick}
      >
        Submit Order
      </Button>
    ),
    [handleOrderSubmitClick]
  );

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Paper>
          <Box p={1}>
            <Grid container direction="column" spacing={1}>
              <Grid item>{tableInput}</Grid>

              <Grid item>
                <Grid container justify="center">
                  <Grid item>{submitOrderButton}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Grid item>
        <Paper>
          <Box p={1}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6" component="h2" color="primary">
                  NEW MEAL
                </Typography>
                <Divider />
              </Grid>

              <Grid item>{seatInput}</Grid>

              <Grid item>
                <Box
                  borderRadius="borderRadius"
                  borderColor="grey.300"
                  border={1}
                >
                  <List>
                    <Box display="flex" flexDirection="column">
                      {dishButtons}
                    </Box>
                  </List>
                </Box>
              </Grid>

              <Grid item>
                <Grid container justify="center">
                  <Grid item>{addToOrderButton}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TicketBuilderForm;
