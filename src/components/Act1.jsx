import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Act1 = () => {
  const { completeAct, dinnerAnswer, setDinnerAnswer, addPhoto, setCurrentAct } = useQuest()
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showPhotoOption, setShowPhotoOption] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const dinnerOptions = [
    {
      id: 'choice1',
      name: 'Your Choice',
      clues: ['Pick your favorite! 🍜'],
      correct: true,
      mapLink: 'https://maps.google.com/?q=Asian+Restaurants+San+Diego'
    },
    {
      id: 'choice2',
      name: 'Your Choice',
      clues: ['Pick your favorite! 🍣'],
      correct: true,
      mapLink: 'https://maps.google.com/?q=Asian+Restaurants+San+Diego'
    },
    {
      id: 'choice3',
      name: 'Your Choice',
      clues: ['Pick your favorite! 🍲'],
      correct: true,
      mapLink: 'https://maps.google.com/?q=Asian+Restaurants+San+Diego'
    }
  ]

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option.id)
    setDinnerAnswer(option.name)
    setIsCorrect(true)
  }

  const handleArrived = () => {
    setShowPhotoOption(true)
  }

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      alert('Camera access denied. Continuing without photo! 💕')
      completeAct(1)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      ctx.drawImage(video, 0, 0)
      
      // Add frame overlay
      ctx.fillStyle = 'rgba(255, 182, 193, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add text overlay
      ctx.fillStyle = '#8B4A8B'
      ctx.font = 'bold 32px Poppins'
      ctx.textAlign = 'center'
      ctx.fillText('Dinner Discovery 📸', canvas.width / 2, canvas.height - 50)
      
      const photoData = {
        act: 'dinner',
        timestamp: new Date().toISOString(),
        dataUrl: canvas.toDataURL()
      }
      
      addPhoto(photoData)
      
      // Stop camera
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop())
      }
      
      completeAct(1)
    }
  }

  const skipPhoto = () => {
    completeAct(1)
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
            Perfect! Your Choice 🍜
          </h2>
          
          <div className="space-y-4 mb-6">
            <a 
              href="https://maps.google.com/?q=Asian+Restaurants+San+Diego"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              📍 Find Asian Restaurants
            </a>
            
            {!showPhotoOption ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleArrived}
                className="cozy-button w-full text-xl py-4"
              >
                Arrived & Ate! 🍽️
              </motion.button>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-gray-600">Want to capture this moment? 📸</p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTakePhoto}
                    className="flex-1 py-3 px-4 bg-cozy-pink text-white rounded-lg font-semibold hover:bg-cozy-pink/80 transition-colors"
                  >
                    📸 Take Photo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={skipPhoto}
                    className="flex-1 py-3 px-4 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Skip
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          {/* Camera Interface */}
          {videoRef.current && videoRef.current.srcObject && (
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-lg p-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={capturePhoto}
                className="w-full py-3 px-4 bg-cozy-purple text-white rounded-lg font-semibold hover:bg-cozy-purple/80 transition-colors"
              >
                📸 Capture Photo!
              </motion.button>
            </div>
          )}
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
                  : 'border-gray-200 hover:border-cozy-purple hover:bg-cozy-purple/10'
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
