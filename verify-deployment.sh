#!/bin/bash
# Pre-Deployment Verification Checklist

echo "🔍 SafeWalk Pre-Deployment Verification"
echo "========================================"
echo ""

ERRORS=0

# Check 1: Backend dependencies
echo "✓ Checking backend dependencies..."
cd SafeWalk/backend
if python -m pip show fastapi > /dev/null 2>&1; then
    echo "  ✅ FastAPI installed"
else
    echo "  ❌ FastAPI not installed"
    ERRORS=$((ERRORS + 1))
fi

if python -m pip show uvicorn > /dev/null 2>&1; then
    echo "  ✅ Uvicorn installed"
else
    echo "  ❌ Uvicorn not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check 2: Frontend build
echo ""
echo "✓ Checking frontend build..."
cd ../frontend
if npm list react > /dev/null 2>&1; then
    echo "  ✅ React installed"
else
    echo "  ❌ React not installed - run 'npm install'"
    ERRORS=$((ERRORS + 1))
fi

if npm list axios > /dev/null 2>&1; then
    echo "  ✅ Axios installed"
else
    echo "  ❌ Axios not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check 3: Environment files
echo ""
echo "✓ Checking configuration files..."
if [ -f .env.example ]; then
    echo "  ✅ Frontend .env.example exists"
else
    echo "  ⚠️  Frontend .env.example missing (created)"
    ERRORS=$((ERRORS + 1))
fi

if [ -f ../backend/.env.example ]; then
    echo "  ✅ Backend .env.example exists"
else
    echo "  ⚠️  Backend .env.example missing (created)"
    ERRORS=$((ERRORS + 1))
fi

# Check 4: API endpoint configuration
echo ""
echo "✓ Checking API configuration..."
if grep -q "import.meta.env.VITE_API_URL" src/components/RoutePlanner.jsx; then
    echo "  ✅ API URL uses environment variables"
else
    echo "  ❌ API URL not using environment variables"
    ERRORS=$((ERRORS + 1))
fi

# Check 5: No hardcoded localhost
echo ""
echo "✓ Checking for hardcoded URLs..."
if grep -r "http://localhost" src/ > /dev/null 2>&1; then
    echo "  ❌ Found hardcoded localhost URLs:"
    grep -r "http://localhost" src/ | head -3
    ERRORS=$((ERRORS + 1))
else
    echo "  ✅ No hardcoded localhost URLs"
fi

# Check 6: Build test
echo ""
echo "✓ Testing frontend build..."
if npm run build > /dev/null 2>&1; then
    echo "  ✅ Frontend builds successfully"
    echo "  📦 Build size: $(du -sh dist/ | cut -f1)"
else
    echo "  ❌ Frontend build failed"
    ERRORS=$((ERRORS + 1))
fi

# Summary
echo ""
echo "======================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed! Ready for deployment."
    echo ""
    echo "📋 Next steps:"
    echo "1. Set environment variables in your deployment platform:"
    echo "   - Backend: FRONTEND_URL"
    echo "   - Frontend: VITE_API_URL"
    echo "2. Deploy using QUICK_DEPLOY.md guide"
    echo "3. Test endpoints after deployment"
    exit 0
else
    echo "❌ Found $ERRORS issue(s) to fix before deployment"
    echo ""
    echo "Please fix the issues above and run this script again."
    exit 1
fi
