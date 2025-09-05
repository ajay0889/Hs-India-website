// src/pages/BlogList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";
import { getApiBase, withBase } from "../config/api";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const navigate = useNavigate();

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${getApiBase()}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch blogs:", err);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${getApiBase()}/api/blogs/${id}`);
      setBlogs(blogs.filter((item) => item.id !== id));
      alert("🗑️ Blog deleted successfully");
    } catch (err) {
      console.error("❌ Failed to delete blog:", err);
    }
  };

  // Edit blog - navigate to editor with data
  const handleEdit = (blogItem) => {
    // Store the blog data in localStorage for the editor to access
    localStorage.setItem('editBlogData', JSON.stringify(blogItem));
    // Navigate to the editor
    navigate('/blog-editor');
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

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
                <h2 className="h3 mb-0 pb-3">📝 Manage Blogs</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">
                    Showing {indexOfFirstBlog + 1}-{Math.min(indexOfLastBlog, blogs.length)} of {blogs.length} blogs
                  </span>
                  <a href="/blog-editor" className="btn btn-admin-primary btn-sm">
                    + Add New Blog
                  </a>
                </div>
              </div>
              <div className="card-body">
                {blogs.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted mb-3">No blogs available yet.</p>
                    <a href="/blog-editor" className="btn btn-admin-primary">
                      Create Your First Blog
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
                          {currentBlogs.map((item, index) => (
                            <tr key={item.id}>
                              {/* Serial Number */}
                              <td className="text-center fw-bold">
                                {indexOfFirstBlog + index + 1}
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
                                {item.seoTitle ? (
                                  <div className="text-truncate" style={{ maxWidth: "200px" }} title={item.seoTitle}>
                                    {item.seoTitle}
                                  </div>
                                ) : (
                                  <span className="text-muted">—</span>
                                )}
                              </td>

                              {/* Meta Description */}
                              <td>
                                {item.seoDescription ? (
                                  <div className="text-truncate" style={{ maxWidth: "250px" }} title={item.seoDescription}>
                                    {item.seoDescription}
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
                        <nav aria-label="Blog pagination">
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

export default BlogList;
