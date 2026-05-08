export type Employee = {
  id: string
  name: string
}

export type RendicionItem = {
  id: string
  employeeId: string
  title: string
  description: string
  amount: number
  date: string
  approved: boolean
}

export type TareoItem = {
  id: string
  employeeId: string
  project: string
  place: string
  date: string
  amount: number
  notes?: string
}

export type AsistenciaItem = {
  id: string
  employeeId: string
  project: string
  dateTime: string
  lat?: number
  lng?: number
  status?: 'present' | 'absent' | 'late'
}
