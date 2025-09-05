import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HorizontalTabs.css";

import tabData from "../components/TabData"; // 👈 imported here

const HorizontalTabs = () => {
  const [activeTab, setActiveTab] = useState("sarees");
  const currentTab = tabData.find((tab) => tab.key === activeTab);

  return (
    <div className="container py-5 ProductCategories">
      <div className="col-12">
        <h1 className="custom-heading">Our Products</h1>
        <hr className="custom-divider" />
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs justify-content-center mb-4">
        {tabData.map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link custom-tab${activeTab === tab.key ? " active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        }}
      >
        {currentTab.images.map((imgObj, index) => (
          <SwiperSlide key={index}>
            <div className="product_card h-100 text-center">
              <img
                src={imgObj.src}
                className="card-img-top"
                alt={imgObj.name}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <div className="card-body p-2">
                <p className="product-name fw-semibold">{imgObj.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View More */}
      <div className="text-center mt-4">
        <a href={currentTab.viewMoreLink} className="btn btn-lg btn-primary px-5 py-2 Primary-Button">
          View More
        </a>
      </div>
    </div>
  );
};

export default HorizontalTabs;