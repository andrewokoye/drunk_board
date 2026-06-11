"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraRig from "./CameraRig";
import { BOARD } from "../types/board";
import { Player } from "../types/game";
import Tiles3D from "./Tiles3D";
import Players3D from "./Players3D";
import Dice3D from "./Dice3D";

interface ThreeBoardProps {
  players: Player[];
  current_turn: string;
  diceResult: number | null;
}

export default function ThreeBoard({ players, current_turn, diceResult }: ThreeBoardProps) {

    const currentPlayer = players.find(p => p.id === current_turn);
    const currentTileIndex = currentPlayer ? Math.max(0, (currentPlayer.position || 1) - 1) : null;


  return (
    <div className="w-full h-[60vh] rounded-xl overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 15, 15], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />
        <Tiles3D board={BOARD} currentTileIndex={currentTileIndex}/>
        <Players3D board={BOARD} players={players} />
        <OrbitControls enablePan enableZoom enableRotate />
        <CameraRig board={BOARD} players={players} current_turn={current_turn} />
        <Dice3D value={diceResult} />
      </Canvas>
    </div>
  );
}
