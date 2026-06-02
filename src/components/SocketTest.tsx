// e.g. src/SocketTest.tsx
"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // same port as server

export const SocketTest: React.FC = () => {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // When the low-level connection is established
    socket.on("connect", () => {
      console.log("Socket connected with id:", socket.id);
    });

    // Our custom "connected" event from the server
    socket.on("connected", (payload: { message: string }) => {
      console.log("Received 'connected' event:", payload);
      setStatus(payload.message);
    });

    // Optional: handle disconnect
    socket.on("disconnect", () => {
      setStatus("Disconnected");
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("connect");
      socket.off("connected");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      <h2>Socket Status</h2>
      <p>{status}</p>
    </div>
  );
};
