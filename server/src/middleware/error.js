export function notFound(req, res, next) {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Fallback status and message
  const status = err.status && Number.isInteger(err.status) ? err.status : 500
  const message = err.message || 'Something went wrong.'

  // Basic logging; in production you might integrate with a logging service.
  console.error('Unhandled error:', err)

  res.status(status).json({
    error: message,
  })
}

