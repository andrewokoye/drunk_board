"use client";

import { memo } from "react";
import type { BoardTile } from "../types/game";

interface Tiles3DProps {
  board: BoardTile[];
  currentTileIndex: number | null;
}

const TILE_SIZE = 1.2;

function tileTypeColor(type: BoardTile["type"]) {
  switch (type) {
    case "drink": return "#ff6b81";
    case "neverHaveIEver": return "#74b9ff";
    case "mostLikelyTo": return "#ffeaa7";
    case "truth": return "#a29bfe";
    case "doOrDrink": return "#fd79a8";
    case "spicyQuestion": return "#e17055";
    case "story": return "#55efc4";
    case "pickSomeone": return "#fab1a0";
    case "moveForward": return "#00cec9";
    case "moveBack": return "#0984e3";
    case "skipTurn": return "#636e72";
    case "finish": return "#00ff99";
    default: return "#ffffff";
  }
}

function getTilePosition(index: number) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const x = (col - 3.5) * TILE_SIZE;
  const z = (row - 3.5) * TILE_SIZE;
  return [x, 0, z] as [number, number, number];
}

function Tiles3D({ board, currentTileIndex }: Tiles3DProps) {
  return (
    <>
      {board.map((tile, i) => {
        const [x, y, z] = getTilePosition(i);
        const color = tileTypeColor(tile.type);
        const isActive = currentTileIndex === i;

        return (
          <mesh key={tile.position} position={[x, y, z]} receiveShadow castShadow>
            <boxGeometry args={[TILE_SIZE, 0.2, TILE_SIZE]} />
            <meshStandardMaterial
              color={color}
              emissive={isActive ? color : "#000000"}
              emissiveIntensity={isActive ? 0.6 : 0}
            />
          </mesh>
        );
      })}
    </>
  );
}

export default memo(Tiles3D);
