import React from 'react';
import './News.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import newsOne from '../assets/news_one.jpeg';
import newsTwo from '../assets/news_two.jpg';
import { Link } from 'react-router-dom';

const newsData = [
  {
    title: 'Showcase New Collection at Summer Expo',
    image: newsOne,
    text: 'Step into the season with our grand new showcase—featuring vibrant lehengas and trending silhouettes unveiled exclusively at the Summer Collection Pavilion.',
    link: '#'
  },
  {
    title: 'Fusionwear Spotlight: Ethnic Meets Contemporary',
    image: newsTwo,
    text: 'Introducing our millennial-ready Indo-Western range—crafted to blend elegance with edge, perfect for modern boutiques and stylish store shelves.',
    link: '#'
  },
];

const News = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center g-4">
        <div className="col-12">
          <h1 className="custom-heading">From Loom to Legacy – The HS India Journal</h1>
          <hr className="custom-divider" />
          </div>
        {newsData.map((item, idx) => (
          <div className="col-12 col-md-6 col-lg-6 d-flex align-items-stretch" key={idx}>
            <div className="animated-news-card card border-0">
              <div className="animated-img-box position-relative">
                <img src={item.image} alt={item.title} className="card-img-top" loading="lazy" />
              </div>
              <div className="animated-content card-body text-center">
                <h5 className="card-title mb-2">{item.title}</h5>
                <p className="card-text mb-3">{item.text}</p>
                <Link to={`/`} className="hs-blog-link">
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