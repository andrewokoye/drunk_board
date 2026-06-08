"use client";

import { useParams } from "next/navigation";
import GamePageComponent from "../../../components/GamePage";

export default function GamePageRoute() {
  const { roomCode } = useParams();

  return <GamePageComponent roomCode={roomCode as string} />;
}

export const metadata = {
  title: "Drink",
};

