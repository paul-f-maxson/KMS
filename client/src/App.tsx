import React from 'react';
import Presentational from './Presentational';
import SocketIOClient from 'socket.io-client';
import useSocket from './useSocket';

const socket = SocketIOClient.connect('/');

const App: React.FC = () => {
  const orders = useSocket(socket, []);
  return <Presentational orders={orders} />;
};

export default App;
