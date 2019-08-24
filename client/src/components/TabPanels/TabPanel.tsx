import React from 'react';

import Box from '@material-ui/core/Box';

import { styled } from '@material-ui/core/styles';
import { theme } from '../ThemeWrapper';

export const TabPanelTitle = styled('h1')({
  ...theme.typography.h3,
  margin: 0,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// OPTIMIZE: This should not have to re-render deeply every time the tab changes. Not really a big deal because tab changes are not frequent, but still not good form. Maybe memoize the tabs?
// A Box that hides if its value prop does not match its index prop
const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {children}
  </Box>
);

export default TabPanel;
