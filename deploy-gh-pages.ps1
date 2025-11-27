# Script para deploy automático a GitHub Pages
# Uso: .\deploy-gh-pages.ps1 "mensaje del commit"

param(
    [string]$CommitMessage = "deploy: Actualizar GitHub Pages"
)

Write-Host "🚀 Iniciando deploy a GitHub Pages..." -ForegroundColor Cyan

# 1. Verificar que estamos en rama-de-trabajo
$currentBranch = git branch --show-current
if ($currentBranch -ne "rama-de-trabajo") {
    Write-Host "❌ Error: Debes estar en la rama rama-de-trabajo" -ForegroundColor Red
    Write-Host "   Rama actual: $currentBranch" -ForegroundColor Yellow
    exit 1
}

# 2. Verificar que no hay cambios sin commit
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Hay cambios sin commit:" -ForegroundColor Yellow
    git status --short
    $response = Read-Host "¿Quieres hacer commit de estos cambios? (s/n)"
    if ($response -eq "s" -or $response -eq "S") {
        $commitMsg = Read-Host "Mensaje del commit"
        git add .
        git commit -m $commitMsg
        git push origin rama-de-trabajo
        Write-Host "✅ Cambios committeados en rama-de-trabajo" -ForegroundColor Green
    } else {
        Write-Host "❌ Deploy cancelado. Haz commit de tus cambios primero." -ForegroundColor Red
        exit 1
    }
}

# 3. Generar build
Write-Host "`n📦 Generando build de producción..." -ForegroundColor Cyan
Set-Location v1.3
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al generar build" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "✅ Build generado exitosamente" -ForegroundColor Green

# 4. Cambiar a gh-pages
Write-Host "`n🔀 Cambiando a rama gh-pages..." -ForegroundColor Cyan
git checkout gh-pages
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al cambiar a gh-pages" -ForegroundColor Red
    exit 1
}

# 5. Limpiar archivos viejos (excepto .git y v1.3)
Write-Host "`n🧹 Limpiando archivos viejos..." -ForegroundColor Cyan
Get-ChildItem -Exclude .git,v1.3 | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# 6. Copiar nuevo build
Write-Host ""
Write-Host "Copiando archivos del build..." -ForegroundColor Cyan
Copy-Item v1.3\dist\* -Destination . -Recurse -Force

# 6.5. Crear .gitignore para gh-pages
@"
node_modules/
v1.3/
"@ | Out-File -FilePath .gitignore -Encoding utf8

# 7. Restaurar 404.html desde git
Write-Host "Restaurando 404.html..." -ForegroundColor Cyan
git checkout HEAD -- 404.html 2>$null
if (-not (Test-Path 404.html)) {
    Write-Host "Advertencia: 404.html no encontrado en historial" -ForegroundColor Yellow
}

# 8. Verificar si hay cambios
$ghPagesStatus = git status --porcelain
if (-not $ghPagesStatus) {
    Write-Host "`n✅ No hay cambios en gh-pages (build idéntico al anterior)" -ForegroundColor Green
    git checkout feature/nuevos-modulos
    Write-Host "✅ Vuelto a feature/nuevos-modulos" -ForegroundColor Green
    exit 0
}

# 9. Commit y push
Write-Host ""
Write-Host "Haciendo commit en gh-pages..." -ForegroundColor Cyan
git add .
git commit -m $CommitMessage
git push origin gh-pages
Write-Host "Deploy completado exitosamente" -ForegroundColor Green

# 10. Volver a rama-de-trabajo
Write-Host ""
Write-Host "Volviendo a rama-de-trabajo..." -ForegroundColor Cyan
git checkout rama-de-trabajo

Write-Host ""
Write-Host "Deploy finalizado!" -ForegroundColor Green
Write-Host "Tu sitio se actualizara en 1-2 minutos" -ForegroundColor Cyan
Write-Host "https://gaweinnakaros.github.io/Proyecto-React/"
