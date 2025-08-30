# 🚀 Deployment Guide - Daily Dose of Warhammer

This guide will walk you through deploying your Daily Dose of Warhammer website to GitHub and Vercel with minimal effort.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Node.js 18+ installed locally

## 🔧 Step 1: Push to GitHub

### 1.1 Create a new GitHub repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it: `daily-dose-of-warhammer`
4. Make it public (recommended for portfolio)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 1.2 Connect and push your local repository
```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/daily-dose-of-warhammer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 Step 2: Deploy to Vercel

### 2.1 Connect Vercel to GitHub
1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `daily-dose-of-warhammer` repository
5. Vercel will automatically detect it's a Next.js project

### 2.2 Configure Vercel settings
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 2.3 Environment Variables (Optional for now)
You can add these later when you implement the features:
- `DATABASE_URL` - For database connection
- `NEXTAUTH_SECRET` - For authentication
- `CLOUDINARY_*` - For image uploads

### 2.4 Deploy
1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://daily-dose-of-warhammer.vercel.app`

## 🔄 Step 3: Automatic Deployments

### 3.1 Every time you push to GitHub
1. Make your changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel automatically rebuilds and deploys

### 3.2 Preview deployments
- Every pull request gets a preview URL
- Perfect for testing changes before merging

## 🎯 Step 4: Custom Domain (Optional)

### 4.1 Add your domain
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📱 Step 5: Test Your Deployment

### 5.1 Check all pages work
- Homepage: `/`
- Fan Submissions: `/submissions`
- Creators: `/creators`
- All components render correctly

### 5.2 Test responsive design
- Mobile view
- Tablet view
- Desktop view

## 🛠️ Troubleshooting

### Build fails
- Check the build logs in Vercel
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation locally with `npm run build`

### Environment variables
- Add them in Vercel dashboard under Settings → Environment Variables
- Redeploy after adding new variables

### Performance issues
- Vercel automatically optimizes Next.js
- Images are automatically optimized
- Static pages are pre-rendered

## 🔒 Security Considerations

### 5.1 Environment variables
- Never commit `.env` files
- Use Vercel's environment variable system
- Keep secrets secure

### 5.2 API routes
- Implement proper authentication for admin routes
- Rate limiting for submission forms
- Input validation

## 📊 Monitoring

### 5.1 Vercel Analytics
- Page views
- Performance metrics
- Error tracking

### 5.2 Custom monitoring
- Set up alerts for build failures
- Monitor API response times
- Track user engagement

## 🎉 Success!

Your Daily Dose of Warhammer website is now:
- ✅ Live on the internet
- ✅ Automatically deploying from GitHub
- ✅ Optimized for performance
- ✅ Ready for the community

## 🔄 Next Steps

1. **Content Management**: Set up the admin dashboard
2. **Database**: Connect to a database for dynamic content
3. **Authentication**: Add user login for admin features
4. **Image Uploads**: Implement Cloudinary integration
5. **News Aggregation**: Set up RSS feeds from Warhammer Community

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Create issues in your repository

---

**For the Emperor!** 🚀⚔️

Your website is now ready to serve the Warhammer 40k community!
