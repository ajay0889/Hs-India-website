import React from 'react';
import './BlogSection.css';
import { Link } from 'react-router-dom';

const blogs = [
  {
    image: require('../assets/blog_three.jpg'),
    title: 'Bridal Beyond Borders: Why HS India Is Winning Global Hearts',
    link: '#',
  },
  {
    image: require('../assets/banner-four.jpg'),
    title: 'Fusion Fever: How Indo-Western Styles Are Taking Over Modern Wardrobes',
    link: '#',
  },
  {
    image: require('../assets/blog_two.jpg'),
    title: "Inside the Fabric: Why Every HS India Piece Tells a Story",
    link: '#',
  },
];

const BlogSection = () => (
  <section className="hs-blog-section py-5">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="custom-heading">Stories Woven with Culture & Couture</h1>
          <hr className="custom-divider" />
        </div>
      </div>
      <div className="row g-4 justify-content-center">
        {blogs.map((blog, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div className="hs-blog-card">
              <div className="hs-blog-img-wrap">
                <img src={blog.image} alt={blog.title} className="hs-blog-img" loading="lazy" />
              </div>
              <div className="hs-blog-content">
                <h5 className="hs-blog-title">{blog.title}</h5>
                <Link to={`/blog/${idx}`} className="hs-blog-link">
                  Read More <span className="hs-blog-arrow">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection; 