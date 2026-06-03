import { Player } from "../types/game";

interface BoardProps {
  players: Player[];
}

export default function Board({ players }: BoardProps) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl mb-2">Board</h2>

      {players.map((p) => (
        <div key={p.id}>
          {p.username}: Tile {p.position}
        </div>
      ))}
    </div>
  );
}
