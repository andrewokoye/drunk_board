"use client";

import { Board } from "../components/Board";
import { BoardTile } from "../types/game";
import  SocketTest from "../components/SocketTest";
import LobbyPage from "../components/LobbyPage";

const exampleBoard: BoardTile[] = [
  { position: 1, type: "normal" },
  { position: 2, type: "drink", value: 2 },
  { position: 3, type: "challenge", challengeId: "C1" },
  { position: 4, type: "moveForward", value: 3 },
  { position: 5, type: "moveBack", value: 2 },
  { position: 6, type: "skipTurn" },
  { position: 7, type: "finish" }
];

export default function App() {
  return (
    <>
        <Board tiles={exampleBoard} />
        <span>




        </span>
        <div>
            <h1>Tipsy Land</h1>
            <SocketTest />
        </div> 
        <LobbyPage />
    </>
)}



