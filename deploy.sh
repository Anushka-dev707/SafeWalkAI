#!/bin/bash
# SafeWalk Deployment Script for Production

set -e

echo "🚀 SafeWalk Deployment Script"
echo "=============================="

# Check prerequisites
echo "\n✓ Checking prerequisites..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm is required"
    exit 1
fi

# Backend Setup
echo "\n📦 Setting up backend..."
cd SafeWalk/backend
pip install -r requirements.txt
echo "✓ Backend dependencies installed"

# Frontend Setup
echo "\n🎨 Setting up frontend..."
cd ../frontend
npm ci  # Use ci for production (more reliable)
echo "✓ Frontend dependencies installed"

# Build Frontend
echo "\n🏗️  Building frontend..."
npm run build
echo "✓ Frontend built successfully"

# Create .env files if they don't exist
echo "\n⚙️ Configuring environment..."

if [ ! -f frontend/.env.production ]; then
    echo "Creating frontend/.env.production..."
    cat > frontend/.env.production << EOF
VITE_API_URL=${BACKEND_URL:-https://your-backend-url.com}
EOF
fi

if [ ! -f backend/.env.production ]; then
    echo "Creating backend/.env.production..."
    cat > backend/.env.production << EOF
FRONTEND_URL=${FRONTEND_URL:-https://your-frontend-url.com}
HOST=0.0.0.0
PORT=8000
EOF
fi

echo "✓ Environment files configured"

echo "\n✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review the DEPLOYMENT.md file for your chosen platform"
echo "2. Set the following environment variables in your deployment:"
echo "   - Backend: FRONTEND_URL"
echo "   - Frontend: VITE_API_URL"
echo "3. Deploy using your preferred platform"
echo ""
echo "🔗 Generated files:"
echo "   - frontend/dist/ (ready for deployment)"
echo "   - .env.production files"
echo "   - DEPLOYMENT.md (deployment guide)"
