// ============================================
// 📚 EJEMPLOS DE USO - Sistema de Autenticación
// ============================================

// ================================================
// 1. USO DEL AUTHCONTEXT EN CUALQUIER COMPONENTE
// ================================================

import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { usuario, iniciarSesion, cerrarSesion, estaAutenticado } = useAuth();

  // Verificar si está autenticado
  if (estaAutenticado()) {
    console.log('Usuario autenticado:', usuario.email);
  }

  // Iniciar sesión
  const handleLogin = () => {
    iniciarSesion('usuario@ejemplo.com');
  };

  // Cerrar sesión
  const handleLogout = () => {
    cerrarSesion();
  };

  return (
    <div>
      {estaAutenticado() ? (
        <div>
          <p>Bienvenido, {usuario.email}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar Sesión</button>
      )}
    </div>
  );
}

// ================================================
// 2. PROTEGER UNA RUTA NUEVA
// ================================================

// En App.jsx, agrega una nueva ruta protegida:
import NuevaPaginaProtegida from './pages/NuevaPaginaProtegida';

<Route 
  path="/nueva-ruta-protegida" 
  element={
    <RutaProtegida>
      <NuevaPaginaProtegida />
    </RutaProtegida>
  } 
/>

// ================================================
// 3. ACCEDER A DATOS DEL USUARIO
// ================================================

function PerfilUsuario() {
  const { usuario } = useAuth();

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Email: {usuario?.email}</p>
      <p>Fecha de ingreso: {new Date(usuario?.fechaIngreso).toLocaleString()}</p>
    </div>
  );
}

// ================================================
// 4. MOSTRAR CONTENIDO CONDICIONAL
// ================================================

function Dashboard() {
  const { estaAutenticado, usuario } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      
      {estaAutenticado() ? (
        <div>
          <h2>Bienvenido, {usuario.email}</h2>
          <p>Aquí está tu contenido exclusivo...</p>
        </div>
      ) : (
        <div>
          <h2>Por favor, inicia sesión</h2>
          <Link to="/login">Ir a iniciar sesión</Link>
        </div>
      )}
    </div>
  );
}

// ================================================
// 5. REDIRIGIR DESPUÉS DE UNA ACCIÓN
// ================================================

import { useNavigate } from 'react-router-dom';

function ComprarProducto() {
  const navigate = useNavigate();
  const { estaAutenticado } = useAuth();

  const handleCompra = () => {
    if (!estaAutenticado()) {
      // Redirigir a login si no está autenticado
      navigate('/login', { state: { from: { pathname: '/pago' } } });
    } else {
      // Proceder con la compra
      navigate('/pago');
    }
  };

  return (
    <button onClick={handleCompra}>
      Comprar Ahora
    </button>
  );
}

// ================================================
// 6. VALIDACIÓN DE EMAIL PERSONALIZADA
// ================================================

function FormularioLogin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useAuth();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('El email es requerido');
      return;
    }
    
    if (!validarEmail(email)) {
      setError('Email inválido');
      return;
    }
    
    iniciarSesion(email);
    // Redirigir...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <span>{error}</span>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

// ================================================
// 7. COMBINAR CARRITO Y AUTENTICACIÓN
// ================================================

function BotonComprar() {
  const navigate = useNavigate();
  const { estaAutenticado } = useAuth();
  const { carrito, cantidadTotal } = useCarrito();

  const handleComprar = () => {
    // Verificar que hay productos
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Verificar autenticación
    if (!estaAutenticado()) {
      // Guardar la ruta actual para redirigir después del login
      navigate('/login', { state: { from: { pathname: '/pago' } } });
    } else {
      // Proceder al pago
      navigate('/pago');
    }
  };

  return (
    <button onClick={handleComprar}>
      Comprar ({cantidadTotal} productos)
    </button>
  );
}

// ================================================
// 8. MENSAJE DE BIENVENIDA DESPUÉS DEL LOGIN
// ================================================

function IniciarSesionConMensaje() {
  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    iniciarSesion(email);
    
    // Mostrar mensaje de bienvenida
    alert(`¡Bienvenido, ${email}!`);
    
    // Redirigir
    navigate('/');
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

// ================================================
// 9. CERRAR SESIÓN CON CONFIRMACIÓN
// ================================================

function BotonCerrarSesion() {
  const { cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      cerrarSesion();
      navigate('/');
      alert('Sesión cerrada exitosamente');
    }
  };

  return (
    <button onClick={handleCerrarSesion}>
      Cerrar Sesión
    </button>
  );
}

// ================================================
// 10. HOOK PERSONALIZADO PARA REQUIRE AUTH
// ================================================

// hooks/useRequireAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useRequireAuth() {
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!estaAutenticado()) {
      navigate('/login');
    }
  }, [estaAutenticado, navigate]);

  return estaAutenticado();
}

// Uso:
function PaginaProtegida() {
  const isAuth = useRequireAuth();

  if (!isAuth) {
    return <div>Cargando...</div>;
  }

  return <div>Contenido protegido</div>;
}

// ================================================
// 11. GUARD DE NAVEGACIÓN
// ================================================

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavigationGuard() {
  const { estaAutenticado } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Lista de rutas protegidas
    const rutasProtegidas = ['/pago', '/perfil', '/historial'];
    
    // Verificar si la ruta actual es protegida
    const esRutaProtegida = rutasProtegidas.some(ruta => 
      location.pathname.startsWith(ruta)
    );

    // Redirigir si no está autenticado
    if (esRutaProtegida && !estaAutenticado()) {
      navigate('/login', { state: { from: location } });
    }
  }, [location, estaAutenticado, navigate]);

  return null;
}

// Agregar en App.jsx:
<NavigationGuard />

// ================================================
// 12. PERSISTENCIA CON TIMEOUT
// ================================================

// Extensión del AuthContext con timeout de sesión
export const AuthProviderConTimeout = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const TIMEOUT = 30 * 60 * 1000; // 30 minutos

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const data = JSON.parse(usuarioGuardado);
      const ahora = new Date().getTime();
      const fechaIngreso = new Date(data.fechaIngreso).getTime();
      
      // Verificar si la sesión ha expirado
      if (ahora - fechaIngreso < TIMEOUT) {
        setUsuario(data);
      } else {
        localStorage.removeItem('usuario');
      }
    }
  }, []);

  // ... resto del código
};

// ================================================
// FIN DE EJEMPLOS
// ================================================
