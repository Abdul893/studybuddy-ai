import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { validateEmail, validatePassword } from '../middleware/validation.js'

const TOKEN_EXPIRES_IN = '7d'

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set')
  }

  return jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  )
}

export async function signup(req, res) {
  try {
    const { email, password } = req.body ?? {}

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    // Enhanced validation
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' })
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.' 
      })
    }

    const normalizedEmail = String(email).toLowerCase().trim()

    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) {
      return res.status(409).json({ error: 'An account with that email already exists.' })
    }

    const passwordHash = await bcrypt.hash(password, 12) // Increased salt rounds

    const user = await User.create({
      email: normalizedEmail,
      passwordHash,
    })

    const token = createToken(user)

    return res.status(201).json({
      token,
      user: { id: user._id.toString(), email: user.email },
    })
  } catch (err) {
    console.error('Signup error', err)
    return res.status(500).json({
      error: err.message || 'Failed to create account.',
    })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body ?? {}

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    // Enhanced validation
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' })
    }

    const normalizedEmail = String(email).toLowerCase().trim()
    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const token = createToken(user)

    return res.json({
      token,
      user: { id: user._id.toString(), email: user.email },
    })
  } catch (err) {
    console.error('Login error', err)
    return res.status(500).json({
      error: err.message || 'Failed to log in.',
    })
  }
}

