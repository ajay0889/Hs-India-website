import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/admin.css";
import { getApiBase, withBase } from "../config/api";

const AdminDashboard = () => {
  const [newsCount, setNewsCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [recentNews, setRecentNews] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const BASE = getApiBase();
    try {
      const [newsRes, blogsRes] = await Promise.all([
        axios.get(`${BASE}/api/news`),
        axios.get(`${BASE}/api/blogs`)
      ]);

      setNewsCount(newsRes.data.length);
      setBlogCount(blogsRes.data.length);
      setRecentNews(newsRes.data.slice(-5).reverse()); // Show 5 latest news
      setRecentBlogs(blogsRes.data.slice(-5).reverse()); // Show 5 latest blogs
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-4">
        {/* Dashboard Header with Statistics */}
        <div className="row mb-5 align-items-start">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-3 admin-dashboard-title">Admin Dashboard</h1>
            <p className="lead">Welcome to HS India admin panel</p>
          </div>
          <div className="col-lg-4">
            <div className="row g-3">
              <div className="col-6">
                <div className="card border-0 shadow-sm admin-stat-card">
                  <div className="card-body text-center p-3">
                    <div className="admin-stat-number" style={{ fontSize: '2rem' }}>{blogCount}</div>
                    <div className="admin-stat-label" style={{ fontSize: '0.9rem' }}>Blog Posts</div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-0 shadow-sm admin-stat-card">
                  <div className="card-body text-center p-3">
                    <div className="admin-stat-number" style={{ fontSize: '2rem' }}>{newsCount}</div>
                    <div className="admin-stat-label" style={{ fontSize: '0.9rem' }}>News Articles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Content */}
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="admin-card h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Recent News</h5>
                <Link to="/newslist" className="btn btn-sm btn-admin-primary">
                  View More
                </Link>
              </div>
              <div className="admin-card-body">
                {recentNews.length > 0 ? (
                  recentNews.map((news) => (
                    <div key={news.id} className="d-flex align-items-center mb-3 p-2 border rounded">
                      {news.image && (
                        <img
                          src={withBase(news.image)}
                          alt={news.title}
                          className="me-3"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{news.title}</h6>
                        <small className="text-muted">
                          {new Date(news.date).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center py-4">No news articles yet</p>
                )}
                {recentNews.length === 0 && (
                  <div className="text-center">
                    <Link to="/editor" className="btn btn-admin-primary">
                      Add First News
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="admin-card h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Recent Blogs</h5>
                <Link to="/bloglist" className="btn btn-sm btn-admin-primary">
                  View More
                </Link>
              </div>
              <div className="admin-card-body">
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((blog) => (
                    <div key={blog.id} className="d-flex align-items-center mb-3 p-2 border rounded">
                      {blog.image && (
                        <img
                          src={withBase(blog.image)}
                          alt={blog.title}
                          className="me-3"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{blog.title}</h6>
                        <small className="text-muted">
                          {new Date(blog.date).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center py-4">No blog posts yet</p>
                )}
                {recentBlogs.length === 0 && (
                  <div className="text-center">
                    <Link to="/blog-editor" className="btn btn-admin-primary">
                      Add First Blog
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
