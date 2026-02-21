# 🚀 DEPLOY YOUR APP NOW - 5 MINUTE GUIDE

## 📋 **Step 1: Create GitHub Repository (1 minute)**

1. Go to **https://github.com/new**
2. Repository name: `studybuddy-ai`
3. Description: `AI-powered study companion`
4. ✅ Make it **Public**
5. Click **"Create repository"**

## 📋 **Step 2: Push Code (2 minutes)**

Open terminal in your project folder and run:

```bash
# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/studybuddy-ai.git

# Push all code
git push -u origin main
```

## 📋 **Step 3: AWS App Runner Setup (2 minutes)**

1. Go to **AWS Console** → **App Runner**
2. Click **"Create service"**
3. Select **"Source code repository"**
4. Choose **"GitHub"**
5. Click **"Connect to GitHub"** and authorize
6. Select your `studybuddy-ai` repository
7. Choose `main` branch

## 📋 **Step 4: Configure Settings (1 minute)**

**Build Configuration:**
- Runtime: `Node.js 18`
- Build command: `cd client && npm install && npm run build && cd ../server && npm install`
- Start command: `cd server && npm start`
- Port: `8080`

**Environment Variables:**
```
NODE_ENV=production
PORT=8080
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-secure-jwt-secret
MONGODB_URI=mongodb+srv://placeholder@cluster.mongodb.net/studybuddy-ai
MONGODB_DB=studybuddy-ai
GEMINI_MODEL=gemini-1.5-flash
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
```

**Instance:**
- CPU: `1 vCPU`
- Memory: `2 GB`
- Auto-scaling: `Disabled` (free tier)

## 🎯 **Step 5: Deploy!**

Click **"Create service"** and wait 5-10 minutes.

## 🌐 **Your Live URL**

Your app will be available at:
```
https://your-service-name.random-string.awsapprunner.com
```

## ✅ **Test Your Deployment**

```bash
# Health check
curl https://your-url.awsapprunner.com/health

# Test chat
curl -X POST https://your-url.awsapprunner.com/api/chat/test \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from production!"}'
```

## 🔧 **Post-Deployment**

1. Update environment variables in AWS App Runner with real values:
   - Your actual Gemini API key
   - Generated secure JWT secret
   - Your MongoDB connection string

2. Your app will auto-redeploy on each push to main branch!

---

**🎉 CONGRATULATIONS! Your StudyBuddy AI is now live on AWS!**

**Features Active:**
- ✅ Security headers and rate limiting
- ✅ XSS protection and input validation
- ✅ JWT authentication
- ✅ AI chat functionality
- ✅ Free tier hosting
- ✅ Automatic deployments
