import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { TabPanelsConfigType } from '.';

import { ActiveMemberChangeHandler } from '../../hooks/useActiveMember';

export type PanelSelectionTabsComponent = React.FC<{
  activeTabIndex: number;
  handleTabChange: ActiveMemberChangeHandler;
}>;

const makePanelSelectionTabsComponent: // Type definition
(panelsConfig: TabPanelsConfigType) => PanelSelectionTabsComponent =
  // Function definition
  panelsConfig => ({ activeTabIndex, handleTabChange }) => (
    <Tabs value={activeTabIndex} onChange={handleTabChange}>
      {panelsConfig.map(([, , tabLabel], index) => (
        <Tab label={tabLabel} key={index} id={`tab-${index}`} />
      ))}
    </Tabs>
  );

export default makePanelSelectionTabsComponent;
