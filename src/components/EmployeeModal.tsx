import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, User, Phone, Building, GraduationCap } from 'lucide-react';
import { Employee } from '../types';
import { dummyEmployees } from '../data/employees';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employee?: Employee | null;
  isDarkMode: boolean;
  isEdit?: boolean;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  employee, 
  isDarkMode,
  isEdit = false 
}) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    sexo: 'F',
    celular: '',
    telefono: '',
    corporativo: '',
    interno: '',
    correoPersonal: '',
    correoInstitucional: '',
    titulo: '',
    sector: '',
    fechaIngreso: '',
    rol: '',
    cargo: '',
    estado: 'Activo'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Extraer valores únicos para los dropdowns
  const getUniqueValues = (field: keyof Employee) => {
    const values = dummyEmployees
      .map(emp => emp[field])
      .filter((value): value is string => typeof value === 'string' && value.trim() !== '')
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    return values;
  };

  const sectors = getUniqueValues('sector');
  const roles = getUniqueValues('rol');
  const cargos = getUniqueValues('cargo');

  // Función de validación
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'nombre':
        return value.trim() === '' ? 'El nombre es obligatorio' : '';
      case 'apellido':
        return value.trim() === '' ? 'El apellido es obligatorio' : '';
      case 'dni':
        return value.trim() === '' ? 'El DNI es obligatorio' : 
               value.length < 7 || value.length > 8 ? 'El DNI debe tener entre 7 y 8 dígitos' : '';
      case 'fechaNacimiento':
        return value === '' ? 'La fecha de nacimiento es obligatoria' : '';
      case 'sector':
        return value === '' ? 'El sector es obligatorio' : '';
      case 'cargo':
        return value === '' ? 'El cargo es obligatorio' : '';
      case 'correoPersonal':
        return value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : '';
      case 'correoInstitucional':
        return value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : '';
      case 'celular':
        return value !== '' && !/^\d{10,15}$/.test(value) ? 'Teléfono inválido (10-15 dígitos)' : '';
      default:
        return '';
    }
  };

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    const requiredFields = ['nombre', 'apellido', 'dni', 'fechaNacimiento', 'sector', 'cargo'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof Employee] as string || '');
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validar emails si están presentes
    if (formData.correoPersonal) {
      const emailError = validateField('correoPersonal', formData.correoPersonal);
      if (emailError) newErrors.correoPersonal = emailError;
    }
    
    if (formData.correoInstitucional) {
      const emailError = validateField('correoInstitucional', formData.correoInstitucional);
      if (emailError) newErrors.correoInstitucional = emailError;
    }

    // Validar celular si está presente
    if (formData.celular) {
      const phoneError = validateField('celular', formData.celular);
      if (phoneError) newErrors.celular = phoneError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función helper para manejar cambios en inputs
  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validar campo en tiempo real
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  useEffect(() => {
    if (isEdit && employee) {
      setFormData(employee);
    } else {
      setFormData({
        nombre: '',
        apellido: '',
        dni: '',
        fechaNacimiento: '',
        sexo: 'F',
        celular: '',
        telefono: '',
        corporativo: '',
        interno: '',
        correoPersonal: '',
        correoInstitucional: '',
        titulo: '',
        sector: '',
        fechaIngreso: '',
        rol: '',
        cargo: '',
        estado: 'Activo'
      });
    }
  }, [isEdit, employee, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Calcular edad automáticamente si se proporciona fecha de nacimiento
    let edad = 0;
    if (formData.fechaNacimiento) {
      const today = new Date();
      const birth = new Date(formData.fechaNacimiento);
      edad = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        edad--;
      }
    }

    // Generar CUIL automáticamente si se proporciona DNI
    let cuil = '';
    if (formData.dni) {
      const sexo = formData.sexo === 'M' ? '20' : '27';
      cuil = `${sexo}-${formData.dni}-${Math.floor(Math.random() * 10)}`;
    }

    const employeeData: Employee = {
      id: isEdit ? employee!.id : Date.now().toString(),
      nombre: formData.nombre || '',
      apellido: formData.apellido || '',
      dni: formData.dni || '',
      fechaNacimiento: formData.fechaNacimiento || '',
      edad,
      sexo: formData.sexo as 'M' | 'F',
      cuil,
      celular: formData.celular,
      telefono: formData.telefono,
      corporativo: formData.corporativo,
      interno: formData.interno,
      correoPersonal: formData.correoPersonal,
      correoInstitucional: formData.correoInstitucional,
      titulo: formData.titulo,
      sector: formData.sector || '',
      fechaIngreso: formData.fechaIngreso,
      fechaBaja: '',
      rol: formData.rol,
      cargo: formData.cargo || '',
      estado: formData.estado as 'Activo' | 'Inactivo',
      legajo: {
        datosPersonales: {
          lugarNacimiento: 'No especificado',
          nacionalidad: 'Argentina',
          estadoCivil: 'No especificado',
          direccion: 'No especificado',
          codigoPostal: 'No especificado',
          localidad: 'No especificado',
          provincia: 'No especificado',
          telefonoEmergencia: 'No especificado',
          contactoEmergencia: 'No especificado'
        },
        datosFamiliares: {
          hijos: []
        },
        informacionLaboral: {
          numeroLegajo: `LEG-${Date.now().toString().slice(-3)}`,
          fechaIngreso: formData.fechaIngreso || '',
          fechaAntiguedad: formData.fechaIngreso || '',
          modalidadContrato: 'Plazo Indefinido',
          categoria: 'Empleado',
          jornadaLaboral: 'Completa',
          horarioIngreso: '08:00',
          horarioEgreso: '16:00',
          supervisorDirecto: 'No especificado',
          obraSocial: 'No especificado',
          afiliadoSindicato: false
        },
        datosImpositivos: {
          condicionImpositiva: 'No especificado',
          ingresosBrutos: 'No especificado',
          monotributo: false
        },
        documentacion: {
          curriculum: false,
          contratoLaboral: false,
          fotocopiaDNI: false,
          constanciaCUIL: false,
          certificadoMedico: false,
          certificadoAntecedentes: false,
          titulos: false,
          certificadosCapacitacion: false
        },
        evaluaciones: [],
        capacitaciones: [],
        licencias: [],
        historial: [
          {
            fecha: new Date().toISOString().split('T')[0],
            tipo: isEdit ? 'Actualización' : 'Ingreso',
            descripcion: isEdit ? 'Datos actualizados' : 'Nuevo empleado registrado',
            usuario: 'Sistema RRHH'
          }
        ]
      }
    };

    onSave(employeeData);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <User className={`w-5 h-5 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`} />
            </div>
            <h2 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {isEdit ? 'Editar Empleado' : 'Nuevo Empleado'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de empleado"
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold flex items-center space-x-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <User size={18} />
                <span>Información Personal</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      errors.nombre 
                        ? 'border-red-500 focus:ring-red-500' 
                        : isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese nombre"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      errors.apellido 
                        ? 'border-red-500 focus:ring-red-500' 
                        : isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese apellido"
                  />
                  {errors.apellido && (
                    <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    DNI *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dni}
                    onChange={(e) => handleInputChange('dni', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      errors.dni 
                        ? 'border-red-500 focus:ring-red-500' 
                        : isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese DNI"
                  />
                  {errors.dni && (
                    <p className="text-red-500 text-sm mt-1">{errors.dni}</p>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sexo *
                  </label>
                  <select
                    value={formData.sexo}
                    onChange={(e) => setFormData(prev => ({ ...prev, sexo: e.target.value as 'M' | 'F' }))}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  required
                  value={formData.fechaNacimiento}
                  onChange={(e) => setFormData(prev => ({ ...prev, fechaNacimiento: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold flex items-center space-x-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Phone size={18} />
                <span>Contacto</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Celular
                  </label>
                  <input
                    type="text"
                    value={formData.celular || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, celular: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese celular"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={formData.telefono || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese teléfono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Corporativo
                  </label>
                  <input
                    type="text"
                    value={formData.corporativo || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, corporativo: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese corporativo"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Interno
                  </label>
                  <input
                    type="text"
                    value={formData.interno || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, interno: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese interno"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Correo Personal
                  </label>
                  <input
                    type="email"
                    value={formData.correoPersonal || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, correoPersonal: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese email personal"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    value={formData.correoInstitucional || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, correoInstitucional: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ingrese email institucional"
                  />
                </div>
              </div>
            </div>

            {/* Información Laboral */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold flex items-center space-x-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Building size={18} />
                <span>Información Laboral</span>
              </h3>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Sector *
                </label>
                <select
                  required
                  value={formData.sector || ''}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                    errors.sector 
                      ? 'border-red-500 focus:ring-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Seleccione sector</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
                {errors.sector && (
                  <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Cargo *
                </label>
                <select
                  required
                  value={formData.cargo || ''}
                  onChange={(e) => handleInputChange('cargo', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                    errors.cargo 
                      ? 'border-red-500 focus:ring-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Seleccione cargo</option>
                  {cargos.map(cargo => (
                    <option key={cargo} value={cargo}>{cargo}</option>
                  ))}
                </select>
                {errors.cargo && (
                  <p className="text-red-500 text-sm mt-1">{errors.cargo}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Rol
                </label>
                <select
                  value={formData.rol || ''}
                  onChange={(e) => handleInputChange('rol', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Seleccione rol</option>
                  {roles.map(rol => (
                    <option key={rol} value={rol}>{rol}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Fecha de Ingreso
                </label>
                <input
                  type="date"
                  value={formData.fechaIngreso || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, fechaIngreso: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Estado *
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.value as 'Activo' | 'Inactivo' }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>

            {/* Información Académica */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold flex items-center space-x-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <GraduationCap size={18} />
                <span>Información Académica</span>
              </h3>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Título
                </label>
                <input
                  type="text"
                  value={formData.titulo || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ingrese título"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                Object.keys(errors).length > 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Save size={16} />
              <span>{isEdit ? 'Actualizar' : 'Crear'} Empleado</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('root')!
  );
};

export default EmployeeModal;
