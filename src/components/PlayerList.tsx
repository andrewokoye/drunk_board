import { Player } from "../types/game";

interface PlayerListProps {
  players: Player[];
  currentTurn: string; // socketId
}

export default function PlayerList({ players, currentTurn }: PlayerListProps) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl mb-2">Players</h2>

      {players.map((p) => (
        <div
          key={p.id}
          className={p.id === currentTurn ? "font-bold text-green-400" : ""}
        >
          {p.username} {p.id === currentTurn && "(Your turn)"}
        </div>
      ))}
    </div>
  );
}
