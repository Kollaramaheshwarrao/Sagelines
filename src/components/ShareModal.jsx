import { X, Twitter, Facebook, Linkedin, Instagram, Link } from 'lucide-react'

const ShareModal = ({ quote, isOpen, onClose }) => {
  if (!isOpen || !quote) return null

  const shareText = `"${quote.text}" - ${quote.author}`
  const shareUrl = window.location.href

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + ' #SageLines #Wisdom')}`,
      color: 'hover:bg-blue-500/20 hover:text-blue-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-blue-600/20 hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-blue-700/20 hover:text-blue-700'
    }
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md glass-morphism rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-sage-800 dark:text-sage-200">Share Wisdom</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {shareOptions.map(option => (
            <button
              key={option.name}
              onClick={() => window.open(option.url, '_blank')}
              className={`w-full flex items-center space-x-3 p-3 rounded-2xl glass-morphism transition-all ${option.color}`}
            >
              <option.icon className="w-5 h-5" />
              <span>Share on {option.name}</span>
            </button>
          ))}
          
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center space-x-3 p-3 rounded-2xl glass-morphism hover:bg-sage-500/20 transition-all"
          >
            <Link className="w-5 h-5" />
            <span>Copy Quote</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal