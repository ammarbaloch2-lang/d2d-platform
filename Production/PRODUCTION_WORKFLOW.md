# Production Workflow Guide

## 📁 Folder Structure

```
/Users/ammarbaloch/Documents/D2D/v2/
├── (Your Development Environment)
│   ├── All source files
│   ├── Testing and development
│   └── Run: npm run dev
│
└── Production/
    ├── d2d-project/           (Production-ready code)
    ├── IONOS_DEPLOYMENT_GUIDE.md
    ├── build-instructions.sh
    └── Other deployment files
```

## 🔄 Workflow: Development to Production

### Step 1: Development & Testing
Work in the **main project folder** (outside Production):
```bash
cd /Users/ammarbaloch/Documents/D2D/v2
npm run dev
# Test your changes at http://localhost:3001
```

### Step 2: Update Production Code
When you're ready to deploy tested changes:

**Option A: Copy specific changes**
```bash
# Copy updated files to Production
cp app/page.tsx Production/d2d-project/app/
cp components/Header.tsx Production/d2d-project/components/
# etc...
```

**Option B: Sync entire project (Recommended)**
```bash
# From project root
rsync -av --progress \
  --exclude 'Production' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  . Production/d2d-project/
```

### Step 3: Build for Production
```bash
cd Production/d2d-project
npm install
npm run build
```

### Step 4: Deploy to IONOS
Upload the following from `Production/d2d-project`:
- `.next/` folder
- `public/` folder
- `data/` folder
- `package.json`
- `next.config.js`

See `IONOS_DEPLOYMENT_GUIDE.md` for detailed upload instructions.

---

## 🎯 Quick Deploy Script

Use this script to automate the process:

```bash
#!/bin/bash
# File: Production/deploy-to-ionos.sh

echo "🔄 Syncing development to production..."
cd /Users/ammarbaloch/Documents/D2D/v2

rsync -av --progress \
  --exclude 'Production' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  . Production/d2d-project/

echo "📦 Installing dependencies..."
cd Production/d2d-project
npm install

echo "🔨 Building production version..."
npm run build

echo "✅ Production build ready!"
echo ""
echo "Next steps:"
echo "1. Upload Production/d2d-project to IONOS"
echo "2. Follow IONOS_DEPLOYMENT_GUIDE.md"
```

---

## 📝 Best Practices

### Development Environment
- ✅ Test all changes locally first
- ✅ Use `npm run dev` for development
- ✅ Keep your development database separate
- ✅ Use git for version control

### Production Environment
- ✅ Only deploy tested code
- ✅ Always backup `data/tours.json` before deployment
- ✅ Test the build locally before uploading
- ✅ Keep production data separate from dev data

### Data Management
- **Development:** Use `data/tours.json` in main folder
- **Production:** Use `Production/d2d-project/data/tours.json`
- **Never** overwrite production data with dev data!

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Remove all console.log statements
- [ ] Set NODE_ENV=production
- [ ] Enable SSL/HTTPS on IONOS
- [ ] Secure admin routes with authentication
- [ ] Review and update .gitignore
- [ ] Don't commit sensitive data

---

## 🚀 Deployment Checklist

- [ ] All changes tested in development
- [ ] Code synced to Production/d2d-project
- [ ] Dependencies installed (`npm install`)
- [ ] Production build successful (`npm run build`)
- [ ] Backup current production data
- [ ] Upload to IONOS via FTP/SSH
- [ ] Run `npm install --production` on server
- [ ] Restart Node.js application
- [ ] Test live website
- [ ] Verify all features working

---

## 🔄 Updating Production After Changes

### For Code Changes:
1. Test in development
2. Sync to Production folder
3. Rebuild: `cd Production/d2d-project && npm run build`
4. Upload new `.next` folder to IONOS
5. Restart application

### For Data Changes (Tours, etc.):
1. Make changes in admin panel on live site
2. Backup `data/tours.json` from server
3. Or manually edit `Production/d2d-project/data/tours.json` and upload

### For Image Changes:
1. Add images to `Production/d2d-project/public/images/`
2. Upload to IONOS `public/images/` folder
3. No rebuild needed!

---

## 📊 Monitoring Production

After deployment:
- Check server logs in IONOS panel
- Monitor application performance
- Test all user flows
- Verify data persistence
- Check image loading
- Test on mobile devices

---

## 🆘 Rollback Procedure

If something goes wrong:
1. Keep previous `.next` folder as backup
2. Upload old `.next` folder to server
3. Restart application
4. Restore previous `data/tours.json` backup

---

## 📞 Support Resources

- **IONOS Guide:** `IONOS_DEPLOYMENT_GUIDE.md`
- **Build Script:** `build-instructions.sh`
- **Deployment Checklist:** `upload-checklist.txt`
- **IONOS Support:** https://www.ionos.com/help/

---

**Remember:** Development folder = Testing | Production folder = Deployment to IONOS
