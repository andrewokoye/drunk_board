export interface Player {
  id: string;

  username: string;

  position: number;

  connected: boolean;

  tilesCompleted: number;

  skips: number;

  finished: boolean;
}

export interface BoardTile {

  position: number;

  type:
    | "normal"
    | "drink"
    | "challenge"
    | "moveForward"
    | "moveBack"
    | "skipTurn"
    | "finish";

  value?: number;

  challengeId?: string;
}

export interface GameState {
  gameId: string;

  status: "lobby" | "playing" | "finished";

  currentTurn: string; 
  
  players: Player[];

  board: BoardTile[];

  winnerId?: string;

  turnNumber: number;
}

export type TileEffect =
  | { type: "normal"; playerId: string }
  | { type: "drink"; playerId: string; amount: number }
  | { type: "skipTurn"; playerId: string };

export type ChallengeState = {
  playerId: string;
  challengeId: string;
};

export type WinnerState = {
  winnerId: string;
  winnerName: string;
  finalPlayers: Player[];
};