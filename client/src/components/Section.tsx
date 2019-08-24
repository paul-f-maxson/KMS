import React from 'react';
import Box from '@material-ui/core/Box';
import { theme } from './ThemeWrapper';
import { styled } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

export const SectionTitle = styled('h2')({
  ...theme.typography.h5,
  margin: 0,
});

export const SectionSubtitle = styled('p')(theme.typography.subtitle1);

export const SectionBody = styled('p')(theme.typography.body1);

const Section: React.FC = ({ children }) => (
  <Paper>
    <Box component="section" p={1}>
      {children}
    </Box>
  </Paper>
);

export default Section;
