import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { TabPanelsConfigType } from '.';

import { TabChangeHandler } from '../../types';

export type PanelSelectionTabsComponent = React.FC<{
  activeTabIndex: number;
  handleTabChange: TabChangeHandler;
}>;

const makePanelSelectionTabsComponent: // Type definition
(panelsConfig: TabPanelsConfigType) => PanelSelectionTabsComponent =
  // Function definition
  panelsConfig => ({ activeTabIndex, handleTabChange }) => (
    <Tabs value={activeTabIndex} onChange={handleTabChange}>
      {panelsConfig.map(([, , tabLabel], index) => (
        <Tab label={tabLabel} id={`tab-${index}`} />
      ))}
    </Tabs>
  );

export default makePanelSelectionTabsComponent;
