# ⚡ Quick Deploy Guide (5 Minutes)

## Fastest Way to Deploy Your App

### 🎯 Recommended: Vercel (Frontend) + Render (Backend)

---

## Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repository on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/nextshop.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render (2 minutes)

1. Go to **[render.com](https://render.com)** → Sign up with GitHub

2. Click **"New +"** → **"Web Service"**

3. Connect your GitHub repository

4. Fill in:

   - **Name:** `nextshop-api`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Port:** Leave default

5. Click **"Create Web Service"**

6. **Copy your API URL** (looks like: `https://nextshop-api.onrender.com`)

---

## Step 3: Update API URLs in Code (1 minute)

Replace all instances of `http://localhost:4000` with your Render URL:

### Files to update:

**1. src/app/products/page.jsx**

```javascript
// Line 6 - Change:
const res = await fetch("http://localhost:4000/api/products", {

// To:
const res = await fetch("https://nextshop-api.onrender.com/api/products", {
```

**2. src/app/products/[slug]/page.jsx**

```javascript
// Line 5 - Change:
const res = await fetch(`http://localhost:4000/api/products/${id}`, {

// To:
const res = await fetch(`https://nextshop-api.onrender.com/api/products/${id}`, {
```

**3. src/app/dashboard/add-product/page.jsx**

```javascript
// Line 35 - Change:
const res = await fetch("http://localhost:4000/api/products", {

// To:
const res = await fetch("https://nextshop-api.onrender.com/api/products", {
```

**4. server.js**

```javascript
// Add after line 11 (after app.use(express.json());):
app.use(
  cors({
    origin: ["https://your-app-name.vercel.app", "http://localhost:3000"],
  })
);
```

### Push changes:

```bash
git add .
git commit -m "Update API URLs for production"
git push
```

---

## Step 4: Deploy Frontend to Vercel (1 minute)

1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub

2. Click **"Add New..."** → **"Project"**

3. **Import** your GitHub repository

4. Vercel will auto-detect Next.js settings

5. Click **"Deploy"**

6. Wait ~2 minutes for build to complete

7. **Your app is live!** 🎉

---

## Step 5: Update CORS (30 seconds)

1. Copy your Vercel URL (e.g., `https://nextshop-abc123.vercel.app`)

2. Update `server.js` CORS:

```javascript
app.use(
  cors({
    origin: ["https://nextshop-abc123.vercel.app", "http://localhost:3000"],
  })
);
```

3. Push changes:

```bash
git add .
git commit -m "Update CORS for Vercel"
git push
```

4. Render will auto-redeploy

---

## ✅ Done! Your App is Live

- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://nextshop-api.onrender.com`

### Test it:

1. Visit your Vercel URL
2. Click "Products" - should load products
3. Login with: `mockadmin@gmail.com` / `123456`
4. Try adding a product

---

## 🐛 If Something Doesn't Work

### Products not loading?

- Check if Render backend is running (visit `https://your-api.onrender.com/api/products`)
- Verify API URLs are updated in all files
- Check browser console for errors

### CORS errors?

- Make sure Vercel URL is in CORS origin array in server.js
- Push changes and wait for Render to redeploy

### Images not loading?

- Already configured in `next.config.mjs` ✅

---

## 🎨 Optional: Custom Domain

### Vercel:

1. Project Settings → Domains
2. Add your domain
3. Update DNS as instructed

### Render:

1. Service Settings → Custom Domain
2. Add your domain
3. Update DNS as instructed

---

## 💡 Pro Tips

1. **Free Tier Limits:**

   - Render: Backend sleeps after 15 min of inactivity (wakes up in ~30 seconds)
   - Vercel: Unlimited bandwidth for personal projects

2. **Automatic Deployments:**

   - Every `git push` triggers new deployment
   - Vercel: Instant preview URLs for each commit
   - Render: Auto-deploys on push

3. **Environment Variables:**
   - Use Vercel dashboard to add env vars
   - Use Render dashboard for backend env vars

---

## 📱 Share Your App

Your app is now live and accessible worldwide!

**Frontend URL:** `https://your-app.vercel.app`

Share it with:

- Friends and family
- On your portfolio
- On LinkedIn
- In your resume

---

## 🚀 Next Steps

1. **Add a Database:**

   - Replace `products.json` with MongoDB Atlas (free)
   - Or use Vercel Postgres

2. **Add Real Authentication:**

   - Implement NextAuth.js
   - Add Google/GitHub login

3. **Add More Features:**

   - Shopping cart
   - Payment integration (Stripe)
   - User profiles
   - Order history

4. **Monitor Your App:**
   - Vercel Analytics (free)
   - Render logs for backend

---

## 🎉 Congratulations!

You've successfully deployed a full-stack Next.js application!

**Total Time:** ~5 minutes
**Total Cost:** $0 (Free tier)
**Status:** Production-ready ✅
