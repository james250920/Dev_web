import { useEffect, useState } from 'react'
import type { TareoItem } from '../types'
import { getTareos, getEmployees } from '../services/mockApi'
import { useToast } from '../components/Toast'
import SkeletonCard from '../components/Skeleton'

export default function Tareos() {
  const [items, setItems] = useState<TareoItem[]>([])
  const [employees, setEmployees] = useState<Record<string, string>>({})

  const toast = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([getTareos(), getEmployees()]).then(([t, em]) => {
      setItems(t)
      setEmployees(Object.fromEntries(em.map((e) => [e.id, e.name])))
      setTimeout(() => setLoading(false), 250)
    })
  }, [])

  function doExport(){
    const rows = items.map(it => ({
      id: it.id,
      project: it.project,
      employee: employees[it.employeeId] || it.employeeId,
      place: it.place,
      date: it.date,
      amount: it.amount,
      notes: it.notes || ''
    }))
    const headers = ['id','project','employee','place','date','amount','notes']
    const csv = [headers.join(',')].concat(rows.map(r => headers.map(h => {
      const v = (r as any)[h]
      if (typeof v === 'string') return '"' + v.replace(/"/g, '""') + '"'
      return String(v)
    }).join(','))).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tareos-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast('Exportado CSV (Tareos)')
  }

  return (
    <section>
      <h1>Sistema de tareos</h1>
      <p>Listado de tareos: lugar, fecha, monto, proyecto.</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={doExport} aria-label="Exportar tareos">
          <svg viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: 8 }} fill="none"><path d="M12 3v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Exportar CSV
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SkeletonCard height={90} />
          <SkeletonCard height={90} />
        </div>
      ) : (
        <ul className="list">
          {items.map((it) => (
            <li key={it.id} className="card">
              <div className="card-head">
                <strong>{it.project}</strong>
                <small>{it.date}</small>
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
      )}
    </section>
  )
}
