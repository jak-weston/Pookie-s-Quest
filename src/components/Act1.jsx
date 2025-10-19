import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Act1 = () => {
  const { completeAct, dinnerAnswer, setDinnerAnswer, addPhoto, setCurrentAct } = useQuest()
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const fileInputRef = useRef(null)

  const dinnerOptions = [
    {
      id: 'noodles',
      name: 'Ramen Nagi',
      clues: ['Handmade noodles 🍜', 'Little Italy 🍝'],
      correct: true,
      mapLink: 'https://maps.google.com/?q=Ramen+Nagi+San+Diego'
    },
    {
      id: 'sushi',
      name: 'Sushi Ota',
      clues: ['Fresh fish 🍣', 'Mission Hills 🏔️'],
      correct: true,
      mapLink: 'https://maps.google.com/?q=Sushi+Ota+San+Diego'
    },
    {
      id: 'burgers',
      name: 'The Balboa Bar & Grill',
      clues: ['Juicy burgers 🍔', 'Balboa Park 🏛️'],
      correct: true,
      mapLink: 'https://maps.google.com/?q=Balboa+Bar+Grill+San+Diego'
    }
  ]

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option.id)
    setDinnerAnswer(option.name)
    setIsCorrect(true)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoData = {
          act: 'dinner',
          timestamp: new Date().toISOString(),
          dataUrl: e.target.result
        }
        
        addPhoto(photoData)
        completeAct(1)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }


  const handleBack = () => {
    setCurrentAct(0)
  }

  if (isCorrect) {
    return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      >
        <div className="cozy-card max-w-md w-full text-center">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-2xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          
          <h2 className="text-3xl font-bold text-cozy-purple mb-4">
            Perfect! {dinnerAnswer} 🍜
          </h2>
          
          <div className="space-y-4 mb-6">
            <a 
              href={dinnerOptions.find(opt => opt.name === dinnerAnswer)?.mapLink || 'https://maps.google.com/?q=San+Diego+Restaurants'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              📍 Get Directions
            </a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUploadClick}
              className="cozy-button w-full text-xl py-4"
            >
              Upload Photo 📸
            </motion.button>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
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
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-2xl hover:scale-110 transition-transform"
        >
          ←
        </button>
        
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
          className="text-center mb-6"
        >
          <p className="text-lg text-gray-700 mb-4">
            Choose where we're eating! 🍜
          </p>
        </motion.div>

        <div className="space-y-3">
          {dinnerOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-300 ${
                        selectedAnswer === option.id
                          ? 'border-cozy-pink bg-cozy-pink/20'
                          : 'border-gray-200'
                      }`}
            >
              <button
                onClick={() => handleAnswerSelect(option)}
                className="w-full text-left"
              >
                <div className="font-semibold text-gray-800">{option.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {option.clues[0]}
                </div>
              </button>
              <a 
                href={option.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-xs text-blue-600 hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                📍 View on Map
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}

export default Act1
