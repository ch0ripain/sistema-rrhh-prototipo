# Sistema RRHH - Prototipo

Un sistema de gestión de recursos humanos desarrollado con React, TypeScript, Vite y TailwindCSS.

## 🚀 Características

- **Diseño moderno**: Interfaz simple con tema claro/oscuro
- **Responsive**: Optimizado para desktop y mobile
- **Filtrado avanzado**: Búsqueda de empleados con múltiples criterios
- **Paginación**: Configurable (5, 10 o todos los empleados)
- **Animaciones suaves**: Transiciones y efectos visuales
- **Datos simulados**: 20 empleados de ejemplo para pruebas
- **CRUD de empleados**: Crear, editar y eliminar empleados
- **Notificaciones**: Sistema de notificaciones con Sonner
- **Tabla interactiva**: Vista en tabla con acciones por fila
- **Modales**: Formularios modernos para gestión de empleados
- **Legajo digital completo**: Sistema completo de expediente de empleado

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework de estilos
- **Lucide React** - Iconografía
- **Sonner** - Sistema de notificaciones
- **pnpm** - Gestor de paquetes

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Barra de navegación superior
│   ├── Sidebar.tsx     # Barra lateral con menús
│   ├── EmployeeView.tsx # Vista principal de empleados
│   ├── EmployeeModal.tsx # Modal para crear/editar empleados
│   ├── DeleteConfirmModal.tsx # Modal de confirmación de eliminación
│   └── EmployeeRecordModal.tsx # Modal del legajo completo de empleado
├── data/               # Datos estáticos
│   └── employees.ts    # 20 empleados de ejemplo
├── types/              # Definiciones de TypeScript
│   └── index.ts        # Interfaces y tipos
├── App.tsx             # Componente principal
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎨 Funcionalidades Implementadas

### Header
- Logo "Prototipo RRHH" con breadcrumb de navegación
- Breadcrumb: "Recursos Humanos > Consultar empleado"
- Botón de notificaciones con dropdown
- Botón de inicio
- Menú de usuario con avatar
- Opciones de cambio de tema y cerrar sesión

### Sidebar
- Menús colapsables:
  - **General**: Mi perfil, Mis solicitudes, Mis licencias
  - **Recursos Humanos**: Consultar empleado (implementado)
  - **Dashboards**: Dashboards de RRHH
  - **Guía de uso**: Tutoriales
- Responsive: Se oculta en mobile y se muestra al hacer clic en el avatar
- Diseño limpio sin título redundante

### Vista Principal
- **Información del usuario**: Datos del usuario logueado con botón "Ver más"
- **Legajo completo**: Modal con información completa del empleado por secciones
- **Formulario de filtros**: 12 campos de búsqueda con dropdowns inteligentes
- **Filtros dinámicos**: Sector, Rol y Cargo con opciones basadas en datos existentes
- **Tabla de empleados**: Vista en tabla con información organizada
- **Paginación**: Configurable (5, 10, todos)
- **Estados**: Activo/Inactivo con indicadores visuales
- **Acciones por empleado**: Editar y eliminar con iconos
- **Botón nuevo empleado**: Crear empleados desde la interfaz

## 🎯 Campos de Búsqueda

- Nombre y Apellido (texto libre)
- DNI (texto libre)
- N° Celular y Corporativo (texto libre)
- Correos personal e institucional (texto libre)
- **Sector** (dropdown con valores únicos de empleados)
- **Rol** (dropdown con valores únicos de empleados)
- **Cargo** (dropdown con valores únicos de empleados)
- Fechas de ingreso y egreso (selector de fecha)
- Estado (Activo/Inactivo)

## 🚀 Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   pnpm dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:5173
   ```

4. **Construir para producción**:
   ```bash
   pnpm build
   ```

## 🎨 Personalización

### Cambio de Tema
- Click en el avatar del usuario
- Seleccionar "Cambiar tema"
- Alterna entre modo claro y oscuro

### Filtros
- Todos los campos son opcionales
- Por defecto muestra todos los empleados
- Botón "Filtrar" para aplicar criterios
- Botón "Limpiar" para resetear filtros

### Paginación
- Selector en el formulario de filtros
- Opciones: 5, 10 empleados o todos
- Navegación con botones anterior/siguiente
- Indicador de resultados actuales

## 📱 Responsive Design

- **Desktop**: Sidebar fija visible
- **Tablet**: Sidebar colapsable
- **Mobile**: Sidebar oculta, se activa desde el avatar

## 🔄 Animaciones

- Transiciones suaves en hover
- Spinner de carga (1-2 segundos)
- Slide de la sidebar
- Fade in/out en dropdowns
- Animaciones CSS personalizadas

## 📊 Datos de Prueba

El sistema incluye 20 empleados de ejemplo con:
- Información personal completa
- Datos laborales variados
- Diferentes sectores y roles
- Estados activos e inactivos
- Fechas de ingreso y egreso

## 🆕 Nuevas Funcionalidades

### Sistema de Legajo Digital
- **Legajo completo**: Información exhaustiva del empleado organizada por secciones
- **8 secciones principales**: Datos personales, familiares, laborales, documentación, evaluaciones, capacitaciones, licencias e historial
- **Secciones colapsables**: Interfaz intuitiva con expansión/colapso
- **Información detallada**: Desde datos básicos hasta historial completo de cambios
- **Cumplimiento legal**: Estructura basada en definición oficial de legajo de RRHH

### Gestión de Empleados
- **Crear empleado**: Modal con formulario completo
- **Editar empleado**: Modal pre-poblado con datos existentes
- **Eliminar empleado**: Modal de confirmación (marca como inactivo)
- **Ver legajo**: Acceso completo al expediente del empleado
- **Notificaciones**: Feedback visual con Sonner

### Interfaz Mejorada
- **Vista en tabla**: Información organizada en columnas
- **Botones modernos**: Gradientes y efectos hover
- **Iconos de acción**: Editar (lápiz) y eliminar (papelera)
- **Formularios avanzados**: Validación y campos organizados
- **Breadcrumb de navegación**: Muestra ubicación actual
- **Filtros inteligentes**: Dropdowns con datos dinámicos
- **Sidebar optimizada**: Menú personal más relevante
- **Modal de legajo**: Interfaz moderna para visualizar información completa

### Experiencia de Usuario
- **Feedback inmediato**: Notificaciones de éxito/error
- **Animaciones suaves**: Transiciones y efectos visuales
- **Responsive**: Funciona perfectamente en mobile
- **Tema adaptativo**: Notificaciones se adaptan al tema

## 🚀 Optimizaciones de Performance y SEO

### SEO Implementado
- **Meta tags optimizados**: Título, descripción, keywords
- **Open Graph**: Tags para redes sociales (Facebook, LinkedIn)
- **Twitter Cards**: Soporte para Twitter
- **Robots.txt**: Configuración para crawlers
- **Sitemap.xml**: Mapa del sitio
- **Manifest.json**: PWA básico
- **Semantic HTML**: Estructura semántica correcta

### Performance
- **Build optimizado**: Terser minification, chunk splitting
- **Lazy loading**: Componentes OptimizedImage con loading states
- **Preconnect**: Conexiones precargadas para fuentes
- **Font display swap**: Mejor rendimiento de carga de fuentes
- **Compresión gzip**: Assets comprimidos (~78 kB total)
- **Accessibility**: Soporte para `prefers-reduced-motion`
