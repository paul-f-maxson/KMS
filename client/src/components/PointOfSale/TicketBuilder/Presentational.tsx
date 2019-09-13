import React, { ChangeEventHandler, MouseEventHandler, ReactText } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const TicketBuilderForm: React.FC<{
  currentSeatNumber: number;
  table: ReactText;
  handleTableChange: ChangeEventHandler<HTMLInputElement>;
  handleSeatNumberChange: ChangeEventHandler<HTMLInputElement>;
  handleNewMealClick: MouseEventHandler<HTMLButtonElement>;
  handleOrderSubmitClick: MouseEventHandler<HTMLButtonElement>;
}> = ({
  currentSeatNumber,
  table,
  handleTableChange,
  handleSeatNumberChange,
  handleNewMealClick,
  handleOrderSubmitClick: handleOrderSubmit,
}) => (
  <Paper>
    <Box p={1}>
      <Grid container>
        <Grid item>
          <TextField
            required
            id="table"
            label="Table"
            type="text"
            value={table}
            onChange={handleTableChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={handleNewMealClick}
          >
            New Meal
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <TextField
            required
            id="seat-number"
            label="Seat Number"
            type="number"
            value={currentSeatNumber}
            onChange={handleSeatNumberChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <List>
            <Box display="flex" flexDirection="column">
              <ListItem>
                <Button fullWidth variant="outlined">
                  Apples
                </Button>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="outlined">
                  Bananas
                </Button>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="outlined">
                  Grapes
                </Button>
              </ListItem>
            </Box>
          </List>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleOrderSubmit}
          >
            Submit Order
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

export default TicketBuilderForm;
