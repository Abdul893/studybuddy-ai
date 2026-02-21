import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  // Fail fast at startup if the key is missing to avoid confusing runtime errors.
  console.warn(
    '[Gemini] GEMINI_API_KEY is not set. AI features will not work until it is configured.'
  )
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

function toGeminiRole(role) {
  if (role === 'assistant') return 'model'
  return 'user'
}

export async function chat(messages) {
  if (!genAI) {
    throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY.')
  }

  const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL })

  const history = (messages && messages.length
    ? messages
    : [{ role: 'user', content: 'Hello' }]
  ).map((m) => ({
    role: toGeminiRole(m.role),
    parts: [{ text: m.content }],
  }))

  const result = await model.generateContent({
    contents: history,
  })

  const text = result?.response?.text?.() ?? ''

  return {
    message: {
      role: 'assistant',
      content: text,
    },
  }
}

export async function createStudySession(topic, type = 'quiz') {
  if (!genAI) {
    throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY.')
  }

  const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL })
  const prompt = `Create a ${type} for studying: ${topic}. Format as JSON when appropriate.`

  const result = await model.generateContent(prompt)
  const text = result?.response?.text?.() ?? ''

  return { content: text }
}

