# README Dependencias - Pre-entrega React

Registro y documentación de dependencias para el proyecto React con múltiples versiones desarrollado con Vite, React Router y ESLint.

## 📋 Descripción

Este documento centraliza toda la información sobre dependencias del proyecto que contiene múltiples versiones de una aplicación React:
- **v1.0**: Versión inicial con todas las dependencias configuradas
- **v1.2**: Versión actualizada (requiere instalación de dependencias faltantes)
- **Futuras versiones**: Registro de dependencias por versión

La aplicación incluye:
- Página de inicio
- Catálogo de productos
- Página de servicios
- Detalles de productos individuales
- Navegación entre páginas con React Router

## 🚀 Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de interfaz de usuario
- **React DOM 19.1.1** - Renderizado de React en el navegador
- **React Router DOM** - Enrutamiento para aplicaciones React
- **Vite** - Herramienta de construcción y desarrollo
- **ESLint** - Linter para mantener calidad del código

## � Registro de Dependencias por Versión

### 🗂️ Template Base para Nuevas Versiones
Cuando crees una nueva versión, usa este checklist:

```bash
# 1. Crear directorio de nueva versión
mkdir v[NUMERO_VERSION]
cd v[NUMERO_VERSION]

# 2. Copiar estructura base
# (copiar archivos de versión anterior)

# 3. Instalar dependencias base obligatorias
npm install react@^19.1.1 react-dom@^19.1.1
npm install react-router-dom@^7.9.3

# 4. Instalar dependencias de desarrollo
npm install --save-dev @vitejs/plugin-react@^5.0.4
npm install --save-dev vite@^7.1.7
npm install --save-dev eslint@^9.36.0
npm install --save-dev @eslint/js@^9.36.0
npm install --save-dev eslint-plugin-react-hooks@^5.2.0
npm install --save-dev eslint-plugin-react-refresh@^0.4.22
npm install --save-dev @types/react@^19.1.16
npm install --save-dev @types/react-dom@^19.1.9
npm install --save-dev globals@^16.4.0

# 5. Verificar que package.json tenga scripts
npm run dev  # Para probar
```

### 📋 Historial de Versiones

#### **v1.0** ✅ COMPLETA
**Estado**: Todas las dependencias instaladas correctamente
**Dependencias de Producción**:
- react@^19.1.1
- react-dom@^19.1.1
- react-router-dom@^7.9.3

**Dependencias de Desarrollo**:
- @eslint/js@^9.36.0
- @types/react@^19.1.13
- @types/react-dom@^19.1.9
- @vitejs/plugin-react@^5.0.3
- eslint@^9.36.0
- eslint-plugin-react-hooks@^5.2.0
- eslint-plugin-react-refresh@^0.4.20
- globals@^16.4.0
- vite@^7.1.7

#### **v1.2** ⚠️ DEPENDENCIA FALTANTE
**Estado**: Requiere instalación manual
**Problema**: Falta `react-router-dom` en package.json
**Solución**:
```bash
cd v1.2
npm install react-router-dom@^7.9.3
```

**Dependencias Actuales**:
- react@^19.1.1
- react-dom@^19.1.1
- ❌ **FALTA**: react-router-dom@^7.9.3

**Dependencias de Desarrollo Actualizadas**:
- @types/react@^19.1.16 (actualizado desde 19.1.13)
- @vitejs/plugin-react@^5.0.4 (actualizado desde 5.0.3)
- eslint-plugin-react-refresh@^0.4.22 (actualizado desde 0.4.20)

#### **v[PRÓXIMA]** 📋 PLANTILLA
**Estado**: [PENDIENTE/EN DESARROLLO/COMPLETA]
**Cambios respecto a versión anterior**:
- [ ] Dependencias agregadas:
- [ ] Dependencias actualizadas:
- [ ] Dependencias removidas:
- [ ] Problemas conocidos:

## 🔧 Comandos de Instalación Rápida

### Instalación Completa v1.0
```bash
cd v1.0
npm install
# Ya tiene todas las dependencias
```

### Instalación Completa v1.2 (con dependencia faltante)
```bash
cd v1.2
npm install
npm install react-router-dom@^7.9.3  # OBLIGATORIO
```

### Instalación desde Cero (Nueva Versión)
```bash
# Dependencias de producción
npm install react@^19.1.1 react-dom@^19.1.1 react-router-dom@^7.9.3

# Dependencias de desarrollo en una línea
npm install --save-dev @vitejs/plugin-react@^5.0.4 vite@^7.1.7 eslint@^9.36.0 @eslint/js@^9.36.0 eslint-plugin-react-hooks@^5.2.0 eslint-plugin-react-refresh@^0.4.22 @types/react@^19.1.16 @types/react-dom@^19.1.9 globals@^16.4.0
```

## 📦 Dependencias Detalladas

### 📦 Dependencias de Producción (OBLIGATORIAS)
```json
{
  "react": "^19.1.1",           // Biblioteca principal de React
  "react-dom": "^19.1.1",      // Renderizado en navegador  
  "react-router-dom": "^7.9.3"  // Enrutamiento (CRÍTICA)
}
```

