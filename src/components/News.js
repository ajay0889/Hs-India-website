import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/News.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { getApiBase, withBase } from '../config/api';

const News = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE = getApiBase();
    axios
      .get(`${BASE}/api/news`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const normalized = data.map((n) => ({
          id: n.id || n._id || n.slug,
          slug: n.slug || String(n.id || n._id || ''),
          title: n.title || '',
          image: n.image ? withBase(n.image) : null,
          date: n.date || '',
          tags: n.tags || [],
        }));
        setItems(normalized.reverse());
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center g-4">
        <div className="col-12">
          <h1 className="custom-heading">From Loom to Legacy – The HS India Journal</h1>
          <hr className="custom-divider" />
        </div>

        {loading && (
          <div className="col-12 text-center">
            <p>Loading news...</p>
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="col-12 text-center">
            <p>No news available.</p>
          </div>
        )}

        {!loading &&
          items.slice(0, 2).map((item) => (
            <div className="col-12 col-md-6 col-lg-6 d-flex align-items-stretch" key={item.id}>
              <div className="animated-news-card card border-0">
                <div className="animated-img-box position-relative">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="card-img-top" loading="lazy" />
                  ) : (
                    <div style={{height: '220px', background: '#f3f4f6'}} />
                  )}
                </div>
                <div className="animated-content card-body text-center">
                  <h5 className="card-title mb-2">{item.title}</h5>
                  {item.date && (
                    <small className="text-muted d-block mb-2">
                      {new Date(item.date).toLocaleDateString()}
                    </small>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mb-2">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="badge bg-primary me-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link to={`/news/${item.slug}`} className="hs-blog-link">
                    Read More <span className="hs-blog-arrow">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default News;