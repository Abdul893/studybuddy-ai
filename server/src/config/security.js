export const securityConfig = {
  // JWT Configuration
  jwt: {
    expiresIn: '7d',
    algorithm: 'HS256',
    issuer: 'studybuddy-ai',
    audience: 'studybuddy-users'
  },
  
  // Password Configuration
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    saltRounds: 12
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
    message: 'Too many requests from this IP, please try again later.'
  },
  
  // Input Validation
  validation: {
    maxMessageLength: 10000,
    maxEmailLength: 254,
    maxTopicLength: 500,
    allowedRoles: ['user', 'assistant', 'system'],
    allowedStudyTypes: ['quiz', 'flashcards', 'summary', 'questions']
  },
  
  // CORS Configuration
  cors: {
    development: ['http://localhost:5173', 'http://localhost:5174'],
    production: [], // Add your production domains here
    credentials: true
  },
  
  // Security Headers
  headers: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }
}
