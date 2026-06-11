"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import type { Player, BoardTile } from "../types/game";

const TILE_SIZE = 1.2;

function getTilePositionByIndex(index: number) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const x = (col - 3.5) * TILE_SIZE;
  const z = (row - 3.5) * TILE_SIZE;
  return [x, 0, z] as [number, number, number];
}

interface CameraRigProps {
  board: BoardTile[];
  players: Player[];
  current_turn: string | null;
}

export default function CameraRig({ board, players, current_turn }: CameraRigProps) {
  const { camera } = useThree();

    const targetPos = useMemo(() => {
      const current = players.find(p => p.id === current_turn);
      if (!current) return [0, 6, 6] as [number, number, number];

      const tileIndex = Math.max(0, (current.position || 1) - 1);
      const [x, , z] = getTilePositionByIndex(tileIndex);

      return [x + 3, 6, z + 3] as [number, number, number];
    }, [players, current_turn]);

  useFrame(() => {
  const [tx, ty, tz] = targetPos;

  camera.position.lerp(
    { x: tx, y: ty, z: tz },
    0.1
  );

  camera.lookAt(tx, 0, tz);
});

  return null;
}
