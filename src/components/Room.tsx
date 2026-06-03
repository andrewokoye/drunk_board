import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Play } from "lucide-react";
import { PlayerCard, Player } from "./PlayerCard";
import { useState } from "react";

interface RoomProps {
  roomCode: string;
  players: Player[];
  onStartGame: () => void;
  canStartGame: boolean;
}

export function Room({ roomCode, players, onStartGame, canStartGame }: RoomProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col px-6 sm:px-8 py-6 sm:py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-xl sm:text-2xl text-(--muted-foreground) mb-3 sm:mb-4">
          Room Code
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyCode}
          className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-(--purple) to-(--pink) rounded-lg shadow-lg shadow-purple-500/30"
        >
          <span className="text-3xl sm:text-4xl tracking-[0.3em] sm:tracking-[0.4em]">
            {roomCode}
          </span>
          {copied ? (
            <Check className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <Copy className="w-6 h-6 sm:w-7 sm:h-7" />
          )}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: copied ? 1 : 0 }}
          className="text-sm text-(--mint) mt-2"
        >
          Copied to clipboard!
        </motion.p>
      </motion.div>

      {/* Players Section */}
      <div className="flex-1 overflow-auto mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <h3 className="text-lg sm:text-xl text-center">
            Players in Room ({players.length})
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                id={player.id}
                username={player.username}
                disconnected={player.disconnected}
                colorIndex={player.colorIndex}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {players.length < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 sm:mt-12"
          >
            <p className="text-(--muted-foreground)">
              Waiting for more players to join...
            </p>
            <p className="text-sm text-(--muted-foreground) mt-2">
              Share the room code with your friends!
            </p>
          </motion.div>
        )}
      </div>

      {/* Start Game Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md mx-auto"
      >
        <motion.button
          whileHover={
            canStartGame
              ? { scale: 1.02, boxShadow: "0 0 30px rgba(0, 184, 148, 0.6)" }
              : {}
          }
          whileTap={canStartGame ? { scale: 0.98 } : {}}
          onClick={onStartGame}
          disabled={!canStartGame}
          className="w-full px-6 py-5 sm:py-6 bg-linear-to-r from-(--green) to-(--teal) text-white rounded-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-lg sm:text-xl">Start Game</span>
        </motion.button>

        {!canStartGame && players.length < 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-(--muted-foreground) mt-3"
          >
            Need at least 2 players to start
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
