import Chat from '../components/Chat'

function Home() {
  return (
    <main style={{ padding: '1.5rem', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.25rem', fontSize: '1.75rem' }}>StudyBuddy AI</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Your AI-powered study companion</p>
      <Chat />
    </main>
  )
}

export default Home
