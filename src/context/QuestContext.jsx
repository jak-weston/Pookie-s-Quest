import React, { createContext, useContext, useState, useEffect } from 'react'

const QuestContext = createContext()

export const useQuest = () => {
  const context = useContext(QuestContext)
  if (!context) {
    throw new Error('useQuest must be used within a QuestProvider')
  }
  return context
}

export const QuestProvider = ({ children }) => {
  const [currentAct, setCurrentAct] = useState(() => {
    const saved = localStorage.getItem('pookie-quest-act')
    return saved ? parseInt(saved) : -1
  })
  
  const [completedActs, setCompletedActs] = useState(() => {
    const saved = localStorage.getItem('pookie-quest-completed')
    return saved ? JSON.parse(saved) : []
  })
  
  const [musicEnabled, setMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('pookie-quest-music')
    return saved === 'true'
  })
  
  const [wordleAttempts, setWordleAttempts] = useState(() => {
    const saved = localStorage.getItem('pookie-quest-wordle')
    return saved ? JSON.parse(saved) : []
  })
  
  const [dinnerAnswer, setDinnerAnswer] = useState(() => {
    const saved = localStorage.getItem('pookie-quest-dinner')
    return saved || ''
  })
  
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('pookie-quest-photos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('pookie-quest-act', currentAct.toString())
  }, [currentAct])

  useEffect(() => {
    localStorage.setItem('pookie-quest-completed', JSON.stringify(completedActs))
  }, [completedActs])

  useEffect(() => {
    localStorage.setItem('pookie-quest-music', musicEnabled.toString())
  }, [musicEnabled])

  useEffect(() => {
    localStorage.setItem('pookie-quest-wordle', JSON.stringify(wordleAttempts))
  }, [wordleAttempts])

  useEffect(() => {
    localStorage.setItem('pookie-quest-dinner', dinnerAnswer)
  }, [dinnerAnswer])

  useEffect(() => {
    localStorage.setItem('pookie-quest-photos', JSON.stringify(photos))
  }, [photos])

  const completeAct = (actNumber) => {
    if (!completedActs.includes(actNumber)) {
      setCompletedActs(prev => [...prev, actNumber])
    }
    setCurrentAct(actNumber + 1)
  }

  const resetQuest = () => {
    setCurrentAct(-1)
    setCompletedActs([])
    setWordleAttempts([])
    setDinnerAnswer('')
    setPhotos([])
    localStorage.clear()
  }

  const addPhoto = (photoData) => {
    console.log('Adding photo to context:', photoData)
    setPhotos(prev => {
      const newPhotos = [...prev, photoData]
      console.log('Updated photos array:', newPhotos)
      return newPhotos
    })
  }

  const value = {
    currentAct,
    setCurrentAct,
    completedActs,
    completeAct,
    musicEnabled,
    setMusicEnabled,
    wordleAttempts,
    setWordleAttempts,
    dinnerAnswer,
    setDinnerAnswer,
    photos,
    addPhoto,
    resetQuest
  }

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  )
}
