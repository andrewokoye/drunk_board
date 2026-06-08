"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UsernameForm } from "./UsernameForm";
import { Lobby } from "./Lobby";
import { Room } from "./Room";
import { Player } from "./PlayerCard";
import { socket } from "../lib/socket";
import { useRouter } from "next/navigation";
import "../css/LobbyPage.css";

export default function LobbyPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inRoom, setInRoom] = useState(false);
  const [hostId, setHostId] = useState<string | null>(null);
  const [myId, setMyId] = useState<string | null>(null);


  
  const router = useRouter();

  // Handle socket events
  useEffect(() => {

    function handleConnect() {
      if (socket.connected && socket.id) {
        setMyId(socket.id);
        console.log("CLIENT CONNECTED (late):", socket.id);
      }
    };

    socket.on("connect", handleConnect);

    Promise.resolve().then(() => {
      if (socket.connected && socket.id) {
        setMyId(socket.id);
        console.log("CLIENT CONNECTED (late):", socket.id);
      }
    });


    socket.on("roomCreated", ({ roomCode }) => {
      setRoomCode(roomCode);
      setInRoom(true);
    });

    socket.on("roomJoined", ({ roomCode }) => {
      setRoomCode(roomCode);
      setInRoom(true);
    });

    socket.on("playerJoined", (updatedPlayers) => {
      setPlayers(
				updatedPlayers.map((p : Player, index : number) => ({
					id: p.username,
					username: p.username,
					disconnected: p.disconnected,
					colorIndex: index,
				}))
			);

    });

    socket.on("playersList", (updatedPlayers) => {
      setPlayers(
        updatedPlayers.map((p: Player, index: number) => ({
          id: p.username,
          username: p.username,
          disconnected: p.disconnected,
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

    socket.on("gameStateUpdated", (state) => {
      if (state.status === "playing") {
        router.push(`/game/${roomCode}`);
      }
      
      if (state.host_id) {
        setHostId(state.host_id);
      }
    });

    console.log("LobbyPage mounted");
    socket.on("connect", () => console.log("CLIENT CONNECTED:", socket.id));
    socket.on("roomCreated", (data) => console.log("CLIENT roomCreated:", data));
    socket.on("roomJoined", (data) => console.log("CLIENT roomJoined:", data));

   
    return () => {
      socket.off("roomCreated");
      socket.off("roomJoined");
      socket.off("playerJoined");
      socket.off("playersList");
      socket.off("playerDisconnected");
      socket.off("gameStateUpdated");
      socket.off("connect");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (roomCode) {
      socket.emit("requestGameState", { roomCode });
    }
  }, [roomCode]);


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
		<>
		<div className="uiverse-midnight-sky fixed inset-0 -z-10">
			<div className="sky-canvas">
				<div className="stars stars-1"></div>
				<div className="stars stars-2"></div>
				<div className="stars stars-3"></div>

				<div className="meteor m1"></div>
				<div className="meteor m2"></div>
				<div className="meteor m3"></div>

				<div className="moon"></div>
			</div>
		</div>

    <div className="min-h-screen flex items-center justify-center relative z-0">
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

        {username && inRoom && roomCode && myId && (
          <motion.div key="room">
            <Room
              roomCode={roomCode}
              players={players}
              hostId={hostId}
              myId={myId}
              onStartGame={handleStartGame}
              canStartGame={players.filter((p) => !p.disconnected).length >= 2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
		</>
  );
}

// Utility for generating 4‑letter room codes
function generateRoomCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length: 4 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join("");
}
