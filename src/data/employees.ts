import { Employee, EmployeeRecord } from '../types';

// Función helper para generar datos básicos del legajo
const generateBasicLegajo = (id: string, sector: string, cargo: string): EmployeeRecord => ({
  datosPersonales: {
    lugarNacimiento: 'San Salvador de Jujuy, Jujuy',
    nacionalidad: 'Argentina',
    estadoCivil: 'Soltero/a',
    direccion: 'Dirección de ejemplo 123',
    codigoPostal: '4600',
    localidad: 'San Salvador de Jujuy',
    provincia: 'Jujuy',
    telefonoEmergencia: '3885000000',
    contactoEmergencia: 'Contacto de emergencia'
  },
  datosFamiliares: {
    hijos: []
  },
  informacionLaboral: {
    numeroLegajo: `LEG-${id.padStart(3, '0')}`,
      fechaIngreso: '01/01/2020',
      fechaAntiguedad: '01/01/2020',
    modalidadContrato: 'Plazo Indefinido',
    categoria: 'Empleado',
    jornadaLaboral: 'Completa',
    horarioIngreso: '08:00',
    horarioEgreso: '16:00',
    supervisorDirecto: 'Supervisor Directo',
    obraSocial: 'OSDE',
    afiliadoSindicato: false
  },
  datosImpositivos: {
    condicionImpositiva: 'Responsable Inscripto',
    ingresosBrutos: 'Jujuy',
    monotributo: false
  },
  documentacion: {
    curriculum: true,
    contratoLaboral: true,
    fotocopiaDNI: true,
    constanciaCUIL: true,
    certificadoMedico: true,
    certificadoAntecedentes: true,
    titulos: true,
    certificadosCapacitacion: false
  },
  evaluaciones: [],
  capacitaciones: [],
  licencias: [
    {
      fechaInicio: '05/01/2025',
      fechaFin: '20/01/2025',
      tipo: 'Vacaciones',
      motivo: 'Descanso anual',
      dias: 15,
      certificado: false
    }
  ],
  historial: [
    {
      fecha: '01/01/2020',
      tipo: 'Ingreso',
      descripcion: `Contratado/a como ${cargo} en ${sector}`,
      usuario: 'Sistema RRHH'
    }
  ]
});

