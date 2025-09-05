import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import hsLogo from '../assets/hs-logo-white.png';
import '../styles/admin.css';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark admin-navbar">
      <div className="container">
        <Link to="/admin/dashboard" className="navbar-brand d-flex align-items-center">
          <img src={hsLogo} alt="HS Logo" />
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                to="/admin/dashboard" 
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/editor" 
                className={`nav-link px-3 py-2 rounded ${isActive('/editor') ? 'active' : ''}`}
              >
                Add News
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/blog-editor" 
                className={`nav-link px-3 py-2 rounded ${isActive('/blog-editor') ? 'active' : ''}`}
              >
                Add Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/newslist" 
                className={`nav-link px-3 py-2 rounded ${isActive('/newslist') ? 'active' : ''}`}
              >
                Manage News
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/bloglist" 
                className={`nav-link px-3 py-2 rounded ${isActive('/bloglist') ? 'active' : ''}`}
              >
                Manage Blogs
              </Link>
            </li>
          </ul>
          
          <div className="navbar-nav">
            <Link to="/" className="nav-link px-3 py-2 me-2 border rounded">
              View Site
            </Link>
            <button 
              onClick={logout} 
              className="btn border-0 px-3 py-2 btn-logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
