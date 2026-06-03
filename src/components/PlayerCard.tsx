import { motion } from 'motion/react';
import { User } from 'lucide-react';

export interface Player {
  id: string;
  username: string;
  disconnected: boolean;
  colorIndex: number;
}

const pastelColors = [
  'var(--pastel-purple)',
  'var(--pastel-teal)',
  'var(--pastel-pink)',
  'var(--pastel-mint)',
  'var(--pastel-blue)',
  'var(--pastel-yellow)',
];

export function PlayerCard({ username, disconnected = false, colorIndex }: Player) {
  const bgColor = pastelColors[colorIndex % pastelColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: disconnected ? 0.4 : 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative"
    >
      <div
        className="rounded-lg p-4 sm:p-5 shadow-lg transition-all"
        style={{
          backgroundColor: bgColor,
          filter: disconnected ? 'grayscale(80%)' : 'none',
        }}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/10 flex items-center justify-center">
            <User className="w-6 h-6 sm:w-7 sm:h-7 text-black/60" />
          </div>

          <div className="text-center w-full">
            <p className="font-medium text-black truncate text-sm sm:text-base">
              {username}
            </p>
            {disconnected && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-black/50 mt-1"
              >
                (disconnected)
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
