import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Home, Users, BarChart3, HelpCircle, User, FileText, Calendar, Search, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onViewChange: (viewId: string) => void;
  currentView: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isDarkMode, onViewChange, currentView }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['rrhh', 'consultar-empleado']);

  // Prevenir scroll del body cuando la sidebar está abierta en mobile
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      
      if (isOpen && isMobile) {
        // Prevenir scroll del body solo en mobile
        document.body.style.overflow = 'hidden';
      } else {
        // Restaurar scroll del body
        document.body.style.overflow = 'unset';
      }
    };

    // Ejecutar inmediatamente
    handleScroll();

    // Agregar listener para resize
    window.addEventListener('resize', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems: MenuItem[] = [
    {
      id: 'general',
      label: 'General',
      icon: <Home size={20} />,
      children: [
        { id: 'mi-perfil', label: 'Mi perfil', icon: <User size={16} /> },
        { id: 'mis-solicitudes', label: 'Mis solicitudes', icon: <FileText size={16} /> },
        { id: 'mis-licencias', label: 'Mis licencias', icon: <Calendar size={16} /> }
      ]
    },
      {
        id: 'rrhh',
        label: 'Recursos Humanos',
        icon: <Users size={20} />,
        children: [
          { 
            id: 'consultar-empleado', 
            label: 'Consultar empleado', 
            icon: <Search size={16} />,
                            children: [
                              { id: 'empleado-registrado', label: 'Empleado registrado', icon: <User size={16} /> },
                              { id: 'buscar-empleado', label: 'Buscar empleado', icon: <FileText size={16} /> },
                              { id: 'ver-empleados', label: 'Ver empleados', icon: <Calendar size={16} /> }
                            ]
          }
        ]
      },
    {
      id: 'dashboards',
      label: 'Dashboards',
      icon: <BarChart3 size={20} />,
      children: [
        { id: 'dashboard-rrhh', label: 'Dashboard RRHH', icon: <BarChart3 size={16} /> }
      ]
    },
    {
      id: 'guia',
      label: 'Guía de uso',
      icon: <HelpCircle size={20} />,
      children: [
        { id: 'tutoriales', label: 'Tutoriales', icon: <HelpCircle size={16} /> }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-full z-40 md:w-80
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isDarkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}
      `}>
        {/* Mobile Header */}
        <div className={`md:hidden flex items-center justify-between p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Menú
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar menú lateral"
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 md:pt-4 overflow-y-auto h-full">
          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {/* Parent Menu Item */}
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {item.icon}
                    <span className="font-medium whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.children && (
                    expandedMenus.includes(item.id) ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                  )}
                </button>

                {/* Children Menu Items */}
                {item.children && expandedMenus.includes(item.id) && (
                  <div className={`ml-6 mt-2 space-y-1 transition-all duration-300 fade-in ${
                    isDarkMode ? '' : ''
                  }`}>
                    {item.children.map((child) => (
                      <div key={child.id}>
                        <button
                          onClick={() => {
                            if (child.children) {
                              toggleMenu(child.id);
                            } else {
                              // Cambiar vista
                              onViewChange(child.id);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-300 text-sm ${
                            currentView === child.id
                              ? isDarkMode 
                                ? 'bg-blue-900 text-blue-200' 
                                : 'bg-blue-100 text-blue-800'
                              : isDarkMode 
                                ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            {child.icon}
                            <span className="whitespace-nowrap">{child.label}</span>
                          </div>
                          {child.children && (
                            expandedMenus.includes(child.id) ? 
                              <ChevronDown size={16} /> : 
                              <ChevronRight size={16} />
                          )}
                        </button>
                        
                        {/* Sub-children Menu Items */}
                        {child.children && expandedMenus.includes(child.id) && (
                          <div className={`ml-6 mt-2 space-y-1 transition-all duration-300 fade-in ${
                            isDarkMode ? '' : ''
                          }`}>
                            {child.children.map((subChild) => (
                              <button
                                key={subChild.id}
                                onClick={() => {
                                  // Cambiar vista
                                  onViewChange(subChild.id);
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 text-sm ${
                                  currentView === subChild.id
                                    ? isDarkMode 
                                      ? 'bg-blue-900 text-blue-200' 
                                      : 'bg-blue-100 text-blue-800'
                                    : isDarkMode 
                                      ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300' 
                                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                }`}
                              >
                                <div className="flex items-center space-x-3 min-w-0">
                                  {subChild.icon}
                                  <span className="whitespace-nowrap">{subChild.label}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
