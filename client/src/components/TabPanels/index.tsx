import React from 'react';

import makePanelSelectionTabsComponent, {
  PanelSelectionTabsComponent,
} from './makePanelSelectionTabsComponent';

import makePanelsComponent, { PanelsComponent } from './makePanelsComponent';

export type TabPanelsConfigType = Array<
  // [component, panelTitle, panelShortName]
  [React.ComponentType, string, string]
>;

export const makeTabComponents = (panelsConfig: TabPanelsConfigType) =>
  [
    makePanelSelectionTabsComponent(panelsConfig),
    makePanelsComponent(panelsConfig),
  ] as [PanelSelectionTabsComponent, PanelsComponent];
