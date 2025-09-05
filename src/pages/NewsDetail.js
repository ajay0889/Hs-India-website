// src/pages/NewsDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiBase, withBase } from "../config/api";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/NewsDetail.css";

function NewsDetail() {
  const { slug } = useParams();

  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const BASE = getApiBase();
    setLoading(true);

    (async () => {
      try {
        const [newsRes, blogsRes] = await Promise.all([
          axios.get(`${BASE}/api/news`),
          axios.get(`${BASE}/api/blogs`),
        ]);

        // ---- Normalize News ----
        const allNews = (Array.isArray(newsRes.data) ? newsRes.data : []).map(
          (item) => {
            const computedSlug = item.slug || String(item.id || item._id || "");
            return {
              ...item,
              slug: computedSlug,
              image: item.image ? withBase(item.image) : item.image,
              createdAt: item.createdAt || item.date,
            };
          }
        );

        const current =
          allNews.find(
            (n) =>
              n.slug === slug || String(n.id || n._id || "") === slug
          ) || null;

        setNews(current);

        // 5 related news excluding the current one
        const relNews = allNews
          .filter(
            (n) =>
              n.slug !== slug && String(n.id || n._id || "") !== slug
          )
          .slice(0, 5);
        setRelatedNews(relNews);

        // ---- Normalize Blogs for "Related Blogs" ----
        const blogs = (Array.isArray(blogsRes.data) ? blogsRes.data : []).map(
          (item) => {
            const computedSlug = item.slug || String(item.id || item._id || "");
            return {
              ...item,
              slug: computedSlug,
              image: item.image ? withBase(item.image) : item.image,
              createdAt: item.createdAt || item.date,
            };
          }
        );

        // Show any 5 blogs (you can make this smarter later)
        setRelatedBlogs(blogs.slice(0, 5));

        setError(null);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        setNews(null);
        setRelatedNews([]);
        setRelatedBlogs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="Padding-Top">
        <div className="container">
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-3">Loading News...</h4>
            <p className="text-muted">
              Please wait while we fetch the latest news for you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Padding-Top">
        <div className="container">
          <div className="text-center py-5">
            <div className="text-danger mb-3">
              <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
            </div>
            <h4 className="text-danger">Error Loading News</h4>
            <p className="text-muted">{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="Padding-Top">
        <div className="container">
          <div className="text-center py-5">
            <div className="text-warning mb-3">
              <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
            </div>
            <h4 className="text-warning">News Not Found</h4>
            <p className="text-muted">The news article you're looking for could not be found.</p>
            <Link to="/news" className="btn btn-primary">
              ← Back to All News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const hasTags = Array.isArray(news.tags) && news.tags.length > 0;

  return (
    <>
      <Helmet>
        <title>{news?.seoTitle || news?.title || "News - HS India"}</title>
        <meta
          name="description"
          content={
            news?.seoDescription ||
            "Stay updated with the latest news and developments from HS India."
          }
        />
        <meta
          property="og:title"
          content={news?.seoTitle || news?.title || "News - HS India"}
        />
        <meta
          property="og:description"
          content={
            news?.seoDescription ||
            "Stay updated with the latest news and developments from HS India."
          }
        />
        {news?.image && <meta property="og:image" content={news.image} />}
      </Helmet>

      <div className="Padding-Top">
        {news.image && (
          <div className="newsdetail-feature">
            <img src={news.image} alt={news.title} />
          </div>
        )}
        <div className="container">
          <div className="newsdetail-wrapper">
            <nav className="newsdetail-breadcrumb">
              <Link to="/">Home</Link>
              <span className="separator">/</span>
              <Link to="/news">News</Link>
              <span className="separator">/</span>
              <span className="current">{news.title}</span>
            </nav>

            <header className="newsdetail-hero">
              <h1 className="newsdetail-title">{news.title}</h1>

              {hasTags && (
                <div className="newsdetail-tags">
                  {news.tags.map((tag, idx) => (
                    <span key={idx} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="share-row">
                <span className="share-label">Share:</span>
                <a
                  className="share-btn fb"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    pageUrl
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 4.99 3.64 9.14 8.4 9.94v-7.03H7.9v-2.91h2.38V9.41c0-2.35 1.4-3.65 3.55-3.65 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.47v1.77h2.59l-.41 2.91h-2.18V22c4.76-.79 8.4-4.94 8.4-9.94Z"/></svg>
                </a>
                <a
                  className="share-btn x"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    pageUrl
                  )}&text=${encodeURIComponent(news.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                  title="Share on X"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M17.53 3H20l-5.34 6.1L21 21h-5.5l-4.3-5.62L6 21H3.53l5.74-6.56L3 3h5.6l3.9 5.2L17.53 3Zm-1.93 16.29h1.5L8.46 4.64H6.86l8.74 14.65Z"/></svg>
                </a>
                <a
                  className="share-btn li"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    pageUrl
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M20.45 20.45h-3.55v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.35V9h3.41v1.56h.05c.47-.88 1.63-1.8 3.36-1.8 3.6 0 4.27 2.37 4.27 5.45v6.24ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.57 20.45h3.55V9H3.57v11.45ZM22 2H2v20h20V2Z"/></svg>
                </a>
                <a
                  className="share-btn wa"
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    news.title + " " + pageUrl
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M20.52 3.48A11.84 11.84 0 0 0 12.01 0C5.4 0 .05 5.35.05 11.95c0 2.1.55 4.16 1.59 5.97L0 24l6.22-1.63a11.9 11.9 0 0 0 5.78 1.49h.01c6.6 0 11.96-5.35 11.96-11.95 0-3.2-1.25-6.21-3.45-8.43ZM12 21.43h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.69.97.99-3.6-.23-.37a9.44 9.44 0 0 1-1.46-5.05c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.98 6.7 2.77a9.44 9.44 0  0 1 2.79 6.72c0 5.22-4.26 9.47-9.48 9.47Zm5.42-7.1c-.29-.15-1.71-.84-1.98-.93-.27-.1-.46-.15-.66.15-.2.3-.76.93-.93 1.12-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.37-1.46-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.47.13-.62.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51l-.56-.01c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.45 1.06 2.86 1.2 3.06.15.2 2.08 3.18 5.05 4.46.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.71-.7 1.95-1.39.24-.68.24-1.26.17-1.39-.07-.13-.27-.21-.56-.36Z"/></svg>
                </a>
              </div>

              <div className="newsdetail-meta">
                <div className="meta-item">
                  <span className="meta-label">Author:</span>
                  <span className="meta-value">HS India Team</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Published:</span>
                  <span className="meta-value">
                    {new Date(news.createdAt || news.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </div>
              </div>
            </header>

            <div className="newsdetail-layout">
              <article className="newsdetail-content">
                {news.content ? (
                  <div
                    className="newsdetail-richtext"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                ) : (
                  <p className="newsdetail-fallback">
                    Full content will be updated soon.
                  </p>
                )}
              </article>

              <aside className="newsdetail-sidebar">
                {/* Related News */}
                <div className="sidebar-card">
                  <h3>Related News</h3>
                  <ul className="related-list">
                    {relatedNews.map((item) => (
                      <li key={item._id || item.slug} className="related-item">
                        <Link to={`/news/${item.slug}`} className="related-link">
                          {item.image && (
                            <span className="thumb">
                              <img src={item.image} alt={item.title} />
                            </span>
                          )}
                          <span className="related-title">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                    {relatedNews.length === 0 && (
                      <li className="related-empty">No related news</li>
                    )}
                  </ul>
                </div>

                {/* Related Blogs */}
                <div className="sidebar-card mt-4">
                  <h3>Related Blogs</h3>
                  <ul className="related-list">
                    {relatedBlogs.map((item) => (
                      <li key={item._id || item.slug} className="related-item">
                        <Link to={`/blogs/${item.slug}`} className="related-link">
                          {item.image && (
                            <span className="thumb">
                              <img src={item.image} alt={item.title} />
                            </span>
                          )}
                          <span className="related-title">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                    {relatedBlogs.length === 0 && (
                      <li className="related-empty">No related blogs</li>
                    )}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsDetail;