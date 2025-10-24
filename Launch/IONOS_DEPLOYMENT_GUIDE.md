# Deploy D2D Launch Page to IONOS Webspace

## 📋 What You Need

- IONOS Webspace login credentials
- FTP access details (available in IONOS control panel)
- The files from this Launch folder

## 📁 Files to Upload

From the Launch folder, you need to upload:
- ✅ `index.html` - The main page
- ✅ `logo.png` - The D2D logo

That's it! Only 2 files needed.

---

## 🚀 Deployment Steps

### Method 1: Using IONOS File Manager (Easiest - No Software Needed)

#### Step 1: Login to IONOS

1. Go to: https://my.ionos.com
2. Login with your credentials
3. Navigate to **"Hosting"** or **"Webspace & Domains"**

#### Step 2: Access File Manager

1. Find your webspace package
2. Click on **"Webspace"** or **"Manage Webspace"**
3. Click **"File Manager"** or **"Open File Manager"**

#### Step 3: Upload Files

1. In File Manager, navigate to the **root directory** (usually `/` or `/htdocs/`)
2. Look for existing files like `index.html` (if any)
3. **OPTIONAL**: If there's an old `index.html`, you might want to:
   - Rename it to `index_old.html` (as backup)
   - Or delete it if you're sure you don't need it

4. **Upload the files:**
   - Click **"Upload"** button
   - Select `index.html` from your Launch folder
   - Upload `logo.png` as well
   - Wait for upload to complete (should be instant - files are very small)

#### Step 4: Verify

1. Open your browser
2. Go to your domain (e.g., `http://yourdomain.com`)
3. You should see the D2D launch page with rotating animations!

---

### Method 2: Using FTP Client (FileZilla - More Control)

#### Step 1: Get FTP Credentials

1. Login to IONOS: https://my.ionos.com
2. Go to **"Hosting"** → Your package
3. Click **"FTP Access"** or **"Access & Settings"**
4. You'll see:
   - **FTP Server/Host**: (e.g., `yoursite.com` or IP address)
   - **Username**: (your FTP username)
   - **Password**: (click to reveal or reset)
   - **Port**: Usually `21`

#### Step 2: Download FileZilla (If you don't have it)

1. Go to: https://filezilla-project.org/download.php?type=client
2. Download the **free client version**
3. Install it on your computer

#### Step 3: Connect via FileZilla

1. Open FileZilla
2. Enter your FTP details at the top:
   - **Host**: Your FTP server address
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: `21`
3. Click **"Quickconnect"**

#### Step 4: Navigate and Upload

1. **On the right side** (Remote Site):
   - Navigate to the root directory (`/` or `/htdocs/`)
   - This is where your website files go

2. **On the left side** (Local Site):
   - Navigate to: `/Users/ammarbaloch/Documents/D2D/v2/Launch/`

3. **Upload the files:**
   - Select `index.html` and `logo.png` on the left
   - Right-click → **"Upload"**
   - Or drag and drop to the right side
   - Wait for transfer to complete

#### Step 5: Set Permissions (Usually automatic)

1. Right-click on `index.html` in FileZilla (right side)
2. Click **"File Permissions"**
3. Make sure it's set to **644** or **755**
4. Click OK

#### Step 6: Verify

1. Open your browser
2. Visit your domain
3. See your beautiful D2D launch page!

---

## 📍 File Locations

After upload, your files should be at:
```
/htdocs/
  ├── index.html
  └── logo.png
```

Or simply:
```
/
  ├── index.html
  └── logo.png
```

---

## ✅ Success Checklist

- [ ] Logged into IONOS
- [ ] Accessed File Manager or FTP
- [ ] Uploaded `index.html`
- [ ] Uploaded `logo.png`
- [ ] Verified files are in root directory
- [ ] Visited your domain in browser
- [ ] Saw the D2D launch page with animations

---

## 🔧 Troubleshooting

### Issue: Page not showing, shows old content

**Solution:**
- Clear your browser cache: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Try a different browser or incognito/private mode
- Make sure `index.html` is in the root directory

### Issue: Logo not showing

**Solution:**
- Check that `logo.png` is in the **same directory** as `index.html`
- Check file name is exactly `logo.png` (lowercase)
- Re-upload the logo file

### Issue: Can't connect via FTP

**Solution:**
- Double-check FTP credentials in IONOS panel
- Try resetting your FTP password
- Make sure you're using port `21`
- Check if your firewall is blocking FTP

### Issue: "Permission Denied" error

**Solution:**
- Check file permissions (should be 644 or 755)
- Contact IONOS support if issue persists

---

## 🎨 Customization After Upload

If you want to change anything later:

1. **Edit locally** in `/Users/ammarbaloch/Documents/D2D/v2/Launch/index.html`
2. **Re-upload** the modified `index.html` via File Manager or FTP
3. **Clear cache** and refresh browser

---

## 🌐 What Visitors Will See

When anyone visits your domain, they'll see:
- ✨ Animated D2D logo
- ✨ Bold D2D branding
- ✨ 4 rotating adventure scenes:
  - Desert off-road 4x4
  - Camel caravan
  - Hot air balloon over heritage site
  - Night camping with campfire
- ✨ Feature highlights
- ✨ Professional loading experience

---

## 🔄 When to Replace

When your full D2D web application is ready:
1. Simply upload the Production build files
2. They will replace this launch page
3. Your full site goes live!

---

## 📞 Need Help?

- **IONOS Support**: Access via your IONOS dashboard
- **FTP Help**: https://www.ionos.com/help/hosting/ftp-access/
- **File Manager Help**: Check IONOS help center

---

## ⏱️ Time Required

- **Using File Manager**: 2-5 minutes
- **Using FTP (first time)**: 5-10 minutes
- **Using FTP (if familiar)**: 2 minutes

---

**Ready to deploy? Follow the steps above and your D2D launch page will be live in minutes!** 🚀
