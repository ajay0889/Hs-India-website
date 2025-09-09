# cPanel Deployment Guide for HS-India Backend

## Prerequisites
- Your cPanel Node.js application is already configured
- Application URL: `hs-india.com/api`
- Application Root: `backend`
- Startup File: `server.js`

## Step-by-Step Upload Instructions

### 1. Prepare Files for Upload
Your backend folder contains all necessary files:
- ✅ `server.js` (main application file)
- ✅ `package.json` (dependencies)
- ✅ `package-lock.json` (dependency lock file)
- ✅ Data files: `newsData.json`, `blogData.json`, `quoteData.json`
- ✅ `uploads/` folder with existing images

### 2. Upload Files to cPanel

#### Option A: Using cPanel File Manager
1. **Login to cPanel**
   - Go to your cPanel dashboard
   - Navigate to "File Manager"

2. **Navigate to Application Directory**
   - Go to `/home/hsindia/backend/` (your application root)
   - Clear any existing files if needed

3. **Upload Backend Files**
   - Upload all files from your local `backend/` folder:
     - `server.js`
     - `package.json`
     - `package-lock.json`
     - `newsData.json`
     - `blogData.json`
     - `quoteData.json`
     - `uploads/` folder (with all images)

#### Option B: Using FTP/SFTP
1. **Connect to your server**
   - Host: `hs-india.com`
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate to backend directory**
   - Go to `/public_html/backend/` or `/home/hsindia/backend/`

3. **Upload all files**
   - Upload all files from your local `backend/` folder

### 3. Install Dependencies
1. **Go to Node.js App in cPanel**
   - Navigate to "Node.js Selector" or "Web Applications"
   - Find your "backend" application

2. **Run NPM Install**
   - Click "► Run NPM Install" button
   - Wait for installation to complete

### 4. Start/Restart Application
1. **In the Node.js app interface**
   - Click "RESTART" button to restart your application
   - Or click "STOP APP" then "START APP"

### 5. Verify Deployment
1. **Test your API endpoints**
   - Visit: `https://hs-india.com/api/news`
   - Visit: `https://hs-india.com/api/blogs`
   - Visit: `https://hs-india.com/api/quotes`

2. **Test admin login**
   - Use the admin credentials from your cPanel environment variables:
     - Email: `hsindia_admin@hsindia.com`
     - Password: `HsIndia2024!#`

## Environment Variables (Already Configured)
Your cPanel already has these environment variables set:
- `NODE_ENV=production`
- `ADMIN_EMAIL=hsindia_admin@hsindia.com`
- `ADMIN_PASSWORD=HsIndia2024!#`
- `FRONTEND_URL=https://hs-india.com`
- `JWT_SECRET=7f3a9c1e4b82d7a9a1c5f0de39bd2486c7e1a45b5fd38c029ab4e7f112cd89a3`

## Important Notes
1. **File Permissions**: Make sure the `uploads/` folder has write permissions (755 or 777)
2. **SSL Certificate**: Your app should work with HTTPS since `FRONTEND_URL` is set to `https://hs-india.com`
3. **CORS**: The app is configured to accept requests from `https://hs-india.com`
4. **Port**: The app will use the port assigned by cPanel (usually 5000 or auto-assigned)

## Troubleshooting
1. **If the app doesn't start**: Check the passenger.log file in cPanel
2. **If uploads don't work**: Verify the `uploads/` folder exists and has proper permissions
3. **If CORS errors occur**: Verify `FRONTEND_URL` environment variable is correct
4. **If admin login fails**: Check that environment variables are properly set in cPanel

## API Endpoints Available
- `GET /api/news` - Get all news
- `POST /api/news` - Create news (admin only)
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog (admin only)
- `GET /api/quotes` - Get all quote requests
- `POST /api/quotes` - Submit quote request
- `POST /api/auth/login` - Admin login
- `POST /api/uploads` - Upload images

## Next Steps
1. Upload your frontend build files to `/home/hsindia/public_html/`
2. Your frontend will be accessible at `https://hs-india.com/`
3. Your backend API will be accessible at `https://hs-india.com/api`
4. Test the complete application flow
