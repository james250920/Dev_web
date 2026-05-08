import { useState } from 'react'
import './App.css'
import './layout.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Rendicion from './pages/Rendicion'
import Asistencia from './pages/Asistencia'
import Tareos from './pages/Tareos'

type View = 'rendicion' | 'asistencia' | 'tareos'

function App() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [view, setView] = useState<View>('rendicion')

  if (!user) {
    return <Login onLogin={(name) => setUser({ name })} />
  }

  return (
    <Layout
      user={user}
      onLogout={() => setUser(null)}
      view={view}
      onNavigate={(v) => setView(v)}
    >
      {view === 'rendicion' && <Rendicion />}
      {view === 'asistencia' && <Asistencia />}
      {view === 'tareos' && <Tareos />}
    </Layout>
  )
}

export default App
