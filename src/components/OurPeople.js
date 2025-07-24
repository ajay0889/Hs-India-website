import React from 'react';
import './OurPeople.css';
import peopleImg from '../assets/people.jpg';
import {Link} from 'react-router-dom';

const OurPeople = () => (
  <section className="our-people-section py-5">
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-12">
          <div className="our-people-bg rounded-4 d-flex flex-column flex-lg-row align-items-stretch overflow-hidden">
            <div className="our-people-card bg-white rounded-4 p-5 flex-grow-1 d-flex flex-column justify-content-center">
              <h2 className="our-people-title mb-4">Our People</h2>
              <p className="our-people-desc mb-4">
                'The Biggest Brands and Best People' is the ideology that steers HS India. As a well-known brand and business, we believe we are what we are because of our people. Our unique Employee Value Proposition – 'A World of Opportunities', reflects this attitude and attracts the best professionals across the industry.
              </p>
              <Link to={`/`} className="hs-blog-link">
                Read More <span className="hs-blog-arrow">&rarr;</span>
              </Link>
            </div>
            <div className="our-people-img-wrap flex-grow-1 d-flex align-items-center justify-content-center">
              <img src={peopleImg} alt="Our People" className="img-fluid h-100 w-100 object-fit-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OurPeople; 