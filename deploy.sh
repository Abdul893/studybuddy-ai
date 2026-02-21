#!/bin/bash

# StudyBuddy AI - AWS App Runner Deployment Script
# Run this script after creating GitHub repository

echo "🚀 StudyBuddy AI Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run git init first."
    exit 1
fi

# Check for remote
if ! git remote get-url origin 2>/dev/null; then
    echo "📝 Please provide your GitHub repository URL:"
    read -p "GitHub URL (e.g., https://github.com/username/studybuddy-ai.git): " GITHUB_URL
    
    if [ -z "$GITHUB_URL" ]; then
        echo "❌ GitHub URL is required"
        exit 1
    fi
    
    echo "🔗 Adding remote origin..."
    git remote add origin "$GITHUB_URL"
fi

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully!"
    echo ""
    echo "🌐 Next Steps:"
    echo "1. Go to AWS Console → App Runner"
    echo "2. Create new service → GitHub repository"
    echo "3. Select your repository and main branch"
    echo "4. Use these settings:"
    echo "   - Runtime: Node.js 18"
    echo "   - Build: cd client && npm install && npm run build && cd ../server && npm install"
    echo "   - Start: cd server && npm start"
    echo "   - Port: 8080"
    echo ""
    echo "📋 Environment Variables (add in AWS App Runner):"
    echo "   - NODE_ENV=production"
    echo "   - PORT=8080"
    echo "   - GEMINI_API_KEY=your-api-key"
    echo "   - JWT_SECRET=your-secure-secret"
    echo "   - MONGODB_URI=your-mongodb-uri"
    echo ""
    echo "🎯 Your app will be deployed to:"
    echo "   https://your-service-name.random-string.awsapprunner.com"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your GitHub credentials and repository URL"
fi
