import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuest } from '../context/QuestContext'

const Act2 = () => {
  const { completeAct, wordleAttempts, setWordleAttempts, setCurrentAct, addPhoto } = useQuest()
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [usedLetters, setUsedLetters] = useState({})
  const fileInputRef = useRef(null)

  const targetWord = 'BAY'
  const maxAttempts = 5

  useEffect(() => {
    // Load saved progress
    if (wordleAttempts.length > 0) {
      setGuesses(wordleAttempts)
      if (wordleAttempts.some(guess => guess.join('') === targetWord)) {
        setIsSolved(true)
        setShowResult(true)
      }
    }
  }, [wordleAttempts])

  const handleKeyPress = (letter) => {
    if (currentGuess.length < 3 && !isSolved) {
      setCurrentGuess(prev => prev + letter)
    }
  }

  const handleBackspace = () => {
    setCurrentGuess(prev => prev.slice(0, -1))
  }

  const handleSubmit = () => {
    if (currentGuess.length === 3 && guesses.length < maxAttempts) {
      const guessArray = currentGuess.split('')
      const newGuesses = [...guesses, guessArray]
      setGuesses(newGuesses)
      setWordleAttempts(newGuesses)
      
      // Update used letters
      const newUsedLetters = { ...usedLetters }
      guessArray.forEach((letter, index) => {
        const status = getLetterStatus(letter, guesses.length, index)
        if (!newUsedLetters[letter] || newUsedLetters[letter] === 'absent') {
          newUsedLetters[letter] = status
        }
      })
      setUsedLetters(newUsedLetters)
      
      if (currentGuess === targetWord) {
        setIsSolved(true)
        setTimeout(() => setShowResult(true), 1000)
      } else {
        setCurrentGuess('')
      }
    }
  }

  const getLetterStatus = (letter, position) => {
    if (letter === targetWord[position]) return 'correct'
    if (targetWord.includes(letter)) return 'present'
    return 'absent'
  }

  const handleFileSelect = (event) => {
    console.log('File select triggered in Act2')
    const file = event.target.files[0]
    console.log('Selected file:', file)
    
    if (file) {
      console.log('File selected, reading...')
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log('File read successfully')
        const photoData = {
          act: 'bay',
          timestamp: new Date().toISOString(),
          dataUrl: e.target.result
        }
        
        console.log('Adding photo data:', photoData)
        addPhoto(photoData)
        
        // Reset the file input
        event.target.value = ''
        
        // Add small delay to ensure photo is saved
        setTimeout(() => {
          console.log('Completing Act 2')
          completeAct(2)
        }, 100)
      }
      reader.readAsDataURL(file)
    } else {
      console.log('No file selected')
    }
  }

  const handleUploadClick = () => {
    console.log('Upload click triggered in Act2')
    console.log('File input ref:', fileInputRef.current)
    fileInputRef.current?.click()
  }


  const handleBack = () => {
    setCurrentAct(1)
  }

  if (showResult) {
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
            🌊
          </motion.div>
          
          <h2 className="text-3xl font-bold text-cozy-purple mb-4">
            Correct! We're heading to the Harbor Drive waterfront! 🌊
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Where the city lights reflect like stars on water ✨
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadClick}
            className="cozy-button w-full text-xl py-4"
          >
            Upload Photo 📸
          </motion.button>

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
          Act 2: Wordle at the Bay 🌊
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-700 mb-4">
            That was delicious! Now it's time to test your wit. Solve the puzzle below to find our next stop...
          </p>
        </motion.div>

        {/* Wordle Grid */}
        <div className="space-y-2 mb-8">
          {[...Array(maxAttempts)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {[...Array(3)].map((_, colIndex) => {
                const letter = guesses[rowIndex]?.[colIndex] || ''
                const status = guesses[rowIndex] ? getLetterStatus(letter, colIndex) : ''
                
                return (
                  <motion.div
                    key={colIndex}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: rowIndex * 0.1 + colIndex * 0.05 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg ${
                      status === 'correct' 
                        ? 'bg-green-500 text-white border-green-500'
                        : status === 'present'
                        ? 'bg-yellow-500 text-white border-yellow-500'
                        : status === 'absent'
                        ? 'bg-gray-500 text-white border-gray-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {letter}
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Current Guess */}
        {!isSolved && guesses.length < maxAttempts && (
          <div className="flex gap-2 justify-center mb-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-cozy-purple rounded-lg flex items-center justify-center font-bold text-base sm:text-lg bg-cozy-purple/10"
              >
                {currentGuess[index] || ''}
              </div>
            ))}
          </div>
        )}

                {/* Keyboard */}
                {!isSolved && guesses.length < maxAttempts && (
                  <div className="space-y-2">
                    {/* QWERTY Layout */}
                    <div className="flex gap-1 justify-center flex-wrap">
                      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter => (
                        <motion.button
                          key={letter}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleKeyPress(letter)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded font-bold transition-colors text-xs sm:text-sm ${
                            usedLetters[letter] === 'correct' 
                              ? 'bg-green-500 text-white'
                              : usedLetters[letter] === 'present'
                              ? 'bg-yellow-500 text-white'
                              : usedLetters[letter] === 'absent'
                              ? 'bg-gray-500 text-white'
                              : 'bg-cozy-purple text-white hover:bg-cozy-purple/80'
                          }`}
                        >
                          {letter}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex gap-1 justify-center flex-wrap">
                      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter => (
                        <motion.button
                          key={letter}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleKeyPress(letter)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded font-bold transition-colors text-xs sm:text-sm ${
                            usedLetters[letter] === 'correct' 
                              ? 'bg-green-500 text-white'
                              : usedLetters[letter] === 'present'
                              ? 'bg-yellow-500 text-white'
                              : usedLetters[letter] === 'absent'
                              ? 'bg-gray-500 text-white'
                              : 'bg-cozy-purple text-white hover:bg-cozy-purple/80'
                          }`}
                        >
                          {letter}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex gap-1 justify-center flex-wrap">
                      {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter => (
                        <motion.button
                          key={letter}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleKeyPress(letter)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded font-bold transition-colors text-xs sm:text-sm ${
                            usedLetters[letter] === 'correct' 
                              ? 'bg-green-500 text-white'
                              : usedLetters[letter] === 'present'
                              ? 'bg-yellow-500 text-white'
                              : usedLetters[letter] === 'absent'
                              ? 'bg-gray-500 text-white'
                              : 'bg-cozy-purple text-white hover:bg-cozy-purple/80'
                          }`}
                        >
                          {letter}
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBackspace}
                        className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-500 text-white rounded font-bold hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                      >
                        ⌫
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={currentGuess.length !== 3}
                        className="px-2 py-1 sm:px-3 sm:py-2 bg-cozy-pink text-white rounded font-bold hover:bg-cozy-pink/80 transition-colors disabled:opacity-50 text-xs sm:text-sm"
                      >
                        Enter
                      </motion.button>
                    </div>
                  </div>
                )}

        {guesses.length >= maxAttempts && !isSolved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-4 bg-red-100 rounded-lg border border-red-300"
          >
            <p className="text-red-800">
              Don't worry! The answer was "BAY" 🌊
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResult(true)}
              className="mt-2 px-4 py-2 bg-cozy-pink text-white rounded-lg font-bold hover:bg-cozy-pink/80 transition-colors"
            >
              Continue to Harbor Drive! 🌟
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Act2
