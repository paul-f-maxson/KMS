import React from 'react';

import { Order } from 'kms-types';

import { styled } from '@material-ui/styles';

import Paper, { PaperProps } from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Box, { BoxProps } from '@material-ui/core/Box';

import { theme } from '../ThemeWrapper';

import Meal from './Meal';
import { ListItem } from '@material-ui/core';

const TicketContent: React.FC<BoxProps> = ({ children, ...restProps }) => (
  <Box px={1.5} {...restProps}>
    {children}
  </Box>
);

// TODO: Actually make a style for this, don't just copy and mod
const TableNumber = styled('h2')({ ...theme.typography.h4, margin: 0 });

const Ticket: React.FC<Order & { PaperProps?: PaperProps }> = ({
  table,
  meals,
  PaperProps = {},
}) => {
  const mealElements = meals.map(({ seat, dish, id }, index) => (
    <React.Fragment key={id}>
      {/* A divider above every meal except the first one */}
      {index === 0 ? null : <Divider />}
      <ListItem disableGutters>
        <Meal seat={seat} dish={dish} />
      </ListItem>
    </React.Fragment>
  ));

  return (
    <Box width="12rem">
      <Paper {...PaperProps}>
        {/* Table number */}
        <TicketContent py={1.5}>
          <TableNumber>Table {table}</TableNumber>
        </TicketContent>

        <Divider variant="fullWidth" />

        <TicketContent>
          {/* Meals */}
          <List disablePadding>{mealElements}</List>
        </TicketContent>
      </Paper>
    </Box>
  );
};

export default Ticket;
