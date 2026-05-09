import { useEffect, useState } from 'react'
import type { AsistenciaItem } from '../types'
import { getAsistencias, getEmployees } from '../services/mockApi'
import SkeletonCard from '../components/Skeleton'
import { useToast } from '../components/Toast'

export default function Asistencia() {
  const [items, setItems] = useState<AsistenciaItem[]>([])
  const [employees, setEmployees] = useState<Record<string, string>>({})

  const toast = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([getAsistencias(), getEmployees()]).then(([a, em]) => {
      setItems(a)
      setEmployees(Object.fromEntries(em.map((e) => [e.id, e.name])))
      setTimeout(() => setLoading(false), 200)
      toast('Asistencias cargadas')
    })
  }, [])

  return (
    <section>
      <h1>Sistema de asistencia</h1>
      <p>Registros de asistencia por empleado (ubicación, hora, estado).</p>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SkeletonCard height={80} />
          <SkeletonCard height={80} />
        </div>
      ) : (
        <ul className="list">
          {items.map((it) => (
            <li key={it.id} className="card">
              <div className="card-head">
                <strong>{employees[it.employeeId] || it.employeeId}</strong>
                <small>{new Date(it.dateTime).toLocaleString()}</small>
              </div>
              <div>
                <div>Proyecto: {it.project}</div>
                <div>Estado: {it.status}</div>
                <div>
                  Ubicación: {it.lat ?? '—'}, {it.lng ?? '—'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
