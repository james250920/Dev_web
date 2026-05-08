import React, { useEffect, useState } from 'react'
import { getRendiciones, approveRendicion, getEmployees } from '../services/mockApi'
import { RendicionItem } from '../types'

export default function Rendicion() {
  const [items, setItems] = useState<RendicionItem[]>([])
  const [employees, setEmployees] = useState<Record<string, string>>({})

  useEffect(() => {
    getRendiciones().then(setItems)
    getEmployees().then((list) => setEmployees(Object.fromEntries(list.map((e) => [e.id, e.name]))))
  }, [])

  async function approve(id: string) {
    await approveRendicion(id)
    setItems((s) => s.map((it) => (it.id === id ? { ...it, approved: true } : it)))
  }

  return (
    <section>
      <h1>Rendición de cuentas</h1>
      <p>Lista de rendiciones realizadas por empleados. Revisar y aprobar.</p>
      <ul className="list">
        {items.map((it) => (
          <li key={it.id} className="card">
            <div className="card-head">
              <strong>{it.title}</strong>
              <span>{it.date}</span>
            </div>
            <div>
              <div>Empleado: {employees[it.employeeId] || it.employeeId}</div>
              <div>Descripción: {it.description}</div>
              <div>Monto: S/ {it.amount}</div>
            </div>
            <div className="card-actions">
              {it.approved ? (
                <span className="approved">Aprobado</span>
              ) : (
                <button onClick={() => approve(it.id)}>Aprobar</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
