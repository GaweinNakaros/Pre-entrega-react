// ============================================
// 📚 GLOSARIO DE CONCEPTOS Y SINTAXIS DE REACT
// ============================================

// ============================================
// 1. HOOKS DE REACT
// ============================================

/**
 * HOOKS: Funciones especiales que permiten "engancharse" a características de React
 * Siempre empiezan con "use" (useState, useEffect, useContext, etc.)
 * Solo se pueden usar dentro de componentes funcionales
 */

// ----------------------------------------
// useState
// ----------------------------------------
/**
 * Maneja estado local en un componente
 * Retorna un array con 2 elementos: [valorActual, funcionParaActualizarlo]
 */
import { useState } from 'react';

function Ejemplo1() {
  // Sintaxis de destructuring de arrays
  const [contador, setContador] = useState(0);
  //     ↑          ↑                        ↑
  //   valor     función               valor inicial
  //  actual   actualizadora
  
  // Para actualizar el estado:
  setContador(contador + 1); // Nuevo valor directamente
  
  // O con función (cuando el nuevo valor depende del anterior):
  setContador(prevContador => prevContador + 1);
}

// ----------------------------------------
// useEffect
// ----------------------------------------
/**
 * Ejecuta código después de que el componente se renderiza
 * Útil para efectos secundarios: APIs, suscripciones, timers, etc.
 */
import { useEffect } from 'react';

function Ejemplo2() {
  useEffect(() => {
    // Código que se ejecuta después del renderizado
    console.log('Componente montado o actualizado');
    
    // Función de limpieza (opcional)
    return () => {
      console.log('Componente desmontado o antes de siguiente efecto');
    };
  }, []); // Array de dependencias
  //   ↑
  // [] vacío = solo se ejecuta al montar
  // [variable] = se ejecuta cuando 'variable' cambia
  // sin array = se ejecuta después de cada renderizado
}

// ----------------------------------------
// useContext
// ----------------------------------------
/**
 * Accede al valor de un contexto sin usar Consumer
 * Simplifica el acceso a datos compartidos globalmente
 */
import { useContext } from 'react';

const MiContexto = React.createContext();

function Ejemplo3() {
  const valor = useContext(MiContexto);
  // 'valor' contiene lo que se pasó en <MiContexto.Provider value={...}>
}

// ----------------------------------------
// useNavigate (de react-router-dom)
// ----------------------------------------
/**
 * Permite navegar programáticamente entre rutas
 * Es el reemplazo moderno de history.push()
 */
import { useNavigate } from 'react-router-dom';

function Ejemplo4() {
  const navigate = useNavigate();
  
  const irAOtraPagina = () => {
    navigate('/otra-ruta');
    // navigate(-1); // Volver atrás
    // navigate('/ruta', { replace: true }); // Reemplazar en historial
  };
}

// ----------------------------------------
// useLocation (de react-router-dom)
// ----------------------------------------
/**
 * Devuelve el objeto location actual
 * Útil para saber en qué ruta estamos o qué parámetros hay
 */
import { useLocation } from 'react-router-dom';

function Ejemplo5() {
  const location = useLocation();
  // location.pathname = '/productos'
  // location.search = '?id=123'
  // location.state = datos pasados en navigate('/ruta', { state: {...} })
}

// ============================================
// 2. CONTEXT API
// ============================================

/**
 * Context permite pasar datos a través del árbol de componentes
 * sin tener que pasar props manualmente en cada nivel
 */

// ----------------------------------------
// Crear un Context
// ----------------------------------------
import { createContext } from 'react';

// Crear el contexto
const MiContexto = createContext();

// ----------------------------------------
// Provider: Provee el valor del contexto
// ----------------------------------------
function MiProvider({ children }) {
  const [datos, setDatos] = useState('valor inicial');
  
  return (
    <MiContexto.Provider value={{ datos, setDatos }}>
      {children}
    </MiContexto.Provider>
  );
}

// ----------------------------------------
// Consumer: Consume el valor del contexto
// ----------------------------------------
function ComponenteHijo() {
  const { datos, setDatos } = useContext(MiContexto);
  return <div>{datos}</div>;
}

