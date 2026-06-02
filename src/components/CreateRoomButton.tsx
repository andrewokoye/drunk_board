"use client";

import { socket } from "../lib/socket";

interface CreateRoomButtonProps {
  onRoomCreated: (roomId: string) => void;
}

export default function CreateRoomButton({ onRoomCreated }: CreateRoomButtonProps) {
  function generateCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: 4 }, () =>
      letters[Math.floor(Math.random() * letters.length)]
    ).join("");
  }

  function handleCreateRoom() {
    const roomId = generateCode();

    socket.emit("createRoom", roomId);

    socket.on("roomCreated", () => {
      onRoomCreated(roomId);
    });

    socket.on("roomError", (msg) => {
      alert(msg);
    });
  }

  return <button 
            className="btn"
            onClick={handleCreateRoom}
        >
            Create Room#
        </button>;
}
