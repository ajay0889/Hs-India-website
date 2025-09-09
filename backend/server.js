// backend/server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // points to backend/ directory
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me_in_production";

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://hs-india.com',
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images from backend/uploads

const DATA_FILE = path.join(__dirname, "newsData.json");
const BLOG_DATA_FILE = path.join(__dirname, "blogData.json");
const QUOTE_DATA_FILE = path.join(__dirname, "quoteData.json");

// ---- helpers ----
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const readBlogData = () => {
  if (!fs.existsSync(BLOG_DATA_FILE)) return [];
  const data = fs.readFileSync(BLOG_DATA_FILE);
  return JSON.parse(data);
};

const writeBlogData = (data) => {
  fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(data, null, 2));
};

const readQuoteData = () => {
  if (!fs.existsSync(QUOTE_DATA_FILE)) return [];
  const data = fs.readFileSync(QUOTE_DATA_FILE);
  return JSON.parse(data);
};

const writeQuoteData = (data) => {
  fs.writeFileSync(QUOTE_DATA_FILE, JSON.stringify(data, null, 2));
};

// ---- Multer setup for image uploads ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ---- ROUTES ----

// Root route for testing
app.get("/", (req, res) => {
  res.json({ 
    message: "HS-India API Server is running!", 
    version: "1.0.0",
    endpoints: {
      news: "/api/news",
      blogs: "/api/blogs", 
      quotes: "/api/quotes",
      auth: "/api/auth/login"
    }
  });
});

// API root route (for cPanel /api path)
app.get("/api", (req, res) => {
  res.json({ 
    message: "HS-India API Server is running!", 
    version: "1.0.0",
    endpoints: {
      news: "/api/news",
      blogs: "/api/blogs", 
      quotes: "/api/quotes",
      auth: "/api/auth/login"
    }
  });
});

