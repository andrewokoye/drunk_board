export interface Player {
  id: string;

  username: string;

  position: number;

  connected: boolean;

  tilesCompleted: number;

  skips: number;

  finished: boolean;
}

export type TileType =
  | "drink"
  | "neverHaveIEver"
  | "mostLikelyTo"
  | "truth"
  | "doOrDrink"
  | "spicyQuestion"
  | "story"
  | "pickSomeone"
  | "moveForward"
  | "moveBack"
  | "skipTurn"
  | "finish";


export interface BoardTile {

  position: number;

  type: TileType;

  value?: number;

  prompt?: string;
}

export interface GameState {
  gameId: string;

  status: "lobby" | "playing" | "finished";

  current_turn: string; 
  
  players: Player[];

  board: BoardTile[];

  winnerId?: string;

  turnNumber: number;
}

export type TileEffect =
  | { type: "drink"; amount: number; playerId: string }
  | { type: "moveForward"; amount: number; playerId: string }
  | { type: "moveBack"; amount: number; playerId: string }
  | { type: "skipTurn"; playerId: string };


export type ChallengeState = {
  playerId: string;
  prompt: string;
  type: TileType;
};

export type WinnerState = {
  winnerId: string;
  winnerName: string;
  finalPlayers: Player[];
};