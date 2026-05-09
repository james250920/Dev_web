import { type ReactNode, useState, useEffect } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { ClipboardCheck, CalendarCheck, Clock, LogOut, Menu, X } from "lucide-react";

const nav = [
  { to: "/rendicion", label: "Rendición de Cuentas", Icon: ClipboardCheck },
  { to: "/asistencia", label: "Asistencia", Icon: CalendarCheck },
  { to: "/tareos", label: "Tareos", Icon: Clock },
] as const;

export function AppLayout({ children, title }: { children: ReactNode; title: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
  }, [user, navigate]);

  const onLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="app-shell">
      <button
        className="mobile-menu-btn"
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`} aria-label="Navegación principal">
        <div className="sidebar-brand">
          <div className="brand-mark" aria-hidden="true">
            A
          </div>
          <div>
            <div className="brand-name">AdminPanel</div>
            <div className="brand-sub">Gestión de empleados</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Secciones">
          {nav.map(({ to, label, Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`nav-item ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar" aria-hidden="true">
              {(user?.username ?? "?").charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.username ?? "—"}</div>
              <div className="user-role">Administrador</div>
            </div>
          </div>
          <button className="btn-logout" onClick={onLogout} aria-label="Cerrar sesión">
            <LogOut size={16} aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="main-content" id="main">
        <header className="page-header">
          <h1>{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
