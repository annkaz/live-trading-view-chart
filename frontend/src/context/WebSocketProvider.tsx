import React, { createContext, useContext, useEffect, useRef } from "react";

const WS_URL = "wss://wsprod.vest.exchange/ws-api?version=1.0";
const X_WEBSOCKET_SERVER = "restserver0";

type WebSocketContextType = {
  subscribe: (channel: string, callback: (data: any) => void) => void;
  unsubscribe: (channel: string, callback: (data: any) => void) => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const subscriptionsRef = useRef<Record<string, ((data: any) => void)[]>>({});

  useEffect(() => {
    const socket = new WebSocket(
      `${WS_URL}&xwebsocketserver=${X_WEBSOCKET_SERVER}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      Object.keys(subscriptionsRef.current).forEach((channel, index) => {
        socket.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: [channel],
            id: index + 1,
          })
        );
      });
    };

    socket.onmessage = async (event) => {
      const rawData = await event.data.text();
      const message = JSON.parse(rawData);

      if (message.channel && subscriptionsRef.current[message.channel]) {
        subscriptionsRef.current[message.channel].forEach((callback) =>
          callback(message.data)
        );
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  const subscribe = (channel: string, callback: (data: any) => void) => {
    if (!subscriptionsRef.current[channel]) {
      subscriptionsRef.current[channel] = [];
    }
    subscriptionsRef.current[channel].push(callback);

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [channel],
          id: Date.now(),
        })
      );
    }
  };

  const unsubscribe = (channel: string, callback: (data: any) => void) => {
    if (!subscriptionsRef.current[channel]) return;

    // Remove the specific callback from the channel
    subscriptionsRef.current[channel] = subscriptionsRef.current[
      channel
    ].filter((cb) => cb !== callback);

    // If no more callbacks for this channel, send UNSUBSCRIBE message
    if (subscriptionsRef.current[channel].length === 0) {
      delete subscriptionsRef.current[channel];
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            method: "UNSUBSCRIBE",
            params: [channel],
            id: Date.now(),
          })
        );
      }
    }
  };

  return (
    <WebSocketContext.Provider value={{ subscribe, unsubscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
