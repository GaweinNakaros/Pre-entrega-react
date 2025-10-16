#!/usr/bin/env sh

# Script para desplegar en GitHub Pages
# Este script construye el proyecto y lo publica en la rama gh-pages

# Detener en caso de error
set -e

# Construir el proyecto
echo "🔨 Construyendo el proyecto..."
npm run build

# Navegar al directorio de build
cd dist

# Inicializar un repositorio git en dist (si no existe)
git init
git add -A
git commit -m 'deploy: Publicación en GitHub Pages'

# Forzar push a la rama gh-pages
echo "🚀 Desplegando a GitHub Pages..."
git push -f git@github.com:GaweinNakaros/Pre-entrega-react.git main:gh-pages

cd -

echo "✅ Despliegue completado!"
