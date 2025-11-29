# 🚀 24/7 Cloud Deployment Guide

Your bot is ready to run 24/7 in the cloud! This guide will walk you through deploying it so you never need to keep your computer running.

## 🎯 What You're Deploying

A fully automated traffic bot that:
- ✅ Runs 24/7 without your computer being on
- ✅ Visits URLs automatically with configurable settings
- ✅ Simulates human-like behavior (scrolling, clicking)
- ✅ Tracks statistics and provides real-time monitoring
- ✅ Has a web-based control panel to configure everything
- ✅ Automatically retries on failures

---

## 🏆 Recommended: Deploy to Railway (Easiest & Fastest)

**Time to deploy: ~5 minutes**

### Step 1: Prepare Your Code

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit
git commit -m "Initial bot deployment"

# Create a GitHub repository and push
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Railway

1. **Visit [railway.app](https://railway.app)** and sign up/login (free with GitHub)

2. **Click "New Project"** on the dashboard

3. **Select "Deploy from GitHub repo"**
   - Connect your GitHub account if needed
   - Select your repository
   - Railway will automatically detect the `railway.json` config

4. **Click "Deploy"**
   - Railway will build your Docker container
   - This takes 2-3 minutes

5. **Get Your URL**
   - Once deployed, Railway provides a public URL
   - Click "Settings" → "Generate Domain" to get a permanent URL
   - Your bot will be live at `https://your-app.up.railway.app`

6. **Configure Your Bot**
   - Visit your Railway URL
   - You'll see the control panel
   - Set your target URL, duration, interval, and concurrency
   - Click "Update Configuration"
   - Bot starts working immediately! 🎉

### Step 3: Monitor Your Bot

- **Control Panel**: Visit your Railway URL
- **Health Check**: `https://your-app.up.railway.app/health`
- **Statistics**: `https://your-app.up.railway.app/api/stats`
- **Logs**: Check Railway dashboard → "Deployments" → "View Logs"

### Railway Pricing

- **Free Trial**: $5 credit, ~500 hours of runtime
- **Hobby Plan**: $5/month for continuous 24/7 operation
- Perfect for running your bot non-stop!

---

## 🌐 Alternative: Deploy to Render

**Time to deploy: ~10 minutes**

### Step 1: Push to GitHub

Same as Railway Step 1 above.

### Step 2: Deploy to Render

1. **Visit [render.com](https://render.com)** and sign up

2. **Click "New +"** → **"Web Service"**

3. **Connect GitHub Repository**
   - Authorize Render to access your GitHub
   - Select your repository

4. **Configure Service**
   - **Name**: Choose a name (e.g., `traffic-bot`)
   - **Environment**: Docker
   - **Region**: Choose closest to your target audience
   - **Branch**: main
   - **Plan**: Free (or paid for 24/7)

5. **Add Environment Variables**
   ```
   PORT = 3000
   SERVER_URL = https://your-app.onrender.com
   ```
   (Replace with your actual Render URL after first deploy)

6. **Click "Create Web Service"**
   - First deploy takes 5-10 minutes
   - Render will provide a URL

7. **Update Environment Variable**
   - After deployment, update `SERVER_URL` with your actual Render URL
   - Redeploy if needed

### Render Pricing

- **Free Tier**: Spins down after 15 minutes of inactivity (not ideal for 24/7)
- **Starter Plan**: $7/month for continuous 24/7 operation

---

## 🐳 Alternative: Deploy to Heroku

### Step 1: Install Heroku CLI

Download from [heroku.com](https://heroku.com/cli)

### Step 2: Deploy

```bash
# Navigate to bot files
cd public/bot-files

# Login to Heroku
heroku login

# Create app
heroku create your-bot-name

# Set to use Docker
heroku stack:set container

# Initialize git for this folder
git init
git add .
git commit -m "Deploy to Heroku"

# Add Heroku remote
heroku git:remote -a your-bot-name

# Push to Heroku
git push heroku main

# Set environment variable
heroku config:set SERVER_URL=https://your-bot-name.herokuapp.com
```

### Step 3: Access Your Bot

Visit `https://your-bot-name.herokuapp.com`

### Heroku Pricing

- **No free tier** (as of 2022)
- **Eco Plan**: $5/month (sleeps after 30 min inactivity)
- **Basic Plan**: $7/month (24/7 operation)

---

## ☁️ Alternative: Deploy to Google Cloud Run

### Prerequisites

- Google Cloud account (free $300 credit for new users)
- Install [gcloud CLI](https://cloud.google.com/sdk/docs/install)

### Steps

```bash
# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Navigate to bot files
cd public/bot-files

# Build container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/traffic-bot

# Deploy
gcloud run deploy traffic-bot \
  --image gcr.io/YOUR_PROJECT_ID/traffic-bot \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi

# Get URL
gcloud run services describe traffic-bot --region us-central1 --format='value(status.url)'
```

### Google Cloud Pricing

- **Free Tier**: 2 million requests/month
- **Pay-as-you-go**: Very cheap for low traffic
- ~$5-10/month for continuous operation

---

## 🌊 Alternative: Deploy to DigitalOcean App Platform

1. **Visit [digitalocean.com](https://digitalocean.com)** and sign up

2. **Go to "Apps"** → **"Create App"**

3. **Connect GitHub** and select your repository

4. **Configure App**
   - **Type**: Web Service
   - **Build Command**: Dockerfile (auto-detected)
   - **Port**: 3000

5. **Set Environment Variables**
   ```
   PORT = 3000
   SERVER_URL = [will be provided after deploy]
   ```

6. **Launch App**

### DigitalOcean Pricing

- **Basic Plan**: $5/month for 24/7 operation
- Very reliable and straightforward

---

## 📊 After Deployment: How to Use Your Bot

### 1. Access Control Panel

Visit your deployment URL (provided by your cloud platform)

### 2. Configure Bot Settings

In the control panel:

- **Target URL**: The website you want to visit
- **Duration**: How long to stay on each page (milliseconds)
  - Example: `30000` = 30 seconds
- **Interval**: Time between batches of visits (milliseconds)
  - Example: `5000` = 5 seconds between batches
- **Concurrency**: Number of browsers running simultaneously (1-10)
  - Example: `5` = 5 browsers visiting at once

### 3. Example Configurations

**Light Traffic** (gentle, spread out):
```
Target URL: https://yourwebsite.com
Duration: 30000 (30 seconds)
Interval: 60000 (1 minute)
Concurrency: 2
```

**Medium Traffic** (moderate):
```
Target URL: https://yourwebsite.com
Duration: 60000 (1 minute)
Interval: 30000 (30 seconds)
Concurrency: 5
```

**Heavy Traffic** (aggressive):
```
Target URL: https://yourwebsite.com
Duration: 120000 (2 minutes)
Interval: 10000 (10 seconds)
Concurrency: 10
```

### 4. Monitor Performance

- Check **Live Statistics** in the control panel
- View **Total Visits** counter
- See **Visits by URL** breakdown
- Monitor **Uptime** to ensure bot is running continuously

---

## 🔧 Troubleshooting

### Bot Not Starting?

1. **Check Logs**
   - Railway: Dashboard → Deployments → View Logs
   - Render: Dashboard → Logs tab
   - Heroku: `heroku logs --tail`

2. **Common Issues**
   - **Out of Memory**: Reduce concurrency (try 2-3 instead of 5-10)
   - **Container Crash**: Check if Puppeteer dependencies installed
   - **Connection Timeout**: Verify target URL is accessible

### Bot Not Visiting Sites?

1. **Verify Configuration**
   - Check control panel shows correct settings
   - Confirm target URL is valid and accessible

2. **Check SERVER_URL Environment Variable**
   - Should match your deployment URL
   - Update in platform settings if needed

3. **Review Statistics**
   - Visit `/api/stats` endpoint
   - Should show increasing visit counts

### Performance Issues?

1. **Reduce Concurrency**
   - Lower from 10 to 5 or even 2-3
   - Each browser uses ~100-200MB RAM

2. **Increase Interval**
   - Give more time between batches
   - Reduces server load

3. **Check Platform Resources**
   - Ensure you have enough memory allocated
   - Upgrade plan if on free tier with limits

---

## ⚠️ Important Notes

### Resource Usage

- Each Puppeteer browser instance uses approximately 100-200MB RAM
- Total memory needed: `Concurrency × 200MB + 100MB (server)`
- Example: 5 concurrent = ~1.1GB RAM needed

### Rate Limiting

- Many websites have rate limiting or bot detection
- If visits fail, try:
  - Reducing concurrency
  - Increasing duration and interval
  - Using more realistic visit patterns

### Ethical Use

⚠️ **Only use this bot on websites you own or have explicit permission to test!**

- This tool is for testing website traffic handling
- Unauthorized automated traffic may violate terms of service
- Some sites may block or ban automated traffic

### Platform Considerations

- **Free Tiers**: May spin down after inactivity
- **Paid Plans**: Usually required for true 24/7 operation
- **Resource Limits**: Free tiers have CPU/memory constraints
- **Billing**: Monitor usage to avoid unexpected charges

---

## 🎉 Success!

Once deployed, your bot will:
- ✅ Run automatically 24/7 in the cloud
- ✅ Visit your target URLs with configured frequency
- ✅ Simulate human-like behavior
- ✅ Track and display statistics
- ✅ Restart automatically if it crashes
- ✅ Persist configuration across restarts

You never need to keep your computer on again!

---

## 📞 Need Help?

1. **Check Platform Documentation**
   - Railway: https://docs.railway.app
   - Render: https://render.com/docs
   - Heroku: https://devcenter.heroku.com

2. **Review Logs**
   - Platform dashboards show detailed logs
   - Look for error messages

3. **Test Locally First**
   ```bash
   cd public/bot-files
   npm install
   npm start
   ```
   Then visit `http://localhost:3000`

4. **Verify Dockerfile Builds**
   ```bash
   docker build -t traffic-bot .
   docker run -p 3000:3000 traffic-bot
   ```

---

## 🚀 You're All Set!

Your traffic bot is now running 24/7 in the cloud! Configure it through the web interface and watch the statistics grow.

Happy deploying! 🎊
