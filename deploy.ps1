# StudyBuddy AI - AWS App Runner Deployment Script (PowerShell)
# Run this script after creating GitHub repository

Write-Host "🚀 StudyBuddy AI Deployment Script" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not found. Please run git init first." -ForegroundColor Red
    exit 1
}

# Check for remote
try {
    $remoteUrl = git remote get-url origin 2>$null
    if (-not $remoteUrl) {
        throw "No remote"
    }
} catch {
    Write-Host "📝 Please provide your GitHub repository URL:" -ForegroundColor Yellow
    $githubUrl = Read-Host "GitHub URL (e.g., https://github.com/username/studybuddy-ai.git)"
    
    if ([string]::IsNullOrEmpty($githubUrl)) {
        Write-Host "❌ GitHub URL is required" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "🔗 Adding remote origin..." -ForegroundColor Blue
    git remote add origin $githubUrl
}

# Push to GitHub
Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Blue
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to AWS Console → App Runner"
    Write-Host "2. Create new service → GitHub repository"
    Write-Host "3. Select your repository and main branch"
    Write-Host "4. Use these settings:"
    Write-Host "   - Runtime: Node.js 18"
    Write-Host "   - Build: cd client && npm install && npm run build && cd ../server && npm install"
    Write-Host "   - Start: cd server && npm start"
    Write-Host "   - Port: 8080"
    Write-Host ""
    Write-Host "📋 Environment Variables (add in AWS App Runner):" -ForegroundColor Yellow
    Write-Host "   - NODE_ENV=production"
    Write-Host "   - PORT=8080"
    Write-Host "   - GEMINI_API_KEY=your-api-key"
    Write-Host "   - JWT_SECRET=your-secure-secret"
    Write-Host "   - MONGODB_URI=your-mongodb-uri"
    Write-Host ""
    Write-Host "🎯 Your app will be deployed to:" -ForegroundColor Green
    Write-Host "   https://your-service-name.random-string.awsapprunner.com"
} else {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    Write-Host "Please check your GitHub credentials and repository URL" -ForegroundColor Yellow
}
