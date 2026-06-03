import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface UsernameFormProps {
  onSubmit: (username: string) => void;
}

export function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-6 sm:px-8"
    >
      <div className="text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-(--purple) to-(--pink) rounded-full mb-4 sm:mb-6"
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl mb-2"
        >
          Welcome to Tipsy Land!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-(--muted-foreground)"
        >
          Enter your name to start playing
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-(--input-background) border-2 border-transparent rounded-lg text-white placeholder:text-(--muted-foreground) focus:border-(--purple) focus:outline-none transition-all"
          maxLength={20}
          autoFocus
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-4 sm:py-5 bg-linear-to-r from-(--purple) to-(--pink) text-white rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!username.trim()}
        >
          Continue
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
