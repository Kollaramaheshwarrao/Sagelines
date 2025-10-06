const QUOTABLE_API = 'https://api.quotable.io/random'

const fallbackQuotes = [
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "Eleanor Roosevelt" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
]

export const fetchRandomQuote = async () => {
  try {
    const response = await fetch(QUOTABLE_API)
    if (response.ok) {
      const data = await response.json()
      return { text: data.content, author: data.author }
    }
  } catch (error) {
    console.log('API unavailable, using fallback quotes')
  }
  
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
}