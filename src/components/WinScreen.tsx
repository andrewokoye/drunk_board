"use client";

import type { Player } from "../types/game";

interface WinData {
  winnerId: string;
  winnerName: string;
  finalPlayers: Player[];
}

interface WinScreenProps {
  winner: WinData;
}

export default function WinScreen({ winner }: WinScreenProps) {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">🎉 Game Over!</h1>
      <h2 className="text-2xl">Winner: {winner.winnerName}</h2>

      <h3 className="text-xl mt-6">Final Stats</h3>

      {winner.finalPlayers.map((p) => (
        <div key={p.id} className="mt-2">
          {p.username} — Tiles Completed: {p.finished ? "✔" : p.position}
        </div>
      ))}
    </div>
  );
}
