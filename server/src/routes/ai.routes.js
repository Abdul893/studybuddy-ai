import { Router } from 'express'
import * as aiController from '../controllers/ai.controller.js'

const router = Router()

router.post('/chat', aiController.chat)
router.post('/study', aiController.studySession)

export default router
