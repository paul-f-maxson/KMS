import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import { styled } from '@material-ui/styles';

import Tickets from './Tickets';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Dashboard = () => <h1>Landing Page</h1>;
const PointOfSale = () => <h1>Point of Sale</h1>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

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
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {children}
  </Box>
);

const BottomAppBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
});

// The base structure of the UI (ie the tabbing system)
const Layout: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabValue: number
  ) => {
    setTabValue(newTabValue);
  };

  return (
    <>
      <TabPanel value={tabValue} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Tickets />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <PointOfSale />
      </TabPanel>
      <BottomAppBar color="primary">
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Dash" />
          <Tab label="Expo" />
          <Tab label="POS" />
        </Tabs>
      </BottomAppBar>
    </>
  );
};

export default Layout;
