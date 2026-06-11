"use client";

import { memo } from "react";
import type { BoardTile, Player } from "../types/game";

interface Players3DProps {
  board: BoardTile[];
  players: Player[];
}

const TILE_SIZE = 1.2;

function getTilePositionByIndex(index: number) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const x = (col - 3.5) * TILE_SIZE;
  const z = (row - 3.5) * TILE_SIZE;
  return [x, 0.2, z] as [number, number, number];
}

function getTileIndexFromPosition(position: number) {
  // positions are 1-based in your BOARD
  return Math.max(0, position - 1);
}

const PLAYER_COLORS = ["#ff7675", "#74b9ff", "#ffeaa7", "#55efc4"];

function Players3D({ board, players }: Players3DProps) {
  return (
    <>
      {players.map((player, idx) => {
        const tileIndex = getTileIndexFromPosition(player.position || 1);
        const [x, y, z] = getTilePositionByIndex(tileIndex);
        const color = PLAYER_COLORS[idx % PLAYER_COLORS.length];

        return (
          <mesh key={player.id} position={[x, y + 0.3, z]} castShadow>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
        );
      })}
    </>
  );
}

export default memo(Players3D);
