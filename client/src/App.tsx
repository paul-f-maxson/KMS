import React from 'react';
import Presentational from './Presentational';

const App: React.FC = () => {
  const orders = [
    { table: 100, meals: [{ seat: 1, dish: 'apples' }] },
    {
      table: 200,
      meals: [{ seat: 1, dish: 'apples' }, { seat: 3, dish: 'oranges' }],
    },
    {
      table: 710,
      meals: [{ seat: 2, dish: 'grapes' }, { seat: 4, dish: 'bananas' }],
    },
  ];

  return <Presentational orders={orders} />;
};

export default App;
