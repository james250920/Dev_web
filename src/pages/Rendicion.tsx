import { useEffect, useMemo, useState } from 'react'
import type { RendicionItem } from '../types'
import { getRendiciones, approveRendicion, getEmployees } from '../services/mockApi'
import { useToast } from '../components/Toast'
import SkeletonCard from '../components/Skeleton'

export default function Rendicion() {
  const [items, setItems] = useState<RendicionItem[]>([])
  const [employees, setEmployees] = useState<Record<string, string>>({})

  // filtros
  const [query, setQuery] = useState('')
  const [employeeFilter, setEmployeeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const toast = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // simulate small load time for skeleton
    Promise.all([getRendiciones(), getEmployees()]).then(([r, em]) => {
      setItems(r)
      setEmployees(Object.fromEntries(em.map((e) => [e.id, e.name])))
      setTimeout(() => setLoading(false), 300)
    })
  }, [])

  async function approve(id: string) {
    await approveRendicion(id)
    setItems((s) => s.map((it) => (it.id === id ? { ...it, approved: true } : it)))
    toast('Rendición aprobada')
  }

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (employeeFilter && it.employeeId !== employeeFilter) return false
      if (statusFilter === 'approved' && !it.approved) return false
      if (statusFilter === 'pending' && it.approved) return false
      if (query) {
        const q = query.toLowerCase()
        if (!(it.title.toLowerCase().includes(q) || it.description.toLowerCase().includes(q))) return false
      }
      if (dateFrom) {
        if (new Date(it.date) < new Date(dateFrom)) return false
      }
      if (dateTo) {
        if (new Date(it.date) > new Date(dateTo)) return false
      }
      return true
    })
  }, [items, query, employeeFilter, statusFilter, dateFrom, dateTo])

  return (
    <section>
      <h1>Rendición de cuentas</h1>
      <p>Lista de rendiciones realizadas por empleados. Revisar y aprobar.</p>

      <div className="filters" style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <input placeholder="Buscar por título o descripción" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)}>
          <option value="">Todos los empleados</option>
          {Object.entries(employees).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
          <option value="all">Todos</option>
          <option value="approved">Aprobados</option>
          <option value="pending">Pendientes</option>
        </select>
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        <button onClick={() => {
          // exportar CSV de los elementos filtrados
          const rows = filtered.map((it) => ({
            id: it.id,
            title: it.title,
            description: it.description,
            employee: employees[it.employeeId] || it.employeeId,
            amount: it.amount,
            date: it.date,
            approved: it.approved ? 'Sí' : 'No',
          }))
          const headers = ['id','title','description','employee','amount','date','approved']
          const csv = [headers.join(',')].concat(rows.map(r => headers.map(h => {
            const v = (r as any)[h]
            if (typeof v === 'string') return '"' + v.replace(/"/g, '""') + '"'
            return String(v)
          }).join(','))).join('\n')

          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `rendiciones-${new Date().toISOString().slice(0,10)}.csv`
          a.click()
          URL.revokeObjectURL(url)
        }}>Exportar CSV</button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SkeletonCard height={90} />
          <SkeletonCard height={90} />
        </div>
      ) : (
        <ul className="list">
          {filtered.map((it) => (
            <li key={it.id} className="card">
              <div style={{ flex: 1 }}>
                <div className="card-head">
                  <strong>{it.title}</strong>
                  <small>{it.date}</small>
                </div>
                <div>Empleado: {employees[it.employeeId] || it.employeeId}</div>
                <div>Descripción: {it.description}</div>
                <div>Monto: S/ {it.amount}</div>
              </div>
              <div className="card-actions">
                {it.approved ? (
                  <span className="approved">Aprobado</span>
                ) : (
                  <button onClick={() => approve(it.id)} aria-label={`Aprobar ${it.title}`}>
                    <svg viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: 6 }} fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Aprobar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
