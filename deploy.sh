#!/bin/bash

# Boss Rush - Stake.com Deployment Script
# This script builds and prepares the game for Stake.com deployment

echo "🎮 Boss Rush - Stake.com Deployment"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo "📦 Node.js version: $NODE_VERSION"

# Install dependencies
echo "📥 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

# Set production environment
export NODE_ENV=production
export STAKE_ENV=production

echo "🏗️  Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

# Copy math bundles to dist (ensure they're accessible)
echo "📊 Copying math bundles..."
mkdir -p dist/math
cp math/*.csv dist/math/ 2>/dev/null || echo "⚠️  Warning: No CSV files found in math/ directory"

# Copy public assets
echo "📁 Copying public assets..."
cp public/manifest.json dist/ 2>/dev/null || echo "⚠️  Warning: manifest.json not found"
cp public/stake-config.json dist/ 2>/dev/null || echo "⚠️  Warning: stake-config.json not found"

# Verify build
echo "🔍 Verifying build..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ Error: dist/index.html not found"
    exit 1
fi

if [ ! -d "dist/assets" ]; then
    echo "❌ Error: dist/assets directory not found"
    exit 1
fi

# Display build info
echo "✅ Build completed successfully!"
echo ""
echo "📋 Build Summary:"
echo "  - Output directory: ./dist/"
echo "  - Entry point: dist/index.html"
echo "  - Assets: dist/assets/"
echo "  - Math bundles: dist/math/"
echo "  - Game config: dist/stake-config.json"
echo ""

# Check file sizes
echo "📏 Build sizes:"
du -sh dist/
echo ""

# Display next steps
echo "🚀 Next Steps for Stake.com Deployment:"
echo ""
echo "1. 📤 Upload the entire 'dist/' folder to Stake.com"
echo "2. 🔧 Configure game settings in Stake admin panel:"
echo "   - Game ID: boss-rush-v1"
echo "   - Entry point: index.html"
echo "   - Category: Arcade"
echo "   - Min bet: 0.01 DOGE"
echo "   - Max bet: 1000 DOGE"
echo ""
echo "3. 🧪 Test in Stake staging environment first"
echo "4. ✅ Deploy to production after testing"
echo ""
echo "📞 Contact Stake.com support if you need help with:"
echo "   - Game submission process"
echo "   - SDK integration verification"
echo "   - Provably fair certification"
echo ""
echo "🎉 Your Boss Rush game is ready for Stake.com!"

# Optional: Create deployment package
if command -v zip &> /dev/null; then
    echo "📦 Creating deployment package..."
    cd dist
    zip -r ../boss-rush-stake-deployment.zip . -x "*.DS_Store" "*.git*"
    cd ..
    echo "✅ Created: boss-rush-stake-deployment.zip"
    echo "   You can upload this zip file directly to Stake.com"
fi