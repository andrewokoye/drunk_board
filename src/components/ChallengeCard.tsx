"use client";

import type { ChallengeState } from "../types/game";

interface ChallengeCardProps {
  challenge: ChallengeState;
  myId: string | null;
  current_turn: string;
  onComplete: () => void;
}

export default function ChallengeCard({
  challenge,
  myId,
  current_turn,
  onComplete
}: ChallengeCardProps) {
  const isMyTurn = current_turn === myId;

  const title = challenge.type
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, c => c.toUpperCase());

  return (
    <div className="border p-4 rounded-lg bg-purple-800 text-white">
      <h3 className="text-xl mb-2">{title}</h3>

      <p className="mb-4">{challenge.prompt}</p>

      {isMyTurn ? (
        <button
          onClick={onComplete}
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          Done
        </button>
      ) : (
        <p className="opacity-70 text-sm">(Waiting for the active player…)</p>
      )}
    </div>
  );
}
