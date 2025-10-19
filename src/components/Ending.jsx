import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Ending = () => {
  const { resetQuest, photos, setCurrentAct } = useQuest()
  const [showPhotoBooth, setShowPhotoBooth] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw the video frame
      ctx.drawImage(video, 0, 0)
      
      // Add frame overlay
      ctx.fillStyle = 'rgba(255, 182, 193, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add text overlay
      ctx.fillStyle = '#8B4A8B'
      ctx.font = 'bold 48px Poppins'
      ctx.textAlign = 'center'
      ctx.fillText('Pookie\'s Cozy Quest 📸', canvas.width / 2, canvas.height - 100)
      
      setPhotoTaken(true)
    }
  }

  const startPhotoBooth = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setShowPhotoBooth(true)
    } catch (err) {
      console.error('Error accessing camera:', err)
      alert('Camera access denied. You can still enjoy the memory! 💕')
    }
  }

  const downloadPhoto = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'pookie-cozy-quest.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  const handleBack = () => {
    setCurrentAct(3)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="cozy-card max-w-md w-full text-center">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-2xl hover:scale-110 transition-transform"
        >
          ←
        </button>
        
        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl text-cozy-pink"
              style={{
                left: `${10 + i * 12}%`,
                top: `${5 + (i % 4) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              💖
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>
          
          <h2 className="text-4xl font-bold text-cozy-purple mb-6">
            Quest Complete! 💕
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-700 mb-8 leading-relaxed"
          >
            Thanks for spending this cozy adventure with me, Pookie! ✨<br/>
            You solved every puzzle, found every clue, and made this night absolutely magical! 💖
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-cozy-pink to-cozy-purple text-white p-4 rounded-lg mb-6">
              <p className="font-semibold text-lg">Quest Complete! 💕</p>
            </div>

            {/* Photo Gallery */}
            {photos.length > 0 && (
              <div className="bg-white/80 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-center">📸 Quest Memories</h3>
                <div className="grid grid-cols-1 gap-3">
                  {photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <img
                        src={photo.dataUrl}
                        alt={`Quest memory ${index + 1}`}
                        className="w-full rounded-lg shadow-md"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {photo.act === 'outfit' ? '👗 Outfit' : photo.act === 'dinner' ? '🍜 Dinner' : photo.act === 'bay' ? '🌊 Bay' : photo.act === 'finale' ? '🎮 Finale' : '📸 Memory'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {!showPhotoBooth ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentAct(5)}
                className="cozy-button w-full text-xl py-4 mb-4"
              >
                Rate Our Date ⭐
              </motion.button>
            ) : (
              <div className="space-y-4">
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
                
                {!photoTaken ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTakePhoto}
                    className="cozy-button w-full text-xl py-4"
                  >
                    📸 Take Photo!
                  </motion.button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-green-100 text-green-800 p-3 rounded-lg">
                      <p className="font-semibold">Perfect shot! 💕</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadPhoto}
                      className="cozy-button w-full text-lg py-3"
                    >
                      💾 Download Photo
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuest}
              className="w-full py-3 px-6 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition-colors"
            >
              🔄 Start New Quest
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-sm text-gray-500"
          >
            <p>Made with 💕 for the most amazing Pookie</p>
            <p className="mt-1">San Diego • {new Date().getFullYear()}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Ending
