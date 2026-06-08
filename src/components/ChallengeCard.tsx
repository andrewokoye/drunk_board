"use client";

import type { ChallengeState } from "../types/game";

interface ChallengeCardProps {
  challenge: ChallengeState;
  onComplete: () => void;
}

export default function ChallengeCard({ challenge, onComplete }: ChallengeCardProps) {
  return (
    <div className="border p-4 rounded-lg bg-purple-800 text-white">
      <h3 className="text-xl mb-2 capitalize">{challenge.type.replace(/([A-Z])/g, " $1")}</h3>

      <p className="mb-4">{challenge.prompt}</p>


      <button
        onClick={onComplete}
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        Done
      </button>
    </div>
  );
}
