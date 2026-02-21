const API_BASE = '/api'

export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    let message = res.statusText
    try {
      const text = await res.text()
      if (text) {
        try {
          const data = JSON.parse(text)
          if (data?.error) {
            message = data.error
          } else {
            message = text
          }
        } catch {
          message = text
        }
      }
    } catch {
      // ignore secondary body read errors and fall back to statusText
    }
    throw new Error(message)
  }
  return res.json()
}

/** @param {{ role: string, content: string }[]} messages */
export async function sendChat(messages) {
  return apiRequest('/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  })
}
