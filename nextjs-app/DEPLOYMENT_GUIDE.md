# 🚀 Deployment Guide

## Deployment Options

Your Next.js app can be deployed to various platforms. Here are the best options:

---

## 1. 🟢 Vercel (Recommended - Easiest)

**Best for:** Next.js apps (made by the creators of Next.js)

### Steps:

1. **Push your code to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configure Environment (if needed):**

   - In Vercel dashboard, go to Settings → Environment Variables
   - Add any environment variables

4. **Backend API:**
   - Deploy Express.js separately (see Backend Deployment below)
   - Update API URLs in your Next.js code

### Pros:

- ✅ Free tier available
- ✅ Automatic deployments on git push
- ✅ Built-in CDN
- ✅ Zero configuration for Next.js
- ✅ Custom domains

---

## 2. 🔵 Netlify

**Best for:** Static sites and Next.js

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify:**

   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

3. **Backend API:**
   - Deploy Express.js separately
   - Update API URLs

### Pros:

- ✅ Free tier available
- ✅ Easy setup
- ✅ Automatic deployments
- ✅ Custom domains

---

## 3. 🟣 Railway

**Best for:** Full-stack apps (Frontend + Backend together)

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Railway:**

   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will detect both Next.js and Express.js

3. **Configure Services:**
   - Create two services:
     - Service 1: Next.js (port 3000)
     - Service 2: Express.js (port 4000)
   - Set environment variables for API URL

### Pros:

- ✅ Can host both frontend and backend
- ✅ Free tier ($5 credit/month)
- ✅ Easy database integration
- ✅ Automatic deployments

---

## 4. 🔴 Render

**Best for:** Full-stack apps with free tier

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy Backend (Express.js):**

   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository
   - Settings:
     - Name: `nextshop-api`
     - Build Command: `npm install`
     - Start Command: `node server.js`
     - Port: `4000`
   - Click "Create Web Service"
   - Copy the service URL (e.g., `https://nextshop-api.onrender.com`)

3. **Deploy Frontend (Next.js):**

   - Click "New +" → "Static Site"
   - Connect same repository
   - Settings:
     - Name: `nextshop-frontend`
     - Build Command: `npm run build`
     - Publish Directory: `.next`
   - Add environment variable:
     - `NEXT_PUBLIC_API_URL=https://nextshop-api.onrender.com`
   - Click "Create Static Site"

4. **Update API URLs in code:**
   - Replace `http://localhost:4000` with your Render API URL

### Pros:

- ✅ Free tier available
- ✅ Can host both services
- ✅ PostgreSQL database available
- ✅ Automatic deployments

---

## 5. 🟠 Heroku

**Best for:** Traditional hosting

### Steps:

1. **Install Heroku CLI:**

   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Deploy Backend:**

   ```bash
   heroku login
   heroku create nextshop-api
   git push heroku main
   ```

3. **Deploy Frontend:**
   ```bash
   heroku create nextshop-frontend
   git push heroku main
   ```

### Note:

- ⚠️ No longer has free tier
- Requires credit card

---

## Backend Deployment Options

Since your app has an Express.js backend, you need to deploy it separately:

### Option A: Deploy Backend to Render/Railway/Heroku

- Best for production
- Persistent storage
- Always online

### Option B: Use Vercel Serverless Functions

Convert Express.js routes to Next.js API routes:

1. **Create API routes in Next.js:**

   ```javascript
   // src/app/api/products/route.js
   export async function GET() {
     // Your Express logic here
     return Response.json(products);
   }
   ```

2. **Move products.json to database:**
   - Use Vercel Postgres, MongoDB Atlas, or Supabase

---

## 📝 Pre-Deployment Checklist

### 1. Update API URLs

**Create environment variable file:**

```bash
# .env.local (for local development)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
# .env.production (for production)
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

**Update fetch calls:**

```javascript
// Before:
const res = await fetch("http://localhost:4000/api/products");

