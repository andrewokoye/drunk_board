"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { Player } from "../lib/interfaces";

export default function ListPlayers({ roomId } : {roomId: number}) {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.emit("listPlayers", roomId);

    socket.on("playerJoined", (players) => setPlayers(players));
    socket.on("playersList", (players) => setPlayers(players));
    socket.on("playerDisconnected", (username) => {
        setPlayers(prev =>
        prev.map(p =>
            p.username === username ? { ...p, disconnected: true } : p
        )
        );
    });

    return () => {
      socket.off("playersList");
      socket.off("playerJoined");
      socket.off("playerDisconnected");
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
