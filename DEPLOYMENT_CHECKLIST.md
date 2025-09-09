# Deployment Checklist for HS-India Backend

## ✅ Pre-Deployment Verification

### Backend Files Ready
- [x] `server.js` - Main application file
- [x] `package.json` - Dependencies configured
- [x] `package-lock.json` - Dependency lock file
- [x] `newsData.json` - News data file
- [x] `blogData.json` - Blog data file  
- [x] `quoteData.json` - Quote requests data file
- [x] `uploads/` folder - Image uploads directory with existing images

### cPanel Configuration Verified
- [x] Application URL: `hs-india.com/api`
- [x] Application Root: `backend`
- [x] Startup File: `server.js`
- [x] Node.js Version: `20.19.3`
- [x] Application Mode: `Production`

### Environment Variables Set in cPanel
- [x] `NODE_ENV=production`
- [x] `ADMIN_EMAIL=hsindia_admin@hsindia.com`
- [x] `ADMIN_PASSWORD=HsIndia2024!#`
- [x] `FRONTEND_URL=https://hs-india.com`
- [x] `JWT_SECRET=7f3a9c1e4b82d7a9a1c5f0de39bd2486c7e1a45b5fd38c029ab4e7f112cd89a3`

## 🚀 Deployment Steps

### 1. Upload Files
- [ ] Upload all backend files to `/home/hsindia/backend/`
- [ ] Ensure `uploads/` folder is uploaded with proper permissions

### 2. Install Dependencies
- [ ] Run "► Run NPM Install" in cPanel Node.js app interface

### 3. Start Application
- [ ] Click "RESTART" button in cPanel Node.js app interface

### 4. Test Deployment
- [ ] Test API endpoint: `https://hs-india.com/api/news`
- [ ] Test API endpoint: `https://hs-india.com/api/blogs`
- [ ] Test API endpoint: `https://hs-india.com/api/quotes`
- [ ] Test admin login with credentials from environment variables

## 🔧 Server Configuration Analysis

### ✅ Configuration Matches cPanel Settings
- **Port**: Uses `process.env.PORT || 5000` (cPanel will assign the port)
- **CORS**: Configured for `https://hs-india.com` (matches FRONTEND_URL)
- **Static Files**: Serves uploads from `/uploads` directory
- **Environment Variables**: All required variables are set in cPanel
- **File Structure**: Uses relative paths that work with cPanel structure

### ✅ Dependencies Ready
All required packages are in `package.json`:
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `multer`: File upload handling
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication

## 🎯 Expected Results After Deployment

1. **API Endpoints Working**:
   - `GET /api/news` - Returns news data
   - `GET /api/blogs` - Returns blog data
   - `GET /api/quotes` - Returns quote requests
   - `POST /api/quotes` - Accepts new quote requests

2. **Admin Features Working**:
   - Admin login at `POST /api/auth/login`
   - News management endpoints
   - Blog management endpoints
   - Image upload functionality

3. **File Uploads Working**:
   - Images uploaded to `/uploads/` directory
   - Images served at `/uploads/filename`

## 🚨 Troubleshooting Tips

1. **If app doesn't start**: Check passenger.log file in cPanel
2. **If uploads fail**: Verify uploads folder permissions (755 or 777)
3. **If CORS errors**: Verify FRONTEND_URL environment variable
4. **If admin login fails**: Check environment variables in cPanel

## 📁 Files to Upload

Upload these files from your local `backend/` folder:
```
backend/
├── server.js
├── package.json
├── package-lock.json
├── newsData.json
├── blogData.json
├── quoteData.json
└── uploads/
    ├── 1756898248854-banner_two.jpg
    ├── 1756898653960-blog_three.jpg
    ├── 1756898723301-banner-four.jpg
    ├── 1756898936052-blog_two.jpg
    └── 1756899052908-retail.jpg
```

## 🎉 Ready for Deployment!

Your backend is fully prepared for cPanel deployment. Follow the step-by-step guide in `CPANEL_DEPLOYMENT_GUIDE.md` to complete the upload process.
