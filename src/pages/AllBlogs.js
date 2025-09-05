import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getApiBase, withBase } from "../config/api";

function AllBlogs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE = getApiBase();
    axios
      .get(`${BASE}/api/blogs`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const normalized = data.map((n) => ({
          id: n.id || n._id || n.slug,
          slug: n.slug || String(n.id || n._id || ""),
          title: n.title || "Untitled",
          image: n.image ? withBase(n.image) : null,
          date: n.createdAt || n.date || null,
        }));
        normalized.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setItems(normalized);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
    <div className="Padding-Top">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-12">
              <h1 className="custom-heading">All Blogs</h1>
              <hr className="custom-divider" />
            </div>

            {loading && (
              <div className="col-12 text-center">
                <p>Loading blogs...</p>
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="col-12 text-center">
                <p>No blogs available.</p>
              </div>
            )}

            {!loading && items.length > 0 && (
              <div className="row g-4 justify-content-center mb-5">
                {items.map((blog) => (
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
                        <h5 className="hs-blog-title">{blog.title}</h5>
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
        </div>
      </div>
    </>
  );
}

export default AllBlogs;


