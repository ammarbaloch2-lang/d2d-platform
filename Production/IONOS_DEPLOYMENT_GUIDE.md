# IONOS Deployment Guide for D2D Platform

## Step-by-Step Instructions

### Step 1: Build Your Application Locally

1. Open terminal in your project root directory
2. Run the build command:
   ```bash
   npm run build
   ```
3. This creates a `.next` folder with optimized production files

### Step 2: Set Up Node.js on IONOS

1. **Login to IONOS Control Panel**
   - Go to https://my.ionos.com/
   - Navigate to your hosting package

2. **Enable Node.js**
   - Click on "Set up infrastructure" (as shown in your screenshot)
   - Look for "Node.js" or "Application Management"
   - Enable Node.js hosting (version 18.x or higher recommended)

3. **Access SSH/FTP Credentials**
   - Note your:
     - Server address
     - SSH username
     - SSH password
     - FTP credentials

### Step 3: Prepare Files for Upload

Files to upload from your project:
```
✓ .next/                    (built production files)
✓ public/                   (static files and images)
✓ data/                     (tours.json database)
✓ node_modules/             (or install on server)
✓ package.json
✓ package-lock.json
✓ next.config.js
```

### Step 4: Upload to IONOS

**Option A: Using FTP (FileZilla)**

1. Download FileZilla: https://filezilla-project.org/
2. Connect to IONOS FTP:
   - Host: Your IONOS FTP address
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. Upload files to `/` or `/htdocs/` folder

**Option B: Using SSH/SCP (Recommended)**

1. Open terminal
2. Upload files:
   ```bash
   scp -r .next public data package.json package-lock.json next.config.js username@your-server.com:/path/to/deployment/
   ```

### Step 5: Install Dependencies on Server

1. Connect via SSH:
   ```bash
   ssh username@your-server.com
   ```

2. Navigate to deployment folder:
   ```bash
   cd /path/to/deployment/
   ```

3. Install Node.js dependencies:
   ```bash
   npm install --production
   ```

### Step 6: Configure Node.js Application

1. In IONOS Control Panel, go to Node.js App settings

2. Set configuration:
   - **Node.js Version:** 18.x or higher
   - **Application Root:** Path to your deployment folder
   - **Entry Point:** `node_modules/.bin/next`
   - **Arguments:** `start -p 3000`
   - **Environment Variables:**
     - `NODE_ENV=production`
     - `PORT=3000`

### Step 7: Start Application

1. In IONOS Panel, click "Start Application"
2. The app should now be running

### Step 8: Configure Domain & Reverse Proxy

1. **Point Domain to Application:**
   - IONOS should provide a way to route your domain to the Node.js app
   - Usually automatic if configured in the Node.js settings

2. **Or Configure .htaccess** (if needed):
   Create `.htaccess` in your web root:
   ```apache
   RewriteEngine On
   RewriteBase /

   # Don't rewrite files or directories
   RewriteCond %{REQUEST_FILENAME} -f [OR]
   RewriteCond %{REQUEST_FILENAME} -d
   RewriteRule ^ - [L]

   # Proxy to Node.js app on port 3000
   RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   ```

### Step 9: Test Your Deployment

Visit your domain:
- Homepage: `https://your-domain.com`
- Tours page: `https://your-domain.com/tours`
- Admin panel: `https://your-domain.com/admin`

### Step 10: Enable SSL/HTTPS

1. In IONOS Control Panel
2. Navigate to SSL Certificate section
3. Enable SSL for your domain
4. IONOS usually provides free SSL certificates

---

## Troubleshooting

### Application Won't Start
- Check Node.js version (must be 18+)
- Verify all files uploaded correctly
- Check logs in IONOS panel
- Ensure `npm install` completed successfully

### 502 Bad Gateway
- Application not running
- Wrong port configuration
- Check Node.js app status in IONOS panel

### Images Not Loading
- Verify `public/images/` folder uploaded
- Check file permissions
- Ensure paths are relative (`/images/...`)

### Data Not Persisting
- Ensure `data/` folder has write permissions
- Consider upgrading to database for production

---

## Important Notes

### File Permissions
If using SSH, set correct permissions:
```bash
chmod -R 755 /path/to/deployment
chown -R www-data:www-data /path/to/deployment
```

### Regular Backups
Backup these regularly:
- `/data/tours.json` (your database)
- `/public/images/` (tour images)

### Updating Your Application
To deploy updates:
1. Build locally: `npm run build`
2. Upload new `.next` folder
3. Restart Node.js app in IONOS panel

---

## Alternative: Use IONOS Deploy Now (Recommended)

IONOS offers "Deploy Now" which is similar to Vercel:

1. Push your code to GitHub
2. In IONOS panel, look for "Deploy Now"
3. Connect GitHub repository
4. Auto-deploy on every push

This is easier than manual deployment!

---

## Need Help?

- IONOS Support: https://www.ionos.com/help/
- Contact: Check your IONOS control panel for support options
- Next.js Docs: https://nextjs.org/docs/deployment