// Alternative routes without /api prefix (for cPanel routing)
app.get("/news", (req, res) => {
  try {
    const newsList = readData();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/blogs", (req, res) => {
  try {
    const blogList = readBlogData();
    res.json(blogList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.get("/quotes", (req, res) => {
  try {
    const quoteList = readQuoteData();
    res.json(quoteList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote requests" });
  }
});

// Also add routes with /api prefix for direct access
app.get("/api/news", (req, res) => {
  try {
    const newsList = readData();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/api/blogs", (req, res) => {
  try {
    const blogList = readBlogData();
    res.json(blogList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.get("/api/quotes", (req, res) => {
  try {
    const quoteList = readQuoteData();
    res.json(quoteList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote requests" });
  }
});

// Upload endpoint for Tiptap images
app.post("/api/uploads", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type. Only images are allowed." });
    }
    
    // Validate file size (5MB max)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: "File too large. Maximum size is 5MB." });
    }
    
    // Use the request host to build the full URL
    const protocol = req.get('x-forwarded-proto') || req.protocol || 'http';
    const host = req.get('host') || 'localhost:5000';
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    
    res.json({ 
      success: true, 
      url: imageUrl,
      filename: req.file.filename 
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// ---- Simple in-memory users ----
const users = [];

// Initialize with first admin if no users exist
const initializeFirstAdmin = () => {
  if (users.length === 0) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    
    if (!email || !password) {
      console.warn("⚠️  No initial admin created. Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables to create the first admin.");
      console.warn("   Or use the /api/auth/setup endpoint to create the first admin.");
      return;
    }
    
    const passwordHash = bcrypt.hashSync(password, 10);
    users.push({ 
      id: "1", 
      email, 
      passwordHash, 
      role: "superadmin",
      createdAt: new Date().toISOString(),
      isActive: true
    });
    console.log("✅ First admin created with email:", email);
  }
};

initializeFirstAdmin();

// Auth: Setup (Create first admin if none exists)
app.post("/api/auth/setup", async (req, res) => {
  try {
    // Only allow setup if no users exist
    if (users.length > 0) {
      return res.status(400).json({ message: "Admin already exists. Use login instead." });
    }
    
    const { email, password, name } = req.body || {};
    
    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Email, password, and name are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    
    // Create first admin (superadmin)
    const passwordHash = bcrypt.hashSync(password, 10);
    const newAdmin = {
      id: "1",
      email,
      passwordHash,
      name,
      role: "superadmin",
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    users.push(newAdmin);
    
    // Generate token
    const token = jwt.sign({ sub: newAdmin.id, role: newAdmin.role }, JWT_SECRET, { expiresIn: "7d" });
    
    return res.status(201).json({ 
      message: "First admin created successfully", 
      token, 
      user: { 
        id: newAdmin.id, 
        email: newAdmin.email, 
        name: newAdmin.name, 
        role: newAdmin.role 
      } 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Auth: Register Admin
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body || {};
    
    // Validation
    if (!email || !password || !confirmPassword || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    
    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }
    
    // Create new admin
    const passwordHash = bcrypt.hashSync(password, 10);
    // First user becomes superadmin, others become regular admin
    const userRole = users.length === 0 ? "superadmin" : "admin";
    const newAdmin = {
      id: Date.now().toString(),
      email,
      passwordHash,
      name,
      role: userRole,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    users.push(newAdmin);
    
    // Generate token
    const token = jwt.sign({ sub: newAdmin.id, role: newAdmin.role }, JWT_SECRET, { expiresIn: "7d" });
    
    return res.status(201).json({ 
      message: "Admin registered successfully", 
      token, 
      user: { 
        id: newAdmin.id, 
        email: newAdmin.email, 
        name: newAdmin.name,
        role: newAdmin.role 
      } 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Auth: Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    if (!user.isActive) return res.status(401).json({ message: "Account is deactivated" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Create news
app.post("/api/news", upload.single("image"), (req, res) => {
  try {
    const newsList = readData();
    const newNews = {
      id: Date.now(),
      title: req.body.title,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      content: req.body.content,
      tags: req.body.tags ? req.body.tags.split(",").map((t) => t.trim()) : [],
      date: new Date().toISOString(),
      seoTitle: req.body.seoTitle || null,
      seoDescription: req.body.seoDescription || null,
    };
    newsList.push(newNews);
    writeData(newsList);
    res.status(201).json({ message: "News created", news: newNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save news" });
  }
});

// Get all news
app.get("/api/news", (req, res) => {
  try {
    const newsList = readData();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Delete news
app.delete("/api/news/:id", (req, res) => {
  try {
    let newsList = readData();
    const id = parseInt(req.params.id);
    newsList = newsList.filter((item) => item.id !== id);
    writeData(newsList);
    res.json({ message: "News deleted", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete news" });
  }
});

// Update news
app.put("/api/news/:id", upload.single("image"), (req, res) => {
  try {
    let newsList = readData();
    const id = parseInt(req.params.id);
    const index = newsList.findIndex((item) => item.id === id);

    if (index === -1) return res.status(404).json({ error: "News not found" });

    const updatedNews = {
      ...newsList[index],
      title: req.body.title || newsList[index].title,
      content: req.body.content || newsList[index].content,
      tags: req.body.tags
        ? req.body.tags.split(",").map((t) => t.trim())
        : newsList[index].tags,
      image: req.file ? `/uploads/${req.file.filename}` : newsList[index].image,
      date: new Date().toISOString(),
      seoTitle: req.body.seoTitle !== undefined ? req.body.seoTitle : newsList[index].seoTitle,
      seoDescription: req.body.seoDescription !== undefined ? req.body.seoDescription : newsList[index].seoDescription,
    };

    newsList[index] = updatedNews;
    writeData(newsList);

    res.json({ message: "News updated", news: updatedNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update news" });
  }
});

// ---- BLOG ENDPOINTS ----

// Create blog
app.post("/api/blogs", upload.single("image"), (req, res) => {
  try {
    const blogList = readBlogData();
    const newBlog = {
      id: Date.now(),
      title: req.body.title,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      content: req.body.content,
      tags: req.body.tags ? req.body.tags.split(",").map((t) => t.trim()) : [],
      date: new Date().toISOString(),
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      seoTitle: req.body.seoTitle || null,
      seoDescription: req.body.seoDescription || null,
    };
    blogList.push(newBlog);
    writeBlogData(blogList);
    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save blog" });
  }
});

// Get all blogs
app.get("/api/blogs", (req, res) => {
  try {
    const blogList = readBlogData();
    res.json(blogList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Get blog by slug
app.get("/api/blogs/:slug", (req, res) => {
  try {
    const blogList = readBlogData();
    const blog = blogList.find((item) => item.slug === req.params.slug);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// Delete blog
app.delete("/api/blogs/:id", (req, res) => {
  try {
    let blogList = readBlogData();
    const id = parseInt(req.params.id);
    blogList = blogList.filter((item) => item.id !== id);
    writeBlogData(blogList);
    res.json({ message: "Blog deleted", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// Update blog
app.put("/api/blogs/:id", upload.single("image"), (req, res) => {
  try {
    let blogList = readBlogData();
    const id = parseInt(req.params.id);
    const index = blogList.findIndex((item) => item.id === id);

    if (index === -1) return res.status(404).json({ error: "Blog not found" });

    const updatedBlog = {
      ...blogList[index],
      title: req.body.title || blogList[index].title,
      content: req.body.content || blogList[index].content,
      tags: req.body.tags
        ? req.body.tags.split(",").map((t) => t.trim())
        : blogList[index].tags,
      image: req.file ? `/uploads/${req.file.filename}` : blogList[index].image,
      date: new Date().toISOString(),
      slug: req.body.title ? req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : blogList[index].slug,
      seoTitle: req.body.seoTitle !== undefined ? req.body.seoTitle : blogList[index].seoTitle,
      seoDescription: req.body.seoDescription !== undefined ? req.body.seoDescription : blogList[index].seoDescription,
    };

    blogList[index] = updatedBlog;
    writeBlogData(blogList);

    res.json({ message: "Blog updated", blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// ---- QUOTE REQUEST ENDPOINTS ----

// Validation functions
const validateQuoteRequest = (data) => {
  const errors = {};
  
  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters';
  } else if (!/^[a-zA-Z\s]+$/.test(data.name.trim())) {
    errors.name = 'Name can only contain letters and spaces';
  }
  
  // Email validation
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }
  
  // Phone validation
  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
  }
  
  // City validation
  if (!data.city || !data.city.trim()) {
    errors.city = 'City is required';
  } else if (data.city.trim().length < 2) {
    errors.city = 'City must be at least 2 characters';
  } else if (data.city.trim().length > 30) {
    errors.city = 'City must be less than 30 characters';
  }
  
  // Business type validation
  if (!data.business) {
    errors.business = 'Please select your business type';
  }
  
  // Years validation
  if (!data.years) {
    errors.years = 'Please select years in business';
  }
  
  // Size validation
  if (!data.size) {
    errors.size = 'Please select store size';
  }
  
  return errors;
};

// Submit quote request
app.post("/api/quotes", (req, res) => {
  try {
    // Validate request data
    const validationErrors = validateQuoteRequest(req.body);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ 
        error: "Validation failed", 
        errors: validationErrors 
      });
    }
    
    const quoteList = readQuoteData();
    const newQuote = {
      id: Date.now(),
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone.replace(/\s/g, ''),
      city: req.body.city.trim(),
      business: req.body.business,
      years: req.body.years,
      size: req.body.size,
      date: new Date().toISOString(),
      status: 'pending'
    };
    quoteList.push(newQuote);
    writeQuoteData(quoteList);
    res.status(201).json({ message: "Quote request submitted successfully", quote: newQuote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit quote request" });
  }
});

// Get all quote requests (for admin)
app.get("/api/quotes", (req, res) => {
  try {
    const quoteList = readQuoteData();
    res.json(quoteList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote requests" });
  }
});

// Get all admins (for superadmin only)
app.get("/api/admins", (req, res) => {
  try {
    // In a real app, you'd verify the user is a superadmin
    const adminList = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      isActive: user.isActive
    }));
    res.json(adminList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admins" });
  }
});


// Catch-all route for debugging (must be last)
app.use((req, res) => {
  console.log(`❌ Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: "Route not found", 
    method: req.method,
    url: req.originalUrl,
    message: "Check the server logs to see what routes are being hit"
  });
});

// ---- start server ----
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Frontend URL: ${process.env.FRONTEND_URL || 'https://hs-india.com'}`);
  console.log(`✅ Available routes:`);
  console.log(`   GET /`);
  console.log(`   GET /api`);
  console.log(`   GET /news`);
  console.log(`   GET /blogs`);
  console.log(`   GET /quotes`);
  console.log(`   GET /api/news`);
  console.log(`   GET /api/blogs`);
  console.log(`   GET /api/quotes`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/uploads`);
});