// After:
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
```

### 2. Update CORS in server.js

```javascript
// server.js
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-vercel-app.vercel.app",
      "https://your-custom-domain.com",
    ],
  })
);
```

### 3. Add Build Script

Your `package.json` already has the correct scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "server": "node server.js"
  }
}
```

### 4. Create .gitignore

Make sure you have:

```
node_modules/
.next/
.env.local
.env.production
products.json
```

---

## 🎯 Recommended Deployment Strategy

### For Quick Demo/Testing:

**Vercel (Frontend) + Render (Backend)**

- Deploy Next.js to Vercel (free, instant)
- Deploy Express.js to Render (free tier)
- Update API URLs
- Total time: ~10 minutes

### For Production:

**Railway (Full-stack)**

- Deploy both services together
- Add PostgreSQL database
- Replace JSON file storage
- Total time: ~30 minutes

---

## 🔧 Step-by-Step: Vercel + Render Deployment

### Part 1: Deploy Backend to Render

1. **Create account at render.com**

2. **Create Web Service:**

   - New + → Web Service
   - Connect GitHub repo
   - Name: `nextshop-api`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Click "Create Web Service"

3. **Copy your API URL:**
   - Example: `https://nextshop-api.onrender.com`

### Part 2: Update Code for Production

1. **Update all fetch URLs:**

```javascript
// src/app/products/page.jsx
const res = await fetch("https://nextshop-api.onrender.com/api/products", {
  cache: "no-store",
});

// src/app/products/[slug]/page.jsx
const res = await fetch(
  `https://nextshop-api.onrender.com/api/products/${id}`,
  {
    cache: "no-store",
  }
);

// src/app/dashboard/add-product/page.jsx
const res = await fetch("https://nextshop-api.onrender.com/api/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

2. **Update CORS in server.js:**

```javascript
app.use(
  cors({
    origin: ["https://your-app.vercel.app", "http://localhost:3000"],
  })
);
```

3. **Commit and push:**

```bash
git add .
git commit -m "Update API URLs for production"
git push
```

### Part 3: Deploy Frontend to Vercel

1. **Go to vercel.com**

2. **Import Project:**

   - New Project → Import Git Repository
   - Select your repo
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Done!** Your app is live at:
   - `https://your-app.vercel.app`

---

## 🌐 Custom Domain (Optional)

### Vercel:

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render:

1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## 📊 Database Migration (Optional)

To replace `products.json` with a real database:

### Option 1: MongoDB Atlas (Free)

```bash
npm install mongodb
```

### Option 2: Vercel Postgres

```bash
npm install @vercel/postgres
```

### Option 3: Supabase (Free)

```bash
npm install @supabase/supabase-js
```

---

## 🐛 Troubleshooting

### Issue: API not connecting

- ✅ Check CORS settings
- ✅ Verify API URL is correct
- ✅ Check backend service is running

### Issue: Build fails

- ✅ Run `npm run build` locally first
- ✅ Check for TypeScript/ESLint errors
- ✅ Verify all dependencies are in package.json

### Issue: Images not loading

- ✅ Check `next.config.mjs` has correct domains
- ✅ Verify image URLs are accessible

---

## 💰 Cost Comparison

| Platform          | Frontend | Backend | Database | Total/Month         |
| ----------------- | -------- | ------- | -------- | ------------------- |
| Vercel + Render   | Free     | Free    | -        | $0                  |
| Railway           | Free     | Free    | Free     | $0 (with $5 credit) |
| Netlify + Render  | Free     | Free    | -        | $0                  |
| Vercel + Supabase | Free     | -       | Free     | $0                  |

---

## ✅ Post-Deployment Checklist

- [ ] Frontend is accessible
- [ ] Backend API is responding
- [ ] Products page loads data
- [ ] Login works
- [ ] Add product works
- [ ] Images display correctly
- [ ] Mobile responsive
- [ ] Custom domain configured (optional)

---

## 🎉 You're Live!

Share your deployed app:

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

**Need help?** Check the platform documentation:

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
