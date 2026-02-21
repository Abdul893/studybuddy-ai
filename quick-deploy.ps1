# Quick Deployment Script
Write-Host "🚀 StudyBuddy AI - Quick Deployment" -ForegroundColor Green

# Check git status
try {
    $status = git status --porcelain
    Write-Host "📝 Git Status: Ready" -ForegroundColor Blue
} catch {
    Write-Host "❌ Git not ready" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🌐 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: studybuddy-ai" -ForegroundColor White
Write-Host "3. Make it Public" -ForegroundColor White
Write-Host "4. Click Create repository" -ForegroundColor White
Write-Host ""
Write-Host "📋 Then run these commands:" -ForegroundColor Yellow
Write-Host "git remote add origin https://github.com/YOUR_USERNAME/studybuddy-ai.git" -ForegroundColor Gray
Write-Host "git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "🔧 AWS App Runner Settings:" -ForegroundColor Magenta
Write-Host "- Runtime: Node.js 18" -ForegroundColor White
Write-Host "- Build: cd client && npm install && npm run build && cd ../server && npm install" -ForegroundColor White
Write-Host "- Start: cd server && npm start" -ForegroundColor White
Write-Host "- Port: 8080" -ForegroundColor White
Write-Host ""
Write-Host "✅ Your app will be live at:" -ForegroundColor Green
Write-Host "https://your-service-name.random-string.awsapprunner.com" -ForegroundColor Yellow
