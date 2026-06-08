"use client";

import type { TileEffect } from "../types/game";

interface TileCardProps {
  effect: TileEffect;
  myId: string | null;
  current_turn: string;
  onClose: () => void;
}

export default function TileCard({ effect, myId, current_turn, onClose }: TileCardProps) {
  const isMyTurn = current_turn === myId;

  return (
    <div className="border p-4 rounded-lg bg-gray-800 text-white">
      <h3 className="text-xl mb-2">{effect.type}</h3>

      {effect.type === "drink" && (
        <p>Drink {effect.amount} times.</p>
      )}

      {effect.type === "moveForward" && (
        <p>Move forward {effect.amount} spaces.</p>
      )}

      {effect.type === "moveBack" && (
        <p>Move back {effect.amount} spaces.</p>
      )}

      {effect.type === "skipTurn" && (
        <p>You lose your next turn.</p>
      )}

      {isMyTurn ? (
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          OK
        </button>
      ) : (
        <p className="opacity-70 text-sm">(Waiting for the active player…)</p>
      )}
    </div>
  );
}