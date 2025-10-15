import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X } from 'lucide-react';
import { Employee } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employee: Employee | null;
  isDarkMode: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  employee,
  isDarkMode 
}) => {
  if (!isOpen || !employee) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-xl shadow-2xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Confirmar Eliminación
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de confirmación"
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className={`text-lg mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            ¿Estás seguro de que deseas eliminar al empleado?
          </p>
          
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                employee.sexo === 'M' ? 'bg-blue-500' : 'bg-pink-500'
              }`}>
                {employee.nombre.charAt(0)}{employee.apellido.charAt(0)}
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {employee.apellido}, {employee.nombre}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {employee.cargo} • {employee.sector}
                </p>
              </div>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-lg ${
            isDarkMode ? 'bg-yellow-900 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <p className={`text-sm ${
              isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
            }`}>
              <strong>Nota:</strong> El empleado será marcado como "Inactivo" en lugar de ser eliminado permanentemente.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end space-x-4 p-6 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
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
            onClick={onConfirm}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              isDarkMode
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('root')!
  );
};

export default DeleteConfirmModal;
