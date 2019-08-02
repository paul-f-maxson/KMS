import React from 'react';

import SocketConnectWrapper from './SocketConnect';
import ThemeWrapper from './ThemeWrapper';
import Tickets from './Tickets';

/** Render the large scale application componenets
 *
 */
const App: React.FC = () => (
  <SocketConnectWrapper>
    <ThemeWrapper>
      <Tickets />
    </ThemeWrapper>
  </SocketConnectWrapper>
);

export default App;
