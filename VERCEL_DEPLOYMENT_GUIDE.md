# D2D Tourism Platform - Vercel Deployment Guide

This guide will help you deploy your D2D Tourism Platform to Vercel with your custom domain.

## 📋 Prerequisites

- ✅ Git repository initialized (Already done!)
- ✅ GitHub account (You'll need to create one if you don't have it)
- ✅ Vercel account (We'll create this)
- ✅ Your custom domain (dare2discover.sa)

---

## Step 1: Create GitHub Account (if you don't have one)

1. Go to https://github.com/signup
2. Enter your email address
3. Create a password
4. Choose a username
5. Verify your account

---

## Step 2: Create a New GitHub Repository

1. Go to https://github.com/new
2. Repository name: `d2d-tourism-platform` (or any name you prefer)
3. Description: `D2D Tourism Platform - Saudi Arabia Tours & Experiences`
4. Choose **Private** (recommended) or Public
5. **DO NOT** initialize with README (we already have files)
6. Click **Create repository**

---

## Step 3: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/d2d-tourism-platform.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR-USERNAME` with your actual GitHub username.

If prompted for credentials:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)
  - Create token at: https://github.com/settings/tokens
  - Select "repo" scope
  - Save the token securely

---

## Step 4: Create Vercel Account

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Complete the sign-up process

---

## Step 5: Deploy to Vercel

1. Once logged in to Vercel, click **"Add New..."** → **"Project"**
2. **Import Git Repository:**
   - You'll see your GitHub repositories
   - Find `d2d-tourism-platform`
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `next build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Environment Variables:**
   Click **"Environment Variables"** and add these:

   ```
   SMTP_HOST=smtp.ionos.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=contact@dare2discover.sa
   SMTP_PASS=Contact@2030
   SMTP_FROM=contact@dare2discover.sa
   ```

   **Important:** Add these to **all environments** (Production, Preview, Development)

5. Click **"Deploy"**

6. Wait 2-3 minutes for deployment to complete ✨

---

## Step 6: Your Site is Live!

After deployment completes, Vercel will give you a URL like:
```
https://d2d-tourism-platform-abc123.vercel.app
```

🎉 **Test your site** - Click the URL to see your live website!

---

## Step 7: Add Your Custom Domain (dare2discover.sa)

### A. In Vercel Dashboard:

1. Go to your project in Vercel
2. Click **"Settings"** tab
3. Click **"Domains"** in the sidebar
4. Enter your domain: `dare2discover.sa`
5. Click **"Add"**
6. Also add: `www.dare2discover.sa`

Vercel will show you DNS records to add.

### B. In Your Domain Registrar (where you bought dare2discover.sa):

You need to add these DNS records:

**For dare2discover.sa (root domain):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.dare2discover.sa:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Steps in your domain registrar:**
1. Log in to your domain registrar (IONOS, GoDaddy, Namecheap, etc.)
2. Go to DNS settings / DNS management
3. Add the A record for root domain
4. Add the CNAME record for www subdomain
5. Save changes

**Note:** DNS changes can take 24-48 hours to propagate (usually much faster, often within 1 hour)

---

## Step 8: Verify Domain

1. Back in Vercel, wait a few minutes
2. Click **"Refresh"** next to your domain
3. Once verified, you'll see a checkmark ✓
4. Vercel automatically provisions SSL certificate (HTTPS)

---

## Step 9: Test Everything

Visit your domain:
- https://dare2discover.sa
- https://www.dare2discover.sa

Test these features:
- ✅ Homepage loads
- ✅ Tours page shows tour data
- ✅ Contact form (send a test email)
- ✅ Gallery page
- ✅ All navigation works

---

## 🔄 Future Updates

To update your website:

1. Make changes to your code locally
2. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Vercel automatically detects the push and redeploys!
4. Your site updates in ~2 minutes

---

## 📊 Vercel Dashboard Features

After deployment, you can use:

- **Analytics:** See visitor stats
- **Logs:** Debug any issues
- **Deployments:** View deployment history
- **Preview Deployments:** Every git branch gets a preview URL

---

## ⚠️ Important Notes

### Email Configuration

The contact form will work on Vercel, but you should verify SMTP settings work:

1. Test the contact form after deployment
2. If emails don't send, check:
   - Environment variables are set correctly
   - IONOS allows SMTP from external servers
   - Check Vercel function logs for errors

### File System Storage

**Important:** The `data/tours.json` file won't persist on Vercel because Vercel is serverless.

**Solutions:**
1. **For now:** Tours are stored in JSON file (will reset on each deployment)
2. **Recommended for production:**
   - Use a database (MongoDB, PostgreSQL, etc.)
   - I can help you set this up later

### Current Limitations on Vercel

- ✅ Contact form works
- ✅ All pages work
- ✅ Tours display works
- ⚠️ Tour data resets to default on each deployment
- ⚠️ Admin changes to tours don't persist

---

## 🆘 Troubleshooting

### "Failed to fetch /api/tours"
- Wait a few seconds after page load
- Check Vercel function logs in dashboard
- Verify deployment completed successfully

### Domain not working
- DNS can take up to 48 hours
- Verify DNS records are correct
- Use https://dnschecker.org to check propagation

### Contact form not sending emails
- Check environment variables in Vercel
- Check function logs in Vercel dashboard
- Verify SMTP credentials are correct

---

## 🚀 You're All Set!

Your D2D Tourism Platform is now live on the internet!

**Next Steps:**
1. Share your website URL with others
2. Monitor analytics in Vercel dashboard
3. Make updates by pushing to GitHub

**Need Help?**
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

**Generated:** October 24, 2025
**Platform:** Next.js 15.5.5 on Vercel
