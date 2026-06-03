import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Plus, LogIn } from 'lucide-react';

interface LobbyProps {
  username: string;
  onCreateRoom: () => void;
  onJoinRoom: (roomCode: string) => void;
}

export function Lobby({ username, onCreateRoom, onJoinRoom }: LobbyProps) {
  const [roomCode, setRoomCode] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);

  const handleJoinRoom = () => {
    if (roomCode.trim().length === 4) {
      onJoinRoom(roomCode.trim().toUpperCase());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto px-6 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-(--teal) to-(--mint) rounded-full mb-4 sm:mb-6">
          <Users className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
        </div>

        <h1 className="text-3xl sm:text-4xl mb-2">
          Hey, {username}!
        </h1>

        <p className="text-(--muted-foreground)">
          Ready to play?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreateRoom}
          className="w-full px-6 py-5 sm:py-6 bg-linear-to-r from-(--teal) to-(--mint) text-black rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-3"
        >
          <Plus className="w-6 h-6" />
          <span>Create Room</span>
        </motion.button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-(--border)"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-(--muted-foreground)">or</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {!showJoinInput ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowJoinInput(true)}
              className="w-full px-6 py-5 sm:py-6 bg-(--input-background) border-2 border-(--purple) text-white rounded-lg hover:bg-(--muted) transition-all flex items-center justify-center gap-3"
            >
              <LogIn className="w-6 h-6" />
              <span>Join Room</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Room code (4 letters)"
                className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-(--input-background) border-2 border-(--purple) rounded-lg text-white placeholder:text-(--muted-foreground) text-center tracking-widest uppercase focus:outline-none transition-all"
                maxLength={4}
                autoFocus
              />

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowJoinInput(false);
                    setRoomCode('');
                  }}
                  className="flex-1 px-4 py-3 bg-(--muted) text-white rounded-md hover:bg-(--input-background) transition-all"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoinRoom}
                  disabled={roomCode.length !== 4}
                  className="flex-1 px-4 py-3 bg-linear-to-r from-(--purple) to-(--pink) text-white rounded-md shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Join
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
