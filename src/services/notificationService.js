export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false
  }
  
  if (Notification.permission === 'granted') {
    return true
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  
  return false
}

export const scheduleDailyNotification = () => {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9, 0, 0, 0) // 9 AM daily
  
  const timeUntilTomorrow = tomorrow.getTime() - now.getTime()
  
  setTimeout(() => {
    showDailyWisdom()
    // Schedule next day
    setInterval(showDailyWisdom, 24 * 60 * 60 * 1000)
  }, timeUntilTomorrow)
}

const showDailyWisdom = () => {
  if (Notification.permission === 'granted') {
    new Notification('🌟 Your Daily Wisdom from SageLines', {
      body: 'A new quote awaits to inspire your day',
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    })
  }
}