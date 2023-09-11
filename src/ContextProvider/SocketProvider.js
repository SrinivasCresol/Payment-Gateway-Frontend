import React, { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(
      "https://react-io-socket-notifications.onrender.com"
    );
    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
