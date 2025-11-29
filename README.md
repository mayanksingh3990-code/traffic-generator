# Traffic Bot - 24/7 Deployment Guide

This bot automatically visits URLs 24/7 with configurable settings. It runs as a standalone service that can be deployed to various cloud platforms.

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Create Railway Account**: Visit [railway.app](https://railway.app)
2. **Deploy from GitHub**:
   ```bash
   # Push this project to GitHub first
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. **In Railway Dashboard**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect the Dockerfile
   - Click "Deploy"
4. **Get Your URL**: Railway will provide a public URL like `https://your-app.railway.app`
5. **Configure Bot**: Visit your URL and use the web interface to set target URLs

**Cost**: Free tier available with 500 hours/month, then $5/month

---

### Option 2: Render

1. **Create Render Account**: Visit [render.com](https://render.com)
2. **Deploy**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will detect the Dockerfile
   - Click "Create Web Service"
3. **Configure**:
   - Set environment variable `PORT` to `3000`
   - Set environment variable `SERVER_URL` to your Render URL
4. **Access**: Your bot will be live at `https://your-app.onrender.com`

**Cost**: Free tier available (spins down after inactivity), paid plans start at $7/month

---

### Option 3: Heroku

1. **Install Heroku CLI**: Download from [heroku.com](https://heroku.com)
2. **Deploy**:
   ```bash
   cd public/bot-files
   heroku login
   heroku create your-bot-name
   heroku stack:set container
   git init
   git add .
   git commit -m "Deploy bot"
   git push heroku main
   ```
3. **Set Environment Variables**:
   ```bash
   heroku config:set SERVER_URL=https://your-bot-name.herokuapp.com
   ```
4. **Scale Up**:
   ```bash
   heroku ps:scale web=1
   ```

**Cost**: Starts at $7/month (no free tier)

---

### Option 4: DigitalOcean App Platform

1. **Create DigitalOcean Account**: Visit [digitalocean.com](https://digitalocean.com)
2. **Deploy**:
   - Go to "Apps" → "Create App"
   - Connect GitHub repository
   - Select Dockerfile build
   - Configure: Name your app, select region
   - Set environment variables:
     - `PORT`: 3000
     - `SERVER_URL`: Will be provided after deployment
3. **Deploy**: Click "Launch App"

**Cost**: Starts at $5/month

---

### Option 5: Google Cloud Run

1. **Install gcloud CLI**: Download from [cloud.google.com](https://cloud.google.com)
2. **Build and Deploy**:
   ```bash
   cd public/bot-files
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   
   # Build image
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/traffic-bot
   
   # Deploy
   gcloud run deploy traffic-bot \
     --image gcr.io/YOUR_PROJECT_ID/traffic-bot \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars PORT=3000
   ```
3. **Get URL**: Google will provide a URL

**Cost**: Free tier: 2 million requests/month, then pay-as-you-go

---

### Option 6: AWS (ECS/Fargate)

More complex setup - see [AWS ECS documentation](https://aws.amazon.com/ecs/)

**Cost**: Free tier available for 12 months, then varies

---

## 📋 Local Testing

Before deploying, test locally:

```bash
cd public/bot-files
npm install
npm start
```

Visit `http://localhost:3000` to configure the bot.

---

## 🔧 Configuration

Once deployed, visit your bot's URL and configure:

- **Target URL**: The website to visit
- **Duration**: How long to stay on each page (milliseconds)
- **Interval**: Time between visit batches (milliseconds)
- **Concurrency**: Number of simultaneous browsers (1-10)

### Example Settings:

**Light Traffic**:
- Duration: 30000 (30 seconds)
- Interval: 60000 (1 minute)
- Concurrency: 2

**Medium Traffic**:
- Duration: 60000 (1 minute)
- Interval: 30000 (30 seconds)
- Concurrency: 5

**Heavy Traffic**:
- Duration: 120000 (2 minutes)
- Interval: 10000 (10 seconds)
- Concurrency: 10

---

## 🎯 Features

✅ 24/7 automated operation
✅ Configurable visit patterns
✅ Human-like behavior simulation
✅ Visit statistics tracking
✅ Auto-retry on failures
✅ Health monitoring endpoint
✅ Persistent configuration

---

## 📊 Monitoring

### Health Check
Visit `/health` endpoint to check bot status:
```
https://your-bot-url.com/health
```

### Statistics
Visit `/api/stats` to see visit counts:
```
https://your-bot-url.com/api/stats
```

---

## 🛠️ Troubleshooting

**Bot not starting?**
- Check logs in your platform's dashboard
- Verify Puppeteer dependencies are installed
- Check memory limits (minimum 512MB recommended)

**Visits not working?**
- Verify target URL is accessible
- Check SERVER_URL environment variable
- Review concurrency settings (lower if issues)

**Performance issues?**
- Reduce concurrency
- Increase interval between batches
- Check platform resource limits

---

## ⚠️ Important Notes

1. **Resource Usage**: Each browser instance uses ~100-200MB RAM
2. **Rate Limiting**: Some sites may block automated traffic
3. **Ethical Use**: Only use on websites you own or have permission to test
4. **Platform Limits**: Free tiers have resource/time limits
5. **Costs**: Monitor usage to avoid unexpected charges

---

## 🔐 Security

- Bot runs in isolated containers
- No data is stored permanently (except config.json)
- All traffic uses standard HTTPS
- Platform security features apply

---

## 📞 Support

For issues or questions:
1. Check platform-specific documentation
2. Review logs for error messages
3. Adjust configuration settings
4. Test locally before deploying

---

## 🎉 You're All Set!

Your bot is now running 24/7 in the cloud! Access the web interface to configure targets and monitor performance.
