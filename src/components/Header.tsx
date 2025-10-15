import React, { useState, useEffect, useRef } from 'react';
import { Bell, Home, ChevronDown, Sun, Moon, User, FileText, Calendar, LogOut, Menu } from 'lucide-react';
import { toast } from 'sonner';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
  onToggleDarkMode: () => void;
  onToggleSidebar: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onToggleDarkMode, onToggleSidebar, onLogout, isDarkMode, sidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [breadcrumbMenuOpen, setBreadcrumbMenuOpen] = useState(false);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (breadcrumbRef.current && !breadcrumbRef.current.contains(event.target as Node)) {
        setBreadcrumbMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, title: 'Nueva solicitud de vacaciones', time: 'Hace 2 horas' },
    { id: 2, title: 'Recordatorio: Evaluación anual', time: 'Hace 1 día' },
    { id: 3, title: 'Actualización de políticas', time: 'Hace 3 días' }
  ];

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Breadcrumb */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            <button
              onClick={onToggleSidebar}
              aria-label="Abrir o cerrar menú lateral"
              aria-expanded={sidebarOpen}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
            
            <a 
              href="/"
              className={`text-xl font-bold transition-colors duration-300 hover:opacity-80 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              title="Ir al inicio"
              aria-label="Ir al inicio - Prototipo RRHH"
            >
              Prototipo RRHH
            </a>
            
            {/* Breadcrumb - Hidden on mobile */}
            <div className={`hidden md:flex items-center space-x-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span className="font-medium">Recursos Humanos</span>
              <span>{'>'}</span>
              <div ref={breadcrumbRef} className="relative">
                <button
                  onClick={() => setBreadcrumbMenuOpen(!breadcrumbMenuOpen)}
                  className={`font-medium px-2 py-1 rounded-md transition-colors duration-300 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  Consultar empleado
                </button>
                
                {/* Breadcrumb Submenu */}
                {breadcrumbMenuOpen && (
                  <div 
                    className={`absolute top-full left-0 mt-1 w-64 rounded-lg shadow-lg border transition-all duration-300 fade-in z-50 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          // Scroll a la sección de empleado registrado
                          document.getElementById('empleado-registrado')?.scrollIntoView({ behavior: 'smooth' });
                          setBreadcrumbMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-300 cursor-pointer rounded-md hover:bg-blue-100 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-blue-700' 
                            : 'text-gray-700 hover:bg-blue-100'
                        }`}
                      >
                        <User size={16} className="mr-3" />
                        Empleado registrado
                      </button>
                      <button
                        onClick={() => {
                          // Scroll a la sección de buscar empleado
                          document.getElementById('buscar-empleado')?.scrollIntoView({ behavior: 'smooth' });
                          setBreadcrumbMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-300 cursor-pointer rounded-md hover:bg-blue-100 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-blue-700' 
                            : 'text-gray-700 hover:bg-blue-100'
                        }`}
                      >
                        <FileText size={16} className="mr-3" />
                        Buscar empleado
                      </button>
                      <button
                        onClick={() => {
                          // Scroll a la sección de ver empleados
                          document.getElementById('ver-empleados')?.scrollIntoView({ behavior: 'smooth' });
                          setBreadcrumbMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-300 cursor-pointer rounded-md hover:bg-blue-100 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-blue-700' 
                            : 'text-gray-700 hover:bg-blue-100'
                        }`}
                      >
                        <Calendar size={16} className="mr-3" />
                        Ver empleados
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            
            {/* Home Button - Hidden on mobile */}
            <button
              onClick={() => window.location.href = '/'}
              aria-label="Ir al inicio"
              className={`hidden md:block p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
              }`}
              title="Ir al inicio"
            >
              <Home size={20} />
            </button>

            {/* Notifications - Hidden on mobile */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Ver notificaciones"
                aria-expanded={notificationsOpen}
                className={`p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 ${
                  isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
                }`}
                title="Notificaciones"
              >
                <Bell size={20} />
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border transition-all duration-300 fade-in z-50 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="p-4">
                    <h3 className={`font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Notificaciones
                    </h3>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-3 rounded-lg transition-colors duration-300 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <p className={`text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </p>
                          <p className={`text-xs mt-1 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle - Hidden on mobile */}
            <button
              onClick={onToggleDarkMode}
              aria-label={isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              className={`hidden md:block p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Menu */}
            <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-label={`Menú de usuario: ${user.nombre} ${user.apellido}`}
            aria-expanded={userMenuOpen}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 cursor-pointer ${
              userMenuOpen ? (isDarkMode ? 'bg-blue-900 shadow-lg' : 'bg-blue-100 shadow-md') : ''
            }`}
          >
                {/* Desktop User Info */}
                <div className="hidden md:flex flex-col items-end">
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user.apellido}, {user.nombre}
                  </span>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {user.rol}
                  </span>
                </div>
                
                {/* User Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isDarkMode 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {user.nombre.charAt(0)}{user.apellido.charAt(0)}
                </div>
                
                {/* Desktop Chevron */}
                <ChevronDown 
                  size={16} 
                  className={`hidden md:block transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border transition-all duration-300 fade-in z-50 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="py-1">
                    {/* General Menu Items */}
                    <button
                      onClick={() => {
                        // Aquí iría la lógica para Mi perfil
                        console.log('Mi perfil');
                        setUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm transition-all duration-300 cursor-pointer rounded-md hover:bg-blue-100 hover:shadow-md  ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-blue-700 hover:shadow-lg' 
                          : 'text-gray-700 hover:bg-blue-100 hover:shadow-md'
                      }`}
                    >
                      <User size={16} className="mr-3" />
                      Mi perfil
                    </button>
                    <button
                      onClick={() => {
                        // Aquí iría la lógica para Mis solicitudes
                        console.log('Mis solicitudes');
                        setUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm transition-all duration-300 cursor-pointer rounded-md hover:bg-blue-100 hover:shadow-md  ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-blue-700 hover:shadow-lg' 
                          : 'text-gray-700 hover:bg-blue-100 hover:shadow-md'
                      }`}
                    >
                      <FileText size={16} className="mr-3" />
                      Mis solicitudes
                    </button>
                    <button
                      onClick={() => {
                        // Aquí iría la lógica para Mis licencias
                        console.log('Mis licencias');
                        setUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm transition-all duration-300 cursor-pointer rounded-md hover:bg-blue-100 hover:shadow-md  ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-blue-700 hover:shadow-lg' 
                          : 'text-gray-700 hover:bg-blue-100 hover:shadow-md'
                      }`}
                    >
                      <Calendar size={16} className="mr-3" />
                      Mis licencias
                    </button>
                    
                    {/* Separator */}
                    <hr className={`my-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                    
                    {/* Logout */}
                    <button
                      onClick={() => {
                        console.log('Logout button clicked');
                        toast.success('Cerrando sesión...');
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm transition-all duration-300 cursor-pointer rounded-md hover:bg-blue-100 hover:shadow-md  ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-blue-700 hover:shadow-lg' 
                          : 'text-gray-700 hover:bg-blue-100 hover:shadow-md'
                      }`}
                    >
                      <LogOut size={16} className="mr-3" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {(userMenuOpen || notificationsOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
