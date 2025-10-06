import { useState, useEffect } from 'react'
import { Bell, BellOff } from 'lucide-react'
import { requestNotificationPermission, scheduleDailyNotification } from '../services/notificationService'

const NotificationToggle = () => {
  const [enabled, setEnabled] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported('Notification' in window)
    const savedPref = localStorage.getItem('sagelines-notifications')
    if (savedPref === 'enabled') {
      setEnabled(true)
    }
  }, [])

  const toggleNotifications = async () => {
    if (!enabled) {
      const granted = await requestNotificationPermission()
      if (granted) {
        setEnabled(true)
        localStorage.setItem('sagelines-notifications', 'enabled')
        scheduleDailyNotification()
      }
    } else {
      setEnabled(false)
      localStorage.setItem('sagelines-notifications', 'disabled')
    }
  }

  if (!supported) return null

  return (
    <button
      onClick={toggleNotifications}
      className="p-3 rounded-full glass-morphism hover:bg-white/20 transition-all duration-300"
      title={enabled ? 'Disable daily wisdom' : 'Enable daily wisdom'}
    >
      {enabled ? (
        <Bell className="w-5 h-5 text-sage-700 dark:text-sage-300" />
      ) : (
        <BellOff className="w-5 h-5 text-sage-700 dark:text-sage-300" />
      )}
    </button>
  )
}

export default NotificationToggle