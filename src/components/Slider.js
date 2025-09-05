import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '../styles/Slider.css';

const slides = [
  {
    title: 'louvre',
    description:
      'National art museum in Paris, France... including the Mona Lisa and the Venus de Milo.',
    image:
      'https://images.unsplash.com/photo-1543335785-8aadf6d8183c?auto=format&fit=crop&w=1932&q=80',
    link: 'https://en.wikipedia.org/wiki/Louvre',
  },
  {
    title: 'seychelles',
    description:
      'Officially the Republic of Seychelles... consisting of 155 islands in the Indian Ocean.',
    image:
      'https://images.unsplash.com/photo-1618822461310-da1be362e30c?auto=format&fit=crop&w=2070&q=80',
    link: 'https://en.wikipedia.org/wiki/Seychelles',
  },
  {
    title: 'london',
    description:
      'The capital and largest city of England and the United Kingdom... major settlement for nearly two millennia.',
    image:
      'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1965&q=80',
    link: 'https://en.wikipedia.org/wiki/London',
  },
  {
    title: 'maldives',
    description:
      'Officially the Republic of Maldives is an archipelagic state and country in South Asia.',
    image:
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1975&q=80',
    link: 'https://en.wikipedia.org/wiki/Maldives',
  },
  {
    title: 'Italy',
    description:
      'Located in the middle of the Mediterranean Sea... shares land borders with France, Switzerland, Austria...',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1886&q=80',
    link: 'https://en.wikipedia.org/wiki/Italy',
  },
];

const Slider = () => {
  const swiperContainerRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperContainerRef.current) {
      const swiper = new Swiper(swiperContainerRef.current, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        },
        keyboard: {
          enabled: true,
        },
        mousewheel: {
          thresholdDelta: 70,
        },
        spaceBetween: 30,
        loop: false,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
        on: {
          init(swiper) {
            setSwiperInstance(swiper);
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(1, 0);
    }
  }, [swiperInstance]);

  return (
    <main>
        <div className="custom-swiper swiper" ref={swiperContainerRef}>
            <div className="swiper-wrapper">
            {slides.map((slide, index) => (
                <div className="swiper-slide custom-swiper-slide" key={index}>
                <div className="custom-swiper-slide-img">
                    <img src={slide.image} alt={slide.title} />
                    <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28..."
                        opacity=".25"
                        className="custom-shape-fill"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86..."
                        opacity=".5"
                        className="custom-shape-fill"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32..."
                        className="custom-shape-fill"
                    ></path>
                    </svg>
                </div>
                <div className="custom-swiper-slide-content">
                    <div>
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                    <a className="custom-show-more" href={slide.link} target="_blank" rel="noreferrer">
                        <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        ></path>
                        </svg>
                    </a>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    </main>
  );
};

export default Slider;