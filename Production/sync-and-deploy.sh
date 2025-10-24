#!/bin/bash

# D2D Platform - Sync Development to Production & Build
# Run this script whenever you want to update production with tested changes

set -e  # Exit on error

echo "================================================"
echo "D2D Platform - Production Deployment Preparation"
echo "================================================"
echo ""

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PRODUCTION_DIR="$SCRIPT_DIR/d2d-project"

echo "📁 Project Root: $PROJECT_ROOT"
echo "📁 Production Dir: $PRODUCTION_DIR"
echo ""

# Step 1: Confirm sync
echo "⚠️  This will sync your development code to the Production folder."
read -p "Continue? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 1
fi

# Step 2: Backup production data (if exists)
if [ -f "$PRODUCTION_DIR/data/tours.json" ]; then
    echo "💾 Backing up production data..."
    cp "$PRODUCTION_DIR/data/tours.json" "$SCRIPT_DIR/tours-backup-$(date +%Y%m%d-%H%M%S).json"
    echo "✓ Backup created"
fi

# Step 3: Sync files
echo ""
echo "🔄 Syncing development to production..."
rsync -av --progress \
  --exclude 'Production' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude '.env.local' \
  --exclude '.vscode' \
  --exclude 'deployment-package' \
  "$PROJECT_ROOT/" "$PRODUCTION_DIR/"

echo ""
echo "✓ Sync completed"

# Step 4: Install dependencies
echo ""
echo "📦 Installing production dependencies..."
cd "$PRODUCTION_DIR"
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"

# Step 5: Build
echo ""
echo "🔨 Building production version..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✓ Build completed successfully"

# Step 6: Summary
echo ""
echo "================================================"
echo "✅ PRODUCTION BUILD READY FOR IONOS!"
echo "================================================"
echo ""
echo "📦 Production folder: $PRODUCTION_DIR"
echo ""
echo "Next Steps:"
echo "1. Upload to IONOS using FTP or SSH"
echo "2. Files to upload:"
echo "   - .next/ folder"
echo "   - public/ folder"
echo "   - data/ folder"
echo "   - package.json"
echo "   - package-lock.json"
echo "   - next.config.js"
echo ""
echo "3. On IONOS server, run:"
echo "   npm install --production"
echo ""
echo "4. Configure Node.js app in IONOS panel"
echo "5. Start the application"
echo ""
echo "📚 See IONOS_DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""

# Display build size
if [ -d "$PRODUCTION_DIR/.next" ]; then
    BUILD_SIZE=$(du -sh "$PRODUCTION_DIR/.next" | cut -f1)
    echo "📊 Build size: $BUILD_SIZE"
fi

echo ""
