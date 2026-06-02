export interface Player {
  id: string;

  username: string;

  position: number;

  connected: boolean;

  drinksTaken: number;

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

  currentTurnPlayerId: string;

  players: Player[];

  board: BoardTile[];

  winnerId?: string;

  turnNumber: number;
}