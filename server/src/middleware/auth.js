import jwt from 'jsonwebtoken'

export function authRequired(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (!token || scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Authorization token is required.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.userId
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}

