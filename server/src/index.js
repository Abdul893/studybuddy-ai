import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import routes from './routes/index.js'
import { connectDB } from './config/db.js'
import { notFound, errorHandler } from './middleware/error.js'
import { sanitizeInput } from './middleware/validation.js'

const app = express()
const PORT = process.env.PORT || 3000

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Stricter CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your actual domain
    : ['http://localhost:5173', 'http://localhost:5174'], // Development URLs
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Input sanitization
app.use(sanitizeInput)

app.use(express.json({ limit: '10mb' })) // Limit request body size
app.use('/api', routes)

app.get('/health', (_, res) => res.json({ status: 'ok' }))
app.get('/', (_, res) => res.send('StudyBuddy AI Server Running'))

// Fallback handlers
app.use(notFound)
app.use(errorHandler)

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()

