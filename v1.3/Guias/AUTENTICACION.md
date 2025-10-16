#  Sistema de Autenticación y Rutas Protegidas

##  Descripción General

Implementamos un sistema de autenticación simple pero efectivo que protege la ruta de pago, requiriendo que los usuarios inicien sesión con su email antes de completar una compra.

##  Arquitectura

### Componentes Principales

1. **AuthContext** (`src/context/AuthContext.jsx`)
   - Gestiona el estado global de autenticación
   - Persiste la sesión en `localStorage`
   - Proporciona funciones: `iniciarSesion()`, `cerrarSesion()`, `estaAutenticado()`

2. **IniciarSesion** (`src/pages/IniciarSesion.jsx`)
   - Formulario de login con validación de email
   - Redirige al usuario a la ruta que intentaba acceder después del login
   - Validación de formato de email

3. **RutaProtegida** (`src/pages/RutaProtegida.jsx`)
   - Componente HOC (Higher Order Component)
   - Verifica autenticación antes de renderizar componentes hijos
   - Redirige a `/login` si el usuario no está autenticado

4. **Pago** (`src/pages/Pago.jsx`)
   - Página protegida que requiere autenticación
   - Formulario completo de datos de envío y pago
   - Resumen de la orden

## 🔄 Flujo de Usuario

```
1. Usuario agrega productos al carrito
2. Usuario hace clic en "Proceder a compra"
3. Sistema verifica autenticación
   ├─ ✅ Si está autenticado → Accede a la página de pago
   └─ ❌ Si NO está autenticado → Redirige a /login
4. Usuario ingresa su email en el formulario de login
5. Sistema valida el email y autentica al usuario
6. Usuario es redirigido a la página de pago
7. Usuario completa el formulario de pago
8. Se procesa la compra y se vacía el carrito
```

## 🎯 Características Implementadas

### ✅ Autenticación
- Login con email
- Validación de formato de email
- Persistencia de sesión en localStorage
- Cierre de sesión

### ✅ Rutas Protegidas
- Protección de la ruta `/pago`
- Redirección automática al login
- Preservación de la ruta destino
- Redirección después del login

### ✅ UI/UX
- Formularios con validación en tiempo real
- Mensajes de error claros
- Indicador de usuario en el navbar
- Estilos modernos y responsivos

## 📁 Archivos Creados/Modificados

### Archivos
```
src/context/AuthContext.jsx       - Contexto de autenticación
src/pages/IniciarSesion.jsx       - Página de login
src/pages/IniciarSesion.css       - Estilos del login
src/pages/Pago.jsx                - Página de pago protegida
src/pages/Pago.css                - Estilos de la página de pago
src/App.jsx                       - Agregado AuthProvider y rutas
src/pages/navbar.jsx              - Agregado indicador de usuario
src/pages/carrito_simple.jsx      - Modificado botón de compra
src/pages/RutaProtegida.jsx       - Actualizado para usar AuthContext
Estructura.txt                    - Documentación actualizada
AUTENTICACION.md                  - Esta documentación
```


