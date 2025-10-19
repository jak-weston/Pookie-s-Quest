import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const HomeScreen = () => {
  const { completeAct, addPhoto } = useQuest()
  const [showPhotoOption, setShowPhotoOption] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const fileInputRef = useRef(null)

  const handleStartQuest = () => {
    setShowPhotoOption(true)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoData = {
          act: 'outfit',
          timestamp: new Date().toISOString(),
          dataUrl: e.target.result
        }
        
        addPhoto(photoData)
        setPhotoTaken(true)
        setTimeout(() => {
          completeAct(0)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }


  if (photoTaken) {
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
            ✨
          </motion.div>
          
          <h2 className="text-3xl font-bold text-cozy-purple mb-4">
            Perfect! You look amazing! 💕
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Ready for our cozy adventure? Let's go! 🚗
          </p>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-4xl"
          >
            💖
          </motion.div>
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
      <div className="cozy-card max-w-md sm:max-w-lg w-full text-center">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-cozy-pink to-cozy-purple text-white p-4 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-3">📅 Date Details</h3>
            <div className="text-sm space-y-1">
              <p>🕰️ <strong>Pickup Time:</strong> 5:00 PM</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Hey beautiful! 💕 I've prepared a little adventure date night made just for you. 
            Get ready for some cozy fun, delicious food, and sweet surprises! ✨
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >

          {!showPhotoOption ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartQuest}
              className="cozy-button w-full text-xl py-4"
            >
              Take Photo of Your Outfit 📸
            </motion.button>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-gray-600">Upload a photo of your amazing outfit! 📸</p>
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

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </motion.div>

        {/* Easter egg hearts */}
        <div className="mt-8 text-xs text-gray-500">
          <p>Tap the hearts for extra love! 💕</p>
        </div>
      </div>
    </motion.div>
  )
}

export default HomeScreen
