import { TabChangeHandler } from '../types';
import { useState, useCallback } from 'react';

/** A Hook used to implement a tabbing system
 * @description Handle a React.ChangeEvent by updating a tab index value kept in state.
 * @param initialIndex - The index corresponding to the default tab
 * @returns A tuple of the current tab value and a (memoized) event handler
 */
const useTabs = (initialIndex: number) => {
  const [activeTabIndex, setTabValue] = useState(initialIndex);

  const handleTabChange = useCallback(
    (_: React.ChangeEvent<{}>, newTabValue: number) => {
      setTabValue(newTabValue);
    },
    []
  );

  // This typecast seems to be necessary with tuples
  return [activeTabIndex, handleTabChange] as [number, TabChangeHandler];
};

export default useTabs;
