export type Rendicion = {
  id: string;
  title: string;
  date: string;
  employee: string;
  description: string;
  amount: number;
  status: "Pendiente" | "Aprobado" | "Rechazado";
};

export type Asistencia = {
  id: string;
  employee: string;
  date: string;
  status: "Presente" | "Ausente";
  hours: number;
};

export type Tareo = {
  id: string;
  employee: string;
  date: string;
  hours: number;
  description: string;
  project: string;
};

const employees = [
  "Ana Pérez",
  "Carlos Ruiz",
  "María García",
  "Luis Torres",
  "Sofía Mendoza",
  "Diego Vargas",
];
const projects = [
  "Proyecto Alpha",
  "Proyecto Beta",
  "Sistema Interno",
  "Cliente Lima",
  "Migración ERP",
];

const delay = <T>(data: T, ms = 300) => new Promise<T>((r) => setTimeout(() => r(data), ms));

const rendiciones: Rendicion[] = [
  {
    id: "R-001",
    title: "Viaje cliente Lima",
    date: "2026-05-02",
    employee: "Ana Pérez",
    description: "Pasajes y hospedaje reunión cliente",
    amount: 1240.5,
    status: "Pendiente",
  },
  {
    id: "R-002",
    title: "Material de oficina",
    date: "2026-05-03",
    employee: "Carlos Ruiz",
    description: "Compra trimestral de suministros",
    amount: 320.0,
    status: "Aprobado",
  },
  {
    id: "R-003",
    title: "Capacitación AWS",
    date: "2026-05-05",
    employee: "María García",
    description: "Inscripción curso certificación",
    amount: 890.0,
    status: "Pendiente",
  },
  {
    id: "R-004",
    title: "Almuerzo corporativo",
    date: "2026-05-06",
    employee: "Luis Torres",
    description: "Reunión equipo Q2",
    amount: 425.75,
    status: "Pendiente",
  },
  {
    id: "R-005",
    title: "Software diseño",
    date: "2026-05-08",
    employee: "Sofía Mendoza",
    description: "Licencia anual herramienta UI",
    amount: 599.0,
    status: "Rechazado",
  },
  {
    id: "R-006",
    title: "Movilidad mensual",
    date: "2026-05-10",
    employee: "Diego Vargas",
    description: "Reembolso taxis visitas obra",
    amount: 215.3,
    status: "Pendiente",
  },
  {
    id: "R-007",
    title: "Equipos hardware",
    date: "2026-05-12",
    employee: "Ana Pérez",
    description: "Monitor adicional home office",
    amount: 1100.0,
    status: "Aprobado",
  },
  {
    id: "R-008",
    title: "Conferencia Tech",
    date: "2026-05-15",
    employee: "María García",
    description: "Entrada conferencia anual",
    amount: 750.0,
    status: "Pendiente",
  },
];

const asistencias: Asistencia[] = [
  { id: "A-001", employee: "Ana Pérez", date: "2026-05-04", status: "Presente", hours: 8 },
  { id: "A-002", employee: "Carlos Ruiz", date: "2026-05-04", status: "Presente", hours: 8.5 },
  { id: "A-003", employee: "María García", date: "2026-05-04", status: "Ausente", hours: 0 },
  { id: "A-004", employee: "Luis Torres", date: "2026-05-04", status: "Presente", hours: 7.5 },
  { id: "A-005", employee: "Sofía Mendoza", date: "2026-05-05", status: "Presente", hours: 8 },
  { id: "A-006", employee: "Diego Vargas", date: "2026-05-05", status: "Presente", hours: 9 },
  { id: "A-007", employee: "Ana Pérez", date: "2026-05-05", status: "Presente", hours: 8 },
  { id: "A-008", employee: "Carlos Ruiz", date: "2026-05-06", status: "Ausente", hours: 0 },
  { id: "A-009", employee: "María García", date: "2026-05-06", status: "Presente", hours: 8 },
  { id: "A-010", employee: "Luis Torres", date: "2026-05-07", status: "Presente", hours: 8 },
];

const tareos: Tareo[] = [
  {
    id: "T-001",
    employee: "Ana Pérez",
    date: "2026-05-04",
    hours: 4,
    description: "Diseño wireframes módulo reportes",
    project: "Proyecto Alpha",
  },
  {
    id: "T-002",
    employee: "Ana Pérez",
    date: "2026-05-04",
    hours: 4,
    description: "Reunión planificación sprint",
    project: "Proyecto Alpha",
  },
  {
    id: "T-003",
    employee: "Carlos Ruiz",
    date: "2026-05-04",
    hours: 6,
    description: "Desarrollo API autenticación",
    project: "Sistema Interno",
  },
  {
    id: "T-004",
    employee: "María García",
    date: "2026-05-05",
    hours: 8,
    description: "QA pruebas regresión",
    project: "Cliente Lima",
  },
  {
    id: "T-005",
    employee: "Luis Torres",
    date: "2026-05-05",
    hours: 5,
    description: "Migración tablas legacy",
    project: "Migración ERP",
  },
  {
    id: "T-006",
    employee: "Sofía Mendoza",
    date: "2026-05-06",
    hours: 7,
    description: "Diseño identidad visual",
    project: "Proyecto Beta",
  },
  {
    id: "T-007",
    employee: "Diego Vargas",
    date: "2026-05-06",
    hours: 8,
    description: "Configuración infraestructura",
    project: "Sistema Interno",
  },
  {
    id: "T-008",
    employee: "Carlos Ruiz",
    date: "2026-05-07",
    hours: 6,
    description: "Code review y refactor",
    project: "Sistema Interno",
  },
];

export const api = {
  getRendiciones: () => delay([...rendiciones]),
  getAsistencias: () => delay([...asistencias]),
  getTareos: () => delay([...tareos]),
  getEmployees: () => employees,
  getProjects: () => projects,
};
