import React from 'react';
import {
  socketConnect,
  socketDisconnect
} from 'services/SocketService/socketSetup';
import SocketResponseService from 'services/SocketService/socketResponseService';
import SocketErrorService from 'services/SocketService/socketErrorService';

const SocketContext = React.createContext();

const SocketProvider = props => {
  const socketInit = () => {
    socketConnect();
    SocketResponseService.initialize();
    SocketErrorService.initialize();
  };

  const socketEnd = () => {
    socketDisconnect();
  };

  return (
    <SocketContext.Provider
      value={{ socketInit, socketEnd }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

export { SocketProvider, useSocket };
