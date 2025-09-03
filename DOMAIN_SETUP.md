# Domain Setup Guide - dailydoseofwarhammer.com

## ✅ Current Status
Your site is already configured for `dailydoseofwarhammer.com` in the code!

## 🔧 Setup Steps

### 1. Add Domain in Vercel
1. Go to [vercel.com](https://vercel.com) and log in
2. Select your Daily Dose of Warhammer project
3. Go to **Settings** → **Domains**
4. Add these domains:
   - `dailydoseofwarhammer.com`
   - `www.dailydoseofwarhammer.com`

### 2. Configure DNS at Namecheap

#### Option A: Vercel Nameservers (Recommended)
1. In Vercel, copy the nameservers provided
2. Go to [namecheap.com](https://namecheap.com) → Domain List
3. Click **Manage** next to your domain
4. Go to **Nameservers** section
5. Select **Custom DNS**
6. Enter Vercel's nameservers
7. Save changes

#### Option B: Keep Namecheap DNS
If you prefer to manage DNS at Namecheap:

**Add these DNS records in Namecheap Advanced DNS:**
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME Record
Host: www  
Value: cname.vercel-dns.com
TTL: Automatic
```

### 3. SSL Certificate
Vercel automatically provides SSL certificates for custom domains.
Your site will be available at:
- `https://dailydoseofwarhammer.com`
- `https://www.dailydoseofwarhammer.com`

### 4. Verification
- DNS propagation can take 24-48 hours
- Check status in Vercel Dashboard → Domains
- Test both www and non-www versions

## 🌐 Site Features Already Configured
- ✅ Sitemap points to dailydoseofwarhammer.com
- ✅ SEO metadata uses correct domain
- ✅ Social media links properly configured
- ✅ Structured data includes domain
- ✅ All internal links are relative (will work with custom domain)

## 📊 Post-Launch Checklist
- [ ] Test all pages load correctly
- [ ] Verify SSL certificate is active
- [ ] Check Google Search Console
- [ ] Update social media bios with new domain
- [ ] Test news scraping still works
- [ ] Verify admin dashboard access

## 🚀 Going Live
Once DNS propagates, your site will be live at:
**https://dailydoseofwarhammer.com**

All features will work including:
- Daily news scraping
- Fan submissions
- Admin dashboard
- Social media integration
- Affiliate links
