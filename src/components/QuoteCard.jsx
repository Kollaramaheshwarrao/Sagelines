import { Sparkles, RefreshCw } from 'lucide-react'
import GeometricPattern from './GeometricPattern'

const QuoteCard = ({ quote, loading, onNewQuote }) => {
  return (
    <div className="relative">
      {/* Geometric Background Pattern */}
      <GeometricPattern className="rounded-3xl animate-rotate-slow" />
      
      {/* Main Card */}
      <div className="relative glass-morphism rounded-3xl p-8 md:p-12 animate-pulse-glow">
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 text-sage-600 dark:text-sage-400 animate-spin mx-auto mb-4" />
            <p className="text-sage-600 dark:text-sage-400">Gathering wisdom...</p>
          </div>
        ) : quote ? (
          <div className="text-center animate-fade-in">
            {/* Quote Text */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-sage-800 dark:text-sage-100 mb-8">
              "{quote.text}"
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent flex-1 max-w-16"></div>
              <cite className="text-lg font-serif italic text-sage-600 dark:text-sage-300 border-b border-sage-400 pb-1">
                {quote.author}
              </cite>
              <div className="h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent flex-1 max-w-16"></div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sage-600 dark:text-sage-400">Welcome to SageLines</p>
          </div>
        )}
      </div>
      
      {/* Inspire Me Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onNewQuote}
          disabled={loading}
          className="group relative px-8 py-4 bg-gradient-to-r from-sage-500 to-indigo-500 hover:from-sage-600 hover:to-indigo-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>✨ Inspire Me</span>
          </span>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ripple"></div>
        </button>
      </div>
    </div>
  )
}

export default QuoteCard