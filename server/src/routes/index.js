import { Router } from 'express'
import aiRoutes from './ai.routes.js'
import authRoutes from './auth.routes.js'
import * as aiController from '../controllers/ai.controller.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()

router.use('/auth', authRoutes)

router.post('/chat', aiController.chat)
router.get('/chat/history', authRequired, aiController.getChatHistory)

// Basic test chat endpoint
router.post('/chat/test', (req, res) => {
  const { message } = req.body || {}
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }
  
  // Validate message content
  if (typeof message !== 'string' || message.length > 10000) {
    return res.status(400).json({ error: 'Message must be a string under 10000 characters' })
  }
  
  // Check for suspicious content
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi
  ]
  
  if (suspiciousPatterns.some(pattern => pattern.test(message))) {
    return res.status(400).json({ error: 'Message contains potentially unsafe content' })
  }
  
  // Simple echo response for testing
  const response = {
    message: `Test response to: "${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`,
    timestamp: new Date().toISOString(),
    test: true
  }
  
  return res.json(response)
})

router.use('/ai', aiRoutes)

export default router
