import { useState } from 'react'
import { Heart, X, Trash2 } from 'lucide-react'

const FavoritesPanel = ({ favorites, onRemoveFavorite, onSelectQuote, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[80vh] glass-morphism rounded-3xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-sage-800 dark:text-sage-200 flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <span>My Scroll</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5 text-sage-700 dark:text-sage-300" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-96 space-y-4">
          {favorites.length === 0 ? (
            <p className="text-center text-sage-600 dark:text-sage-400 py-8">
              No wisdom saved yet. Start collecting your favorite quotes!
            </p>
          ) : (
            favorites.map((quote, index) => (
              <div key={index} className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors group">
                <blockquote 
                  className="text-sage-800 dark:text-sage-200 mb-2 cursor-pointer"
                  onClick={() => onSelectQuote(quote)}
                >
                  "{quote.text}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <cite className="text-sm text-sage-600 dark:text-sage-400 italic">
                    — {quote.author}
                  </cite>
                  <button
                    onClick={() => onRemoveFavorite(quote)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FavoritesPanel