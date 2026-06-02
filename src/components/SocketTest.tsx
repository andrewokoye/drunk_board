"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://drunk-board-server.onrender.com");

export default function SocketTest() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    socket.on("connected", (payload) => {
      setStatus(payload.message);
    });

    return () => {
      socket.off("connected");
    };
  }, []);

  return <p>{status}</p>;
}
