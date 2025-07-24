import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'bootstrap/dist/css/bootstrap.min.css';

const companies = [
  {
    name: 'Company One',
    image: 'images/banner-four.jpg',
    logo: 'https://via.placeholder.com/80x80?text=Logo+1',
  },
  {
    name: 'Company Two',
    image: 'https://via.placeholder.com/400x250?text=Company+Two',
    logo: 'https://via.placeholder.com/80x80?text=Logo+2',
  },
  {
    name: 'Company Three',
    image: 'https://via.placeholder.com/400x250?text=Company+Three',
    logo: 'https://via.placeholder.com/80x80?text=Logo+3',
  },
  {
    name: 'Company Four',
    image: 'https://via.placeholder.com/400x250?text=Company+Four',
    logo: 'https://via.placeholder.com/80x80?text=Logo+4',
  },
  {
    name: 'Company Five',
    image: 'https://via.placeholder.com/400x250?text=Company+Five',
    logo: 'https://via.placeholder.com/80x80?text=Logo+5',
  },
];

const Company = () => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="company-slider-wrapper mx-auto">
            <div className="d-flex flex-column flex-md-row align-items-center">
              {/* Thumbnails */}
              <div className="mb-3 mb-md-0" style={{ width: '100%', maxWidth: 100 }}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  direction={window.innerWidth < 768 ? 'horizontal' : 'vertical'}
                  slidesPerView={window.innerWidth < 768 ? 4 : 4}
                  spaceBetween={10}
                  watchSlidesProgress
                  modules={[Thumbs]}
                  className="company-thumbs-swiper"
                >
                  {companies.map((company, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="img-fluid rounded border"
                        style={{ width: 70, height: 70, objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Main Swiper */}
              <div className="flex-grow-1 ms-md-4 w-100">
                <Swiper
                  modules={[Navigation, Thumbs]}
                  navigation
                  thumbs={{ swiper: thumbsSwiper }}
                  className="company-main-swiper"
                >
                  {companies.map((company, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="text-center">
                        <img
                          src={company.image}
                          alt={company.name}
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: 250, objectFit: 'cover', width: '100%' }}
                          loading="lazy"
                        />
                        <h5>{company.name}</h5>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company; 