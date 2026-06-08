"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { motion } from "motion/react";

export default function ConnectionGate({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center text-white text-2xl"
      >
        Connecting to server...
      </motion.div>
    );
  }

  return <>{children}</>;
}
