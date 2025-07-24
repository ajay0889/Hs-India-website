import React, { useEffect } from 'react'; 
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FullPageSlider.css';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import bridalVideo from '../assets/banner-four.jpg';
import bannerOne from '../assets/banner_one.jpg';
import bannerTwo from '../assets/banner_two.jpg';

const FullPageSlider = () => {
  useEffect(() => {
    new Swiper('.swiper-container-h', {
      direction: 'horizontal',
      effect: 'slide',
      autoplay: {
        delay: 10000,
        disableOnInteraction: true,
      },
      parallax: true,
      speed: 1600,
      rtl: true,
      loop: true,
      // mousewheel: {
      //   eventsTarget: '.swiper-slide',
      //   sensitivity: 1,
      // },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
    });
  }, []);

  const slideData = [
    {
      type: 'image',
      src: bridalVideo,
      tag: 'WELCOME TO HS INDIA',
      title: 'Fashion In Motion',
      disc: 'At HS India, tradition meets innovation. Every thread we weave celebrates heritage, style, and timeless grace—trusted by generations across the globe.',
      buttonText: 'Explore Collections',
    },
    {
      type: 'image',
      src: bannerOne,
      tag: 'FROM FACTORY TO FASHION FLOOR',
      title: 'Your Global Wholesale Partner',
      disc: 'Join 10,000+ retailers and exporters across 50+ countries powered by HS India’s unmatched variety and quality.',
      buttonText: 'Become a Reseller',
    },
    {
      type: 'image',
      src: bannerTwo,
      tag: 'YOUR STYLE OUR PRODUCT',
      title: 'Style You Can Shop Today',
      disc: 'Discover ready-to-ship sarees, lehengas, gowns, and Indo-western outfits crafted for every occasion. Premium designs. Fast shipping. Pan-India & worldwide delivery.',
      buttonText: 'Shop Now',
    },
  ];

  return (
    <section className="creative-fullpage--slider">
      <div className="banner-horizental">
        <div className="swiper swiper-container-h">
          <div className="swiper-wrapper">
            {slideData.map((slide, index) => (
              <div className="swiper-slide" key={index}>
                <div className="slider-inner" data-swiper-parallax="100">
                <div className="slider-overlay"></div>
                  {slide.type === 'image' && (
                    <img src={slide.src} alt="full_screen-image" />
                  )}
                  <div className="swiper-content" data-swiper-parallax="2000">
                    <div className="title-area">
                      <p className="tag">{slide.tag}</p>
                      <p className="title">{slide.title}</p>
                    </div>
                    <p className="disc">
                      {slide.disc}
                    </p>
                    <div className="creative-btn--wrap">
                      <button className="creative-slide--btn" type="button">
                        <div className="creative-btn--circle">
                          <div className="circle">
                            <div className="circle-fill"></div>
                            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="circle-outline">
                              <circle cx="25" cy="25" r="23"></circle>
                            </svg>
                            <div className="circle-icon">
                              <svg
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon-arrow"
                              >
                                <path d="M0 5.65612V4.30388L8.41874 4.31842L5.05997 0.95965L5.99054 0L10.9923 4.97273L6.00508 9.96L5.07451 9.00035L8.43328 5.64158L0 5.65612Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="creative-btn--label">
                          <div className="creative-btn__text">{slide.buttonText}</div>
                          <div className="creative-btn__border"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="swiper-button-wrapper creative-button--wrapper">
            <div className="swiper-button-next" tabIndex="0" role="button" aria-label="Next slide">
              <ArrowRightIcon className="text-dark" />
            </div>
            <div className="swiper-button-prev" tabIndex="0" role="button" aria-label="Previous slide">
              <ArrowLeftIcon className="text-dark" />
            </div>
          </div>

          {/* Pagination */}
          <div className="slider-pagination-area">
            <h5 className="slide-range one">01</h5>
            <div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal"></div>
            <h5 className="slide-range three">03</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullPageSlider;