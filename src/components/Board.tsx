import React from "react";
import { BoardTile } from "../types/game";
import "../css/Board.css";

interface BoardProps {
  tiles: BoardTile[];
}

export const Board: React.FC<BoardProps> = ({ tiles }) => {
  return (
    <div className="board-container">
      {tiles.map((tile) => (
        <div key={tile.position} className={`tile tile-${tile.type}`}>
          <div className="tile-position">{tile.position}</div>

          {/* Tile content based on type */}
          {tile.type === "normal" && <span>•</span>}
          {tile.type === "drink" && <span>🥤 {tile.value}</span>}
          {tile.type === "challenge" && <span>⚔️ {tile.challengeId}</span>}
          {tile.type === "moveForward" && <span>➡️ +{tile.value}</span>}
          {tile.type === "moveBack" && <span>⬅️ -{tile.value}</span>}
          {tile.type === "skipTurn" && <span>⏭️ Skip</span>}
          {tile.type === "finish" && <span>🏁 Finish</span>}
        </div>
      ))}
    </div>
  );
};
