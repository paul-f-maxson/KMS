import React from 'react';

export type TabChangeHandler = (
  _: React.ChangeEvent<{}>,
  newTabValue: number
) => void;
