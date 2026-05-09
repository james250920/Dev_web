import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { TableSkeleton } from "@/components/Skeleton";
import { api, type Tareo } from "@/lib/mockData";
import { exportCSV } from "@/lib/csv";
import { toast } from "sonner";
import { Download } from "lucide-react";

export const Route = createFileRoute("/tareos")({
  head: () => ({
    meta: [
      { title: "Tareos — AdminPanel" },
      { name: "description", content: "Gestión y registro de horas trabajadas por proyecto." },
    ],
  }),
  component: TareosPage,
});

function TareosPage() {
  const [data, setData] = useState<Tareo[] | null>(null);

  useEffect(() => {
    api.getTareos().then(setData);
  }, []);

  const onExport = () => {
    if (!data?.length) return toast.error("Nada para exportar");
    exportCSV(`tareos-${Date.now()}.csv`, data);
    toast.success("CSV exportado");
  };

  return (
    <AppLayout title="Tareos">
      <div className="filters">
        <p className="filters-info">Registro de horas trabajadas por proyecto.</p>
        <button className="btn-secondary" onClick={onExport} aria-label="Exportar CSV">
          <Download size={16} aria-hidden="true" /> Exportar
        </button>
      </div>

      <div className="card">
        {!data ? (
          <TableSkeleton cols={5} />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Empleado</th>
                  <th>Fecha</th>
                  <th>Horas</th>
                  <th>Proyecto</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {data.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.employee}</td>
                    <td>{t.date}</td>
                    <td>{t.hours}h</td>
                    <td>{t.project}</td>
                    <td className="muted">{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
