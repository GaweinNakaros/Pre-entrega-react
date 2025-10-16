# Configuración de GitHub Pages

Este documento explica cómo está configurado GitHub Pages para este proyecto y cómo activarlo.

## ¿Qué es GitHub Pages?

GitHub Pages es un servicio gratuito de GitHub que te permite alojar sitios web estáticos directamente desde tu repositorio. Es perfecto para proyectos React como este.

## Configuración Realizada

### 1. Vite Configuration (`v1.3/vite.config.js`)

Se agregó la propiedad `base` al archivo de configuración de Vite:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/Pre-entrega-react/',
})
```

Esta configuración asegura que todos los recursos (CSS, JS, imágenes) se carguen desde la ruta correcta cuando el sitio esté desplegado en GitHub Pages.

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

Se creó un workflow automatizado que:
- Se ejecuta automáticamente cuando haces push a la rama `main`
- También puede ejecutarse manualmente desde la pestaña "Actions" en GitHub
- Instala las dependencias del proyecto
- Construye la aplicación React
- Despliega el resultado a GitHub Pages

## Pasos para Activar GitHub Pages

### 1. Habilitar GitHub Pages en tu Repositorio

1. Ve a tu repositorio en GitHub: `https://github.com/GaweinNakaros/Pre-entrega-react`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral izquierdo, haz clic en **Pages**
4. En **Source** (Origen), selecciona **GitHub Actions**
5. ¡Listo! No necesitas configurar nada más en esta sección

### 2. Hacer Push de los Cambios

Una vez que hagas merge de estos cambios a la rama `main`, el workflow se ejecutará automáticamente.

### 3. Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" en ejecución
3. Espera a que termine (toma unos 1-2 minutos)
4. Una vez completado con éxito (✓), tu sitio estará disponible en:
   ```
   https://gaweinnakaros.github.io/Pre-entrega-react/
   ```

## Cómo Actualizar el Sitio

Cada vez que hagas push a la rama `main`, el sitio se actualizará automáticamente:

```bash
git add .
git commit -m "Actualización del sitio"
git push origin main
```

## Solución de Problemas

### El sitio no carga correctamente

Si el sitio no carga o muestra errores 404 para los recursos:
- Verifica que el `base` en `vite.config.js` coincida con el nombre de tu repositorio
- Asegúrate de que GitHub Pages esté configurado para usar "GitHub Actions" como origen

### El workflow falla

Si el workflow falla en la pestaña Actions:
1. Haz clic en el workflow fallido para ver los detalles
2. Revisa los logs para identificar el error
3. Los errores comunes incluyen:
   - Errores de compilación en el código
   - Permisos incorrectos (verifica que el workflow tenga permisos para `pages: write`)

### Desarrollo Local

Para probar localmente con la configuración de producción:

```bash
cd v1.3
npm run build
npm run preview
```

Esto construirá el proyecto y lo servirá localmente con la misma configuración que se usará en GitHub Pages.

## Estructura del Proyecto

```
Pre-entrega-react/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de despliegue automatizado
├── v1.3/                       # Versión actual del proyecto
│   ├── src/                    # Código fuente
│   ├── dist/                   # Archivos construidos (no en git)
│   ├── vite.config.js          # Configuración de Vite con base path
│   └── package.json            # Dependencias y scripts
```

## Recursos Adicionales

- [Documentación oficial de GitHub Pages](https://docs.github.com/es/pages)
- [Documentación de Vite para despliegue](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/es/actions)

## Notas Importantes

- El sitio es completamente estático después del build
- No necesitas un servidor Node.js para hospedar el sitio
- Los cambios pueden tardar 1-2 minutos en reflejarse después del despliegue
- GitHub Pages es gratuito para repositorios públicos
