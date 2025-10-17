import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw, Mail, Phone, Calendar, Building, Eye, Plus, Edit, Trash2, ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Employee, FilterForm, PaginationConfig } from '../types';
import { dummyEmployees } from '../data/employees';
import jsPDF from 'jspdf';
import EmployeeModal from './EmployeeModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import EmployeeRecordModal from './EmployeeRecordModal';

interface EmployeeViewProps {
  isDarkMode: boolean;
  currentView?: string;
}

const EmployeeView: React.FC<EmployeeViewProps> = ({ isDarkMode, currentView }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterForm>({
    nombre: '',
    apellido: '',
    dni: '',
    celular: '',
    corporativo: '',
    correoPersonal: '',
    correoCorporativo: '',
    sector: '',
    rol: '',
    cargo: '',
    estado: ''
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    pageSize: 5,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0
  });

  // Estados para modales
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Extraer valores únicos para los dropdowns
  const getUniqueValues = (field: keyof Employee) => {
    const values = employees
      .map(emp => emp[field])
      .filter((value): value is string => typeof value === 'string' && value.trim() !== '')
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    return values;
  };

  const sectors = getUniqueValues('sector');
  const roles = getUniqueValues('rol');
  const cargos = getUniqueValues('cargo');

  // Datos del usuario logueado (simulado)
  const currentUser = {
    nombre: 'Leandro Ariel',
    apellido: 'Rufino',
    rol: 'Administrador',
    sector: 'Sistemas',
    fechaIngreso: '15/01/2020'
  };

  useEffect(() => {
    // Simular carga inicial de datos
    setEmployees(dummyEmployees);
    setFilteredEmployees(dummyEmployees);
    updatePagination(dummyEmployees);
  }, []);

  // Navegar a secciones específicas cuando cambie currentView
  useEffect(() => {
    if (currentView) {
      const element = document.getElementById(currentView);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  }, [currentView]);

  const updatePagination = (data: Employee[]) => {
    const totalPages = pagination.pageSize === -1 ? 1 : Math.ceil(data.length / pagination.pageSize);
    setPagination(prev => ({
      ...prev,
      totalItems: data.length,
      totalPages,
      currentPage: 1
    }));
  };

  // Función helper para convertir fecha argentina a objeto Date
  const parseArgentineDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    // Formato esperado: dd/mm/yyyy
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Los meses en JS van de 0-11
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    
    return new Date(year, month, day);
  };


  const applyFilters = () => {
    setLoading(true);
    
    // Simular delay de API
    setTimeout(() => {
      let filtered = employees.filter(employee => {
        const currentStatus = getEmployeeStatus(employee);
        
        return (
          (!filters.nombre || employee.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
          (!filters.apellido || employee.apellido.toLowerCase().includes(filters.apellido.toLowerCase())) &&
          (!filters.dni || employee.dni.includes(filters.dni)) &&
          (!filters.celular || (employee.celular && employee.celular.includes(filters.celular))) &&
          (!filters.corporativo || (employee.corporativo && employee.corporativo.includes(filters.corporativo))) &&
          (!filters.correoPersonal || (employee.correoPersonal && employee.correoPersonal.toLowerCase().includes(filters.correoPersonal.toLowerCase()))) &&
          (!filters.correoCorporativo || (employee.correoInstitucional && employee.correoInstitucional.toLowerCase().includes(filters.correoCorporativo.toLowerCase()))) &&
          (!filters.sector || employee.sector.toLowerCase().includes(filters.sector.toLowerCase())) &&
          (!filters.rol || (employee.rol && employee.rol.toLowerCase().includes(filters.rol.toLowerCase()))) &&
          (!filters.cargo || employee.cargo.toLowerCase().includes(filters.cargo.toLowerCase())) &&
          (!filters.estado || currentStatus === filters.estado)
        );
      });

      setFilteredEmployees(filtered);
      updatePagination(filtered);
      setLoading(false);
    }, 1200);
  };

  const clearFilters = () => {
    setFilters({
      nombre: '',
      apellido: '',
      dni: '',
      celular: '',
      corporativo: '',
      correoPersonal: '',
      correoCorporativo: '',
      sector: '',
      rol: '',
      cargo: '',
      estado: ''
    });
    setFilteredEmployees(employees);
    updatePagination(employees);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1
    }));
  };

  const getCurrentPageData = () => {
    if (pagination.pageSize === -1) return filteredEmployees;
    
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return filteredEmployees.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No registra';
    
    // Si ya está en formato argentino, devolverlo tal como está
    if (dateString.includes('/')) {
      return dateString;
    }
    
    // Si está en formato ISO o similar, convertir a formato argentino
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'No registra';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  // Función para determinar si un empleado está actualmente en licencia
  const isEmployeeOnLeave = (employee: Employee) => {
    if (!employee.legajo?.licencias || employee.legajo.licencias.length === 0) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a inicio del día

    return employee.legajo.licencias.some(licencia => {
      const fechaInicio = parseArgentineDate(licencia.fechaInicio);
      const fechaFin = parseArgentineDate(licencia.fechaFin);
      
      if (!fechaInicio || !fechaFin) return false;
      
      fechaInicio.setHours(0, 0, 0, 0);
      fechaFin.setHours(23, 59, 59, 999); // Incluir todo el día de fin

      return today >= fechaInicio && today <= fechaFin;
    });
  };

  // Función para obtener el estado real del empleado (considerando licencias)
  const getEmployeeStatus = (employee: Employee) => {
    if (employee.estado === 'Inactivo') {
      return 'Inactivo';
    }
    
    // Si el estado está marcado como "De licencia" en los datos, respetarlo
    if (employee.estado === 'De licencia') {
      return 'De licencia';
    }
    
    // Si no está marcado explícitamente, verificar si está actualmente en licencia
    if (isEmployeeOnLeave(employee)) {
      return 'De licencia';
    }
    
    return 'Activo';
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Configuración de colores para PDF limpio
    const primaryColor = [59, 130, 246]; // Blue-500
    const secondaryColor = [107, 114, 128]; // Gray-500
    const textColor = [31, 41, 55]; // Gray-800
    const lightGray = [243, 244, 246]; // Gray-100

    // Función helper para agregar texto
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(options.fontSize || 10);
      doc.setFont('helvetica', options.style || 'normal');
      doc.text(text, x, y);
      return y + (options.lineHeight || 5);
    };

    // Función helper para agregar título
    const addTitle = (text: string, y: number) => {
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(text, 20, y);
      return y + 10;
    };


    // 1. ENCABEZADO LIMPIO
    yPosition = addTitle('CONSULTA DE EMPLEADOS', yPosition);
    yPosition = addText('Sistema de Gestión de Recursos Humanos', 20, yPosition, { fontSize: 10, style: 'italic' });
    yPosition += 10;

    // 2. INFORMACIÓN BÁSICA
    yPosition = addText(`Fecha de consulta: ${new Date().toLocaleString('es-AR')}`, 20, yPosition);
    yPosition = addText(`Usuario: Rufino, Leandro Ariel (Administrador)`, 20, yPosition);
    yPosition = addText(`Total de empleados: ${filteredEmployees.length}`, 20, yPosition);
    yPosition += 8;

    // 3. FILTROS APLICADOS
    const activeFilters = Object.entries(filters).filter(([, value]) => value && value !== '');
    
    yPosition += 3;
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(15, yPosition - 3, 180, 8, 'F');
    
    if (activeFilters.length > 0) {
      yPosition = addText('Filtros: Se utilizaron filtros personalizados:', 20, yPosition, { fontSize: 9, style: 'bold' });
      
      activeFilters.forEach(([key, value]) => {
        const filterName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        yPosition = addText(`• ${filterName} = "${value}"`, 25, yPosition, { fontSize: 9 });
      });
    } else {
      yPosition = addText('Filtros: Se utilizaron los filtros por defecto', 20, yPosition, { fontSize: 9, style: 'bold' });
    }
    yPosition += 5;

    // 4. RESULTADOS
    yPosition += 5;
    
    if (filteredEmployees.length === 0) {
      yPosition = addText('No se encontraron empleados que coincidan con los criterios de búsqueda.', 20, yPosition);
    } else {
      // Tabla limpia y plana
      const tableHeaders = ['Nombre', 'DNI', 'Sector', 'Rol', 'Estado', 'Ingreso'];
      const colWidths = [43, 25, 38, 28, 20, 25];
      const startX = 20;
      
      // Fondo para headers
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, yPosition - 3, 180, 10, 'F');
      
      // Headers de la tabla
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      
      let xPosition = startX;
      tableHeaders.forEach((header, index) => {
        doc.text(header, xPosition, yPosition + 3);
        xPosition += colWidths[index];
      });
      
      yPosition += 12;
      
      // Datos de empleados
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      
      filteredEmployees.forEach((employee, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Fondo alternado para filas
        if (index % 2 === 0) {
          doc.setFillColor(248, 250, 252); // Gray-50
          doc.rect(15, yPosition - 3, 180, 8, 'F');
        }
        
        const rowData = [
          `${employee.apellido}, ${employee.nombre}`,
          employee.dni,
          employee.sector,
          employee.rol || 'N/A',
          getEmployeeStatus(employee),
          formatDate(employee.fechaIngreso || '')
        ];
        
        xPosition = startX;
        rowData.forEach((data, colIndex) => {
          // Solo truncar si es muy largo (más de 20 caracteres)
          const truncatedData = data && data.length > 20 ? data.substring(0, 17) + '...' : data || '';
          doc.text(truncatedData, xPosition, yPosition);
          xPosition += colWidths[colIndex];
        });
        
        yPosition += 8;
      });
    }

    // 5. PIE DE PÁGINA LIMPIO
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Página ${i} de ${pageCount}`, 20, 285);
      doc.text(`Generado: ${new Date().toLocaleDateString('es-AR')}`, 120, 285);
    }

    // Generar nombre del archivo profesional
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    const userName = 'Leandro_Rufino';
    const fileName = `Consulta_Empleados_${dateStr}_${timeStr}_${userName}.pdf`;
    
    // Abrir preview en nueva ventana
    const pdfDataUri = doc.output('datauristring');
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Preview - ${fileName}</title>
            <style>
              body { margin: 0; padding: 20px; background: #f5f5f5; font-family: Arial, sans-serif; }
              .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .actions { display: flex; gap: 10px; margin-top: 20px; }
              button { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
              .download { background: #dc2626; color: white; }
              .download:hover { background: #b91c1c; }
              .close { background: #6b7280; color: white; }
              .close:hover { background: #4b5563; }
              iframe { width: 100%; height: 80vh; border: none; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>📄 Preview del Reporte de Empleados</h2>
              <p><strong>Archivo:</strong> ${fileName}</p>
              <p><strong>Empleados:</strong> ${filteredEmployees.length} encontrados</p>
              <p><strong>Generado:</strong> ${now.toLocaleString('es-AR')}</p>
              <div class="actions">
                <button class="download" onclick="downloadPDF()">💾 Descargar PDF</button>
                <button class="close" onclick="window.close()">❌ Cerrar</button>
              </div>
            </div>
            <iframe src="${pdfDataUri}"></iframe>
            <script>
              function downloadPDF() {
                const link = document.createElement('a');
                link.href = '${pdfDataUri}';
                link.download = '${fileName}';
                link.click();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
    } else {
      // Fallback: descargar directamente si no se puede abrir ventana
      doc.save(fileName);
      toast.success('PDF exportado exitosamente');
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setIsEmployeeModalOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleViewRecord = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsRecordModalOpen(true);
  };

  const handleCreateEmployee = () => {
    setSelectedEmployee(null);
    setIsEditMode(false);
    setIsEmployeeModalOpen(true);
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    if (isEditMode && selectedEmployee) {
      // Actualizar empleado existente
      const updatedEmployees = employees.map(emp => 
        emp.id === selectedEmployee.id ? employeeData : emp
      );
      setEmployees(updatedEmployees);
      
      const updatedFiltered = filteredEmployees.map(emp => 
        emp.id === selectedEmployee.id ? employeeData : emp
      );
      setFilteredEmployees(updatedFiltered);
      
      toast.success('Empleado actualizado exitosamente');
    } else {
      // Crear nuevo empleado
      const newEmployee = { ...employeeData, id: Date.now().toString() };
      setEmployees(prev => [...prev, newEmployee]);
      setFilteredEmployees(prev => [...prev, newEmployee]);
      
      toast.success('Empleado creado exitosamente');
    }
    
    updatePagination(isEditMode ? filteredEmployees : [...filteredEmployees, employeeData]);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      // Marcar como inactivo en lugar de eliminar
      const updatedEmployees = employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, estado: 'Inactivo' as const } : emp
      );
      setEmployees(updatedEmployees);
      
      const updatedFiltered = filteredEmployees.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, estado: 'Inactivo' as const } : emp
      );
      setFilteredEmployees(updatedFiltered);
      
      toast.success('Empleado marcado como inactivo');
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <div id="empleado-registrado" className={`min-h-screen scroll-mt-20 p-2 sm:p-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Información del Usuario Logueado */}
        <div className={`p-4 sm:p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Bienvenido, {currentUser.nombre} {currentUser.apellido}
              </h2>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentUser.rol} • {currentUser.sector}
              </p>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Fecha de ingreso: {formatDate(currentUser.fechaIngreso)}
              </p>
            </div>
            <button 
              onClick={() => {
                setSelectedEmployee({
                  ...currentUser,
                  id: 'current-user',
                  dni: '12345678',
                  fechaNacimiento: '1985-01-01',
                  edad: 39,
                  sexo: 'M' as const,
                  cuil: '20-12345678-9',
                  cargo: 'Administrador',
                  estado: 'Activo' as const,
                  legajo: {
                    datosPersonales: {
                      lugarNacimiento: 'San Salvador de Jujuy, Jujuy',
                      nacionalidad: 'Argentina',
                      estadoCivil: 'Soltero',
                      direccion: 'Av. Belgrano 1234',
                      codigoPostal: '4600',
                      localidad: 'San Salvador de Jujuy',
                      provincia: 'Jujuy',
                      telefonoEmergencia: '3885000000',
                      contactoEmergencia: 'Familia'
                    },
                    datosFamiliares: {
                      hijos: []
                    },
                    informacionLaboral: {
                      numeroLegajo: 'LEG-000',
                      fechaIngreso: currentUser.fechaIngreso,
                      fechaAntiguedad: currentUser.fechaIngreso,
                      modalidadContrato: 'Plazo Indefinido',
                      categoria: 'Administrador',
                      jornadaLaboral: 'Completa',
                      horarioIngreso: '08:00',
                      horarioEgreso: '16:00',
                      supervisorDirecto: 'Gerencia General',
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
                      certificadosCapacitacion: true
                    },
                    evaluaciones: [
                      {
                        fecha: '2023-12-15',
                        periodo: '2023',
                        evaluador: 'Gerencia General',
                        calificacion: 5,
                        comentarios: 'Excelente desempeño en la gestión del sistema.',
                        objetivosCumplidos: '100% de objetivos cumplidos',
                        areasMejora: 'Innovación tecnológica'
                      }
                    ],
                    capacitaciones: [
                      {
                        fecha: '2023-09-15',
                        nombre: 'Administración de Sistemas',
                        institucion: 'Instituto Tecnológico',
                        duracion: '60 horas',
                        certificado: true,
                        tipo: 'Presencial'
                      }
                    ],
                    licencias: [
                      {
                        fechaInicio: '2024-01-15',
                        fechaFin: '2024-01-30',
                        tipo: 'Vacaciones',
                        motivo: 'Descanso anual',
                        dias: 15,
                        certificado: false
                      }
                    ],
                    historial: [
                      {
                        fecha: '2020-01-15',
                        tipo: 'Ingreso',
                        descripcion: 'Contratado como Administrador de Sistemas',
                        usuario: 'Sistema RRHH'
                      }
                    ]
                  }
                } as Employee);
                setIsRecordModalOpen(true);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              }`}
            >
              <Eye size={16} />
              <span>Ver más</span>
            </button>
          </div>
        </div>

        {/* Formulario de Filtros */}
        <div id="buscar-empleado" className={`p-4 scroll-mt-20 sm:p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Búsqueda de Empleado
              </h3>
            </div>
            <button
              onClick={handleCreateEmployee}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
                isDarkMode
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              }`}
            >
              <Plus size={16} />
              <span>Nuevo Empleado</span>
            </button>
          </div>

          {/* Datos Personales */}
          <div className="mb-6">
            <h4 className={`text-md font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? ' border-gray-600' : ' border-gray-300'
            }`}>
              Datos Personales
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="filter-nombre" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Nombre
                </label>
                <input
                  id="filter-nombre"
                  name="nombre"
                  type="text"
                  value={filters.nombre}
                  onChange={(e) => setFilters(prev => ({ ...prev, nombre: e.target.value }))}
                  aria-label="Buscar por nombre"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese nombre"
                />
              </div>

              <div>
                <label htmlFor="filter-apellido" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Apellido
                </label>
                <input
                  id="filter-apellido"
                  name="apellido"
                  type="text"
                  value={filters.apellido}
                  onChange={(e) => setFilters(prev => ({ ...prev, apellido: e.target.value }))}
                  aria-label="Buscar por apellido"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese apellido"
                />
              </div>

              <div>
                <label htmlFor="filter-dni" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  DNI
                </label>
                <input
                  id="filter-dni"
                  name="dni"
                  type="text"
                  value={filters.dni}
                  onChange={(e) => setFilters(prev => ({ ...prev, dni: e.target.value }))}
                  aria-label="Buscar por DNI"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese DNI"
                />
              </div>
            </div>
          </div>

          {/* Datos de Contacto */}
          <div className="mb-6">
            <h4 className={`text-md font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? ' border-gray-600' : ' border-gray-300'
            }`}>
              Datos de Contacto
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="filter-celular" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  N° Celular
                </label>
                <input
                  id="filter-celular"
                  name="celular"
                  type="text"
                  value={filters.celular}
                  onChange={(e) => setFilters(prev => ({ ...prev, celular: e.target.value }))}
                  aria-label="Buscar por número celular"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese celular"
                />
              </div>

              <div>
                <label htmlFor="filter-corporativo" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  N° Corporativo
                </label>
                <input
                  id="filter-corporativo"
                  name="corporativo"
                  type="text"
                  value={filters.corporativo}
                  onChange={(e) => setFilters(prev => ({ ...prev, corporativo: e.target.value }))}
                  aria-label="Buscar por número corporativo"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese corporativo"
                />
              </div>

              <div>
                <label htmlFor="filter-correo-personal" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Correo Personal
                </label>
                <input
                  id="filter-correo-personal"
                  name="correoPersonal"
                  type="email"
                  value={filters.correoPersonal}
                  onChange={(e) => setFilters(prev => ({ ...prev, correoPersonal: e.target.value }))}
                  aria-label="Buscar por correo personal"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese email personal"
                />
              </div>

              <div>
                <label htmlFor="filter-correo-corporativo" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Correo Corporativo
                </label>
                <input
                  id="filter-correo-corporativo"
                  name="correoCorporativo"
                  type="email"
                  value={filters.correoCorporativo}
                  onChange={(e) => setFilters(prev => ({ ...prev, correoCorporativo: e.target.value }))}
                  aria-label="Buscar por correo corporativo"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese email corporativo"
                />
              </div>
            </div>
          </div>

          {/* Información Laboral */}
          <div className="mb-6">
            <h4 className={`text-md font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? ' border-gray-600' : ' border-gray-300'
            }`}>
              Información Laboral
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="filter-sector" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Sector
                </label>
                <select
                  id="filter-sector"
                  name="sector"
                  value={filters.sector}
                  onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                  aria-label="Filtrar por sector"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Todos los sectores</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filter-rol" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Rol
                </label>
                <select
                  id="filter-rol"
                  name="rol"
                  value={filters.rol}
                  onChange={(e) => setFilters(prev => ({ ...prev, rol: e.target.value }))}
                  aria-label="Filtrar por rol"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Todos los roles</option>
                  {roles.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filter-cargo" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Cargo
                </label>
                <select
                  id="filter-cargo"
                  name="cargo"
                  value={filters.cargo}
                  onChange={(e) => setFilters(prev => ({ ...prev, cargo: e.target.value }))}
                  aria-label="Filtrar por cargo"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Todos los cargos</option>
                  {cargos.map((cargo) => (
                    <option key={cargo} value={cargo}>
                      {cargo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Estado y Visualización */}
          <div className="mb-6">
            <h4 className={`text-md font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? ' border-gray-600' : ' border-gray-300'
            }`}>
              Estado y Visualización
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="filter-estado" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Estado
                </label>
                <select
                  id="filter-estado"
                  name="estado"
                  value={filters.estado}
                  onChange={(e) =>
                    setFilters(prev => ({
                      ...prev,
                      estado: e.target.value as typeof prev.estado
                    }))
                  }
                  aria-label="Filtrar por estado"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Todos</option>
                  <option value="Activo">Activo</option>
                  <option value="De licencia">De licencia</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div>
                <label htmlFor="filter-page-size" className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mostrar por página
                </label>
                <select
                  id="filter-page-size"
                  name="pageSize"
                  value={pagination.pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  aria-label="Cantidad de empleados por página"
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value={5}>5 empleados</option>
                  <option value={10}>10 empleados</option>
                  <option value={-1}>Todos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={applyFilters}
              disabled={loading}
              aria-label="Aplicar filtros de búsqueda"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin"></div>
                  <span>Buscando...</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span>Filtrar</span>
                </>
              )}
            </button>
            <button
              onClick={clearFilters}
              aria-label="Limpiar todos los filtros"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                isDarkMode
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white border border-slate-500'
                  : 'bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 border border-slate-300'
              }`}
            >
              <RotateCcw size={16} />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {/* Tabla de Empleados */}
        <div id="ver-empleados" className={`p-4 scroll-mt-20 sm:p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Resultados ({filteredEmployees.length} empleados encontrados)
            </h3>
            <button
              onClick={exportToPDF}
              disabled={filteredEmployees.length === 0}
              aria-label="Exportar resultados a PDF"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                filteredEmployees.length === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
              }`}
              title="Exportar resultados a PDF"
            >
              <Download size={16} />
              <span>Exportar PDF</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full spin"></div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Cargando empleados...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Empleado
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Contacto
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Información Laboral
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Estado
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentPageData().map((employee) => (
                      <tr key={employee.id} className={`border-b transition-colors duration-300 hover:bg-opacity-50 ${
                        isDarkMode 
                          ? 'border-gray-700 hover:bg-gray-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                              employee.sexo === 'M' ? 'bg-blue-600' : 'bg-pink-600'
                            }`}>
                              {employee.nombre.charAt(0)}{employee.apellido.charAt(0)}
                            </div>
                            <div>
                              <p className={`font-semibold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {employee.apellido}, {employee.nombre}
                              </p>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                DNI: {employee.dni}
                              </p>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                Edad: {employee.edad} años
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Phone size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                              <span className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {employee.celular || 'No registra'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                              <span className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {employee.correoPersonal || employee.correoInstitucional || 'No registra'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                              <span className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {employee.corporativo || 'No registra'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <p className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {employee.cargo}
                            </p>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {employee.sector}
                            </p>
                            {employee.rol && (
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                Rol: {employee.rol}
                              </p>
                            )}
                            <div className="flex items-center space-x-2">
                              <Calendar size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                              <span className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                Ingreso: {formatDate(employee.fechaIngreso || '')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            getEmployeeStatus(employee) === 'Activo'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : getEmployeeStatus(employee) === 'De licencia'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {getEmployeeStatus(employee)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewRecord(employee)}
                              aria-label={`Ver legajo de ${employee.nombre} ${employee.apellido}`}
                              className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                                isDarkMode
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                              title="Ver legajo"
                            >
                              <FileText size={16} />
                            </button>
                            <button
                              onClick={() => handleEditEmployee(employee)}
                              aria-label={`Editar empleado ${employee.nombre} ${employee.apellido}`}
                              className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                                isDarkMode
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                              }`}
                              title="Editar empleado"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(employee)}
                              aria-label={`Eliminar empleado ${employee.nombre} ${employee.apellido}`}
                              className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                                isDarkMode
                                  ? 'bg-red-600 hover:bg-red-700 text-white'
                                  : 'bg-red-500 hover:bg-red-600 text-white'
                              }`}
                              title="Eliminar empleado"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {pagination.pageSize !== -1 && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Mostrando {((pagination.currentPage - 1) * pagination.pageSize) + 1} a{' '}
                    {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} de{' '}
                    {pagination.totalItems} resultados
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Botones Anterior/Siguiente - Solo en desktop */}
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={`hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        pagination.currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                          : isDarkMode
                            ? 'bg-gray-600 hover:bg-gray-700 text-white'
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                      }`}
                    >
                      <ChevronLeft size={16} />
                      <span>Anterior</span>
                    </button>
                    
                    {/* Números de página */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              page === pagination.currentPage
                                ? isDarkMode
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-500 text-white'
                                : isDarkMode
                                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                                  : 'bg-gray-500 hover:bg-gray-600 text-white'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className={`hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        pagination.currentPage === pagination.totalPages
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                          : isDarkMode
                            ? 'bg-gray-600 hover:bg-gray-700 text-white'
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                      }`}
                    >
                      <span>Siguiente</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modales */}
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
        isDarkMode={isDarkMode}
        isEdit={isEditMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employee={selectedEmployee}
        isDarkMode={isDarkMode}
      />

      <EmployeeRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        employee={selectedEmployee!}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default EmployeeView;