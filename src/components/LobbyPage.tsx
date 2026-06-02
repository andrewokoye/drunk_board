"use client";

import { useState } from "react";
import CreateRoomButton from "./CreateRoomButton";
import JoinRoomForm from "./JoinRoomForm";
import ListPlayers from "./ListPlayers";
import StartGameButton from "./StartGameButton";

export default function LobbyPage() {
  const [roomId, setRoomId] = useState<string | null>(null);

  return (
    <div>
      {!roomId && (
        <>
          <CreateRoomButton onRoomCreated={setRoomId} />
          <JoinRoomForm onRoomJoined={setRoomId} />
        </>
      )}

      {roomId && (
        <>
          <h2>Room: {roomId}</h2>
          <ListPlayers roomId={roomId} />
          <StartGameButton roomId={roomId} />
        </>
      )}
    </div>
  );
}
