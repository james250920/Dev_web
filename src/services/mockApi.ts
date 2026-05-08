import { RendicionItem, TareoItem, AsistenciaItem, Employee } from '../types/index'

const employees: Employee[] = [
  { id: 'e1', name: 'Ana Pérez' },
  { id: 'e2', name: 'Carlos Ruiz' },
  { id: 'e3', name: 'María Gómez' },
]

let rendiciones: RendicionItem[] = [
  {
    id: 'r1',
    employeeId: 'e1',
    title: 'Compra materiales',
    description: 'Compra de insumos para obra',
    amount: 120.5,
    date: '2026-05-01',
    approved: false,
  },
  {
    id: 'r2',
    employeeId: 'e2',
    title: 'Taxi',
    description: 'Traslado a cliente',
    amount: 18,
    date: '2026-05-03',
    approved: true,
  },
]

let tareos: TareoItem[] = [
  {
    id: 't1',
    employeeId: 'e1',
    project: 'Proyecto A',
    place: 'Lima',
    date: '2026-05-02',
    amount: 8,
    notes: 'Jornada completa',
  },
]

let asistencias: AsistenciaItem[] = [
  {
    id: 'a1',
    employeeId: 'e1',
    project: 'Proyecto A',
    dateTime: '2026-05-02T08:05:00',
    lat: -12.0464,
    lng: -77.0428,
    status: 'present',
  },
]

export function loginAdmin(user: string, pass: string) {
  // simple mock: accept any non-empty
  return new Promise<{ name: string }>((res, rej) => {
    setTimeout(() => {
      if (user && pass) res({ name: user })
      else rej(new Error('Credenciales inválidas'))
    }, 300)
  })
}

export function getEmployees() {
  return Promise.resolve(employees)
}

export function getRendiciones() {
  return Promise.resolve(rendiciones.slice())
}

export function approveRendicion(id: string) {
  const i = rendiciones.find((r) => r.id === id)
  if (i) i.approved = true
  return Promise.resolve(i)
}

export function getTareos() {
  return Promise.resolve(tareos.slice())
}

export function getAsistencias() {
  return Promise.resolve(asistencias.slice())
}
