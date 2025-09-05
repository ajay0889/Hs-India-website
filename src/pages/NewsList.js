// src/pages/NewsList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";
import { getApiBase, withBase } from "../config/api";

function NewsList() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const navigate = useNavigate();

  // Fetch news
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${getApiBase()}/api/news`);
      setNews(res.data);
    } catch (err) {
      // Handle error silently or show user-friendly message
    }
  };

  // Delete news
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    try {
      await axios.delete(`${getApiBase()}/api/news/${id}`);
      setNews(news.filter((item) => item.id !== id));
      alert("🗑️ News deleted successfully");
    } catch (err) {
      alert("Failed to delete news. Please try again.");
    }
  };

  // Edit news - navigate to editor with data
  const handleEdit = (newsItem) => {
    // Store the news data in localStorage for the editor to access
    localStorage.setItem('editNewsData', JSON.stringify(newsItem));
    // Navigate to the editor
    navigate('/editor');
  };

  // Pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="admin-card">
              <div className="card-header admin-card-header">
                <h2 className="h3 mb-0 pb-3">📰 Manage News</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">
                    Showing {indexOfFirstNews + 1}-{Math.min(indexOfLastNews, news.length)} of {news.length} news
                  </span>
                  <a href="/editor" className="btn btn-admin-primary btn-sm">
                    + Add New News
                  </a>
                </div>
              </div>
              <div className="card-body">
                {news.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted mb-3">No news available yet.</p>
                    <a href="/editor" className="btn btn-admin-primary">
                      Create Your First News
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered align-middle">
                        <thead className="table-dark">
                          <tr>
                            <th style={{ width: "60px" }}>S.No</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Tags</th>
                            <th>SEO Title</th>
                            <th>Meta Description</th>
                            <th style={{ width: "200px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentNews.map((item, index) => (
                            <tr key={item.id}>
                              {/* Serial Number */}
                              <td className="text-center fw-bold">
                                {indexOfFirstNews + index + 1}
                              </td>
                              
                              {/* Image */}
                              <td>
                                {item.image ? (
                                                                      <img
                                      src={withBase(item.image)}
                                      alt={item.title}
                                      style={{ width: "100px", height: "60px", objectFit: "cover" }}
                                    />
                                ) : (
                                  "No Image"
                                )}
                              </td>

                              {/* Title */}
                              <td>{item.title}</td>

                              {/* Date */}
                              <td>{new Date(item.date).toLocaleString()}</td>

                              {/* Tags */}
                              <td>
                                {item.tags && item.tags.length > 0 ? (
                                  item.tags.map((tag, idx) => (
                                    <span key={idx} className="badge bg-primary me-1">
                                      {tag}
                                    </span>
                                  ))
                                ) : (
                                  "No tags"
                                )}
                              </td>

                              {/* SEO Title */}
                              <td>
                                {item.seoTitle || item.metaTitle ? (
                                  <div className="text-truncate" style={{ maxWidth: "200px" }} title={item.seoTitle || item.metaTitle}>
                                    {item.seoTitle || item.metaTitle}
                                  </div>
                                ) : (
                                  <span className="text-muted">—</span>
                                )}
                              </td>

                              {/* Meta Description */}
                              <td>
                                {item.seoDescription || item.metaDescription ? (
                                  <div className="text-truncate" style={{ maxWidth: "250px" }} title={item.seoDescription || item.metaDescription}>
                                    {item.seoDescription || item.metaDescription}
                                  </div>
                                ) : (
                                  <span className="text-muted">—</span>
                                )}
                              </td>

                              {/* Actions */}
                              <td>
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="btn btn-sm btn-outline-primary me-2"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="btn btn-sm btn-outline-danger"
                                >
                                  🗑️ Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="text-muted">
                          Page {currentPage} of {totalPages}
                        </div>
                        <nav aria-label="News pagination">
                          <ul className="pagination pagination-sm mb-0">
                            {/* Previous Button */}
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                              <button 
                                className="page-link" 
                                onClick={prevPage}
                                disabled={currentPage === 1}
                              >
                                ← Previous
                              </button>
                            </li>

                            {/* Page Numbers */}
                            {getPageNumbers().map((number, index) => (
                              <li key={index} className={`page-item ${number === '...' ? 'disabled' : ''}`}>
                                {number === '...' ? (
                                  <span className="page-link">...</span>
                                ) : (
                                  <button
                                    className={`page-link ${currentPage === number ? 'active' : ''}`}
                                    onClick={() => paginate(number)}
                                  >
                                    {number}
                                  </button>
                                )}
                              </li>
                            ))}

                            {/* Next Button */}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                              <button 
                                className="page-link" 
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                              >
                                Next →
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsList;