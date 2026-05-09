import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { username: string };
type AuthCtx = {
  user: User | null;
  login: (u: string, p: string) => boolean;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "admin_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (username: string, password: string) => {
    if (!username.trim() || !password.trim()) return false;
    const u = { username };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
