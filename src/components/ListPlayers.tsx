"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

export default function ListPlayers({ roomId } : {roomId: string}) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("listPlayers", roomId);

    socket.on("playersList", (list) => {
      setPlayers(list);
    });

    socket.on("playerJoined", (list) => {
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
                <li className="player-item" key={p}>{p}</li>
            ))}
        </ul>
    </div>
  );
}