export const dummyEmployees: Employee[] = [
  {
    id: '1',
    nombre: 'María',
    apellido: 'González',
    dni: '29456789',
    fechaNacimiento: '14/07/1985',
    edad: 39,
    sexo: 'F',
    cuil: '27-29456789-3',
    celular: '3885123456',
    telefono: '3884567890',
    corporativo: '1234',
    interno: '567',
    correoPersonal: 'maria.gonzalez@email.com',
    correoInstitucional: 'mgonzalez@empresa.com',
    titulo: 'Licenciada en Administración',
    sector: 'Recursos Humanos',
    fechaIngreso: '20/05/2019',
    fechaBaja: '',
    rol: 'Supervisora',
    cargo: 'SUPERVISORA DE RRHH',
    estado: 'De licencia',
    legajo: {
      datosPersonales: {
        lugarNacimiento: 'San Salvador de Jujuy, Jujuy',
        nacionalidad: 'Argentina',
        estadoCivil: 'Casada',
        direccion: 'Av. San Martín 1234',
        codigoPostal: '4600',
        localidad: 'San Salvador de Jujuy',
        provincia: 'Jujuy',
        telefonoEmergencia: '3885234567',
        contactoEmergencia: 'Carlos González (esposo)'
      },
      datosFamiliares: {
        conyuge: {
          nombre: 'Carlos González',
          dni: '28456789',
          telefono: '3885234567'
        },
        hijos: [
          {
            nombre: 'Sofia González',
            fechaNacimiento: '15/03/2010',
            dni: '42456789'
          },
          {
            nombre: 'Lucas González',
            fechaNacimiento: '22/08/2015',
            dni: '45456789'
          }
        ]
      },
      informacionLaboral: {
        numeroLegajo: 'LEG-001',
        fechaIngreso: '20/05/2019',
        fechaAntiguedad: '20/05/2019',
        modalidadContrato: 'Plazo Indefinido',
        categoria: 'Supervisora',
        jornadaLaboral: 'Completa',
        horarioIngreso: '08:00',
        horarioEgreso: '16:00',
        supervisorDirecto: 'Roberto López',
        obraSocial: 'OSDE',
        afiliadoSindicato: true,
        sindicato: 'ATE'
      },
      datosImpositivos: {
        condicionImpositiva: 'Responsable Inscripto',
        ingresosBrutos: 'Jujuy',
        monotributo: false
      },
      documentacion: {
        curriculum: true,
        contratoLaboral: true,
        fotocopiaDNI: true,
        constanciaCUIL: true,
        certificadoMedico: true,
        certificadoAntecedentes: true,
        titulos: true,
        certificadosCapacitacion: true
      },
      evaluaciones: [
        {
          fecha: '15/12/2023',
          periodo: '2023',
          evaluador: 'Roberto López',
          calificacion: 4,
          comentarios: 'Excelente desempeño en la gestión del equipo de RRHH.',
          objetivosCumplidos: '100% de objetivos cumplidos',
          areasMejora: 'Desarrollo de liderazgo'
        },
        {
          fecha: '15/12/2022',
          periodo: '2022',
          evaluador: 'Roberto López',
          calificacion: 4,
          comentarios: 'Buen manejo de procesos administrativos.',
          objetivosCumplidos: '95% de objetivos cumplidos',
          areasMejora: 'Gestión de tiempo'
        }
      ],
      capacitaciones: [
        {
          fecha: '15/08/2023',
          nombre: 'Liderazgo y Gestión de Equipos',
          institucion: 'Instituto de Capacitación Empresarial',
          duracion: '40 horas',
          certificado: true,
          tipo: 'Presencial'
        },
        {
          fecha: '20/11/2022',
          nombre: 'Normativa Laboral Actualizada',
          institucion: 'Colegio de Abogados de Jujuy',
          duracion: '20 horas',
          certificado: true,
          tipo: 'Virtual'
        }
      ],
      licencias: [
        {
          fechaInicio: '05/10/2024',
          fechaFin: '20/10/2024',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        },
        {
          fechaInicio: '01/10/2024',
          fechaFin: '03/10/2024',
          tipo: 'Enfermedad',
          motivo: 'Gripe estacional',
          dias: 3,
          certificado: true
        }
      ],
      historial: [
        {
          fecha: '15/08/2023',
          tipo: 'Capacitación',
          descripcion: 'Completó curso de Liderazgo y Gestión de Equipos',
          usuario: 'Sistema RRHH'
        },
        {
          fecha: '15/01/2023',
          tipo: 'Promoción',
          descripcion: 'Ascendida a Supervisora de RRHH',
          usuario: 'Roberto López'
        },
        {
          fecha: '20/05/2019',
          tipo: 'Ingreso',
          descripcion: 'Contratada como Analista de RRHH',
          usuario: 'Sistema RRHH'
        }
      ]
    }
  },
  {
    id: '2',
    nombre: 'Carlos',
    apellido: 'Rodriguez',
    dni: '28451234',
    fechaNacimiento: '10/08/1985',
    edad: 39,
    sexo: 'M',
    cuil: '20-28451234-5',
    celular: '3885123456',
    telefono: '3884567890',
    corporativo: '1234',
    interno: '456',
    correoPersonal: 'carlos.rodriguez@email.com',
    correoInstitucional: 'crodriguez@empresa.com',
    titulo: 'Licenciado en Administración',
    sector: 'Recursos Humanos',
    fechaIngreso: '01/06/2018',
    fechaBaja: '',
    rol: 'Supervisor',
    cargo: 'JEFE DE RECURSOS HUMANOS',
    estado: 'Activo',
    legajo: {
      datosPersonales: {
        lugarNacimiento: 'Buenos Aires, CABA',
        nacionalidad: 'Argentina',
        estadoCivil: 'Soltero',
        direccion: 'Av. Corrientes 2345',
        codigoPostal: '1043',
        localidad: 'Buenos Aires',
        provincia: 'CABA',
        telefonoEmergencia: '3885345678',
        contactoEmergencia: 'Ana Rodriguez (hermana)'
      },
      datosFamiliares: {
        hijos: []
      },
      informacionLaboral: {
        numeroLegajo: 'LEG-002',
        fechaIngreso: '01/06/2018',
        fechaAntiguedad: '01/06/2018',
        modalidadContrato: 'Plazo Indefinido',
        categoria: 'Jefe',
        jornadaLaboral: 'Completa',
        horarioIngreso: '09:00',
        horarioEgreso: '17:00',
        supervisorDirecto: 'Miguel González',
        obraSocial: 'Swiss Medical',
        afiliadoSindicato: false
      },
      datosImpositivos: {
        condicionImpositiva: 'Responsable Inscripto',
        ingresosBrutos: 'CABA',
        monotributo: false
      },
      documentacion: {
        curriculum: true,
        contratoLaboral: true,
        fotocopiaDNI: true,
        constanciaCUIL: true,
        certificadoMedico: true,
        certificadoAntecedentes: true,
        titulos: true,
        certificadosCapacitacion: false
      },
      evaluaciones: [
        {
          fecha: '20/12/2023',
          periodo: '2023',
          evaluador: 'Miguel González',
          calificacion: 5,
          comentarios: 'Excelente liderazgo y gestión estratégica del área de RRHH.',
          objetivosCumplidos: '100% de objetivos cumplidos',
          areasMejora: 'Innovación en procesos'
        }
      ],
      capacitaciones: [
        {
          fecha: '15/10/2023',
          nombre: 'Gestión Estratégica de RRHH',
          institucion: 'Universidad de Buenos Aires',
          duracion: '60 horas',
          certificado: true,
          tipo: 'Presencial'
        }
      ],
      licencias: [
        {
          fechaInicio: '10/02/2025',
          fechaFin: '25/02/2025',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        },
        {
          fechaInicio: '20/01/2025',
          fechaFin: '22/01/2025',
          tipo: 'Personal',
          motivo: 'Asuntos personales',
          dias: 3,
          certificado: false
        }
      ],
      historial: [
        {
          fecha: '15/10/2023',
          tipo: 'Capacitación',
          descripcion: 'Completó curso de Gestión Estratégica de RRHH',
          usuario: 'Sistema RRHH'
        },
        {
          fecha: '01/03/2020',
          tipo: 'Promoción',
          descripcion: 'Ascendido a Jefe de Recursos Humanos',
          usuario: 'Miguel González'
        },
        {
          fecha: '01/06/2018',
          tipo: 'Ingreso',
          descripcion: 'Contratado como Supervisor de RRHH',
          usuario: 'Sistema RRHH'
        }
      ]
    }
  },
  {
    id: '3',
    nombre: 'Ana',
    apellido: 'García',
    dni: '31567890',
    fechaNacimiento: '05/12/1990',
    edad: 34,
    sexo: 'F',
    cuil: '27-31567890-2',
    celular: '3886234567',
    telefono: '',
    corporativo: '5678',
    interno: '789',
    correoPersonal: 'ana.garcia@email.com',
    correoInstitucional: 'agarcia@empresa.com',
    titulo: 'Contadora Pública',
    sector: 'Contabilidad',
    fechaIngreso: '15/02/2019',
    fechaBaja: '',
    rol: 'Especialista',
    cargo: 'CONTADORA SENIOR',
    estado: 'De licencia',
    legajo: {
      ...generateBasicLegajo('3', 'Contabilidad', 'CONTADORA SENIOR'),
      licencias: [
        {
          fechaInicio: '08/10/2024',
          fechaFin: '25/10/2024',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 17,
          certificado: false
        },
        {
          fechaInicio: '02/10/2024',
          fechaFin: '04/10/2024',
          tipo: 'Enfermedad',
          motivo: 'Migraña',
          dias: 3,
          certificado: true
        }
      ]
    }
  },
  {
    id: '4',
    nombre: 'Roberto',
    apellido: 'López',
    dni: '27345678',
    fechaNacimiento: '18/03/1988',
    edad: 36,
    sexo: 'M',
    cuil: '20-27345678-9',
    celular: '3887345678',
    telefono: '3884789012',
    corporativo: '9012',
    interno: '123',
    correoPersonal: 'roberto.lopez@email.com',
    correoInstitucional: 'rlopez@empresa.com',
    titulo: 'Ingeniero en Sistemas',
    sector: 'Tecnología',
    fechaIngreso: '10/09/2017',
    fechaBaja: '',
    rol: 'Líder Técnico',
    cargo: 'JEFE DE SISTEMAS',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('4', 'Tecnología', 'JEFE DE SISTEMAS'),
      licencias: [
        {
          fechaInicio: '10/01/2025',
          fechaFin: '12/01/2025',
          tipo: 'Personal',
          motivo: 'Trámites bancarios',
          dias: 3,
          certificado: false
        }
      ]
    }
  },
  {
    id: '5',
    nombre: 'Laura',
    apellido: 'Martínez',
    dni: '32456789',
    fechaNacimiento: '22/07/1992',
    edad: 32,
    sexo: 'F',
    cuil: '27-32456789-3',
    celular: '3888456789',
    telefono: '',
    corporativo: '3456',
    interno: '567',
    correoPersonal: 'laura.martinez@email.com',
    correoInstitucional: 'lmartinez@empresa.com',
    titulo: 'Licenciada en Marketing',
    sector: 'Marketing',
    fechaIngreso: '20/11/2020',
    fechaBaja: '',
    rol: 'Coordinadora',
    cargo: 'COORDINADORA DE MARKETING',
    estado: 'De licencia',
    legajo: {
      ...generateBasicLegajo('5', 'Marketing', 'COORDINADORA DE MARKETING'),
      licencias: [
        {
          fechaInicio: '12/10/2024',
          fechaFin: '28/10/2024',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 16,
          certificado: false
        },
        {
          fechaInicio: '06/10/2024',
          fechaFin: '08/10/2024',
          tipo: 'Enfermedad',
          motivo: 'Resfriado',
          dias: 3,
          certificado: true
        }
      ]
    }
  },
  {
    id: '6',
    nombre: 'Diego',
    apellido: 'Fernández',
    dni: '26543210',
    fechaNacimiento: '14/11/1987',
    edad: 37,
    sexo: 'M',
    cuil: '20-26543210-7',
    celular: '3889567890',
    telefono: '3884901234',
    corporativo: '7890',
    interno: '890',
    correoPersonal: 'diego.fernandez@email.com',
    correoInstitucional: 'dfernandez@empresa.com',
    titulo: 'Abogado',
    sector: 'Legal',
    fechaIngreso: '05/04/2016',
    fechaBaja: '',
    rol: 'Asesor Legal',
    cargo: 'ASESOR JURÍDICO',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('6', 'Legal', 'ASESOR JURÍDICO'),
      licencias: [
        {
          fechaInicio: '22/01/2025',
          fechaFin: '24/01/2025',
          tipo: 'Personal',
          motivo: 'Cita médica',
          dias: 3,
          certificado: false
        }
      ]
    }
  },
  {
    id: '7',
    nombre: 'Sofia',
    apellido: 'Pérez',
    dni: '33654321',
    fechaNacimiento: '08/05/1993',
    edad: 31,
    sexo: 'F',
    cuil: '27-33654321-4',
    celular: '3880678901',
    telefono: '',
    corporativo: '2345',
    interno: '678',
    correoPersonal: 'sofia.perez@email.com',
    correoInstitucional: 'sperez@empresa.com',
    titulo: 'Psicóloga',
    sector: 'Área de Psicología',
    fechaIngreso: '15/01/2021',
    fechaBaja: '',
    rol: 'Especialista',
    cargo: 'PSICÓLOGA CLÍNICA',
    estado: 'De licencia',
    legajo: {
      ...generateBasicLegajo('7', 'Área de Psicología', 'PSICÓLOGA CLÍNICA'),
      licencias: [
        {
          fechaInicio: '15/10/2024',
          fechaFin: '30/10/2024',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        },
        {
          fechaInicio: '03/10/2024',
          fechaFin: '04/10/2024',
          tipo: 'Enfermedad',
          motivo: 'Dolor de cabeza',
          dias: 2,
          certificado: true
        }
      ]
    }
  },
  {
    id: '8',
    nombre: 'Miguel',
    apellido: 'González',
    dni: '25789012',
    fechaNacimiento: '30/09/1984',
    edad: 40,
    sexo: 'M',
    cuil: '20-25789012-1',
    celular: '3881789012',
    telefono: '3885012345',
    corporativo: '6789',
    interno: '234',
    correoPersonal: 'miguel.gonzalez@email.com',
    correoInstitucional: 'mgonzalez@empresa.com',
    titulo: 'Ingeniero Industrial',
    sector: 'Operaciones',
    fechaIngreso: '22/07/2015',
    fechaBaja: '',
    rol: 'Gerente',
    cargo: 'GERENTE DE OPERACIONES',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('8', 'Operaciones', 'GERENTE DE OPERACIONES'),
      licencias: [
        {
          fechaInicio: '30/01/2025',
          fechaFin: '14/02/2025',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        }
      ]
    }
  },
  {
    id: '9',
    nombre: 'Valeria',
    apellido: 'Silva',
    dni: '34789012',
    fechaNacimiento: '12/02/1991',
    edad: 33,
    sexo: 'F',
    cuil: '27-34789012-6',
    celular: '3882890123',
    telefono: '',
    corporativo: '4567',
    interno: '345',
    correoPersonal: 'valeria.silva@email.com',
    correoInstitucional: 'vsilva@empresa.com',
    titulo: 'Licenciada en Comunicación',
    sector: 'Comunicación',
    fechaIngreso: '10/08/2019',
    fechaBaja: '',
    rol: 'Responsable',
    cargo: 'RESPONSABLE DE COMUNICACIÓN',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('9', 'Comunicación', 'RESPONSABLE DE COMUNICACIÓN'),
      licencias: [
        {
          fechaInicio: '14/01/2025',
          fechaFin: '16/01/2025',
          tipo: 'Personal',
          motivo: 'Trámites personales',
          dias: 3,
          certificado: false
        }
      ]
    }
  },
  {
    id: '10',
    nombre: 'Pablo',
    apellido: 'Torres',
    dni: '24890123',
    fechaNacimiento: '25/06/1986',
    edad: 38,
    sexo: 'M',
    cuil: '20-24890123-8',
    celular: '3883901234',
    telefono: '3885123456',
    corporativo: '8901',
    interno: '456',
    correoPersonal: 'pablo.torres@email.com',
    correoInstitucional: 'ptorres@empresa.com',
    titulo: 'Economista',
    sector: 'Finanzas',
    fechaIngreso: '08/03/2017',
    fechaBaja: '',
    rol: 'Analista Senior',
    cargo: 'ANALISTA FINANCIERO SENIOR',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('10', 'Finanzas', 'ANALISTA FINANCIERO SENIOR'),
      licencias: [
        {
          fechaInicio: '20/02/2025',
          fechaFin: '07/03/2025',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        },
        {
          fechaInicio: '17/01/2025',
          fechaFin: '19/01/2025',
          tipo: 'Enfermedad',
          motivo: 'Gastroenteritis',
          dias: 3,
          certificado: true
        }
      ]
    }
  },
  {
    id: '11',
    nombre: 'Camila',
    apellido: 'Vargas',
    dni: '35901234',
    fechaNacimiento: '17/10/1994',
    edad: 30,
    sexo: 'F',
    cuil: '27-35901234-1',
    celular: '3884012345',
    telefono: '',
    corporativo: '1234',
    interno: '567',
    correoPersonal: 'camila.vargas@email.com',
    correoInstitucional: 'cvargas@empresa.com',
    titulo: 'Diseñadora Gráfica',
    sector: 'Diseño',
    fechaIngreso: '20/05/2022',
    fechaBaja: '',
    rol: 'Diseñadora',
    cargo: 'DISEÑADORA GRÁFICA',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('11', 'Diseño', 'DISEÑADORA GRÁFICA'),
      licencias: [
        {
          fechaInicio: '26/01/2025',
          fechaFin: '28/01/2025',
          tipo: 'Personal',
          motivo: 'Cita odontológica',
          dias: 3,
          certificado: false
        }
      ]
    }
  },
  {
    id: '12',
    nombre: 'Fernando',
    apellido: 'Herrera',
    dni: '23901234',
    fechaNacimiento: '03/01/1983',
    edad: 41,
    sexo: 'M',
    cuil: '20-23901234-5',
    celular: '3885123456',
    telefono: '3885234567',
    corporativo: '5678',
    interno: '678',
    correoPersonal: 'fernando.herrera@email.com',
    correoInstitucional: 'fherrera@empresa.com',
    titulo: 'Licenciado en Seguridad',
    sector: 'Seguridad',
    fechaIngreso: '12/11/2014',
    fechaBaja: '',
    rol: 'Jefe de Seguridad',
    cargo: 'JEFE DE SEGURIDAD',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('12', 'Seguridad', 'JEFE DE SEGURIDAD'),
      licencias: [
        {
          fechaInicio: '21/01/2025',
          fechaFin: '05/02/2025',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        }
      ]
    }
  },
  {
    id: '13',
    nombre: 'Natalia',
    apellido: 'Morales',
    dni: '37012345',
    fechaNacimiento: '28/04/1995',
    edad: 29,
    sexo: 'F',
    cuil: '27-37012345-9',
    celular: '3886234567',
    telefono: '',
    corporativo: '9012',
    interno: '789',
    correoPersonal: 'natalia.morales@email.com',
    correoInstitucional: 'nmorales@empresa.com',
    titulo: 'Administradora',
    sector: 'Administración',
    fechaIngreso: '05/09/2021',
    fechaBaja: '',
    rol: 'Asistente',
    cargo: 'ASISTENTE ADMINISTRATIVA',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('13', 'Administración', 'ASISTENTE ADMINISTRATIVA'),
      licencias: [
        {
          fechaInicio: '19/01/2025',
          fechaFin: '21/01/2025',
          tipo: 'Enfermedad',
          motivo: 'Fiebre',
          dias: 3,
          certificado: true
        }
      ]
    }
  },
  {
    id: '14',
    nombre: 'Gustavo',
    apellido: 'Ramírez',
    dni: '25123456',
    fechaNacimiento: '16/12/1985',
    edad: 39,
    sexo: 'M',
    cuil: '20-25123456-2',
    celular: '3887345678',
    telefono: '3885345678',
    corporativo: '3456',
    interno: '890',
    correoPersonal: 'gustavo.ramirez@email.com',
    correoInstitucional: 'gramirez@empresa.com',
    titulo: 'Técnico en Mantenimiento',
    sector: 'Mantenimiento',
    fechaIngreso: '28/02/2018',
    fechaBaja: '',
    rol: 'Técnico',
    cargo: 'TÉCNICO DE MANTENIMIENTO',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('14', 'Mantenimiento', 'TÉCNICO DE MANTENIMIENTO'),
      licencias: [
        {
          fechaInicio: '15/02/2025',
          fechaFin: '01/03/2025',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        },
        {
          fechaInicio: '13/01/2025',
          fechaFin: '14/01/2025',
          tipo: 'Personal',
          motivo: 'Trámite de licencia de conducir',
          dias: 2,
          certificado: false
        }
      ]
    }
  },
  {
    id: '15',
    nombre: 'Lucía',
    apellido: 'Jiménez',
    dni: '38123456',
    fechaNacimiento: '07/08/1996',
    edad: 28,
    sexo: 'F',
    cuil: '27-38123456-7',
    celular: '3888456789',
    telefono: '',
    corporativo: '7890',
    interno: '123',
    correoPersonal: 'lucia.jimenez@email.com',
    correoInstitucional: 'ljimenez@empresa.com',
    titulo: 'Recursos Humanos',
    sector: 'Recursos Humanos',
    fechaIngreso: '15/11/2022',
    fechaBaja: '',
    rol: 'Analista',
    cargo: 'ANALISTA DE RRHH',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('15', 'Recursos Humanos', 'ANALISTA DE RRHH'),
      licencias: [
        {
          fechaInicio: '16/01/2025',
          fechaFin: '18/01/2025',
          tipo: 'Personal',
          motivo: 'Asuntos familiares',
          dias: 3,
          certificado: false
        }
      ]
    }
  },
  {
    id: '16',
    nombre: 'Eduardo',
    apellido: 'Castro',
    dni: '26234567',
    fechaNacimiento: '21/03/1989',
    edad: 35,
    sexo: 'M',
    cuil: '20-26234567-4',
    celular: '3889567890',
    telefono: '3885456789',
    corporativo: '2345',
    interno: '234',
    correoPersonal: 'eduardo.castro@email.com',
    correoInstitucional: 'ecastro@empresa.com',
    titulo: 'Ingeniero Químico',
    sector: 'Producción',
    fechaIngreso: '10/06/2016',
    fechaBaja: '',
    rol: 'Supervisor',
    cargo: 'SUPERVISOR DE PRODUCCIÓN',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('16', 'Producción', 'SUPERVISOR DE PRODUCCIÓN'),
      licencias: [
        {
          fechaInicio: '23/01/2025',
          fechaFin: '07/02/2025',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        }
      ]
    }
  },
  {
    id: '17',
    nombre: 'Romina',
    apellido: 'Flores',
    dni: '39234567',
    fechaNacimiento: '13/11/1997',
    edad: 27,
    sexo: 'F',
    cuil: '27-39234567-0',
    celular: '3880678901',
    telefono: '',
    corporativo: '6789',
    interno: '345',
    correoPersonal: 'romina.flores@email.com',
    correoInstitucional: 'rflores@empresa.com',
    titulo: 'Nutricionista',
    sector: 'Salud',
    fechaIngreso: '20/01/2023',
    fechaBaja: '',
    rol: 'Especialista',
    cargo: 'NUTRICIONISTA',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('17', 'Salud', 'NUTRICIONISTA'),
      licencias: [
        {
          fechaInicio: '11/01/2025',
          fechaFin: '13/01/2025',
          tipo: 'Enfermedad',
          motivo: 'Resfriado común',
          dias: 3,
          certificado: true
        }
      ]
    }
  },
  {
    id: '18',
    nombre: 'Alejandro',
    apellido: 'Ruiz',
    dni: '27345678',
    fechaNacimiento: '04/07/1987',
    edad: 37,
    sexo: 'M',
    cuil: '20-27345678-6',
    celular: '3881789012',
    telefono: '3885567890',
    corporativo: '4567',
    interno: '456',
    correoPersonal: 'alejandro.ruiz@email.com',
    correoInstitucional: 'aruiz@empresa.com',
    titulo: 'Licenciado en Comercio',
    sector: 'Ventas',
    fechaIngreso: '18/10/2017',
    fechaBaja: '',
    rol: 'Coordinador',
    cargo: 'COORDINADOR DE VENTAS',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('18', 'Ventas', 'COORDINADOR DE VENTAS'),
      licencias: [
        {
          fechaInicio: '05/02/2025',
          fechaFin: '20/02/2025',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        },
        {
          fechaInicio: '24/01/2025',
          fechaFin: '25/01/2025',
          tipo: 'Personal',
          motivo: 'Cita médica',
          dias: 2,
          certificado: false
        }
      ]
    }
  },
  {
    id: '19',
    nombre: 'Brenda',
    apellido: 'Mendoza',
    dni: '40345678',
    fechaNacimiento: '26/05/1998',
    edad: 26,
    sexo: 'F',
    cuil: '27-40345678-3',
    celular: '3882890123',
    telefono: '',
    corporativo: '8901',
    interno: '567',
    correoPersonal: 'brenda.mendoza@email.com',
    correoInstitucional: 'bmendoza@empresa.com',
    titulo: 'Asistente Social',
    sector: 'Servicio Social',
    fechaIngreso: '30/08/2023',
    fechaBaja: '',
    rol: 'Asistente',
    cargo: 'ASISTENTE SOCIAL',
    estado: 'Activo',
    legajo: {
      ...generateBasicLegajo('19', 'Servicio Social', 'ASISTENTE SOCIAL'),
      licencias: [
        {
          fechaInicio: '27/01/2025',
          fechaFin: '29/01/2025',
          tipo: 'Personal',
          motivo: 'Trámites de documentación',
          dias: 3,
          certificado: false
        }
      ]
    }
  },
  {
    id: '20',
    nombre: 'Ricardo',
    apellido: 'Vega',
    dni: '28456789',
    fechaNacimiento: '11/09/1984',
    edad: 40,
    sexo: 'M',
    cuil: '20-28456789-8',
    celular: '3883901234',
    telefono: '3885678901',
    corporativo: '1234',
    interno: '678',
    correoPersonal: 'ricardo.vega@email.com',
    correoInstitucional: 'rvega@empresa.com',
    titulo: 'Ingeniero Mecánico',
    sector: 'Ingeniería',
    fechaIngreso: '01/12/2015',
    fechaBaja: '15/12/2023',
    rol: 'Ingeniero',
    cargo: 'INGENIERO MECÁNICO',
    estado: 'Inactivo',
    legajo: {
      ...generateBasicLegajo('20', 'Ingeniería', 'INGENIERO MECÁNICO'),
      licencias: [
        {
          fechaInicio: '01/12/2024',
          fechaFin: '15/12/2024',
          tipo: 'Vacaciones',
          motivo: 'Descanso anual',
          dias: 15,
          certificado: false
        },
        {
          fechaInicio: '20/11/2024',
          fechaFin: '22/11/2024',
          tipo: 'Personal',
          motivo: 'Trámites de prejubilación',
          dias: 3,
          certificado: false
        }
      ]
    }
  }
];
