import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { TableSkeleton } from "@/components/Skeleton";
import { api, type Asistencia } from "@/lib/mockData";
import { exportCSV } from "@/lib/csv";
import { toast } from "sonner";
import { Download } from "lucide-react";

export const Route = createFileRoute("/asistencia")({
  head: () => ({
    meta: [
      { title: "Asistencia — AdminPanel" },
      { name: "description", content: "Registro y visualización de asistencia diaria del personal." },
    ],
  }),
  component: AsistenciaPage,
});

function AsistenciaPage() {
  const [data, setData] = useState<Asistencia[] | null>(null);

  useEffect(() => {
    api.getAsistencias().then(setData);
  }, []);

  const onExport = () => {
    if (!data?.length) return toast.error("Nada para exportar");
    exportCSV(`asistencia-${Date.now()}.csv`, data);
    toast.success("CSV exportado");
  };

  return (
    <AppLayout title="Asistencia">
      <div className="filters">
        <p className="filters-info">Registro de asistencia de empleados.</p>
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
                  <th>Estado</th>
                  <th>Horas</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.employee}</td>
                    <td>{a.date}</td>
                    <td>
                      <span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span>
                    </td>
                    <td>{a.hours}h</td>
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
