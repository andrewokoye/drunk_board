"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UsernameForm } from "./UsernameForm";
import { Lobby } from "./Lobby";
import { Room } from "./Room";
import { Player } from "./PlayerCard";
import { socket } from "../lib/socket";

export default function LobbyPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inRoom, setInRoom] = useState(false);

  // Handle socket events
  useEffect(() => {
    socket.on("roomCreated", ({ roomId, roomCode }) => {
      setRoomCode(roomCode);
      setInRoom(true);
    });

    socket.on("roomJoined", ({ roomId, roomCode }) => {
      setRoomCode(roomCode);
      setInRoom(true);
    });

    socket.on("playerJoined", (updatedPlayers) => {
      setPlayers(
        updatedPlayers.map((p: Player, index: number) => ({
          id: p.username,
          name: p.username,
          isDisconnected: p.disconnected,
          colorIndex: index,
        }))
      );
    });

    socket.on("playersList", (updatedPlayers) => {
      setPlayers(
        updatedPlayers.map((p: Player, index: number) => ({
          id: p.username,
          name: p.username,
          isDisconnected: p.disconnected,
          colorIndex: index,
        }))
      );
    });

    socket.on("playerDisconnected", (username) => {
      setPlayers((prev) =>
        prev.map((p) =>
          p.username === username ? { ...p, disconnected: true } : p
        )
      );
    });

    return () => {
      socket.off("roomCreated");
      socket.off("roomJoined");
      socket.off("playerJoined");
      socket.off("playersList");
      socket.off("playerDisconnected");
    };
  }, []);

  // Create room
  const handleCreateRoom = () => {
    const code = generateRoomCode();
    socket.emit("createRoom", {
      username,
      roomCode: code,
    });
  };

  // Join room
  const handleJoinRoom = (code: string) => {
    socket.emit("joinRoom", {
      username,
      roomCode: code,
    });
  };

  // Start game
  const handleStartGame = () => {
    if (roomCode) {
      socket.emit("startGame", roomCode);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!username && (
          <motion.div key="username">
            <UsernameForm onSubmit={setUsername} />
          </motion.div>
        )}

        {username && !inRoom && (
          <motion.div key="lobby">
            <Lobby
              username={username}
              onCreateRoom={handleCreateRoom}
              onJoinRoom={handleJoinRoom}
            />
          </motion.div>
        )}

        {username && inRoom && roomCode && (
          <motion.div key="room">
            <Room
              roomCode={roomCode}
              players={players}
              onStartGame={handleStartGame}
              canStartGame={players.filter((p) => !p.disconnected).length >= 2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Utility for generating 4‑letter room codes
function generateRoomCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length: 4 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join("");
}
