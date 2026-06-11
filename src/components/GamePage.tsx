"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import ThreeBoard from "./ThreeBoard";
import PlayerList from "./PlayerList";
import DiceButton from "./DiceButton";
import TileCard from "./TileCard";
import ChallengeCard from "./ChallengeCard";
import WinScreen from "./WinScreen";
import type { ChallengeState, GameState, TileEffect, WinnerState } from "../types/game";

export default function GamePage({ roomCode }: { roomCode: string }) {

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [tileEffect, setTileEffect] = useState<TileEffect | null>(null);
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);
  const [winner, setWinner] = useState<WinnerState | null>(null);
  const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => {

    Promise.resolve().then(() => {
      if (socket.connected && socket.id) {
        setMyId(socket.id);
      }
    });

    //HELP UPDATE
    socket.emit("requestGameState", { roomCode });

    // FULL GAME STATE UPDATE
    socket.on("gameStateUpdated", (state: GameState) => {
      setGameState(state);
    });

    // TURN CHANGE
    socket.on("turnChanged", (playerId: string) => {
      setGameState((prev) =>
        prev ? { ...prev, current_turn: playerId } : prev
      );
    });

    // DICE
    socket.on("diceRolled", ({ value }) => {
      setDiceResult(value);
    });

    // MOVEMENT
    socket.on("playerMoved", ({ playerId, newPosition }) => {
    setGameState(prev =>
        prev
        ? {
            ...prev,
            players: prev.players.map(p =>
                p.id === playerId ? { ...p, position: newPosition } : p
            ),
            }
        : prev
    );
    });


    // TILE EFFECT
    socket.on("tileEffect", (effect) => {
      setTileEffect(effect);
    });


    // CHALLENGE
    socket.on("challengeTriggered", ({ playerId, prompt, type }) => {
      setChallenge({ playerId, prompt, type });
    });


    // WIN
    socket.on("gameWon", ({ winnerId, winnerName, finalPlayers }) => {
      setWinner({ winnerId, winnerName, finalPlayers });
    });

    // EFFECT RESET
    socket.on("clearEffects", () => {
      setTileEffect(null);
      setChallenge(null);
      setDiceResult(null);
    });


    return () => {
      socket.off("gameStateUpdated");
      socket.off("turnChanged");
      socket.off("diceRolled");
      socket.off("playerMoved");
      socket.off("tileEffect");
      socket.off("challengeTriggered");
      socket.off("gameWon");
      socket.off("clearEffects");
    };
  }, [roomCode]);

  if (!gameState) {
    return <div>Loading game...</div>;
  }

  if (winner) {
    return <WinScreen winner={winner} />;
  }

  const isMyTurn = gameState.current_turn === myId;
  const canRoll = isMyTurn && !challenge && !tileEffect;


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Room {roomCode}</h1>

      <PlayerList
        players={gameState.players}
        current_turn={gameState.current_turn}
      />

      <ThreeBoard 
        players={gameState.players}
        current_turn={gameState.current_turn} 
        diceResult={diceResult}
      />

      {diceResult && <div className="text-xl">Dice: {diceResult}</div>}

      {tileEffect && (
        <TileCard 
        effect={tileEffect} 
        myId={myId} 
        current_turn={gameState.current_turn}
        roomCode={roomCode}
        onClose={() => setTileEffect(null)} />
      )}

      {challenge && (
        <ChallengeCard
          challenge={challenge}
          myId={myId}
          current_turn={gameState.current_turn}
          roomCode={roomCode}
          onComplete={() => {
            setChallenge(null);
          }}
        />
      )}

      {canRoll && (
        <DiceButton onRoll={() => socket.emit("rollDice", { roomCode })} />
      )}
    </div>
  );
}
