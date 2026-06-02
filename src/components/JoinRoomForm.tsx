"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

interface JoinRoomFormPrompts {
    username: string;
    onRoomJoined: (roomId: number,  code: string) => void;
}

export default function JoinRoomForm({ username, onRoomJoined } : JoinRoomFormPrompts) {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("roomJoined", ({roomId, roomCode}) => {
      onRoomJoined(roomId, roomCode);
    });

    socket.on("roomError", (msg) => {
      alert(msg);
    });

    return () => {
        socket.off("playerJoined");
        socket.off("roomError");
    };
  }, [onRoomJoined, code]);
  
  function handleJoin() {
    socket.emit("joinRoom", {roomCode: code, username});
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
