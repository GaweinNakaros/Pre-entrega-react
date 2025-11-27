# Script para deploy automatico a GitHub Pages
# Uso: .\deploy-gh-pages.ps1 "mensaje del commit"

param(
    [string]$CommitMessage = "deploy: Actualizar GitHub Pages"
)

Write-Host "Iniciando deploy a GitHub Pages..." -ForegroundColor Cyan

# 1. Verificar que estamos en rama-de-trabajo
$currentBranch = git branch --show-current
if ($currentBranch -ne "rama-de-trabajo") {
    Write-Host "Error: Debes estar en la rama rama-de-trabajo" -ForegroundColor Red
    Write-Host "Rama actual: $currentBranch" -ForegroundColor Yellow
    exit 1
}

# 2. Verificar que no hay cambios sin commit
$status = git status --porcelain
if ($status) {
    Write-Host "Hay cambios sin commit:" -ForegroundColor Yellow
    git status --short
    $response = Read-Host "Quieres hacer commit de estos cambios? (s/n)"
    if ($response -eq "s" -or $response -eq "S") {
        $commitMsg = Read-Host "Mensaje del commit"
        git add .
        git commit -m $commitMsg
        git push origin rama-de-trabajo
        Write-Host "Cambios committeados en rama-de-trabajo" -ForegroundColor Green
    } else {
        Write-Host "Deploy cancelado. Haz commit de tus cambios primero." -ForegroundColor Red
        exit 1
    }
}

# 3. Generar build
Write-Host "`nGenerando build de produccion..." -ForegroundColor Cyan
Set-Location v1.3
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al generar build" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "Build generado exitosamente" -ForegroundColor Green

# 4. Cambiar a gh-pages
Write-Host "`nCambiando a rama gh-pages..." -ForegroundColor Cyan
git checkout gh-pages
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al cambiar a gh-pages" -ForegroundColor Red
    exit 1
}

# 5. Limpiar archivos viejos EXCEPTO .git, .gitignore y 404.html
Write-Host "`nLimpiando archivos viejos..." -ForegroundColor Cyan
Get-ChildItem -Path . -Exclude .git,.gitignore,404.html,v1.3 | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# 6. Limpiar v1.3 si existe (para evitar subir codigo fuente o node_modules)
if (Test-Path v1.3) {
    Write-Host "Limpiando carpeta v1.3..." -ForegroundColor Cyan
    Remove-Item v1.3 -Recurse -Force -ErrorAction SilentlyContinue
}

# 7. Copiar SOLO los archivos del build (desde rama-de-trabajo)
Write-Host "`nCopiando archivos del build..." -ForegroundColor Cyan
$distPath = "..\rama-de-trabajo-temp\v1.3\dist"

# Crear carpeta temporal y copiar desde rama-de-trabajo
git show rama-de-trabajo:v1.3/dist/index.html > index-temp.html 2>$null
if (Test-Path index-temp.html) {
    Remove-Item index-temp.html
    # Copiar archivos del dist de la rama actual
    Copy-Item .\v1.3\dist\* -Destination . -Recurse -Force -ErrorAction Stop
} else {
    Write-Host "Error: No se encontro el build en v1.3/dist" -ForegroundColor Red
    git checkout rama-de-trabajo
    exit 1
}

# 8. Asegurar que existe .gitignore
if (-not (Test-Path .gitignore)) {
    Write-Host "Creando .gitignore..." -ForegroundColor Cyan
    @"
node_modules/
v1.3/
"@ | Out-File -FilePath .gitignore -Encoding utf8
}

# 9. Restaurar 404.html desde historial si no existe
if (-not (Test-Path 404.html)) {
    Write-Host "Restaurando 404.html..." -ForegroundColor Cyan
    git checkout HEAD~1 -- 404.html 2>$null
}

# 10. Limpiar archivos no trackeados (v1.3 si quedo)
Write-Host "`nLimpiando archivos no deseados..." -ForegroundColor Cyan
git clean -fd -e .gitignore

# 11. Verificar que NO hay v1.3 ni node_modules antes de agregar
if (Test-Path v1.3) {
    Write-Host "ADVERTENCIA: v1.3 todavia existe, eliminandola..." -ForegroundColor Yellow
    Remove-Item v1.3 -Recurse -Force
}

# 12. Verificar si hay cambios
$ghPagesStatus = git status --porcelain
if (-not $ghPagesStatus) {
    Write-Host "`nNo hay cambios en gh-pages (build identico al anterior)" -ForegroundColor Green
    git checkout rama-de-trabajo
    Write-Host "Vuelto a rama-de-trabajo" -ForegroundColor Green
    exit 0
}

# 13. Mostrar que se va a commitear
Write-Host "`nArchivos a commitear:" -ForegroundColor Cyan
git status --short

# 14. Commit y push
Write-Host "`nHaciendo commit en gh-pages..." -ForegroundColor Cyan
git add -A
git commit -m $CommitMessage

Write-Host "`nSubiendo cambios a GitHub..." -ForegroundColor Cyan
git push origin gh-pages

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nDeploy completado exitosamente!" -ForegroundColor Green
} else {
    Write-Host "`nError al hacer push. Revisa los errores anteriores." -ForegroundColor Red
    git checkout rama-de-trabajo
    exit 1
}

# 15. Volver a rama-de-trabajo
Write-Host "`nVolviendo a rama-de-trabajo..." -ForegroundColor Cyan
git checkout rama-de-trabajo

Write-Host "`nDeploy finalizado!" -ForegroundColor Green
Write-Host "Tu sitio se actualizara en 1-2 minutos en:" -ForegroundColor Cyan
Write-Host "https://gaweinnakaros.github.io/Proyecto-React/" -ForegroundColor White
