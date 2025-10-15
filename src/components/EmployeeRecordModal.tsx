import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, ChevronRight, User, Users, Briefcase, FileText, Award, GraduationCap, Calendar, History, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  isDarkMode: boolean;
}

const EmployeeRecordModal: React.FC<EmployeeRecordModalProps> = ({ 
  isOpen, 
  onClose, 
  employee,
  isDarkMode 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['datos-personales']);

  // Verificar que employee y employee.legajo existan
  if (!employee || !employee.legajo) {
    return null;
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No registra';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
  };

  const sections = [
    {
      id: 'datos-personales',
      title: 'Datos Personales',
      icon: <User size={20} />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Lugar de Nacimiento
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.lugarNacimiento}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nacionalidad
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.nacionalidad}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Estado Civil
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.estadoCivil}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Dirección
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.direccion}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Localidad
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.localidad}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Provincia
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.provincia}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Código Postal
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.codigoPostal}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Contacto de Emergencia
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.datosPersonales.contactoEmergencia}
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'datos-familiares',
      title: 'Datos Familiares',
      icon: <Users size={20} />,
      content: (
        <div className="space-y-4">
          {employee.legajo.datosFamiliares.conyuge && (
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Cónyuge
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nombre
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {employee.legajo.datosFamiliares.conyuge.nombre}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    DNI
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {employee.legajo.datosFamiliares.conyuge.dni}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Teléfono
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {employee.legajo.datosFamiliares.conyuge.telefono}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {employee.legajo.datosFamiliares.hijos.length > 0 && (
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Hijos ({employee.legajo.datosFamiliares.hijos.length})
              </h4>
              <div className="space-y-3">
                {employee.legajo.datosFamiliares.hijos.map((hijo, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Nombre
                      </label>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {hijo.nombre}
                      </p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Fecha de Nacimiento
                      </label>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {formatDate(hijo.fechaNacimiento)}
                      </p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        DNI
                      </label>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {hijo.dni}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'informacion-laboral',
      title: 'Información Laboral',
      icon: <Briefcase size={20} />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Número de Legajo
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.informacionLaboral.numeroLegajo}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Fecha de Ingreso
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {formatDate(employee.legajo.informacionLaboral.fechaIngreso)}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Modalidad de Contrato
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.informacionLaboral.modalidadContrato}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Categoría
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.informacionLaboral.categoria}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Jornada Laboral
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.informacionLaboral.jornadaLaboral}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Horario
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.informacionLaboral.horarioIngreso} - {employee.legajo.informacionLaboral.horarioEgreso}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Supervisor Directo
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.informacionLaboral.supervisorDirecto}
              </p>
            </div>
            <div>
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Obra Social
              </label>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {employee.legajo.informacionLaboral.obraSocial}
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'documentacion',
      title: 'Documentación',
      icon: <FileText size={20} />,
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(employee.legajo.documentacion).map(([key, value]) => (
            <div key={key} className={`p-3 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {value ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
                {key === 'curriculum' && value && (
                  <a
                    href="/CV-Leandro_Rufino.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1 rounded transition-colors duration-300 ${
                      isDarkMode 
                        ? 'hover:bg-gray-600 text-gray-300 hover:text-white' 
                        : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                    }`}
                    title="Ver CV de Leandro Rufino"
                    aria-label="Abrir CV de Leandro Rufino en nueva pestaña"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'evaluaciones',
      title: 'Evaluaciones de Desempeño',
      icon: <Award size={20} />,
      content: (
        <div className="space-y-4">
          {employee.legajo.evaluaciones.map((evaluacion, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {evaluacion.periodo}
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formatDate(evaluacion.fecha)} - Evaluador: {evaluacion.evaluador}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  evaluacion.calificacion >= 4 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : evaluacion.calificacion >= 3
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {evaluacion.calificacion}/5
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Comentarios
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {evaluacion.comentarios}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Objetivos Cumplidos
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {evaluacion.objetivosCumplidos}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'capacitaciones',
      title: 'Capacitaciones',
      icon: <GraduationCap size={20} />,
      content: (
        <div className="space-y-4">
          {employee.legajo.capacitaciones.map((capacitacion, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {capacitacion.nombre}
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {capacitacion.institucion}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  capacitacion.certificado
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {capacitacion.certificado ? 'Certificado' : 'Sin certificar'}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Fecha
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formatDate(capacitacion.fecha)}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Duración
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {capacitacion.duracion}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Tipo
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {capacitacion.tipo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'licencias',
      title: 'Licencias y Ausencias',
      icon: <Calendar size={20} />,
      content: (
        <div className="space-y-4">
          {employee.legajo.licencias.map((licencia, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {licencia.tipo}
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {licencia.dias} días
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  licencia.certificado
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {licencia.certificado ? 'Con certificado' : 'Sin certificado'}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Período
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formatDate(licencia.fechaInicio)} - {formatDate(licencia.fechaFin)}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Motivo
                  </label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {licencia.motivo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'historial',
      title: 'Historial de Cambios',
      icon: <History size={20} />,
      content: (
        <div className="space-y-4">
          {employee.legajo.historial.map((cambio, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 border-l-blue-500' 
                : 'bg-gray-50 border-gray-200 border-l-blue-500'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {cambio.tipo}
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {cambio.descripcion}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {formatDate(cambio.fecha)}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    por {cambio.usuario}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-6xl max-h-[90vh] rounded-xl shadow-2xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              employee.sexo === 'M' ? 'bg-blue-500' : 'bg-pink-500'
            }`}>
              {employee.nombre.charAt(0)}{employee.apellido.charAt(0)}
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Legajo de {employee.apellido}, {employee.nombre}
              </h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Legajo N° {employee.legajo.informacionLaboral.numeroLegajo} • {employee.cargo}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de legajo"
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className={`rounded-lg border transition-all duration-300 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </div>
                  {expandedSections.includes(section.id) ? 
                    <ChevronDown size={20} /> : 
                    <ChevronRight size={20} />
                  }
                </button>
                
                {expandedSections.includes(section.id) && (
                  <div className={`px-4 pb-4 transition-all duration-300 fade-in ${
                    isDarkMode ? '' : ''
                  }`}>
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('root')!
  );
};

export default EmployeeRecordModal;
