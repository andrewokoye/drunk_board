"use client";

import ConnectionGate from "../components/ConnectionGate";
import LobbyPage from "../components/LobbyPage";

export default function Home() {
  return (
    <ConnectionGate>
      <LobbyPage />
    </ConnectionGate>
  );
}
