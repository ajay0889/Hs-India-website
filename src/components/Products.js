import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

import productData from "../components/ProductsData"; // ✅ product info
import fallbackImage from "../assets/fallback.jpg"; // ✅ fallback image

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCollection, setExpandedCollection] = useState(null);

  // helper → use fallback if image fails
  const handleImgError = (e) => {
    e.target.src = fallbackImage;
  };

  const randomStyle = (i) => {
    const rotations = [-15, -8, -4, 5, 10, 15];
    return {
      rotate: rotations[i % rotations.length],
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    };
  };

  const visibleCollections =
    activeTab === "all"
      ? productData.flatMap((cat) => cat.subcollections)
      : productData.find((cat) => cat.key === activeTab)?.subcollections || [];

  return (
    <div className="Padding-Top pb-5">
      <div className="container">
        <div className="col-12">
          <h1 className="custom-heading">Unveiling Timeless Collections</h1>
          <hr className="custom-divider" />
        </div>
        {/* Tabs */}
        <ul className="nav nav-tabs justify-content-center mb-5">
          {["all", "lehenga", "saree", "readymade"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link fw-bold ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Piles */}
        <div className="row g-4 justify-content-center">
          {visibleCollections.map((col) => (
            <div key={col.key} className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
              <div
                className="position-relative d-flex justify-content-center flex-wrap"
                style={{ minHeight: "280px" }}
                onClick={() => setExpandedCollection(col)}
              >
                {col.images.slice(0, 4).map((img, index) => (
                  <motion.div
                    key={index}
                    className="position-absolute"
                    style={{
                      width: "180px",
                      height: "240px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                      cursor: "pointer",
                    }}
                    initial={randomStyle(index)}
                    whileHover={randomStyle(index)}
                    animate={randomStyle(index)}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      onError={handleImgError} // ✅ fallback here
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                ))}
              </div>
              <h5 className="mt-3 mb-3 fw-bold" style={{color: "#d70077"}}>{col.title}</h5>
            </div>
          ))}
        </div>

        {/* Fullscreen Modal Slider */}
        <AnimatePresence>
          {expandedCollection && (
            <motion.div
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 2000 }}
            >
              <div className="d-flex flex-column h-100">
                <h2 className="text-white text-center py-4 fw-bold">
                  {expandedCollection.title}
                </h2>

                <div className="flex-grow-1 d-flex align-items-center">
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                      1400: { slidesPerView: 4 },
                      1600: { slidesPerView: 5 },
                    }}
                    className="h-100"
                  >
                    {expandedCollection.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <motion.img
                          src={img.src}
                          alt={img.label}
                          onError={handleImgError} // ✅ fallback here
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "500px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <button
                  className="btn btn-light position-absolute top-3 end-3"
                  style={{ zIndex: 2100 }}
                  onClick={() => setExpandedCollection(null)}
                >
                  ✕ Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}