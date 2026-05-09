import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { TableSkeleton } from "@/components/Skeleton";
import { api, type Rendicion } from "@/lib/mockData";
import { exportCSV } from "@/lib/csv";
import { toast } from "sonner";
import { Download, Search, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/rendicion")({
  head: () => ({
    meta: [
      { title: "Rendición de Cuentas — AdminPanel" },
      { name: "description", content: "Revisa, filtra y aprueba rendiciones de gastos del equipo." },
    ],
  }),
  component: RendicionPage,
});

function RendicionPage() {
  const [data, setData] = useState<Rendicion[] | null>(null);
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState("all");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    api.getRendiciones().then(setData);
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((r) => {
      if (search && !`${r.title} ${r.description} ${r.id}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (employee !== "all" && r.employee !== employee) return false;
      if (status !== "all" && r.status !== status) return false;
      if (from && r.date < from) return false;
      if (to && r.date > to) return false;
      return true;
    });
  }, [data, search, employee, status, from, to]);

  const approve = (id: string) => {
    setData((prev) => prev?.map((r) => (r.id === id ? { ...r, status: "Aprobado" } : r)) ?? null);
    toast.success("Rendición aprobada");
  };

  const onExport = () => {
    if (!filtered.length) return toast.error("Nada para exportar");
    exportCSV(`rendiciones-${Date.now()}.csv`, filtered);
    toast.success("CSV exportado");
  };

  return (
    <AppLayout title="Rendición de Cuentas">
      <div className="filters" role="region" aria-label="Filtros">
        <div className="filter search-filter">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar por título, descripción o ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar"
          />
        </div>
        <select value={employee} onChange={(e) => setEmployee(e.target.value)} aria-label="Empleado">
          <option value="all">Todos los empleados</option>
          {api.getEmployees().map((e) => (<option key={e}>{e}</option>))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Estado">
          <option value="all">Todos los estados</option>
          <option>Pendiente</option>
          <option>Aprobado</option>
          <option>Rechazado</option>
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Desde" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Hasta" />
        <button className="btn-secondary" onClick={onExport} aria-label="Exportar CSV">
          <Download size={16} aria-hidden="true" /> Exportar
        </button>
      </div>

      <div className="card">
        {!data ? (
          <TableSkeleton cols={7} />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Empleado</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.title}</td>
                    <td>{r.employee}</td>
                    <td>{r.date}</td>
                    <td className="muted">{r.description}</td>
                    <td>S/ {r.amount.toFixed(2)}</td>
                    <td>
                      <span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span>
                    </td>
                    <td>
                      <button
                        className="btn-approve"
                        onClick={() => approve(r.id)}
                        disabled={r.status === "Aprobado"}
                        aria-label={`Aprobar ${r.id}`}
                      >
                        <CheckCircle2 size={14} /> Aprobar
                      </button>
                    </td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr><td colSpan={8} className="empty">Sin resultados con los filtros aplicados.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
