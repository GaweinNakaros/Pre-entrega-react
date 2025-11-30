# Proyecto React (Vite)

Aplicación de catálogo con autenticación (invitado/admin), carrito de compras, CRUD de productos (solo admin), búsqueda reactiva y paginación. Incluye SEO por página (Helmet), notificaciones no bloqueantes (Toastify), y un tema centralizado (styled-components).

## Requisitos

- Node.js 18+ (recomendado LTS)
- npm 9+

## Instalación

En PowerShell (Windows):

```powershell
# Instalar dependencias (usa legacy-peer-deps por compatibilidad con React 19)
npm install --legacy-peer-deps
```

Si encuentras errores de dependencias, elimina `node_modules` y repite la instalación:

```powershell
rm -r -Force node_modules; rm -Force package-lock.json; npm install --legacy-peer-deps
```

## Desarrollo (modo HMR)

```powershell
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

## Build y Preview

```powershell
npm run build
npm run preview
```

`preview` sirve los archivos de producción para ver el build localmente.

## Uso rápido

- Inicio de sesión:
	- Invitado: ingresa cualquier email válido y accede sin contraseña.
	- Admin: usa el email preconfigurado `admin@gmail.com.ar` y la contraseña definida en `AuthContext`.
- Navegación:
	- Catálogo: `/productos` (búsqueda por nombre/categoría y paginación).
	- Detalle de producto: `/productos/:id`.
	- Carrito: `/carrito` (modificar cantidades, eliminar, proceder a compra).
	- Pago: `/pago` (ruta protegida; requiere sesión).
	- Administración: `/admin/productos` (solo admin; CRUD de productos).

## Funcionalidades clave

- Búsqueda reactiva: input en `/productos` sincroniza con `?q=` y filtra por nombre/categoría.
- Paginación: `?page=` controla la página actual; 8 productos por página.
- SEO: títulos y descripciones por página con `react-helmet-async`.
- Notificaciones: `react-toastify` para feedback (agregar al carrito, CRUD, pago).
- Tema y estilos globales: `ThemeProvider` + `GlobalStyle` (styled-components).

## Scripts disponibles

- `npm run dev`: arranca el servidor de desarrollo.
- `npm run build`: genera el build de producción.
- `npm run preview`: sirve el build generado.
- `npm run lint`: ejecuta ESLint.

## Notas de accesibilidad

- Se usan `aria-label`, `role="main"` y `aria-labelledby` en páginas y controles.
- Iconos con `react-icons` marcados como decorativos (`aria-hidden`) y enlaces/botones con texto accesible.

## Estructura (resumen)

- `src/pages`: vistas (Inicio, Servicios, Productos, Detalle, Carrito, Pago, Admin, Navbar).
- `src/context`: contextos (Auth, Carrito, Api, Categorías, etc.).
- `src/styles`: `theme.js` y `GlobalStyle.js`.

---

Para más detalles de dependencias, ver `README Dependencias.md`.
