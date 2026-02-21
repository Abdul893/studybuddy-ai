# 🚀 AWS App Runner Deployment Guide

## 📋 **Prerequisites Completed** ✅

1. **Git Repository Initialized** ✅
   - Repository created with all source code
   - Initial commit with security enhancements
   - Deployment configuration added

2. **Deployment Configuration Created** ✅
   - `apprunner.yaml` configuration file created
   - Environment variables configured
   - Build commands defined

## 🔄 **Next Steps - Manual Deployment**

Since CLI tools are having issues, here's the manual deployment process:

### **Step 1: Create GitHub Repository**

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Repository name: `studybuddy-ai`
4. Description: `AI-powered study companion with chat and security`
5. Make it **Public**
6. Click "Create repository"

### **Step 2: Push Code to GitHub**

1. Copy the repository URL from GitHub
2. Run these commands in your terminal:

```bash
# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/studybuddy-ai.git

# Push to GitHub
git push -u origin main
```

### **Step 3: Deploy to AWS App Runner**

1. **Login to AWS Console**
   - Go to [AWS Console](https://console.aws.amazon.com)
   - Search for "App Runner"

2. **Create New Service**
   - Click "Create service"
   - Select "Source code repository"
   - Choose "GitHub"

3. **Connect GitHub**
   - Click "Connect to GitHub"
   - Authorize AWS to access your GitHub
   - Select `studybuddy-ai` repository
   - Choose `main` branch

4. **Configure Deployment Settings**

**Build Configuration:**
- Runtime: `Node.js 18`
- Build command: `cd client && npm install && npm run build && cd ../server && npm install`
- Start command: `cd server && npm start`

**Environment Variables:**
```
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://placeholder:placeholder@cluster.mongodb.net/studybuddy-ai
MONGODB_DB=studybuddy-ai
JWT_SECRET=your-production-jwt-secret-change-this
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-flash
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
```

**Instance Configuration:**
- CPU: `1 vCPU`
- Memory: `2 GB`
- Instance type: `General purpose`
- Auto-scaling: `Disabled` (for free tier)

5. **Review and Create**
   - Review all settings
   - Click "Create service"
   - Wait for deployment (5-10 minutes)

### **Step 4: Configure Production Environment**

After deployment, update environment variables in AWS App Runner:

1. Go to your App Runner service
2. Click "Configuration"
3. Click "Edit"
4. Update these with real values:
   - `GEMINI_API_KEY`: Your actual Gemini API key
   - `JWT_SECRET`: Generate secure secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `MONGODB_URI`: Your MongoDB connection string
   - `CORS_ORIGIN`: Your deployed URL

### **Step 5: Get Live URL**

Your application will be available at:
```
https://your-service-name.random-string.awsapprunner.com
```

## 🔧 **Free Tier Benefits**

- **750 hours/month** compute time
- **1 GB** RAM
- **Custom domain** supported
- **Automatic deployments**
- **Health checks**
- **SSL certificates** included

## 🚨 **Important Notes**

1. **Environment Variables**: Never commit real API keys to Git
2. **Database**: Use MongoDB Atlas free tier for production
3. **Security**: All security headers and validation are active
4. **Monitoring**: Check AWS CloudWatch for logs and metrics

## 📊 **Deployment Verification**

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-url.awsapprunner.com/health

# Test chat
curl -X POST https://your-url.awsapprunner.com/api/chat/test \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from production!"}'
```

## 🔄 **Automatic Deployments**

After initial setup:
1. Push changes to `main` branch
2. AWS App Runner automatically detects changes
3. New build and deployment starts
4. Live URL updates automatically

---

**Status**: Ready for manual deployment  
**Next Action**: Follow steps above to deploy to AWS App Runner
