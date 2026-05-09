import { useState } from 'react'
import type { FormEvent } from 'react'
import { loginAdmin } from '../services/mockApi'

export default function Login({ onLogin }: { onLogin: (name: string) => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [userError, setUserError] = useState<string | null>(null)
  const [passError, setPassError] = useState<string | null>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    // simple client-side validation
    let ok = true
    if (!user || user.trim().length === 0) {
      setUserError('Ingrese su usuario')
      ok = false
    }
    if (!pass || pass.length < 4) {
      setPassError('La contraseña debe tener al menos 4 caracteres')
      ok = false
    }
    if (!ok) return

    try {
      const res = await loginAdmin(user || 'admin', pass)
      onLogin(res.name)
    } catch (err: any) {
      setError(err?.message || 'Error')
    }
  }

  function onUserChange(v: string) {
    setUser(v)
    if (userError) setUserError(null)
  }
  function onPassChange(v: string) {
    setPass(v)
    if (passError) setPassError(null)
  }

  return (
    <div className="login-page login-hero">
      <div className="hero-overlay" aria-hidden />
      <div className="login-wrap" role="main">
        <section className="hero-left" aria-hidden>
          <div className="left-overlay">
            <svg className="left-logo" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.06)" />
              <path d="M16 44c8-12 24-12 32 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </section>

        <section className="hero-right">
          <form className="hero-form" onSubmit={submit} aria-label="Ingreso administrador">
            <h2>Welcome !</h2>
            <p className="muted">Sign in to continue to the admin panel</p>

            <label className="field">
              <div className="input-wrap">
                <span className="input-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" fill="#6B7280"/></svg>
                </span>
                <input aria-label="Usuario" placeholder="@username" value={user} onChange={(e) => onUserChange(e.target.value)} aria-invalid={!!userError} aria-describedby={userError ? 'user-error' : undefined} className={"input-with-icon" + (userError ? ' input-invalid' : '')} />
              </div>
              {userError && <div id="user-error" className="field-error" role="alert" aria-live="polite">{userError}</div>}
            </label>

            <label className="field">
              <div className="input-wrap">
                <span className="input-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 8V7a5 5 0 10-10 0v1H5v13h14V8h-2zm-8 0V7a3 3 0 116 0v1H9z" fill="#6B7280"/></svg>
                </span>
                <input aria-label="Contraseña" placeholder="Password" type="password" value={pass} onChange={(e) => onPassChange(e.target.value)} aria-invalid={!!passError} aria-describedby={passError ? 'pass-error' : undefined} className={"input-with-icon" + (passError ? ' input-invalid' : '')} />
              </div>
              {passError && <div id="pass-error" className="field-error" role="alert" aria-live="polite">{passError}</div>}
            </label>

            <div className="row between" style={{marginTop:6}}>
              <a className="link muted" href="#">Forgot Password ?</a>
              <div />
            </div>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="btn-login">LOGIN</button>
          </form>
        </section>
      </div>
    </div>
  )
}
