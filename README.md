# HS India - Women Ethnic Wear E-commerce Platform

A modern, responsive e-commerce platform for HS India, specializing in women's ethnic wear including sarees, lehengas, and traditional Indian fashion.

## 🌟 Features

### Frontend
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Product Gallery**: Interactive product showcase with filtering
- **Blog System**: Content management for fashion articles and news
- **Contact Forms**: Partner registration and quote requests
- **SEO Optimized**: Meta tags, sitemap generation, and structured data
- **Admin Panel**: Complete CMS for content management

### Backend
- **RESTful API**: Express.js server with comprehensive endpoints
- **Authentication**: JWT-based admin authentication
- **File Upload**: Secure image upload with validation
- **Data Management**: JSON-based data storage (easily upgradeable to database)
- **Form Handling**: Quote request processing with validation
- **CORS Configuration**: Secure cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hs-india.git
   cd hs-india
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   **Backend (.env file in backend/ directory):**
   ```bash
   cp backend/env.example backend/.env
   ```
   
   Edit `backend/.env` with your configuration:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secure-jwt-secret
   ADMIN_EMAIL=admin@hsindia.com
   ADMIN_PASSWORD=your-secure-password
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env file in root directory):**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   REACT_APP_API_BASE=http://localhost:5000
   ```

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/login
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
hs-india/
├── public/                 # Static assets
├── src/                   # React frontend source
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── styles/           # CSS stylesheets
│   ├── context/          # React context providers
│   └── config/           # Configuration files
├── backend/              # Express.js backend
│   ├── uploads/          # File uploads directory
│   ├── server.js         # Main server file
│   └── *.json           # Data storage files
├── scripts/              # Build and utility scripts
└── README.md            # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `JWT_SECRET` | JWT signing secret | Required |
| `ADMIN_EMAIL` | Admin login email | admin@hsindia.com |
| `ADMIN_PASSWORD` | Admin login password | admin123 |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

#### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE` | Backend API URL | http://localhost:5000 |

## 🛠️ Available Scripts

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run sitemap` - Generate sitemap

### Backend
- `npm start` - Start server
- `npm test` - Run tests (placeholder)

## 📱 Admin Panel

Access the admin panel at `/admin/login` with your configured credentials.

### Admin Features
- **Dashboard**: Overview of content and statistics
- **News Management**: Create, edit, and delete news articles
- **Blog Management**: Manage blog posts and content
- **Media Upload**: Upload and manage images
- **Quote Requests**: View and manage partner applications

## 🔒 Security Features

- JWT-based authentication
- Input validation and sanitization
- CORS configuration
- File upload validation
- Environment variable protection
- Password hashing with bcrypt

## 🚀 Deployment

### Production Checklist

Before deploying to production:

1. **Security**
   - [ ] Change default JWT secret
   - [ ] Set strong admin password
   - [ ] Configure CORS for production domain
   - [ ] Set up SSL/HTTPS

2. **Environment**
   - [ ] Set NODE_ENV=production
   - [ ] Configure production database
   - [ ] Set up file storage (AWS S3, etc.)
   - [ ] Configure email service

3. **Performance**
   - [ ] Enable gzip compression
   - [ ] Set up CDN for static assets
   - [ ] Configure caching
   - [ ] Optimize images

### Deployment Options

#### Vercel (Frontend)
```bash
npm install -g vercel
vercel --prod
```

#### Heroku (Full Stack)
```bash
# Install Heroku CLI
heroku create hs-india-app
heroku config:set JWT_SECRET=your-secret
heroku config:set ADMIN_EMAIL=your-email
heroku config:set ADMIN_PASSWORD=your-password
git push heroku main
```

#### DigitalOcean App Platform
- Connect your GitHub repository
- Configure environment variables
- Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: contact@hsindia.com
- Website: https://hs-india.com

## 🙏 Acknowledgments

- Bootstrap for UI framework
- React for frontend framework
- Express.js for backend
- All contributors and supporters

---

**Note**: This is a development version. For production deployment, ensure all security measures are properly configured and environment variables are set correctly.