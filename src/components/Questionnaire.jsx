import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Questionnaire = () => {
  const { resetQuest } = useQuest()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    // Submit to Google Form
    const formData = new FormData()
    formData.append('entry.rating', rating.toString())
    formData.append('entry.feedback', feedback)
    
    // Submit to Google Form (replace with actual form action URL)
    fetch('https://docs.google.com/forms/d/e/1FAIpQLScJnFvQsrIvGJfR6-ADw-opOAufZbSuMQmT9TBWREPiYHyzAA/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    
    setSubmitted(true)
  }

  const handleRestart = () => {
    resetQuest()
  }

  if (submitted) {
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
            💕
          </motion.div>
          
          <h2 className="text-3xl font-bold text-cozy-purple mb-4">
            Thank you, Pookie! 💖
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Your feedback means the world to me! Can't wait for our next adventure ✨
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="cozy-button w-full text-xl py-4"
          >
            Start New Quest 🔄
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
          Rate Our Date! ⭐
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Rating Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              How was our cozy adventure? 💕
            </h3>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 rounded-full font-bold text-xl transition-colors ${
                    star <= rating 
                      ? 'bg-yellow-400 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {star}
                </motion.button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {rating === 0 && 'Tap a star to rate!'}
              {rating === 1 && 'Needs improvement 😔'}
              {rating === 2 && 'Not great 😕'}
              {rating === 3 && 'It was okay 😐'}
              {rating === 4 && 'Pretty good! 😊'}
              {rating === 5 && 'Absolutely amazing! 💖'}
            </p>
          </div>

          {/* Feedback Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Tell me about your favorite part! ✨
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What did you love most about our date? Any suggestions for next time? 💕"
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg resize-none focus:border-cozy-purple focus:outline-none text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-xl transition-all ${
              rating === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'cozy-button'
            }`}
          >
            Submit Feedback 💌
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Questionnaire
