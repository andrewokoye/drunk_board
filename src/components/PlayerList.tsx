import { Player } from "../types/game";

interface PlayerListProps {
  players: Player[];
  current_turn: string; // socketId
}

export default function PlayerList({ players, current_turn }: PlayerListProps) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl mb-2">Players</h2>

      {players.map((p) => (
        <div
          key={p.id}
          className={p.id === current_turn ? "font-bold text-green-400" : ""}
        >
          {p.username} {p.id === current_turn && "(Your turn)"}
        </div>
      ))}
    </div>
  );
}
