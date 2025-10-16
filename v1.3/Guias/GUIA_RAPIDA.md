#  Guía Rápida - Sistema de Autenticación

##  Para Probar el Sistema

1. **Inicia el servidor de desarrollo:**
   ```bash
   cd v1.3
   npm run dev
   ```

2. **Flujo de prueba:**
   - Ve a http://localhost:5173/productos
   - Agrega productos al carrito
   - Haz clic en "Carrito" en el navbar
   - Haz clic en "Proceder a compra"
   - Serás redirigido a /login (si no estás autenticado)
   - Ingresa un email válido (ej: usuario@email.com)
   - Serás redirigido automáticamente a /pago
   - Completa el formulario y confirma la compra

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO DE COMPRA                          │
└─────────────────────────────────────────────────────────────┘

    [Productos] 
        │
        ▼ (agregar al carrito)
    [Carrito]
        │
        ▼ (clic en "Proceder a compra")
        │
    ┌───┴───┐
    │       │
¿Autenticado?
    │       │
    ├─NO──►[Login] ──► [Pago] ──► [Confirmación]
    │                    │
    └─SÍ─────────────────┘

```

## 🔑 Componentes Clave

### 1. AuthContext
```jsx
// Uso en cualquier componente
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { usuario, iniciarSesion, cerrarSesion, estaAutenticado } = useAuth();
  
  // usuario: { email, fechaIngreso }
  // iniciarSesion(email): Autentica al usuario
  // cerrarSesion(): Cierra la sesión
  // estaAutenticado(): true/false
}
```

### 2. Proteger una Ruta
```jsx
// En App.jsx
<Route 
  path="/ruta-protegida" 
  element={
    <RutaProtegida>
      <MiComponenteProtegido />
    </RutaProtegida>
  } 
/>
```

### 3. Navbar con Autenticación
```jsx
// Muestra el email del usuario si está autenticado
// Botón de "Cerrar Sesión" si está autenticado
// Link "Iniciar Sesión" si NO está autenticado
```

## 📝 Validaciones

### Email (Login)
- ✅ Formato válido: usuario@dominio.com
- ❌ No puede estar vacío
- ❌ Debe tener @ y dominio válido

### Formulario de Pago
- ✅ Nombre completo: requerido
- ✅ Dirección: requerida
- ✅ Ciudad: requerida
- ✅ Código postal: requerido
- ✅ Teléfono: 10 dígitos
- ✅ Método de pago: selección

##  Estados Visuales

### Usuario NO autenticado
```
Navbar: [Inicio] [Productos] [Servicios] [Carrito] [Iniciar Sesión]
```

### Usuario autenticado
```
Navbar: [Inicio] [Productos] [Servicios] [Carrito] [👤 usuario@email.com] [Cerrar Sesión]
```

## Persistencia

- La sesión se guarda en `localStorage`
- Persiste entre recargas de página
- Se limpia al cerrar sesión
- Key: `"usuario"`

##  Redirecciones

### Escenario 1: Usuario intenta acceder a /pago sin autenticación
```
/pago → detecta no autenticado → /login → usuario ingresa email → /pago
```

### Escenario 2: Usuario va directamente a /login
```
/login → usuario ingresa email → / (home)
```

##  Guia de Archivos 

```
v1.3/
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx       ← Estado de autenticación
│   │   └── CarritoContext.jsx    ← Estado del carrito
│   ├── pages/
│   │   ├── App.jsx               ← Rutas y providers
│   │   ├── IniciarSesion.jsx     ← Formulario de login
│   │   ├── Pago.jsx              ← Página protegida
│   │   ├── RutaProtegida.jsx     ← HOC para protección
│   │   ├── navbar.jsx            ← Con indicador de sesión
│   │   └── carrito_simple.jsx    ← Redirige a pago
│   └── ...
└── AUTENTICACION.md              ← Documentación completa

src/
├── context/
│   ├── CarritoContext.jsx ← 🎯 TODA la lógica del carrito
│   └── AuthContext.jsx ← 🎯 TODA la lógica de autenticación
├── pages/
│   ├── App.jsx ← 🎯 Solo gestión y enrutamiento (incluye rutas protegidas)
│   ├── productos.jsx ← Usa el contexto del carrito
│   ├── productoDetalle.jsx ← Usa el contexto del carrito
│   ├── carrito_simple.jsx ← Usa el contexto del carrito y redirige a pago
│   ├── navbar.jsx ← Usa el contexto del carrito y autenticación
│   ├── IniciarSesion.jsx ← 🔒 Página de login con validación de email
│   ├── Pago.jsx ← 🔒 Página protegida de pago (requiere autenticación)
│   └── RutaProtegida.jsx ← 🔒 Componente HOC para proteger rutas

```