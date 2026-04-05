import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'

function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="text-gray-400 text-sm">טוען...</span>
      </main>
    )
  }

  if (!session) {
    return <LoginPage />
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Voca</h1>
    </main>
  )
}

export default App
