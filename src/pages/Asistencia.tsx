import React, { useEffect, useState } from 'react'
import { getAsistencias, getEmployees } from '../services/mockApi'
import { AsistenciaItem } from '../types'

export default function Asistencia() {
  const [items, setItems] = useState<AsistenciaItem[]>([])
  const [employees, setEmployees] = useState<Record<string, string>>({})

  useEffect(() => {
    getAsistencias().then(setItems)
    getEmployees().then((list) => setEmployees(Object.fromEntries(list.map((e) => [e.id, e.name]))))
  }, [])

  return (
    <section>
      <h1>Sistema de asistencia</h1>
      <p>Registros de asistencia por empleado (ubicación, hora, estado).</p>
      <ul className="list">
        {items.map((it) => (
          <li key={it.id} className="card">
            <div className="card-head">
              <strong>{employees[it.employeeId] || it.employeeId}</strong>
              <span>{new Date(it.dateTime).toLocaleString()}</span>
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
    </section>
  )
}
