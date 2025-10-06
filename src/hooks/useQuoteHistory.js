import { useState, useEffect } from 'react'

export const useQuoteHistory = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sagelines-history') || '[]')
    setHistory(saved)
  }, [])

  const addToHistory = (quote) => {
    const newHistory = [{ ...quote, timestamp: Date.now() }, ...history.slice(0, 49)]
    setHistory(newHistory)
    localStorage.setItem('sagelines-history', JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('sagelines-history')
  }

  const getStats = () => ({
    totalQuotes: history.length,
    todayQuotes: history.filter(q => 
      new Date(q.timestamp).toDateString() === new Date().toDateString()
    ).length,
    favoriteAuthors: [...new Set(history.map(q => q.author))].slice(0, 3)
  })

  return { history, addToHistory, clearHistory, getStats }
}