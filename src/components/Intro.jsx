import React from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Intro = () => {
  const { completeAct, musicEnabled, setMusicEnabled } = useQuest()

  const handleBeginQuest = () => {
    completeAct(0)
  }

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="cozy-card max-w-md w-full text-center">
        {/* Music Toggle */}
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
        >
          {musicEnabled ? '🎵' : '🔇'}
        </button>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl text-cozy-pink heart-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              💖
            </motion.div>
          ))}
        </div>

        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-4xl font-bold text-cozy-purple mb-6"
        >
          Welcome to Pookie's Cozy Quest 💖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-gray-700 mb-8 leading-relaxed"
        >
          Hey beautiful! 💕 I've prepared a little adventure date night made just for you. 
          Get ready for some cozy fun, delicious food, and sweet surprises! ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <div className="text-sm text-gray-600 mb-6">
            <p>🎯 3 Acts of cozy adventure</p>
            <p>🍜 Dinner discovery game</p>
            <p>🧩 Wordle puzzle challenge</p>
            <p>🎮 Choose your cozy finale</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBeginQuest}
            className="cozy-button w-full text-xl py-4"
          >
            Begin My Quest ✨
          </motion.button>
        </motion.div>

        {/* Easter egg hearts */}
        <div className="mt-8 text-xs text-gray-500">
          <p>Tap the hearts for extra love! 💕</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Intro
