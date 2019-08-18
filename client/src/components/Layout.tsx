import React, { useState, useCallback } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import { styled } from '@material-ui/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Expeditor from './Expeditor';

const Dashboard = () => <h1>Dashboard</h1>;
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
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {children}
  </Box>
);

const BottomAppBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
});

const useTabs = (initialIndex: number) => {
  const [activeTabIndex, setTabValue] = useState(initialIndex);

  const handleTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newTabValue: number) => {
      setTabValue(newTabValue);
    },
    []
  );

  return [activeTabIndex, handleTabChange];
};

/** The base structure of the UI (ie the tabbing system)
 */
const Layout: React.FC = () => {
  // NOTE: Change default tab back to 0 when done working on this
  const [activeTabIndex, handleTabChange] = useTabs(1);

  return (
    <>
      <TabPanel value={activeTabIndex} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1}>
        <Expeditor />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={2}>
        <PointOfSale />
      </TabPanel>
      <BottomAppBar color="primary">
        <Tabs
          value={activeTabIndex}
          onChange={
            // Without cast the handler's type gets unioned with number for some reason
            handleTabChange as (
              event: React.ChangeEvent<{}>,
              newTabValue: number
            ) => void
          }
        >
          <Tab label="Dash" id="tab-0" />
          <Tab label="Expo" id="tab-1" />
          <Tab label="POS" id="tab-2" />
        </Tabs>
      </BottomAppBar>
    </>
  );
};

export default Layout;
