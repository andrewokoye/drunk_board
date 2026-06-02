"use client";

import { useEffect } from "react";
import { socket } from "../lib/socket";

interface CreateRoomButtonPrompts {
    username: string;
    onRoomCreated: (roomId: number, code: string) => void;
}

export default function CreateRoomButton({ username, onRoomCreated }: CreateRoomButtonPrompts) {
   
    useEffect(() => {
        socket.on("roomCreated", (roomId, code) => {
        onRoomCreated(roomId, code);
        });

        socket.on("roomError", (msg: string) => {
        alert(msg);
        });

        return () => {
        socket.off("roomCreated");
        socket.off("roomError");
        };
    }, [onRoomCreated]);

  function generateCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: 4 }, () =>
      letters[Math.floor(Math.random() * letters.length)]
    ).join("");
  }

  function handleCreateRoom() {
    const roomCode = generateCode();
    socket.emit("createRoom", { roomCode, username });
  }

  return <button 
            className="btn"
            onClick={handleCreateRoom}
        >
            Create Room
        </button>;
}
