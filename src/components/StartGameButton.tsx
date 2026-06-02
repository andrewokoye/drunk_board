"use client";

import { socket } from "../lib/socket";

export default function StartGameButton({ roomId }: {roomId : string}) {
  function handleStart() {
    socket.emit("startGame", roomId);
  }

  return <button onClick={handleStart}>Start Game</button>;
}
