import React from 'react';
import SocketIOClient from 'socket.io-client';

export const SocketRootContext = React.createContext(SocketIOClient);

const SocketConnectWrapper: React.FC = ({ children }) => (
  <SocketRootContext.Provider value={SocketIOClient}>
    {children}
  </SocketRootContext.Provider>
);

export default SocketConnectWrapper;
