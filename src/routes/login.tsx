import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { ShieldCheck, Users, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — AdminPanel" },
      { name: "description", content: "Acceso al panel administrativo de gestión de empleados." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const ok = login(username, password);
      if (ok) {
        toast.success("Bienvenido al panel");
        navigate({ to: "/rendicion" });
      } else {
        toast.error("Ingresa usuario y contraseña");
        setSubmitting(false);
      }
    }, 300);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <section className="login-hero" aria-hidden="true">
          <div className="hero-mark">A</div>
          <h2>AdminPanel</h2>
          <p>Gestiona rendiciones, asistencia y tareos de tu equipo en un solo lugar.</p>
          <ul className="hero-features">
            <li>
              <ShieldCheck size={18} /> Aprobaciones controladas
            </li>
            <li>
              <Users size={18} /> Equipos y empleados
            </li>
            <li>
              <BarChart3 size={18} /> Exportes en CSV
            </li>
          </ul>
        </section>

        <form
          className="login-form"
          onSubmit={onSubmit}
          aria-label="Formulario de inicio de sesión"
        >
          <h1>Iniciar sesión</h1>
          <p className="login-sub">Accede con tus credenciales de administrador.</p>

          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="login-hint">Demo: cualquier usuario y contraseña no vacíos.</p>
        </form>
      </div>
    </div>
  );
}
