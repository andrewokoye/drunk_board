"use client";

import { useState } from "react";
import CreateRoomButton from "./CreateRoomButton";
import JoinRoomForm from "./JoinRoomForm";
import ListPlayers from "./ListPlayers";
import StartGameButton from "./StartGameButton";
import "../css/LobbyPage.css";

export default function LobbyPage() {
  const [roomId, setRoomId] = useState<string | null>(null);

  return (
    <div className="lobby-container">
      {!roomId && (
        <div className="lobby-actions">
          <CreateRoomButton onRoomCreated={setRoomId} />
          <JoinRoomForm onRoomJoined={setRoomId} />
        </div>
      )}

      {roomId && (
        <div className="lobby-room">
          <h2 className="room-title">Room: {roomId}</h2>
          <ListPlayers roomId={roomId} />
          <StartGameButton roomId={roomId} />
        </div>
      )}
    </div>
  );
}
