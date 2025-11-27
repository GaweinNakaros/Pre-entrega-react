# 🚀 Guía de Deploy a GitHub Pages

Este documento explica cómo publicar cambios en GitHub Pages de forma eficiente.

---

## 📋 Métodos disponibles

### **Método 1: Script Automatizado (RECOMENDADO) ⚡**

El script `deploy-gh-pages.ps1` hace TODO automáticamente en UN solo comando.

#### Uso básico:
```powershell
.\deploy-gh-pages.ps1
```

#### Con mensaje personalizado:
```powershell
.\deploy-gh-pages.ps1 "deploy: Actualizar navbar con nuevos estilos"
```

#### ¿Qué hace el script?
1. ✅ Verifica que estés en `feature/nuevos-modulos`
2. ✅ Detecta cambios sin commit y te pregunta si quieres commitearlos
3. ✅ Genera el build (`npm run build`)
4. ✅ Cambia a `gh-pages`
5. ✅ Limpia archivos viejos
6. ✅ Copia el nuevo build
7. ✅ Restaura `404.html` si hace falta
8. ✅ Hace commit y push
9. ✅ Te devuelve a `feature/nuevos-modulos`

**Ventaja:** De 8 pasos manuales a 1 comando 🎉

---

### **Método 2: GitHub Actions (Automático en cada push) 🤖**

Configurar GitHub Actions para que **cada vez que hagas push** a `feature/nuevos-modulos`, automáticamente genere el build y actualice `gh-pages`.

**Ventaja:** Cero comandos manuales, todo automático.

**Desventaja:** Requiere configuración inicial (archivo `.github/workflows/deploy.yml`).

---

### **Método 3: Manual (actual)**

El proceso que describiste:
```powershell
# 1. Trabajar en feature/nuevos-modulos
git checkout feature/nuevos-modulos
# [hacer cambios]
git add .; git commit -m "..."; git push

# 2. Generar build
cd v1.3; npm run build; cd ..

# 3. Actualizar gh-pages
git checkout gh-pages
Copy-Item v1.3\dist\* -Destination . -Recurse -Force
git add .; git commit -m "deploy: ..."; git push

# 4. Volver a trabajar
git checkout feature/nuevos-modulos
```

**Ventaja:** Control total de cada paso.

**Desventaja:** 8 pasos, tedioso, propenso a errores.

---

## 🎯 Flujo de trabajo recomendado

### **Día a día:**

```powershell
# 1. Asegúrate de estar en feature/nuevos-modulos
git checkout feature/nuevos-modulos

# 2. Hacer tus cambios en el código
# [editar archivos]

# 3. Probar localmente
cd v1.3
npm run dev
# Verificar que todo funciona
# Ctrl+C para detener

# 4. Commit de tus cambios
cd ..
git add .
git commit -m "feat: Agregar nueva funcionalidad"
git push origin feature/nuevos-modulos

# 5. Publicar a GitHub Pages (UN SOLO COMANDO)
.\deploy-gh-pages.ps1 "deploy: Publicar nueva funcionalidad"
```

---

## 🛠️ Configurar GitHub Actions (Opcional)

Si quieres automatización total:

1. Crear archivo `.github/workflows/deploy.yml`
2. Cada push a `feature/nuevos-modulos` → automáticamente actualiza `gh-pages`
3. No necesitas ejecutar `deploy-gh-pages.ps1` nunca más

¿Quieres que configure GitHub Actions?

---

## 📝 Notas importantes

### **¿Cuándo usar cada método?**

| Situación | Método recomendado |
|-----------|-------------------|
| Desarrollo diario | Script `deploy-gh-pages.ps1` |
| Proyecto maduro con muchos colaboradores | GitHub Actions |
| Debugging o casos especiales | Manual |

### **Archivos importantes para GitHub Pages:**

- ✅ `index.html` - Página principal
- ✅ `assets/` - JavaScript y CSS compilados
- ✅ `404.html` - Manejo de rutas de React Router
- ✅ `vite.svg` - Favicon

### **Archivos que NO deben estar en gh-pages:**

- ❌ `v1.3/src/` - Código fuente
- ❌ `node_modules/` - Dependencias
- ❌ `package.json` - Configuración de npm

---

## 🆘 Solución de problemas

### El sitio no actualiza después del deploy
- Espera 2-3 minutos (GitHub Pages tarda en actualizar)
- Haz recarga fuerte: `Ctrl + Shift + R`
- Verifica en GitHub que gh-pages tenga el commit nuevo

### Error "not on feature/nuevos-modulos"
```powershell
git checkout feature/nuevos-modulos
.\deploy-gh-pages.ps1
```

### Error "changes not committed"
```powershell
git add .
git commit -m "tu mensaje"
.\deploy-gh-pages.ps1
```

---

## 📚 Recursos adicionales

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [React Router + GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
