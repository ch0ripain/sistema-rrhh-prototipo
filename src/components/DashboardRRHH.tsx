import React from 'react';
import { Pie, Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { dummyEmployees } from '../data/employees';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);

interface DashboardRRHHProps {
  isDarkMode: boolean;
}

const DashboardRRHH: React.FC<DashboardRRHHProps> = ({ isDarkMode }) => {
  // Calcular distribución de empleados por sector
  const sectores: { [key: string]: number } = {};
  dummyEmployees.forEach(emp => {
    sectores[emp.sector] = (sectores[emp.sector] || 0) + 1;
  });

  // Calcular cantidad de empleados por estado
  const estados: { [key: string]: number } = {};
  dummyEmployees.forEach(emp => {
    const estado = emp.estado === 'De licencia' ? 'De licencia' : emp.estado;
    estados[estado] = (estados[estado] || 0) + 1;
  });

  // Calcular cantidad de licencias por tipo
  const licencias: { [key: string]: number } = {};
  dummyEmployees.forEach(emp => {
    emp.legajo.licencias.forEach(lic => {
      licencias[lic.tipo] = (licencias[lic.tipo] || 0) + 1;
    });
  });

  // Calcular edad promedio por sector
  const edades: { [key: string]: number[] } = {};
  dummyEmployees.forEach(emp => {
    if (!edades[emp.sector]) edades[emp.sector] = [];
    edades[emp.sector].push(emp.edad);
  });

  const sectoresEdades = Object.keys(edades);
  const promediosEdades = sectoresEdades.map(s =>
    edades[s].reduce((a, b) => a + b) / edades[s].length
  );


  // Datos para el gráfico de sectores (PieChart)
  const dataSectores = {
    labels: Object.keys(sectores),
    datasets: [{
      label: "Empleados por sector",
      data: Object.values(sectores),
      backgroundColor: [
        "#36A2EB", // Azul
        "#FF6384", // Rosa
        "#FFCE56", // Amarillo
        "#4BC0C0", // Turquesa
        "#9966FF", // Púrpura
        "#FF9F40", // Naranja
        "#FF6B6B", // Rojo coral
        "#4ECDC4", // Verde agua
        "#45B7D1", // Azul claro
        "#96CEB4", // Verde menta
        "#FFEAA7", // Amarillo claro
        "#DDA0DD", // Ciruela
        "#98D8C8", // Verde pastel
        "#F7DC6F", // Amarillo dorado
        "#BB8FCE", // Lavanda
        "#85C1E9", // Azul cielo
        "#F8C471", // Melocotón
        "#82E0AA", // Verde lima
        "#F1948A", // Salmón
        "#A9CCE3", // Azul pastel
        "#D7BDE2", // Lila
        "#A3E4D7", // Verde agua claro
        "#F9E79F", // Amarillo crema
        "#D5DBDB", // Gris claro
        "#AED6F1", // Azul muy claro
        "#D2B4DE", // Púrpura claro
        "#A9DFBF", // Verde claro
        "#FADBD8", // Rosa claro
        "#D6EAF8", // Azul muy claro
        "#E8DAEF"  // Púrpura muy claro
      ],
      borderColor: isDarkMode ? '#374151' : '#ffffff',
      borderWidth: 2,
    }]
  };

  // Datos para el gráfico de estados (BarChart)
  const dataEstados = {
    labels: Object.keys(estados),
    datasets: [{
      label: "Empleados por estado",
      data: Object.values(estados),
      backgroundColor: "#36A2EB",
      borderColor: isDarkMode ? '#374151' : '#ffffff',
      borderWidth: 1,
    }]
  };

  // Datos para el gráfico de licencias (BarChart horizontal)
  const dataLicencias = {
    labels: Object.keys(licencias),
    datasets: [{
      label: "Licencias por tipo",
      data: Object.values(licencias),
      backgroundColor: "#FFCE56",
      borderColor: isDarkMode ? '#374151' : '#ffffff',
      borderWidth: 1,
    }]
  };

  // Datos para el gráfico de edades (RadarChart)
  const dataEdades = {
    labels: sectoresEdades,
    datasets: [{
      label: "Edad promedio por sector",
      data: promediosEdades,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "#36A2EB",
      borderWidth: 2,
      pointBackgroundColor: "#36A2EB",
      pointBorderColor: "#ffffff",
      pointHoverBackgroundColor: "#ffffff",
      pointHoverBorderColor: "#36A2EB"
    }]
  };


  // Opciones para gráficos de torta
  const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDarkMode ? '#d1d5db' : '#374151',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Distribución de Empleados por Sector',
        color: isDarkMode ? '#ffffff' : '#111827',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: isDarkMode ? '#ffffff' : '#111827',
        bodyColor: isDarkMode ? '#d1d5db' : '#374151',
        borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
        borderWidth: 1
      }
    }
  };

  // Opciones para gráficos de barras
  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: isDarkMode ? '#ffffff' : '#111827',
        bodyColor: isDarkMode ? '#d1d5db' : '#374151',
        borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? '#d1d5db' : '#374151'
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb'
        }
      },
      x: {
        ticks: {
          color: isDarkMode ? '#d1d5db' : '#374151'
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb'
        }
      }
    }
  };

  // Opciones para gráfico de radar
  const optionsRadar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: isDarkMode ? '#ffffff' : '#111827',
        bodyColor: isDarkMode ? '#d1d5db' : '#374151',
        borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? '#d1d5db' : '#374151',
          stepSize: 5
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb'
        },
        pointLabels: {
          color: isDarkMode ? '#d1d5db' : '#374151',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className={`p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Dashboard RRHH
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Análisis y visualización de datos de recursos humanos
          </p>
        </div>

        {/* Chart Container - Sectores */}
        <div className={`p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="h-96">
            <Pie data={dataSectores} options={optionsPie} />
          </div>
        </div>

        {/* Statistics Summary */}
        <details className={`group p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <summary className={`text-xl font-semibold cursor-pointer list-none flex items-center justify-between hover:opacity-80 transition-opacity duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span>Resumen por Sector</span>
            <svg 
              className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(sectores).map(([sector, cantidad], index) => (
              <div key={sector} className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: dataSectores.datasets[0].backgroundColor[index] }}
                  />
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {sector}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {cantidad} empleado{cantidad !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Chart Container - Estados */}
        <div className={`p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Cantidad de Empleados por Estado
          </h3>
          <div className="h-96">
            <Bar data={dataEstados} options={optionsBar} />
          </div>
        </div>

        {/* Resumen Estados */}
        <details className={`group p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <summary className={`text-xl font-semibold cursor-pointer list-none flex items-center justify-between hover:opacity-80 transition-opacity duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span>Resumen por Estado</span>
            <svg 
              className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(estados).map(([estado, cantidad]) => (
              <div key={estado} className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#36A2EB" }}
                  />
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {estado}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {cantidad} empleado{cantidad !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Chart Container - Licencias */}
        <div className={`p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Cantidad de Licencias por Tipo
          </h3>
          <div className="h-96">
            <Bar data={dataLicencias} options={optionsBar} />
          </div>
        </div>

        {/* Resumen Licencias */}
        <details className={`group p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <summary className={`text-xl font-semibold cursor-pointer list-none flex items-center justify-between hover:opacity-80 transition-opacity duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span>Resumen de Licencias por Tipo</span>
            <svg 
              className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(licencias).map(([tipo, cantidad]) => (
              <div key={tipo} className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#FFCE56" }}
                  />
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {tipo}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {cantidad} licencia{cantidad !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Chart Container - Edades */}
        <div className={`p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Edad Promedio por Sector
          </h3>
          <div className="h-96">
            <Radar data={dataEdades} options={optionsRadar} />
          </div>
        </div>

        {/* Resumen Edades */}
        <details className={`group p-6 rounded-xl border transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <summary className={`text-xl font-semibold cursor-pointer list-none flex items-center justify-between hover:opacity-80 transition-opacity duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span>Resumen de Edad Promedio por Sector</span>
            <svg 
              className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectoresEdades.map((sector, index) => (
              <div key={sector} className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#36A2EB" }}
                  />
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {sector}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {promediosEdades[index].toFixed(1)} años promedio
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>

      </div>
    </div>
  );
};

export default DashboardRRHH;
