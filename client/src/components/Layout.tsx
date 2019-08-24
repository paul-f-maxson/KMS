import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import { styled } from '@material-ui/styles';

import Container from '@material-ui/core/Container';

import { makeTabComponents, TabPanelsConfigType } from './TabPanels';

import Expeditor from './Expeditor';
import Dashboard from './Dashboard';
import useTabs from '../hooks/useTabs';

const PointOfSale = () => null;

const BottomAppBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
});

const uiPanelsConfig: TabPanelsConfigType = [
  [Dashboard, 'Dashboard', 'DASH'],
  [Expeditor, 'Expeditor', 'EXPO'],
  [PointOfSale, 'Point of Sale', 'POS'],
];

const [PanelSelectionTabs, TabPanels] = makeTabComponents(uiPanelsConfig);

/** The base structure of the UI (i.e. the tabbing system)
 */
const Layout: React.FC = () => {
  // NOTE: Change default tab back to 0 when done working on this
  const [activeTabIndex, handleTabChange] = useTabs(0);

  return (
    <Container>
      {/* The tabs themselves */}
      <TabPanels activeTabIndex={activeTabIndex} />
      {/* Tab selection UI */}
      <BottomAppBar color="primary">
        <PanelSelectionTabs
          activeTabIndex={activeTabIndex}
          handleTabChange={handleTabChange}
        />
      </BottomAppBar>
    </Container>
  );
};

export default Layout;
