"use client";

import { socket } from "../lib/socket";

export default function StartGameButton({ roomId }: {roomId : number}) {
  
  function handleStart() {
    socket.emit("startGame", roomId);
  }

  return <button 
            className="btn start-btn"
            onClick={handleStart}
          >
              Start Game
         </button>;
}
