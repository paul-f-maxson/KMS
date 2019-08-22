import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what the font-size on the html element is.
    fontSize: 12,
  },
});

const ThemeWrapper: React.FC = ({ children }) => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);

export default ThemeWrapper;
