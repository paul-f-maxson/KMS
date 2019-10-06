import React from 'react';

import { TabPanelsConfigType } from './';

import TabPanel, { TabPanelTitle } from './TabPanel';

export type PanelsComponent = React.FC<{
  activeTabIndex: number;
}>;

const makePanelsComponent: // Type definition
(panelsConfig: TabPanelsConfigType) => PanelsComponent =
  // Function definition
  panelsConfig => ({ activeTabIndex }) => (
    <>
      {panelsConfig.map(([PanelComponent, panelTitle], index) => (
        <TabPanel value={activeTabIndex} index={index} key={index}>
          <TabPanelTitle>{panelTitle}</TabPanelTitle>
          <PanelComponent />
        </TabPanel>
      ))}
    </>
  );

export default makePanelsComponent;
