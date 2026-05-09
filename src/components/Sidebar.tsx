import { NavLink } from 'react-router-dom'

type Props = {
  user: { name: string }
  onLogout: () => void
}

function IconRendicion(){
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="6" rx="1.5" fill="currentColor" opacity="0.95" />
      <rect x="3" y="14" width="10" height="6" rx="1.5" fill="currentColor" opacity="0.95" />
    </svg>
  )
}

function IconAsistencia(){
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1046 2 14 2.8954 14 4C14 5.1046 13.1046 6 12 6C10.8954 6 10 5.1046 10 4C10 2.8954 10.8954 2 12 2Z" fill="currentColor" />
      <path d="M4 22C4 17.5817 7.5817 14 12 14C16.4183 14 20 17.5817 20 22H4Z" fill="currentColor" opacity="0.95" />
    </svg>
  )
}

function IconTareos(){
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 11H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="3" width="4" height="4" rx="1" fill="currentColor" />
    </svg>
  )
}

export default function Sidebar({ user, onLogout }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>Admin</h2>
        <div className="user">{user.name}</div>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/rendicion" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IconRendicion />
              <span>Rendición</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/asistencia" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IconAsistencia />
              <span>Asistencia</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tareos" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IconTareos />
              <span>Tareos</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-foot">
        <button className="logout" onClick={onLogout} aria-label="Cerrar sesión">Salir</button>
      </div>
    </aside>
  )
}
