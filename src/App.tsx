import { useState } from 'react'
import './App.css'
import './layout.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Rendicion from './pages/Rendicion'
import Asistencia from './pages/Asistencia'
import Tareos from './pages/Tareos'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/Toast'

function App() {
  const [user, setUser] = useState<{ name: string } | null>(null)

  return (
    <BrowserRouter>
      <ToastProvider>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={(name) => setUser({ name })} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout user={user} onLogout={() => setUser(null)}><Navigate to="/rendicion" replace /></Layout>} />
            <Route path="/rendicion" element={<Layout user={user} onLogout={() => setUser(null)}><Rendicion /></Layout>} />
            <Route path="/asistencia" element={<Layout user={user} onLogout={() => setUser(null)}><Asistencia /></Layout>} />
            <Route path="/tareos" element={<Layout user={user} onLogout={() => setUser(null)}><Tareos /></Layout>} />
            <Route path="*" element={<Navigate to="/rendicion" replace />} />
          </>
        )}
      </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
