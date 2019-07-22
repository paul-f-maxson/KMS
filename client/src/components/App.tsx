import React from 'react';

import SocketConnect from './SocketConnect';
import Tickets from './Tickets';

const App: React.FC = () => (
  <SocketConnect>
    <Tickets />
  </SocketConnect>
);

export default App;
