# Daily Dose of Warhammer

A modern, responsive website for the Warhammer 40,000 community, featuring daily content, fan submissions, creator spotlights, and affiliate partnerships.

## 🎯 Features

- **Hero Section**: Full-screen Instagram video embed with dramatic text overlay
- **Featured Content**: Curated Warhammer 40k content showcase
- **Latest News**: Auto-updating content from Warhammer Community
- **Social Links**: Instagram, YouTube, TikTok, and Discord integration
- **Fan Submissions**: Image upload system for community artwork (up to 5 images)
- **Creators We Love**: Featured content creators including Spikey Bits and Auspex Tactics
- **Affiliate Links**: Partnerships with Gamemat EU, EA Gaming, and J Labs
- **Admin Dashboard**: Content management and submission moderation

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom Warhammer-inspired design system
- **Animations**: Framer Motion for smooth, engaging interactions
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with validation
- **File Upload**: React Dropzone for image submissions
- **Database**: Prisma ORM (ready for implementation)
- **Authentication**: NextAuth.js (ready for implementation)
- **Image Storage**: Cloudinary integration (ready for implementation)

## 🎨 Design System

### Color Palette
- **Dark Byzantium**: #502F4C (Primary dark)
- **Old Lavender**: #70587C (Secondary dark)
- **Lavender Gray**: #C8B8DB (Medium)
- **Languid Lavender**: #DCCFEC (Light)
- **Warhammer Gold**: #fbca1b (Accent)
- **Warhammer Red**: #8B0000 (Secondary accent)

### Typography
- **Anton**: Headings and titles (Warhammer-style)
- **Bitter**: Body text and content
- **Cinzel**: Decorative elements and special text

### Components
- **warhammer-card**: Consistent card styling with backdrop blur
- **warhammer-button**: Interactive buttons with hover effects
- **grimdark-gradient**: Dark, atmospheric backgrounds
- **warhammer-text-shadow**: Dramatic text shadows for impact

## 📱 Pages

1. **Home** (`/`) - Hero video, featured content, news, social links
2. **Fan Submissions** (`/submissions`) - Image upload form and gallery
3. **Creators We Love** (`/creators`) - Featured content creators
4. **Featured Content** (`/featured`) - Curated content showcase
5. **Latest News** (`/news`) - Auto-updating news feed
6. **Affiliate Links** (`/affiliates`) - Partner promotions and codes
7. **Admin Dashboard** (`/admin`) - Content management (protected)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/daily-dose-of-warhammer.git
   cd daily-dose-of-warhammer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   # Database
   DATABASE_URL="your-database-url"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - Add environment variables in Vercel dashboard

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` includes:
- Warhammer-inspired color palette
- Custom fonts (Anton, Bitter, Cinzel)
- Responsive breakpoints
- Custom animations and keyframes

### Next.js
Configuration in `next.config.js` includes:
- Image optimization domains
- API route rewrites for external content
- Experimental App Router features

## 📊 Content Management

### Admin Dashboard
- Featured content selection
- Fan submission moderation
- News aggregation management
- Creator spotlight updates

### Auto-Updating Features
- Warhammer Community news feed
- RSS parsing for external content
- Scheduled content updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Games Workshop** for the Warhammer 40,000 universe
- **Spikey Bits** and **Auspex Tactics** for inspiring content
- **Warhammer Community** for official news and updates
- **Tailwind CSS** team for the amazing utility-first framework
- **Next.js** team for the powerful React framework

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Contact the development team
- Join our Discord community

---

**For the Emperor!** 🚀⚔️
