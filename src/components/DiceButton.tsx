"use client";

interface DiceButtonProps {
  onRoll: () => void;
}

export default function DiceButton({ onRoll }: DiceButtonProps) {
  return (
    <button
      onClick={onRoll}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Roll Dice
    </button>
  );
}
