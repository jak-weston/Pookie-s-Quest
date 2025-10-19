import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Act3 = () => {
  const { completeAct, setCurrentAct, addPhoto } = useQuest()
  const [selectedOption, setSelectedOption] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const fileInputRef = useRef(null)

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsCorrect(true)
  }

  const handleFileSelect = (event) => {
    console.log('File select triggered in Act3')
    const file = event.target.files[0]
    console.log('Selected file:', file)
    
    if (file) {
      console.log('File selected, reading...')
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log('File read successfully')
        const photoData = {
          act: 'finale',
          timestamp: new Date().toISOString(),
          dataUrl: e.target.result
        }
        
        console.log('Adding photo data:', photoData)
        addPhoto(photoData)
        
        // Add a small delay to ensure photo is saved
        setTimeout(() => {
          console.log('Completing act 3')
          completeAct(3)
        }, 100)
      }
      reader.readAsDataURL(file)
    } else {
      console.log('No file selected')
    }
  }

  const handleUploadClick = () => {
    console.log('Upload click triggered in Act3')
    console.log('File input ref:', fileInputRef.current)
    fileInputRef.current?.click()
  }

  const handleBack = () => {
    setCurrentAct(2)
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
            onClick={() => setIsCorrect(false)}
            className="absolute top-4 left-4 text-2xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-6xl mb-4"
          >
            {selectedOption === 'game' ? '🎮' : '🎬'}
          </motion.div>
          
          <h2 className="text-3xl font-bold text-cozy-purple mb-4">
            Perfect! {selectedOption === 'game' ? 'Game Night' : 'Movie Mode'} Selected! 
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-cozy-cream/50 rounded-lg p-4">
              <p className="text-gray-700">
                {selectedOption === 'game' 
                  ? '🎮 Time for some fun games together! Perfect for laughs and friendly competition 💕'
                  : '🎬 Perfect for snuggles and cozy vibes! Time to cuddle up and watch something together 🍿'
                }
              </p>
            </div>
            
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
            You've solved all the clues, Pookie! Time to unwind 💕
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => handleOptionSelect('game')}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedOption === 'game'
                ? 'border-cozy-pink bg-cozy-pink/20'
                : 'border-gray-200'
            }`}
          >
            <div className="text-4xl mb-3">🎮</div>
            <div className="font-bold text-xl text-gray-800 mb-2">Game Night</div>
            <div className="text-gray-600">
              Let's play some fun online games together! 💕
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => handleOptionSelect('movie')}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedOption === 'movie'
                ? 'border-cozy-pink bg-cozy-pink/20'
                : 'border-gray-200'
            }`}
          >
            <div className="text-4xl mb-3">🎬</div>
            <div className="font-bold text-xl text-gray-800 mb-2">Movie Mode</div>
            <div className="text-gray-600">
              Time to cuddle up and watch something cozy together 🍿
            </div>
          </motion.button>
        </div>

        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gradient-to-r from-cozy-pink to-cozy-purple text-white rounded-lg"
          >
            <p className="text-center font-semibold">
              Perfect choice! 💕
            </p>
            <p className="text-center text-sm mt-1 opacity-90">
              {selectedOption === 'game' 
                ? 'Time for some fun games together! 💕' 
                : 'Perfect for snuggles and cozy vibes! 🍿'
              }
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Act3
