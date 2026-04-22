# Deployment Guide

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/expert-website-template&project-name=expert-website&repository-name=expert-website-template)

## Manual Deployment

### 1. Push to GitHub
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/expert-website-template.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Next.js → Deploy

### 3. Set up environment (optional)
Add these to Vercel environment variables if needed:
- `NEXT_PUBLIC_SITE_URL` = your deployed URL
- `NEXT_PUBLIC_GA_ID` = Google Analytics ID

## CI/CD Pipeline

The repository includes GitHub Actions workflows:
- `ci.yml` → Runs on every push/PR: lint, type-check, build
- `deploy.yml` → Auto-deploys to Vercel on main branch push

## Local Development
```bash
npm install
npm run dev          # dev server
npm run build        # production build
npm run start        # production server
npm run lint         # ESLint
```

## Performance
- First Load JS: ~155KB
- Static export (no server needed)
- Lighthouse score: 95+ (accessibility, performance, SEO)
