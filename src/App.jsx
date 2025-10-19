import React, { useEffect } from 'react'
import { QuestProvider, useQuest } from './context/QuestContext'
import Intro from './components/Intro'
import Act1 from './components/Act1'
import Act2 from './components/Act2'
import Act3 from './components/Act3'
import Ending from './components/Ending'

const AppContent = () => {
  const { currentAct, musicEnabled } = useQuest()

  // Background music effect
  useEffect(() => {
    if (musicEnabled) {
      // Create a subtle background audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Simple lo-fi style background tone
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime) // A3 note
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime) // Very quiet
      
      oscillator.start()
      
      return () => {
        oscillator.stop()
        audioContext.close()
      }
    }
  }, [musicEnabled])

  const renderCurrentAct = () => {
    switch (currentAct) {
      case 0:
        return <Intro />
      case 1:
        return <Act1 />
      case 2:
        return <Act2 />
      case 3:
        return <Act3 />
      case 4:
        return <Ending />
      default:
        return <Intro />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cozy-pink via-cozy-purple to-cozy-blue">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="fixed top-4 left-4 right-4 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3, 4].map((act) => (
              <div
                key={act}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  act <= currentAct
                    ? 'bg-cozy-purple'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-16">
        {renderCurrentAct()}
      </div>

      {/* Easter egg hearts */}
      <div className="fixed top-16 left-4 z-20">
        <button
          onClick={() => {
            // Create floating hearts animation
            for (let i = 0; i < 5; i++) {
              setTimeout(() => {
                const heart = document.createElement('div')
                heart.innerHTML = '💖'
                heart.className = 'fixed text-2xl pointer-events-none z-50'
                heart.style.left = `${20 + Math.random() * 60}%`
                heart.style.top = '80px'
                heart.style.animation = 'confetti 2s ease-out forwards'
                document.body.appendChild(heart)
                
                setTimeout(() => {
                  document.body.removeChild(heart)
                }, 2000)
              }, i * 200)
            }
          }}
          className="text-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          💕
        </button>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <QuestProvider>
      <AppContent />
    </QuestProvider>
  )
}

export default App
