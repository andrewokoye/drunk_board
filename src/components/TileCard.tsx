"use client";

interface TileEffect {
  type: string;
  amount?: number;
  challengeId?: string;
}

interface TileCardProps {
  effect: TileEffect;
  onClose: () => void;
}

export default function TileCard({ effect, onClose }: TileCardProps) {
  return (
    <div className="border p-4 rounded-lg bg-gray-800 text-white">
      <h3 className="text-xl mb-2">Tile Effect</h3>

      <p>Type: {effect.type}</p>

      {effect.amount !== undefined && (
        <p>Amount: {effect.amount}</p>
      )}

      {effect.challengeId && (
        <p>Challenge: {effect.challengeId}</p>
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
