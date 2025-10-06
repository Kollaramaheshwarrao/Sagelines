export const categories = [
  { id: 'all', name: 'All Wisdom', icon: '✨' },
  { id: 'motivation', name: 'Motivation', icon: '🔥' },
  { id: 'wisdom', name: 'Wisdom', icon: '🧠' },
  { id: 'success', name: 'Success', icon: '🎯' },
  { id: 'happiness', name: 'Happiness', icon: '😊' },
  { id: 'life', name: 'Life', icon: '🌱' }
]

export const fetchQuoteByCategory = async (category) => {
  const tags = category === 'all' ? '' : `&tags=${category}`
  try {
    const response = await fetch(`https://api.quotable.io/random?${tags}`)
    if (response.ok) {
      const data = await response.json()
      return { text: data.content, author: data.author, category: data.tags[0] }
    }
  } catch (error) {
    console.log('Category API unavailable')
  }
  return null
}