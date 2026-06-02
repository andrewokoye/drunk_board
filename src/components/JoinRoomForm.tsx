"use client";

import { useState } from "react";
import { socket } from "../lib/socket";

interface JoinRoomFormPrompts {
    onRoomJoined: (code: string) => void
}

export default function JoinRoomForm({ onRoomJoined } : JoinRoomFormPrompts) {
  const [code, setCode] = useState("");

  function handleJoin() {
    socket.emit("joinRoom", code);

    socket.on("playerJoined", () => {
      onRoomJoined(code);
    });

    socket.on("roomError", (msg) => {
      alert(msg);
    });
  }

  return (
    <div>
      <input
        className="input"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter room code"
      />
      <button 
        className="btn"
        onClick={handleJoin}
      >
        Join Room
      </button>
    </div>
  );
}
