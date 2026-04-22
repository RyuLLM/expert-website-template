#!/bin/bash

# Expert Website Template - One-Click Deploy Script
# Usage: ./deploy.sh [--vercel] [--netlify] [--github]

set -e

echo "🚀 Expert Website Template - Deployment Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check dependencies
check_deps() {
    echo "📦 Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed${NC}"
        echo "Install from: https://nodejs.org/"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm is not installed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Node.js $(node -v)${NC}"
    echo -e "${GREEN}✅ npm $(npm -v)${NC}"
}

# Build the project
build_project() {
    echo "🔨 Building project..."
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install
    fi
    
    # Run build
    if npm run build; then
        echo -e "${GREEN}✅ Build successful${NC}"
        echo "First Load JS: $(grep -o 'First Load JS.*' .next/build-manifest.json | head -1)"
    else
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
}

# Deploy to Vercel
deploy_vercel() {
    echo "☁️  Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    echo "Deploying (this may open browser for login)..."
    vercel --prod
    
    echo -e "${GREEN}✅ Vercel deployment initiated${NC}"
    echo "Check your Vercel dashboard for status."
}

# Deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # Check if netlify.toml exists
    if [ ! -f "netlify.toml" ]; then
        cat > netlify.toml << EOF
[build]
  publish = ".next"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
        echo "Created netlify.toml"
    fi
    
    echo "Deploying..."
    netlify deploy --prod
    
    echo -e "${GREEN}✅ Netlify deployment initiated${NC}"
}

# Setup GitHub repository
setup_github() {
    echo "🐙 Setting up GitHub repository..."
    
    if ! command -v gh &> /dev/null; then
        echo -e "${YELLOW}GitHub CLI not installed. Install with: brew install gh${NC}"
        echo "Or create repo manually at: https://github.com/new"
        return
    fi
    
    # Check if already a git repo
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit: Expert Website Template"
    fi
    
    echo "Creating GitHub repository..."
    gh repo create --public --source=. --remote=origin --push
    
    echo -e "${GREEN}✅ GitHub repository created and pushed${NC}"
}

# Run Lighthouse audit
run_lighthouse() {
    echo "📊 Running Lighthouse audit..."
    
    if ! command -v lighthouse &> /dev/null; then
        echo "Installing Lighthouse..."
        npm install -g lighthouse
    fi
    
    # Start local server in background
    npm start &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 5
    
    # Run audit
    lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html --quiet
    
    # Kill server
    kill $SERVER_PID 2>/dev/null
    
    echo -e "${GREEN}✅ Lighthouse report saved to lighthouse-report.html${NC}"
}

# Main menu
show_menu() {
    echo ""
    echo "Select deployment option:"
    echo "1) Build only (local)"
    echo "2) Deploy to Vercel"
    echo "3) Deploy to Netlify"
    echo "4) Setup GitHub repository"
    echo "5) Run Lighthouse audit"
    echo "6) Full pipeline (Build + GitHub + Vercel)"
    echo "7) Exit"
    echo ""
    read -p "Enter choice [1-7]: " choice
}

# Parse arguments
if [ $# -eq 0 ]; then
    check_deps
    build_project
    
    while true; do
        show_menu
        case $choice in
            1)
                echo "✅ Build completed"
                ;;
            2)
                deploy_vercel
                ;;
            3)
                deploy_netlify
                ;;
            4)
                setup_github
                ;;
            5)
                run_lighthouse
                ;;
            6)
                build_project
                setup_github
                deploy_vercel
                ;;
            7)
                echo "👋 Goodbye!"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid choice${NC}"
                ;;
        esac
    done
else
    # Handle command line arguments
    case $1 in
        --build)
            check_deps
            build_project
            ;;
        --vercel)
            check_deps
            build_project
            deploy_vercel
            ;;
        --netlify)
            check_deps
            build_project
            deploy_netlify
            ;;
        --github)
            setup_github
            ;;
        --lighthouse)
            run_lighthouse
            ;;
        --help)
            echo "Usage: ./deploy.sh [OPTION]"
            echo "Options:"
            echo "  --build       Build project only"
            echo "  --vercel      Build + deploy to Vercel"
            echo "  --netlify     Build + deploy to Netlify"
            echo "  --github      Setup GitHub repository"
            echo "  --lighthouse  Run Lighthouse audit"
            echo "  --help        Show this help"
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage"
            exit 1
            ;;
    esac
fi

echo ""
echo -e "${GREEN}✨ Deployment script completed!${NC}"
echo "Next steps:"
echo "1. Customize content in app/components/sections/"
echo "2. Update colors in tailwind.config.ts"
echo "3. Deploy with: ./deploy.sh --vercel"
echo ""
