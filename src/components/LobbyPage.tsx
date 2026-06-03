"use client";

import { useState } from "react";
import CreateRoomButton from "./CreateRoomButton";
import JoinRoomForm from "./JoinRoomForm";
import ListPlayers from "./ListPlayers";
import StartGameButton from "./StartGameButton";
import { UsernameForm } from "./UsernameForm";
import "../css/LobbyPage.css";

export default function LobbyPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);

  if (!username) {
    return (
      <UsernameForm onSubmit={setUsername} />
    );
  }

  return (
    <div>
      {!roomId && (
        <>
        <h2>{username}</h2>
          <CreateRoomButton username={username} onRoomCreated={(id, code) => {
            setRoomId(id);
            setRoomCode(code);
          }} />
          <JoinRoomForm username={username} onRoomJoined={(id, code) => {
            setRoomId(id);
            setRoomCode(code);
          }} />
        </>
      )}

      {roomId && (
        <>
          <h2>Room: {roomCode}</h2>
          <ListPlayers roomId={roomId} />
          <StartGameButton roomId={roomId} />
        </>
      )}
    </div>
  );
}
