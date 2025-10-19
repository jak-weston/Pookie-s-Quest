import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Act3 = () => {
  const { completeAct } = useQuest()
  const [selectedOption, setSelectedOption] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setShowConfetti(true)
    
    setTimeout(() => {
      completeAct(3)
    }, 2000)
  }

  const Confetti = () => {
    if (!showConfetti) return null

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100vh',
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]
            }}
            animate={{
              y: -window.innerHeight,
              rotate: 360,
              x: (Math.random() - 0.5) * 200
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Confetti />
      
      <div className="cozy-card max-w-lg w-full text-center">
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-cozy-purple mb-6"
        >
          Act 3: Cozy Finale 🎮🎬
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg text-gray-700 mb-6">
            You've solved all the clues, Pookie! Time to unwind and choose your perfect cozy ending 💕
          </p>
          
          <div className="bg-cozy-cream/50 rounded-lg p-4 mb-6">
            <p className="text-gray-600">
              What sounds more appealing for our cozy night? ✨
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOptionSelect('game')}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedOption === 'game'
                ? 'border-cozy-pink bg-cozy-pink/20'
                : 'border-gray-200 hover:border-cozy-purple hover:bg-cozy-purple/10'
            }`}
          >
            <div className="text-4xl mb-3">🎮</div>
            <div className="font-bold text-xl text-gray-800 mb-2">Game Night</div>
            <div className="text-gray-600">
              Let's play some fun online games together! Perfect for laughs and friendly competition 💕
            </div>
            <div className="text-sm text-gray-500 mt-2">
              (Gartic Phone, GeoGuessr, or Jackbox)
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOptionSelect('movie')}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedOption === 'movie'
                ? 'border-cozy-pink bg-cozy-pink/20'
                : 'border-gray-200 hover:border-cozy-purple hover:bg-cozy-purple/10'
            }`}
          >
            <div className="text-4xl mb-3">🎬</div>
            <div className="font-bold text-xl text-gray-800 mb-2">Movie Mode</div>
            <div className="text-gray-600">
              Time to cuddle up and watch something cozy together 🍿 Perfect for snuggles!
            </div>
            <div className="text-sm text-gray-500 mt-2">
              (Netflix, Hulu, or your favorite streaming service)
            </div>
          </motion.button>
        </div>

        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gradient-to-r from-cozy-pink to-cozy-purple text-white rounded-lg"
          >
            <p className="font-semibold">
              {selectedOption === 'game' 
                ? '🎮 Game night it is! Get ready for some fun!'
                : '🎬 Movie mode activated! Time for cozy cuddles!'
              }
            </p>
            <p className="text-sm mt-1 opacity-90">
              Preparing your perfect ending... ✨
            </p>
          </motion.div>
        )}

        {/* Heart meter */}
        <div className="mt-8">
          <div className="text-sm text-gray-600 mb-2">Cozy Quest Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-cozy-pink to-cozy-purple h-3 rounded-full"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">💕 Quest Complete! 💕</div>
        </div>
      </div>
    </motion.div>
  )
}

export default Act3
