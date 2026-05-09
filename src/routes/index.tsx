import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: user ? "/rendicion" : "/login", replace: true });
  }, [user, navigate]);
  return <div className="boot-screen" aria-label="Cargando" />;
}
