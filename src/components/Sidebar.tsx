import React from 'react'

type Props = {
  user: { name: string }
  view: string
  onNavigate: (v: any) => void
  onLogout: () => void
}

export default function Sidebar({ user, view, onNavigate, onLogout }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>Admin</h2>
        <div className="user">{user.name}</div>
      </div>
      <nav>
        <ul>
          <li className={view === 'rendicion' ? 'active' : ''}>
            <button onClick={() => onNavigate('rendicion')}>Rendición</button>
          </li>
          <li className={view === 'asistencia' ? 'active' : ''}>
            <button onClick={() => onNavigate('asistencia')}>Asistencia</button>
          </li>
          <li className={view === 'tareos' ? 'active' : ''}>
            <button onClick={() => onNavigate('tareos')}>Tareos</button>
          </li>
        </ul>
      </nav>
      <div className="sidebar-foot">
        <button className="logout" onClick={onLogout}>Cerrar sesión</button>
      </div>
    </aside>
  )
}
