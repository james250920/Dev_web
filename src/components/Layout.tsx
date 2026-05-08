import React from 'react'
import Sidebar from './Sidebar'

type View = 'rendicion' | 'asistencia' | 'tareos'

export default function Layout({
  children,
  user,
  view,
  onNavigate,
  onLogout,
}: {
  children: React.ReactNode
  user: { name: string }
  view: View
  onNavigate: (v: View) => void
  onLogout: () => void
}) {
  return (
    <div className="app-root">
      <Sidebar user={user} view={view} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="main-content">{children}</main>
    </div>
  )
}
