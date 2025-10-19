import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Act1 = () => {
  const { completeAct, dinnerAnswer, setDinnerAnswer } = useQuest()
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const dinnerOptions = [
    {
      id: 'red-oolong',
      name: 'A Cozy Noodle Spot',
      clues: ['Warm, savory, handmade noodles 🍜', 'Hidden gem downtown 👀', 'Perfect for cozy date night 💕'],
      correct: true
    },
    {
      id: 'sushi',
      name: 'Fresh Fish Place',
      clues: ['Fresh fish, traditional style 🍣', 'Popular spot in Mission Hills 🏔️'],
      correct: false
    },
    {
      id: 'italian',
      name: 'Italian Comfort',
      clues: ['Italian comfort food 🍝', 'Rustic atmosphere 🏠'],
      correct: false
    },
    {
      id: 'mexican',
      name: 'Spicy Flavors',
      clues: ['Authentic Mexican flavors 🌶️', 'Colorful decor 🎨'],
      correct: false
    }
  ]

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option.id)
    setDinnerAnswer(option.name)
    
    if (option.correct) {
      setIsCorrect(true)
      setTimeout(() => {
        completeAct(1)
      }, 2000)
    } else {
      setShowHint(true)
    }
  }

  const handleArrived = () => {
    completeAct(1)
  }

  if (isCorrect) {
    return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      >
        <div className="cozy-card max-w-md w-full text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          
          <h2 className="text-3xl font-bold text-cozy-purple mb-4">
            Yay! We're off to our cozy noodle spot! 🍜
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Let's go eat some delicious handmade noodles! 💕
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleArrived}
            className="cozy-button w-full text-xl py-4"
          >
            Arrived & Ate! 🍽️
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
    >
      <div className="cozy-card max-w-lg w-full">
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-cozy-purple mb-6 text-center"
        >
          Act 1: Dinner Discovery 🍜
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-700 mb-4">
            Your first quest begins with your tummy — can you guess where we're eating?
          </p>
          
          <div className="bg-cozy-cream/50 rounded-lg p-4 mb-6">
            <p className="text-gray-600">
              <strong>Clue:</strong> It's warm, savory, and known for handmade noodles 🍜
            </p>
          </div>
        </motion.div>

        <div className="space-y-3">
          {dinnerOptions.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedAnswer === option.id
                  ? 'border-cozy-pink bg-cozy-pink/20'
                  : 'border-gray-200 hover:border-cozy-purple hover:bg-cozy-purple/10'
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-gray-800">{option.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {option.clues[0]}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-300"
          >
            <p className="text-yellow-800 text-center">
              Hmm, not quite! This place is a hidden gem tucked downtown 👀
            </p>
            <p className="text-sm text-yellow-700 mt-2 text-center">
              Try again, beautiful! 💕
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Act1
