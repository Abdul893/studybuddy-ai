import validator from 'validator'

// Sanitize input to prevent XSS and injection attacks
export function sanitizeInput(req, res, next) {
  if (req.body) {
    sanitizeObject(req.body)
  }
  if (req.query) {
    sanitizeObject(req.query)
  }
  if (req.params) {
    sanitizeObject(req.params)
  }
  next()
}

function sanitizeObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      // Escape HTML to prevent XSS
      obj[key] = validator.escape(obj[key])
      // Normalize whitespace
      obj[key] = validator.trim(obj[key])
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key])
    }
  }
}

// Validate email format
export function validateEmail(email) {
  return validator.isEmail(email)
}

// Validate password strength
export function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// Validate message content
export function validateMessage(content) {
  if (!content || typeof content !== 'string') {
    return false
  }
  // Limit message length to prevent DoS
  if (content.length > 10000) {
    return false
  }
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi
  ]
  
  return !suspiciousPatterns.some(pattern => pattern.test(content))
}
