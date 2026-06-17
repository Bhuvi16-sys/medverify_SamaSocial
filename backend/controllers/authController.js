import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dawacheck_jwt_secret'
const signToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  )

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      return res.status(409).json({ error: 'Email is already registered.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ email: email.toLowerCase().trim(), passwordHash })
    const token = signToken(user)

    return res.status(201).json({ token, email: user.email, voiceGuidance: user.voiceGuidance })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const token = signToken(user)
    return res.status(200).json({ token, email: user.email, voiceGuidance: user.voiceGuidance })
  } catch (error) {
    next(error)
  }
}

export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized.' })
    }

    return res.status(200).json({ email: user.email, voiceGuidance: user.voiceGuidance })
  } catch (error) {
    next(error)
  }
}

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized.' })
    }

    const { email, password, voiceGuidance } = req.body || {}
    if (email) {
      const normalizedEmail = String(email).toLowerCase().trim()
      if (normalizedEmail !== user.email) {
        const existing = await User.findOne({ email: normalizedEmail })
        if (existing) {
          return res.status(409).json({ error: 'Email is already in use.' })
        }
        user.email = normalizedEmail
      }
    }

    if (typeof voiceGuidance === 'boolean') {
      user.voiceGuidance = voiceGuidance
    }

    if (password) {
      if (String(password).length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters.' })
      }
      user.passwordHash = await bcrypt.hash(password, 10)
    }

    await user.save()
    return res.status(200).json({ email: user.email, voiceGuidance: user.voiceGuidance })
  } catch (error) {
    next(error)
  }
}