### 🛠️ Dependencias de Desarrollo
### 🛠️ Dependencias de Desarrollo
```json
{
  "@eslint/js": "^9.36.0",                    // Configuración base ESLint
  "@types/react": "^19.1.13-19.1.16",        // Tipos TypeScript para React
  "@types/react-dom": "^19.1.9",             // Tipos TypeScript para React DOM
  "@vitejs/plugin-react": "^5.0.3-5.0.4",   // Plugin Vite para React
  "eslint": "^9.36.0",                       // Linter JavaScript/TypeScript
  "eslint-plugin-react-hooks": "^5.2.0",     // Reglas ESLint para hooks
  "eslint-plugin-react-refresh": "^0.4.20-0.4.22", // Hot reload para React
  "globals": "^16.4.0",                      // Variables globales para ESLint
  "vite": "^7.1.7"                          // Herramienta de construcción
}
```

## 🚨 Checklist de Validación para Nuevas Versiones

Antes de considerar una versión como completa, verifica:

### ✅ Dependencias Críticas
- [ ] `react` instalado y funcional
- [ ] `react-dom` instalado y funcional  
- [ ] `react-router-dom` instalado (CRÍTICO para navegación)
- [ ] `vite` configurado correctamente
- [ ] Todos los imports del código funcionan sin errores

### ✅ Scripts Funcionales
- [ ] `npm run dev` inicia servidor de desarrollo
- [ ] `npm run build` construye sin errores
- [ ] `npm run lint` ejecuta sin problemas
- [ ] `npm run preview` muestra build de producción

### ✅ Funcionalidad de la App
- [ ] Navegación entre páginas funciona
- [ ] Componentes se renderizan correctamente
- [ ] No hay errores en consola del navegador
- [ ] Hot reload funciona en desarrollo

## 📋 Log de Problemas Conocidos

### v1.2 - Octubre 2025
**Problema**: `react-router-dom` faltante en package.json
**Síntomas**: Error de importación en componentes que usan routing
**Solución**: `npm install react-router-dom@^7.9.3`
**Estado**: ⚠️ Pendiente de corregir

### Plantilla para Futuros Problemas
**Problema**: [Descripción del problema]
**Síntomas**: [Cómo se manifiesta el error]
**Solución**: [Comandos o pasos para solucionarlo]
**Estado**: [🔴 Crítico / ⚠️ Pendiente / ✅ Resuelto]

## ⚠️ Dependencias Faltantes

### En la versión v1.2:
La versión v1.2 **requiere** instalar `react-router-dom` ya que el código hace uso de esta biblioteca para el enrutamiento, pero no está declarada en el `package.json`.

```bash
cd v1.2
npm install react-router-dom@^7.9.3
```

## 🛠️ Instalación

### Para la versión v1.0:
```bash
cd v1.0
npm install
```

### Para la versión v1.2:
```bash
cd v1.2
npm install
npm install react-router-dom@^7.9.3
```

## 🎯 Scripts Disponibles

En cualquiera de las versiones, puedes ejecutar:

- **`npm run dev`** - Inicia el servidor de desarrollo
- **`npm run build`** - Construye la aplicación para producción
- **`npm run lint`** - Ejecuta ESLint para revisar el código
- **`npm run preview`** - Previsualiza la construcción de producción

## 🌐 Uso

1. Instala las dependencias según la versión que quieras usar
2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre tu navegador en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
Pre-entrega-react/
├── README.md                    # ← Este archivo (Dependencias)
├── v1.0/                       # Versión 1.0 (COMPLETA)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── inicio.jsx
│   │   │   ├── navbar.jsx
│   │   │   ├── productos.jsx
│   │   │   ├── productoDetalle.jsx
│   │   │   └── servicios.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json            # Con todas las dependencias
│   └── vite.config.js
├── v1.2/                       # Versión 1.2 (REQUIERE INSTALACIÓN)
│   ├── src/                    # [misma estructura que v1.0]
│   ├── package.json            # ⚠️ Falta react-router-dom
│   └── vite.config.js
└── v[FUTURA]/                  # Plantilla para nuevas versiones
    ├── package.json            # Usar checklist de arriba
    └── ...
```

## 🚨 Notas Importantes

- **React Router DOM** es esencial para el funcionamiento de la aplicación ya que maneja toda la navegación
- La versión v1.2 tiene tipos de React más actualizados
- Ambas versiones usan React 19.1.1 (versión más reciente)
- Se recomienda usar Node.js 18+ para compatibilidad con Vite 7

## 🔧 Solución de Problemas

Si encuentras errores relacionados con el enrutamiento:
1. Verifica que `react-router-dom` esté instalado
2. Asegúrate de que la versión sea compatible (^7.9.3)
3. Reinicia el servidor de desarrollo después de instalar dependencias

## 📄 Licencia

Este proyecto es privado y está destinado para fines educativos.