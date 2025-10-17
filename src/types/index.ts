export interface Employee {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  edad: number;
  sexo: 'M' | 'F';
  cuil: string;
  celular?: string;
  telefono?: string;
  corporativo?: string;
  interno?: string;
  correoPersonal?: string;
  correoInstitucional?: string;
  titulo?: string;
  sector: string;
  fechaIngreso?: string;
  fechaBaja?: string;
  rol?: string;
  cargo: string;
  estado: 'Activo' | 'Inactivo' | 'De licencia';
  
  // Información adicional del legajo
  legajo: EmployeeRecord;
}

export interface EmployeeRecord {
  // Datos personales
  datosPersonales: {
    lugarNacimiento: string;
    nacionalidad: string;
    estadoCivil: string;
    direccion: string;
    codigoPostal: string;
    localidad: string;
    provincia: string;
    telefonoEmergencia: string;
    contactoEmergencia: string;
  };
  
  // Datos familiares
  datosFamiliares: {
    conyuge?: {
      nombre: string;
      dni: string;
      telefono: string;
    };
    hijos: Array<{
      nombre: string;
      fechaNacimiento: string;
      dni: string;
    }>;
  };
  
  // Información laboral
  informacionLaboral: {
    numeroLegajo: string;
    fechaIngreso: string;
    fechaAntiguedad: string;
    modalidadContrato: string;
    categoria: string;
    jornadaLaboral: string;
    horarioIngreso: string;
    horarioEgreso: string;
    supervisorDirecto: string;
    obraSocial: string;
    afiliadoSindicato: boolean;
    sindicato?: string;
  };
  
  // Datos impositivos
  datosImpositivos: {
    condicionImpositiva: string;
    ingresosBrutos: string;
    monotributo: boolean;
    categoriaMonotributo?: string;
  };
  
  // Documentación
  documentacion: {
    curriculum: boolean;
    contratoLaboral: boolean;
    fotocopiaDNI: boolean;
    constanciaCUIL: boolean;
    certificadoMedico: boolean;
    certificadoAntecedentes: boolean;
    titulos: boolean;
    certificadosCapacitacion: boolean;
  };
  
  // Evaluaciones
  evaluaciones: Array<{
    fecha: string;
    periodo: string;
    evaluador: string;
    calificacion: number;
    comentarios: string;
    objetivosCumplidos: string;
    areasMejora: string;
  }>;
  
  // Capacitaciones
  capacitaciones: Array<{
    fecha: string;
    nombre: string;
    institucion: string;
    duracion: string;
    certificado: boolean;
    tipo: string;
  }>;
  
  // Licencias y ausencias
  licencias: Array<{
    fechaInicio: string;
    fechaFin: string;
    tipo: string;
    motivo: string;
    dias: number;
    certificado: boolean;
  }>;
  
  // Historial de cambios
  historial: Array<{
    fecha: string;
    tipo: string;
    descripcion: string;
    usuario: string;
  }>;
}

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  rol: string;
  avatar?: string;
}

export interface FilterForm {
  nombre: string;
  apellido: string;
  dni: string;
  celular: string;
  corporativo: string;
  correoPersonal: string;
  correoCorporativo: string;
  sector: string;
  rol: string;
  cargo: string;
  estado: 'Activo' | 'Inactivo' | 'De licencia' | '';
}

export interface PaginationConfig {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination: PaginationConfig;
}