// ============================================
// 3. DESTRUCTURING (DESESTRUCTURACIÓN)
// ============================================

/**
 * Sintaxis para extraer valores de objetos y arrays
 */

// ----------------------------------------
// Destructuring de Objetos
// ----------------------------------------
const persona = {
  nombre: 'Juan',
  edad: 25,
  ciudad: 'Madrid'
};

// Sin destructuring:
const nombre = persona.nombre;
const edad = persona.edad;

// Con destructuring:
const { nombre, edad } = persona;
// Crea dos variables: nombre = 'Juan', edad = 25

// Con renombre:
const { nombre: nombreCompleto } = persona;
// Crea variable: nombreCompleto = 'Juan'

// ----------------------------------------
// Destructuring de Arrays
// ----------------------------------------
const numeros = [1, 2, 3, 4, 5];

// Sin destructuring:
const primero = numeros[0];
const segundo = numeros[1];

// Con destructuring:
const [primero, segundo] = numeros;
// Crea dos variables: primero = 1, segundo = 2

// Con useState:
const [valor, setValor] = useState(0);
//     ↑       ↑
//  posición 0  posición 1 del array retornado

// ============================================
// 4. SPREAD OPERATOR (...)
// ============================================

/**
 * Expande elementos de un iterable (array u objeto)
 */

// ----------------------------------------
// Con Arrays
// ----------------------------------------
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combinar arrays:
const combinado = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Copiar array:
const copia = [...arr1];
// [1, 2, 3] (nuevo array)

// ----------------------------------------
// Con Objetos
// ----------------------------------------
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Combinar objetos:
const combinadoObj = { ...obj1, ...obj2 };
// { a: 1, b: 2, c: 3, d: 4 }

// Copiar y modificar:
const modificado = { ...obj1, b: 10 };
// { a: 1, b: 10 } (b se sobrescribe)

// Uso en setState:
setFormData(prev => ({
  ...prev,      // Copia todas las propiedades existentes
  nombre: 'Juan' // Sobrescribe/agrega 'nombre'
}));

// ============================================
// 5. ARROW FUNCTIONS (FUNCIONES FLECHA)
// ============================================

/**
 * Sintaxis moderna para definir funciones
 */

// ----------------------------------------
// Sintaxis Básica
// ----------------------------------------

// Función tradicional:
function sumar(a, b) {
  return a + b;
}

// Arrow function:
const sumar = (a, b) => {
  return a + b;
};

// Arrow function (retorno implícito):
const sumar = (a, b) => a + b;
// Si solo hay una expresión, se puede omitir return y {}

// Un solo parámetro (sin paréntesis):
const duplicar = x => x * 2;

// Sin parámetros:
const saludar = () => console.log('Hola');

// ----------------------------------------
// En Eventos
// ----------------------------------------
<button onClick={() => console.log('Click')}>
  Click me
</button>

// Con parámetro:
<button onClick={() => eliminarProducto(id)}>
  Eliminar
</button>

// ============================================
// 6. TEMPLATE LITERALS (PLANTILLAS DE TEXTO)
// ============================================

/**
 * Strings con backticks (`) que permiten interpolar variables
 */

// Sintaxis tradicional:
const nombre = 'Juan';
const mensaje = 'Hola, ' + nombre + '!';

// Con template literals:
const mensaje = `Hola, ${nombre}!`;

// Multilínea:
const html = `
  <div>
    <h1>${titulo}</h1>
    <p>${descripcion}</p>
  </div>
`;

// Expresiones:
const total = `El total es: $${precio * cantidad}`;

// ============================================
// 7. OPERADORES LÓGICOS PARA RENDERIZADO
// ============================================

// ----------------------------------------
// Operador && (AND)
// ----------------------------------------
/**
 * Si la izquierda es truthy, evalúa y retorna la derecha
 * Si la izquierda es falsy, retorna la izquierda (no evalúa la derecha)
 */

// En renderizado:
{usuario && <p>Bienvenido, {usuario.nombre}</p>}
// Si usuario existe (truthy), muestra el <p>
// Si usuario es null/undefined (falsy), no muestra nada

