import { useState, useRef, useEffect } from 'react'
import { sendChat } from '../services/api'
import styles from './Chat.module.css'

const ROLE = { user: 'user', assistant: 'assistant' }

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  async function handleSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError(null)
    const userMsg = { role: ROLE.user, content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setLoading(true)
    try {
      const { message } = await sendChat(nextMessages)
      setMessages((prev) => [...prev, message])
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.chat}>
      <div className={styles.list} ref={listRef} role="log" aria-live="polite">
        {messages.length === 0 && !loading && (
          <p className={styles.placeholder}>Ask your StudyBuddy anything. Try: &quot;Explain photosynthesis&quot; or &quot;Quiz me on World War II&quot;</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === ROLE.user ? styles.bubbleUser : styles.bubbleAssistant}
          >
            <span className={styles.role}>{m.role === ROLE.user ? 'You' : 'StudyBuddy'}</span>
            <p className={styles.content}>{m.content}</p>
          </div>
        ))}
        {loading && (
          <div className={styles.bubbleAssistant}>
            <span className={styles.role}>StudyBuddy</span>
            <div className={styles.loader} aria-hidden>
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          aria-label="Chat message"
        />
        <button
          type="submit"
          className={styles.send}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </section>
  )
}
