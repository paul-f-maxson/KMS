import React from 'react';

import ThemeWrapper from './ThemeWrapper';
import Tickets from './Tickets';

/** Render the large scale application componenets
 *
 */
const App: React.FC = () => (
  <ThemeWrapper>
    <Tickets />
  </ThemeWrapper>
);

export default App;
