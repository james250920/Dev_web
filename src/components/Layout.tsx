import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function Layout({
  children,
  user,
  onLogout,
}: {
  children: ReactNode
  user: { name: string }
  onLogout: () => void
}) {
  return (
    <div className="app-root">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="main-content">{children}</main>
    </div>
  )
}