{count > 0 && <span>({count})</span>}
// Solo muestra el span si count es mayor a 0

// ----------------------------------------
// Operador || (OR)
// ----------------------------------------
/**
 * Si la izquierda es truthy, retorna la izquierda
 * Si la izquierda es falsy, evalúa y retorna la derecha
 */

// Valores por defecto:
const cantidad = item.cantidad || 1;
// Si cantidad es 0, null, undefined, '', usa 1

const nombre = usuario.nombre || 'Anónimo';
// Si no hay nombre, usa 'Anónimo'

// ----------------------------------------
// Operador Ternario (? :)
// ----------------------------------------
/**
 * condicion ? siTrue : siFalse
 * Es como un if-else en una sola línea
 */

// En variables:
const mensaje = edad >= 18 ? 'Mayor de edad' : 'Menor de edad';

// En renderizado:
{carrito.length === 0 ? (
  <p>Carrito vacío</p>
) : (
  <ListaProductos />
)}

// ----------------------------------------
// Optional Chaining (?.)
// ----------------------------------------
/**
 * Acceso seguro a propiedades anidadas
 * Si algo es null/undefined, retorna undefined sin error
 */

// Sin optional chaining (puede dar error):
const email = usuario.contacto.email; // Error si contacto es undefined

// Con optional chaining (seguro):
const email = usuario?.contacto?.email;
// Si usuario o contacto son null/undefined, email = undefined (sin error)

// Con llamadas a funciones:
usuario?.saludar?.();
// Solo llama a saludar() si usuario y saludar existen

// ============================================
// 8. ARRAY METHODS (MÉTODOS DE ARRAYS)
// ============================================

// ----------------------------------------
// map()
// ----------------------------------------
/**
 * Transforma cada elemento del array y retorna un nuevo array
 * No modifica el array original
 */

const numeros = [1, 2, 3, 4];
const duplicados = numeros.map(num => num * 2);
// [2, 4, 6, 8]

// En React (renderizar listas):
{productos.map(producto => (
  <div key={producto.id}>
    {producto.nombre}
  </div>
))}

// ----------------------------------------
// filter()
// ----------------------------------------
/**
 * Filtra elementos que cumplan una condición
 * Retorna un nuevo array con los elementos que pasen el test
 */

const numeros = [1, 2, 3, 4, 5, 6];
const pares = numeros.filter(num => num % 2 === 0);
// [2, 4, 6]

// ----------------------------------------
// find()
// ----------------------------------------
/**
 * Encuentra el PRIMER elemento que cumpla una condición
 * Retorna el elemento o undefined
 */

const usuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'María' }
];

const usuario = usuarios.find(u => u.id === 2);
// { id: 2, nombre: 'María' }

// ----------------------------------------
// reduce()
// ----------------------------------------
/**
 * Reduce el array a un solo valor
 * Acumula resultados
 */

const numeros = [1, 2, 3, 4];
const suma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
//                             ↑            ↑                              ↑
//                         valor previo  valor actual              valor inicial
// suma = 10

// ============================================
// 9. EVENTOS EN REACT
// ============================================

/**
 * Eventos en React usan camelCase (onClick, onChange, onSubmit)
 * En HTML nativo se usa lowercase (onclick, onchange, onsubmit)
 */

// ----------------------------------------
// onClick
// ----------------------------------------
<button onClick={handleClick}>Click</button>
<button onClick={() => console.log('Click')}>Click</button>
<button onClick={() => eliminar(id)}>Eliminar</button>

// ----------------------------------------
// onChange
// ----------------------------------------
<input 
  value={valor}
  onChange={(e) => setValor(e.target.value)}
/>
// e.target.value = el valor actual del input

// ----------------------------------------
// onSubmit
// ----------------------------------------
<form onSubmit={handleSubmit}>
  <button type="submit">Enviar</button>
</form>

function handleSubmit(e) {
  e.preventDefault(); // Previene recargar la página
  // Procesar formulario...
}

// ============================================
// 10. PROPS Y CHILDREN
// ============================================

/**
 * Props: Propiedades que se pasan de padre a hijo
 * Children: Contenido entre etiquetas de apertura y cierre
 */

