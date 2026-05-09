import { useState } from 'react'
import type { FormEvent } from 'react'
import { loginAdmin } from '../services/mockApi'

export default function Login({ onLogin }: { onLogin: (name: string) => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    try {
      const res = await loginAdmin(user || 'admin', pass)
      onLogin(res.name)
    } catch (err: any) {
      setError(err?.message || 'Error')
    }
  }

  return (
    <div className="login-page login-hero">
      <div className="hero-overlay" aria-hidden />
      <header className="hero-header">
        <div className="brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2L15 8l6 1-4.5 4 1 6L12 17l-7.5 2 1-6L1 9l6-1 3-6z" fill="#FF6A2B" />
          </svg>
          <span className="brand-text">Company Logo</span>
        </div>
      </header>

      <main className="hero-main">
        <form className="login-card hero-card" onSubmit={submit} aria-label="Ingreso administrador">
          <h2>Login to your account</h2>

          <label className="field">
            <span className="field-label">Username</span>
            <div className="input-wrap">
              <input
                aria-label="Usuario"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="input-with-icon"
              />
            </div>
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <div className="input-wrap">
              <input
                aria-label="Contraseña"
                placeholder="Password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="input-with-icon"
              />
            </div>
          </label>

          <div className="row between">
            <label className="remember">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} /> Remember me
            </label>
            <a className="link muted" href="#">Forgot your password?</a>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn-primary">LOGIN</button>

          <div className="signup muted">New here? <a href="#">Sign Up</a></div>
        </form>
      </main>
    </div>
  )
}
