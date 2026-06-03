"use client";

import { useParams } from "next/navigation";

export default function GamePage() {
  const { roomCode } = useParams();

  return (
    <div>
      <h1>Game Room {roomCode}</h1>
      {/* Board, players, game logic, etc */}
    </div>
  );
}
