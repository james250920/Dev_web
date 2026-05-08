import React, { useState } from 'react'
import { loginAdmin } from '../services/mockApi'

export default function Login({ onLogin }: { onLogin: (name: string) => void }) {
  const [user, setUser] = useState('admin')
  const [pass, setPass] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await loginAdmin(user, pass)
      onLogin(res.name)
    } catch (err: any) {
      setError(err?.message || 'Error')
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <h2>Ingreso Administrador</h2>
        <label>
          Usuario
          <input value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
        <label>
          Contraseña
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}
