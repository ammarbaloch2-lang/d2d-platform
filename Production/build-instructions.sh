#!/bin/bash

# D2D Platform - Build Script for IONOS Deployment
# Run this script before uploading to IONOS

echo "================================================"
echo "Building D2D Platform for IONOS Deployment"
echo "================================================"
echo ""

# Step 1: Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "✓ Found package.json"
echo ""

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Step 3: Build the application
echo "🔨 Building production version..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✓ Build completed successfully"
echo ""

# Step 4: Create deployment package
echo "📦 Creating deployment package..."

# Create a deployment folder
rm -rf deployment-package
mkdir -p deployment-package

# Copy necessary files
echo "  Copying .next folder..."
cp -r .next deployment-package/

echo "  Copying public folder..."
cp -r public deployment-package/

echo "  Copying data folder..."
cp -r data deployment-package/

echo "  Copying configuration files..."
cp package.json deployment-package/
cp package-lock.json deployment-package/
cp next.config.js deployment-package/

if [ -f "Production/.htaccess" ]; then
    cp Production/.htaccess deployment-package/
fi

echo "✓ Deployment package created"
echo ""

# Step 5: Display summary
echo "================================================"
echo "✅ BUILD COMPLETED SUCCESSFULLY!"
echo "================================================"
echo ""
echo "Next Steps:"
echo "1. The 'deployment-package' folder contains all files for IONOS"
echo "2. Upload contents of 'deployment-package' to your IONOS server"
echo "3. SSH into IONOS and run: npm install --production"
echo "4. Configure Node.js app in IONOS control panel"
echo "5. Start your application"
echo ""
echo "See Production/IONOS_DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""

# Display deployment package size
PACKAGE_SIZE=$(du -sh deployment-package | cut -f1)
echo "Deployment package size: $PACKAGE_SIZE"
echo ""
