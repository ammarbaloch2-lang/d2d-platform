# Quick Deployment Checklist ✅

Follow these steps in order:

## 1️⃣ Create GitHub Account
- Go to: https://github.com/signup
- Sign up with your email

## 2️⃣ Create GitHub Repository
- Go to: https://github.com/new
- Name: `d2d-tourism-platform`
- Privacy: Private
- Click "Create repository"

## 3️⃣ Push Code to GitHub

Run these commands in your terminal (in the v2 folder):

```bash
# Add your GitHub repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/d2d-tourism-platform.git

# Push code
git branch -M main
git push -u origin main
```

**Need a token?** https://github.com/settings/tokens (Select "repo" scope)

## 4️⃣ Deploy to Vercel
- Go to: https://vercel.com/signup
- Sign in with GitHub
- Click "Add New Project"
- Import your `d2d-tourism-platform` repo
- Add environment variables:
  ```
  SMTP_HOST=smtp.ionos.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=contact@dare2discover.sa
  SMTP_PASS=Contact@2030
  SMTP_FROM=contact@dare2discover.sa
  ```
- Click "Deploy"

## 5️⃣ Add Custom Domain
In Vercel:
- Settings → Domains
- Add: `dare2discover.sa` and `www.dare2discover.sa`

In your domain registrar DNS settings:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 6️⃣ Done! 🎉
Your site will be live at:
- https://dare2discover.sa
- Temporary Vercel URL while DNS propagates

---

**For detailed instructions, see:** `VERCEL_DEPLOYMENT_GUIDE.md`
