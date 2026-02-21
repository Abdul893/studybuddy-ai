import * as aiService from '../services/gemini.service.js'
import ChatHistory from '../models/ChatHistory.js'
import jwt from 'jsonwebtoken'
import { validateMessage } from '../middleware/validation.js'

export async function chat(req, res) {
  try {
    const { messages } = req.body ?? {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Request body must include a non-empty messages array.' })
    }
    
    const valid = messages.every(
      (m) => m && typeof m.role === 'string' && typeof m.content === 'string' &&
             ['user', 'assistant', 'system'].includes(m.role) &&
             validateMessage(m.content)
    )
    
    if (!valid) {
      return res.status(400).json({ error: 'Each message must have a valid role (user/assistant/system) and safe content (strings, max 10000 chars).' })
    }

    const response = await aiService.chat(messages)

    // Try to associate the chat with a user if a valid token is present,
    // but never fail the request if saving history breaks.
    let userId = null
    const header = req.headers.authorization || ''
    const [scheme, token] = header.split(' ')
    if (scheme === 'Bearer' && token && process.env.JWT_SECRET) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        userId = payload.userId
      } catch {
        // ignore token errors for chat; history will just not be linked
      }
    }

    try {
      await ChatHistory.create({
        user: userId,
        messages,
        response: response.message,
      })
    } catch (err) {
      console.error('Failed to save chat history', err)
    }

    return res.json(response)
  } catch (err) {
    const status = err.status === 401 ? 401 : err.status === 429 ? 429 : 500
    return res.status(status).json({
      error: err.message || 'Failed to get AI response.',
    })
  }
}

export async function getChatHistory(req, res) {
  try {
    const userId = req.userId
    const items = await ChatHistory.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    return res.json({ items })
  } catch (err) {
    console.error('Failed to load chat history', err)
    return res.status(500).json({
      error: err.message || 'Failed to load chat history.',
    })
  }
}

export async function studySession(req, res) {
  try {
    const { topic, type } = req.body ?? {}
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required.' })
    }
    
    // Validate topic content
    if (!validateMessage(topic)) {
      return res.status(400).json({ error: 'Topic contains invalid content or is too long.' })
    }
    
    // Validate type if provided
    if (type && !['quiz', 'flashcards', 'summary', 'questions'].includes(type)) {
      return res.status(400).json({ error: 'Type must be one of: quiz, flashcards, summary, questions.' })
    }
    
    const response = await aiService.createStudySession(topic, type)
    return res.json(response)
  } catch (err) {
    console.error('Study session error', err)
    return res.status(500).json({
      error: err.message || 'Failed to create study session.',
    })
  }
}

