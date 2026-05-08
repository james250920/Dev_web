import React, { useEffect, useState } from 'react'
import { getTareos, getEmployees } from '../services/mockApi'
import { TareoItem } from '../types'

export default function Tareos() {
  const [items, setItems] = useState<TareoItem[]>([])
  const [employees, setEmployees] = useState<Record<string, string>>({})

  useEffect(() => {
    getTareos().then(setItems)
    getEmployees().then((list) => setEmployees(Object.fromEntries(list.map((e) => [e.id, e.name]))))
  }, [])

  return (
    <section>
      <h1>Sistema de tareos</h1>
      <p>Listado de tareos: lugar, fecha, monto, proyecto.</p>
      <ul className="list">
        {items.map((it) => (
          <li key={it.id} className="card">
            <div className="card-head">
              <strong>{it.project}</strong>
              <span>{it.date}</span>
            </div>
            <div>
              <div>Empleado: {employees[it.employeeId] || it.employeeId}</div>
              <div>Lugar: {it.place}</div>
              <div>Monto: {it.amount}</div>
              {it.notes && <div>Notas: {it.notes}</div>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
