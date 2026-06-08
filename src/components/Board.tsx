import { Player } from "../types/game"
import { BOARD } from "../types/board";


interface BoardProps {
  players: Player[];
}

export default function Board({ players }: BoardProps) {
  return (
    <div className="grid grid-cols-8 gap-1">
      {BOARD.map(tile => (
        <div
          key={tile.position}
          className="w-12 h-12 border rounded relative bg-gray-900 text-white text-xs p-1"
        >
          <div className="absolute top-0 left-0 text-[8px] opacity-50">
            {tile.position}
          </div>

          {players
            .filter(p => p.position === tile.position)
            .map(p => (
              <div
                key={p.id}
                className="absolute inset-0 flex items-center justify-center text-yellow-300 font-bold"
              >
                {p.username[0]}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
