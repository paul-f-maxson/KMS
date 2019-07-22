import React from 'react';
import SocketIOClient from 'socket.io-client';
const socket = SocketIOClient.connect('/');

export const SocketRootContext = React.createContext(socket);

const SocketConnect: React.FC = ({ children }) => (
  <SocketRootContext.Provider value={socket}>
    {children}
  </SocketRootContext.Provider>
);

export default SocketConnect;
