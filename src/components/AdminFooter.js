import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light admin-footer">
      <div className="container">
        <div className="row py-5">
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-3">Admin Panel</h5>
            <p className="mb-2">HS India Content Management System</p>
            <p className="mb-0">Version 1.0.0</p>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/admin/dashboard" className="text-light text-decoration-none">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/editor" className="text-light text-decoration-none">Add News</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog-editor" className="text-light text-decoration-none">Add Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/newslist" className="text-light text-decoration-none">Manage News</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">View Public Site</Link>
              </li>
              <li className="mb-2">
                <a href="mailto:admin@hsindia.com" className="text-light text-decoration-none">Contact Admin</a>
              </li>
              <li className="mb-2">
                <span className="text-muted">Last Login: {new Date().toLocaleDateString()}</span>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-3">System Status</h5>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center">
                <span className="admin-status-online me-2"></span>
                <small>Backend: Online</small>
              </div>
              <div className="d-flex align-items-center">
                <span className="admin-status-online me-2"></span>
                <small>Database: Connected</small>
              </div>
              <div className="d-flex align-items-center">
                <span className="admin-status-online me-2"></span>
                <small>File Storage: Active</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-top border-secondary py-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">&copy; {currentYear} HS India. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">Admin Panel | Secure Access Only</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
