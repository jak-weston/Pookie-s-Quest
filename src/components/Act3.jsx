import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Act3 = () => {
  const { completeAct, setCurrentAct, addPhoto } = useQuest()
  const [selectedOption, setSelectedOption] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPhotoOption, setShowPhotoOption] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const fileInputRef = useRef(null)

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsCorrect(true)
  }

  const handleArrived = () => {
    setShowPhotoOption(true)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoData = {
          act: 'finale',
          timestamp: new Date().toISOString(),
          dataUrl: e.target.result
        }
        
        addPhoto(photoData)
        completeAct(3)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
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
            
            {!showPhotoOption ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleArrived}
                className="cozy-button w-full text-xl py-4"
              >
                Upload Photo 📸
              </motion.button>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-gray-600">Capture this cozy moment! 📸</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUploadClick}
                  className="w-full py-3 px-4 bg-cozy-pink text-white rounded-lg font-semibold hover:bg-cozy-pink/80 transition-colors"
                >
                  📸 Upload Photo
                </motion.button>
              </div>
            )}
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
              Let's play some fun online games together! 💕
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
              {selectedOption === 'game' ? '🎮 Game Night Selected!' : '🎬 Movie Mode Selected!'}
            </p>
            {!showPhotoOption ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPhotoOption(true)}
                className="w-full mt-3 py-2 px-4 bg-white text-cozy-purple rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Upload Photo 📸
              </motion.button>
            ) : (
              <div className="mt-3 space-y-2">
                <p className="text-center text-sm">Capture this cozy moment! 📸</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUploadClick}
                  className="w-full py-2 px-4 bg-white text-cozy-purple rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  📸 Upload Photo
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

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
