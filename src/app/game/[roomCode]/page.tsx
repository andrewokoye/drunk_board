import GamePageComponent from "../../../components/GamePage";

export function generateMetadata({ params }: { params: { roomCode: string } }) {
  return {
    title: `Room ${params.roomCode}`,
  };
}

export default function GamePageRoute({ params }: { params: { roomCode: string } }) {
  return <GamePageComponent roomCode={params.roomCode} />;
}
