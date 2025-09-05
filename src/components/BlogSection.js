import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/BlogSection.css';
import { getApiBase, withBase } from '../config/api';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE = getApiBase();
    axios
      .get(`${BASE}/api/blogs`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const normalized = data.map((blog) => ({
          id: blog.id || blog._id || blog.slug,
          slug: blog.slug || String(blog.id || blog._id || ''),
          title: blog.title || '',
          image: blog.image ? withBase(blog.image) : null,
        }));
        setBlogs(normalized.reverse());
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="hs-blog-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="custom-heading">Stories Woven with Culture & Couture</h1>
            <hr className="custom-divider" />
          </div>
        </div>
        
        {loading && (
          <div className="col-12 text-center">
            <p>Loading blogs...</p>
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="col-12 text-center">
            <p>No blogs available.</p>
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <div className="row g-4 justify-content-center">
            {blogs.slice(0, 3).map((blog) => (
              <div className="col-12 col-md-6 col-lg-4" key={blog.id}>
                <div className="hs-blog-card">
                  <div className="hs-blog-img-wrap">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="hs-blog-img" loading="lazy" />
                    ) : (
                      <div style={{height: '220px', background: '#f3f4f6'}} />
                    )}
                  </div>
                  <div className="hs-blog-content">
                    <h3 className="hs-blog-title">{blog.title}</h3>
                  <Link to={`/blogs/${blog.slug}`} className="hs-blog-link">
                    Read More <span className="hs-blog-arrow">&rarr;</span>
                  </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection; 