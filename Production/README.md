# IONOS Production Deployment Package

This folder contains everything you need to deploy your D2D Platform to IONOS hosting.

## 📋 Contents

- **IONOS_DEPLOYMENT_GUIDE.md** - Complete step-by-step deployment guide
- **build-instructions.sh** - Automated build script
- **upload-checklist.txt** - Checklist of files to upload
- **ionos-config-template.txt** - Configuration settings for IONOS panel
- **.htaccess** - Apache configuration for routing
- **package.json** - Simplified production package.json

## 🚀 Quick Start

### Option 1: Automated Build (Recommended)

```bash
# Navigate to project root
cd /Users/ammarbaloch/Documents/D2D/v2

# Run the build script
./Production/build-instructions.sh
```

This will create a `deployment-package` folder with everything ready to upload.

### Option 2: Manual Build

```bash
# 1. Build the application
npm run build

# 2. Manually copy these folders to IONOS:
- .next/
- public/
- data/
- package.json
- package-lock.json
- next.config.js
```

## 📤 Uploading to IONOS

### Method 1: FTP Upload (Easy)

1. Download FileZilla: https://filezilla-project.org/
2. Connect to IONOS FTP (credentials from IONOS panel)
3. Upload all files from `deployment-package` to your web directory

### Method 2: SSH/SCP Upload (Faster)

```bash
scp -r deployment-package/* username@your-ionos-server:/path/to/htdocs/
```

## ⚙️ IONOS Configuration

After uploading files:

1. **Install Dependencies on Server:**
   ```bash
   ssh username@your-ionos-server
   cd /path/to/htdocs/
   npm install --production
   ```

2. **Configure Node.js App in IONOS Panel:**
   - Node.js Version: 18.x+
   - Entry Point: `node_modules/.bin/next`
   - Arguments: `start -p 3000`
   - Port: 3000
   - Environment: `NODE_ENV=production`

3. **Start Application**
   - Click "Start" in IONOS Node.js app panel
   - Visit your domain to verify

## 📚 Documentation

See **IONOS_DEPLOYMENT_GUIDE.md** for detailed instructions, troubleshooting, and configuration options.

## ⚠️ Important Notes

- **Data Persistence:** The `data/tours.json` file stores your tours. Back it up regularly!
- **Images:** Ensure all images in `public/images/` are uploaded
- **SSL:** Enable SSL certificate in IONOS panel for HTTPS
- **Updates:** To deploy updates, rebuild and upload new `.next` folder

## 🔧 Troubleshooting

### App won't start?
- Check Node.js version is 18+
- Verify `npm install` completed successfully
- Check IONOS logs for errors

### 404 errors?
- Verify `.htaccess` is uploaded and configured
- Check Apache mod_rewrite is enabled

### Images not loading?
- Confirm `public/images/` folder uploaded
- Check file paths are relative (`/images/...`)

## 📞 Support

- IONOS Support: https://www.ionos.com/help/
- Next.js Docs: https://nextjs.org/docs/deployment
- Project Issues: Check the main project README

---

**Ready to deploy?** Follow the guide in **IONOS_DEPLOYMENT_GUIDE.md**
