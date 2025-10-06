import { useState, useEffect } from 'react'
import { Moon, Sun, Sparkles, Share, Copy, Heart, RefreshCw, Download, BookOpen } from 'lucide-react'
import QuoteCard from './components/QuoteCard'
import FloatingParticles from './components/FloatingParticles'
import NotificationToggle from './components/NotificationToggle'
import FavoritesPanel from './components/FavoritesPanel'
import { fetchRandomQuote } from './services/quoteService'
import { usePWA } from './hooks/usePWA'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const { isInstallable, installApp } = usePWA()



  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('sagelines-theme')
    if (savedTheme === 'dark') setDarkMode(true)
    
    // Load favorites
    const savedFavorites = JSON.parse(localStorage.getItem('sagelines-favorites') || '[]')
    setFavorites(savedFavorites)
    
    // Load initial quote
    getNewQuote()
  }, [])

  const getNewQuote = async () => {
    setLoading(true)
    try {
      const quote = await fetchRandomQuote()
      setCurrentQuote(quote)
    } catch (error) {
      console.error('Failed to fetch quote:', error)
    }
    setLoading(false)
  }

  const toggleTheme = () => {
    const newTheme = !darkMode
    setDarkMode(newTheme)
    localStorage.setItem('sagelines-theme', newTheme ? 'dark' : 'light')
  }

  const toggleFavorite = () => {
    if (!currentQuote) return
    
    const isFavorite = favorites.some(fav => fav.text === currentQuote.text)
    let newFavorites
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.text !== currentQuote.text)
    } else {
      newFavorites = [...favorites, currentQuote]
    }
    
    setFavorites(newFavorites)
    localStorage.setItem('sagelines-favorites', JSON.stringify(newFavorites))
  }

  const removeFavorite = (quoteToRemove) => {
    const newFavorites = favorites.filter(fav => fav.text !== quoteToRemove.text)
    setFavorites(newFavorites)
    localStorage.setItem('sagelines-favorites', JSON.stringify(newFavorites))
  }

  const selectQuoteFromFavorites = (quote) => {
    setCurrentQuote(quote)
    setShowFavorites(false)
  }

  const copyQuote = () => {
    if (currentQuote) {
      navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`)
    }
  }

  const shareQuote = () => {
    if (currentQuote) {
      const text = `"${currentQuote.text}" - ${currentQuote.author} #SageLines #Wisdom`
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  const isFavorite = currentQuote && favorites.some(fav => fav.text === currentQuote.text)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-all duration-1000 bg-gradient-to-br from-sage-50 via-sage-100 to-indigo-50 dark:from-indigo-900 dark:via-sage-900 dark:to-indigo-800">
        <FloatingParticles />
        
        {/* Header */}
        <header className="relative z-10 p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sage-400 to-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-semibold text-sage-800 dark:text-sage-200">
              SageLines
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <NotificationToggle />
            {isInstallable && (
              <button
                onClick={installApp}
                className="p-3 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300"
                title="Install SageLines"
              >
                <Download className="w-5 h-5 text-sage-700 dark:text-sage-300" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-sage-200" />
              ) : (
                <Moon className="w-5 h-5 text-sage-700" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
          <div className="w-full max-w-2xl">
            <QuoteCard 
              quote={currentQuote}
              loading={loading}
              onNewQuote={getNewQuote}
            />
            
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={shareQuote}
                className="p-3 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300 group"
                disabled={!currentQuote}
              >
                <Share className="w-5 h-5 text-sage-700 dark:text-sage-300 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={copyQuote}
                className="p-3 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300 group"
                disabled={!currentQuote}
              >
                <Copy className="w-5 h-5 text-sage-700 dark:text-sage-300 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={() => setShowFavorites(true)}
                className="p-3 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300 group relative"
              >
                <BookOpen className="w-5 h-5 text-sage-700 dark:text-sage-300 group-hover:scale-110 transition-transform" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={toggleFavorite}
                className="p-3 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300 group"
                disabled={!currentQuote}
              >
                <Heart 
                  className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                    isFavorite 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-sage-700 dark:text-sage-300'
                  }`} 
                />
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center p-6 text-sage-600 dark:text-sage-400 text-sm">
          Ancient wisdom for the modern soul
        </footer>
        
        {/* Favorites Panel */}
        <FavoritesPanel 
          favorites={favorites}
          onRemoveFavorite={removeFavorite}
          onSelectQuote={selectQuoteFromFavorites}
          isOpen={showFavorites}
          onClose={() => setShowFavorites(false)}
        />
      </div>
    </div>
  )
}

export default App