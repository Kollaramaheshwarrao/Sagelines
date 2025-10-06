import { useState, useEffect, useCallback } from 'react'

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const handleBeforeInstallPrompt = useCallback((e) => {
    e.preventDefault()
    setDeferredPrompt(e)
    setIsInstallable(true)
  }, [])

  const handleOnlineStatus = useCallback(() => {
    setIsOnline(navigator.onLine)
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('online', handleOnlineStatus)
    window.addEventListener('offline', handleOnlineStatus)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('online', handleOnlineStatus)
      window.removeEventListener('offline', handleOnlineStatus)
    }
  }, [handleBeforeInstallPrompt, handleOnlineStatus])

  const installApp = useCallback(async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        setDeferredPrompt(null)
        setIsInstallable(false)
        return outcome === 'accepted'
      } catch (error) {
        console.error('Install failed:', error)
      }
    }
    return false
  }, [deferredPrompt])

  return { isInstallable, installApp, isOnline }
}