// ----------------------------------------
// Props Básicas
// ----------------------------------------
// Componente padre:
<Saludo nombre="Juan" edad={25} />

// Componente hijo:
function Saludo({ nombre, edad }) {
  return <p>Hola {nombre}, tienes {edad} años</p>;
}

// ----------------------------------------
// Children
// ----------------------------------------
// Componente padre:
<Contenedor>
  <h1>Título</h1>
  <p>Párrafo</p>
</Contenedor>

// Componente hijo:
function Contenedor({ children }) {
  return (
    <div className="contenedor">
      {children} {/* Renderiza <h1> y <p> */}
    </div>
  );
}

// ============================================
// 11. OBJECT METHODS (MÉTODOS DE OBJETOS)
// ============================================

// ----------------------------------------
// Object.keys()
// ----------------------------------------
/**
 * Retorna un array con las claves del objeto
 */
const obj = { a: 1, b: 2, c: 3 };
const claves = Object.keys(obj);
// ['a', 'b', 'c']

// Uso común: verificar si un objeto está vacío
if (Object.keys(errores).length > 0) {
  // Hay errores
}

// ----------------------------------------
// Object.values()
// ----------------------------------------
/**
 * Retorna un array con los valores del objeto
 */
const valores = Object.values(obj);
// [1, 2, 3]

// ----------------------------------------
// Object.entries()
// ----------------------------------------
/**
 * Retorna un array de arrays [clave, valor]
 */
const entradas = Object.entries(obj);
// [['a', 1], ['b', 2], ['c', 3]]

// ============================================
// 12. COMPUTED PROPERTY NAMES
// ============================================

/**
 * Usar variables como nombres de propiedades en objetos
 * Se usan corchetes []
 */

const campo = 'nombre';
const valor = 'Juan';

// Sin computed property:
const obj = {};
obj[campo] = valor; // obj.nombre = 'Juan'

// Con computed property:
const obj = {
  [campo]: valor // { nombre: 'Juan' }
};

// Uso en setState:
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value // Actualiza la propiedad con el nombre del input
  }));
};

// ============================================
// 13. EXPRESIONES REGULARES (REGEX)
// ============================================

/**
 * Patrones para buscar y validar strings
 */

// Sintaxis:
const regex = /patrón/flags;

// Validar email:
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esValido = emailRegex.test('usuario@email.com'); // true

// Explicación del patrón de email:
// ^        : Inicio del string
// [^\s@]+  : Uno o más caracteres que NO sean espacio ni @
// @        : El símbolo @
// [^\s@]+  : Uno o más caracteres que NO sean espacio ni @
// \.       : Un punto literal (\ escapa el punto)
// [^\s@]+  : Uno o más caracteres que NO sean espacio ni @
// $        : Fin del string

// Flags comunes:
// i = case insensitive (no distingue mayúsculas)
// g = global (encuentra todas las coincidencias)
// m = multiline

// Validar solo dígitos:
const soloDigitos = /^\d+$/;
// \d = cualquier dígito (0-9)
// + = uno o más
// ^ y $ = inicio y fin (asegura que TODO sea dígitos)

// ============================================
// 14. ASYNC/AWAIT
// ============================================

/**
 * Sintaxis para manejar código asíncrono de forma más legible
 */

// Con Promises (antiguo):
fetch('/api/datos')
  .then(response => response.json())
  .then(datos => console.log(datos))
  .catch(error => console.error(error));

// Con async/await (moderno):
async function obtenerDatos() {
  try {
    const response = await fetch('/api/datos');
    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
}

// En eventos (arrow function):
const handleSubmit = async (e) => {
  e.preventDefault();
  const resultado = await procesarPago();
};

// ============================================
// FIN DEL GLOSARIO
// ============================================

/**
 * Este archivo es una referencia rápida de los conceptos más comunes
 * que encontrarás en el código React de este proyecto.
 * 
 * Para más información:
 * - React Docs: https://react.dev/
 * - MDN (JavaScript): https://developer.mozilla.org/
 * - React Router: https://reactrouter.com/
 */
