import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HorizontalTabs.css';

const tabData = [
  {
    key: 'sarees',
    title: 'Sarees',
    viewMoreLink: '/collections/sarees',
    images: [
      { src: require('../assets/products/sarees/saree_one.jpg'), name: 'Saree 1' },
      { src: require('../assets/products/sarees/saree_two.jpg'), name: 'Saree 2' },
      { src: require('../assets/products/sarees/saree_three.jpg'), name: 'Saree 3' },
      { src: require('../assets/products/sarees/saree_four.jpg'), name: 'Saree 4' },
    ],
  },
  {
    key: 'lehengas',
    title: 'Lehengas',
    viewMoreLink: '/collections/lehengas',
    images: [
      { src: require('../assets/products/lehenga/lehenga_one.jpg'), name: 'Lehenga 1' },
      { src: require('../assets/products/lehenga/lehenga_two.jpg'), name: 'Lehenga 2' },
      { src: require('../assets/products/lehenga/lehenga_three.jpg'), name: 'Lehenga 3' },
      { src: require('../assets/products/lehenga/lehenga_four.jpg'), name: 'Lehenga 4' },
    ],
  },
  {
    key: 'gowns',
    title: 'Gowns',
    viewMoreLink: '/collections/gowns',
    images: [
      { src: require('../assets/products/gowns/gown_one.jpg'), name: 'Gown 1' },
      { src: require('../assets/products/gowns/gown_two.jpg'), name: 'Gown 2' },
      { src: require('../assets/products/gowns/gown_three.jpg'), name: 'Gown 3' },
      { src: require('../assets/products/gowns/gown_four.jpg'), name: 'Gown 4' },
    ],
  },
  {
    key: 'readymade',
    title: 'Readymade',
    viewMoreLink: '/collections/readymade',
    images: [
      { src: require('../assets/products/readymade/readymade_one.jpg'), name: 'Item 1' },
      { src: require('../assets/products/readymade/readymade_two.jpg'), name: 'Item 2' },
      { src: require('../assets/products/readymade/readymade_three.jpg'), name: 'Item 3' },
      { src: require('../assets/products/readymade/readymade_four.jpg'), name: 'Item 4' },
    ],
  },
];

const HorizontalTabs = () => {
  const [activeTab, setActiveTab] = useState('sarees');
  const [animating, setAnimating] = useState(false);

  const handleTabClick = (key) => {
    if (key !== activeTab) {
      setAnimating(true);
      setTimeout(() => {
        setActiveTab(key);
        setAnimating(false);
      }, 300); // same duration as CSS transition
    }
  };

  const currentTab = tabData.find(tab => tab.key === activeTab);

  return (
    <div className="container py-5">
      <div className='col-12'>
      <h1 className="custom-heading">Our Products</h1>
      <hr className="custom-divider" />
      </div>

      <ul className="nav nav-tabs justify-content-center mb-4">
        {tabData.map(tab => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link custom-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      <div className={`tab-pane fade show active tab-anim${animating ? ' anim-out' : ' anim-in'}`}>
        <div className="row g-4">
          {currentTab.images.map((imgObj, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div className="product_card h-100 text-center">
                <img
                  src={imgObj.src}
                  className="card-img-top"
                  alt={imgObj.name}
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body p-2">
                  <p className="product-name fw-semibold">{imgObj.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a
          href={currentTab.viewMoreLink}
          className="btn btn-lg btn-primary px-5 py-2 Primary-Button"
        >
          View More
        </a>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTabs;