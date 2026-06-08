"use client";

import type { TileEffect } from "../types/game";

interface TileCardProps {
  effect: TileEffect;
  onClose: () => void;
}

export default function TileCard({ effect, onClose }: TileCardProps) {
  const title = effect.type
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, c => c.toUpperCase());

  return (
    <div className="border p-4 rounded-lg bg-gray-800 text-white">
      <h3 className="text-xl mb-2">{title}</h3>

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

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        OK
      </button>
    </div>
  );
}
