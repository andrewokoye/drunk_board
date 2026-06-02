"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { Player } from "../lib/interfaces";

export default function ListPlayers({ roomId } : {roomId: number}) {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.emit("listPlayers", roomId);

    socket.on("playersList", (list: Player[]) => {
      setPlayers(list);
    });

    socket.on("playerJoined", (list: Player[]) => {
      setPlayers(list);
    });

    return () => {
      socket.off("playersList");
      socket.off("playerJoined");
    };
  }, [roomId]);

  return (
    <div>
      <h3 className="players-title">Players in Room {roomId}</h3>
      <ul className="players-list">
        {players.map((p) => (
          <li className="player-item" key={p.username}>
            {p.username}
            {p.disconnected && " (disconnected)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

/*  Removal button
<button onClick={() => socket.emit("removePlayer", { roomId, username: p.username })}>
  Remove
</button>
*/
