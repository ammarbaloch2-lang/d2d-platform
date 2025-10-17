# D2D Platform Deployment Guide

## Pre-Deployment Checklist

- [ ] Test the application locally (`npm run dev`)
- [ ] Build successfully (`npm run build`)
- [ ] All images in `/public/images` directory
- [ ] Environment variables configured (if any)
- [ ] Database/data files ready (`/data/tours.json`)

---

## Option 1: Vercel (Recommended - Free & Easy)

### Why Vercel?
- Built by Next.js creators
- Automatic HTTPS & CDN
- Zero configuration
- Free tier available
- Excellent performance

### Steps:

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub/GitLab/Bitbucket
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your domain (e.g., dare2discover.com)
   - Update DNS records as instructed
   - Vercel automatically provisions SSL

**Done! Your site is live at `https://your-app.vercel.app`**

---

## Option 2: Traditional Web Hosting (cPanel/Shared Hosting)

### Requirements:
- Node.js 18+ support
- SSH access (preferred)
- At least 1GB RAM

### Steps:

#### 1. **Prepare Application**

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-domain.com',
      },
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
```

#### 2. **Build Application**
```bash
npm run build
```

#### 3. **Upload Files**

Upload these files/folders via FTP/SSH:
- `.next/` (entire folder)
- `public/` (entire folder)
- `data/` (entire folder)
- `node_modules/` (or install on server)
- `package.json`
- `next.config.js`

#### 4. **Server Setup (cPanel)**

1. Enable Node.js App in cPanel
2. Create Node.js application:
   - **Node.js version:** 18.x or higher
   - **Application root:** `/home/username/public_html`
   - **Application URL:** your-domain.com
   - **Application startup file:** `node_modules/.bin/next`
   - **Arguments:** `start -p 3000`

3. Install dependencies:
   ```bash
   cd /home/username/public_html
   npm install --production
   ```

4. Start application

#### 5. **Apache Configuration** (if needed)

Create `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## Option 3: VPS/Cloud Server (DigitalOcean, AWS, etc.)

### Steps:

#### 1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### 2. **Upload Application**
```bash
# On your local machine
rsync -avz --exclude 'node_modules' . user@your-server:/var/www/d2d/
```

#### 3. **Install & Build**
```bash
# On server
cd /var/www/d2d
npm install
npm run build
```

#### 4. **Start with PM2**
```bash
pm2 start npm --name "d2d-app" -- start
pm2 save
pm2 startup
```

#### 5. **Configure Nginx Reverse Proxy**

Create `/etc/nginx/sites-available/d2d`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/d2d /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 6. **SSL Certificate (Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Option 4: Docker Deployment

### Steps:

#### 1. **Build Docker Image**
```bash
docker build -t d2d-platform .
```

#### 2. **Run Container**
```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  --name d2d-app \
  d2d-platform
```

#### 3. **Docker Compose** (Optional)

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## Post-Deployment Steps

### 1. **Test the Deployment**
- Visit your domain
- Test all pages (home, tours, admin)
- Upload/edit tours in admin panel
- Check image loading
- Test booking flow

### 2. **Monitor Application**
- Check server logs
- Monitor performance
- Set up error tracking (Sentry, LogRocket)

### 3. **Backup Data**
- Regular backups of `/data/tours.json`
- Backup images in `/public/images`
- Consider using database for production

### 4. **Security**
- Enable HTTPS/SSL
- Secure admin routes (add authentication)
- Set up firewall rules
- Regular security updates

---

## Important Notes

### File Persistence
Your current setup uses file-based storage (`data/tours.json`). For production:

**Option A:** Continue with file storage
- Ensure regular backups
- Set proper file permissions
- Consider using cloud storage (AWS S3, etc.)

**Option B:** Migrate to database (Recommended for production)
- PostgreSQL, MySQL, or MongoDB
- Better scalability and reliability
- Handles concurrent writes safely

### Image Hosting
Current setup uses local `/public/images`:

**For Production:**
- Consider CDN (Cloudflare, AWS CloudFront)
- Or image hosting service (Cloudinary, imgix)
- Better performance and bandwidth

### Environment Variables
Create `.env.local` for sensitive data:
```env
NEXT_PUBLIC_API_URL=https://your-domain.com
ADMIN_PASSWORD=your-secure-password
```

Never commit `.env.local` to git!

---

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### File Permission Issues
```bash
chmod -R 755 /var/www/d2d
chown -R www-data:www-data /var/www/d2d
```

---

## Need Help?

- **Next.js Docs:** https://nextjs.org/docs/deployment
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/next.js/discussions

---

**Recommended:** Start with Vercel for fastest deployment, then migrate to VPS if you need more control.
