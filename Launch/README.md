# D2D Launch Page

This is a static welcome/loading page for the D2D (Dare to Discover) platform.

## Purpose

Use this page as a temporary landing page while the full D2D web application is being finalized. It provides:

- Beautiful, branded welcome message
- Loading animation
- Feature highlights
- Social media links
- Fully responsive design
- Matches D2D theme colors (Navy Blue #1a365d and Orange #ED8936)

## Features

- **Animated Loading**: Smooth loading spinner with rotating status messages
- **Floating Logo**: Eye-catching animated D2D logo
- **Feature Cards**: Highlights three key features of D2D tours
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Professional fade-in and floating effects
- **Social Links**: Placeholder links for Instagram, Twitter, and Facebook

## Files

- `index.html` - Main landing page (completely self-contained)
- `README.md` - This file

## Deployment Options

### Option 1: Upload to IONOS Webspace (Simplest)

1. **Login to IONOS**
   - Go to https://my.ionos.com
   - Navigate to your webspace

2. **Access File Manager or FTP**
   - Use IONOS File Manager, or
   - Connect via FTP client (FileZilla, Cyberduck, etc.)

3. **Upload**
   - Upload `index.html` to your webspace root directory (usually `/htdocs/`)
   - Rename it to `index.html` if needed

4. **Done!**
   - Your page is now live at your domain

### Option 2: Deploy to Vercel (Free & Fast)

1. **Create GitHub Repository**
   ```bash
   cd /Users/ammarbaloch/Documents/D2D/v2/Launch
   git init
   git add .
   git commit -m "Initial D2D launch page"
   git remote add origin https://github.com/YOUR-USERNAME/d2d-launch.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Done in 2 minutes!

3. **Connect Custom Domain**
   - In Vercel, go to Settings → Domains
   - Add your custom domain
   - Update DNS in IONOS to point to Vercel

### Option 3: Direct Upload to Any Hosting

Simply upload `index.html` to any web hosting service. The file is completely self-contained with no dependencies.

## Customization

### Update Social Links

Edit the social links section in `index.html`:

```html
<div class="social-links">
    <a href="YOUR_INSTAGRAM_URL" aria-label="Instagram">
    <a href="YOUR_TWITTER_URL" aria-label="Twitter">
    <a href="YOUR_FACEBOOK_URL" aria-label="Facebook">
</div>
```

### Change Status Messages

Edit the `statusTexts` array in the JavaScript section:

```javascript
const statusTexts = [
    'Loading your adventure...',
    'Preparing desert landscapes...',
    'Add your custom messages here...'
];
```

### Modify Features

Edit the features section to highlight different aspects:

```html
<div class="feature">
    <div class="feature-title">Your Feature</div>
    <div class="feature-description">Your description</div>
</div>
```

## Colors Used

- **Primary Navy**: `#1a365d` (Background)
- **Secondary Navy**: `#2d4a7a` (Gradient)
- **Primary Orange**: `#ED8936` (Accents, logo)
- **Dark Orange**: `#C05621` (Logo gradient)
- **White**: Text and accents

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Size

- Total: ~8KB (extremely lightweight)
- No external dependencies
- No images required
- Fast loading on any connection

## When to Replace

Replace this launch page with the full D2D web application when:
- All features are tested and working
- Production deployment is ready
- Content is finalized
- Simply point your domain to the Production folder deployment instead

## Support

For questions or customization help, refer to the main D2D project documentation.

---

**D2D - Dare to Discover Saudi Arabia**
*Your journey begins soon...*
