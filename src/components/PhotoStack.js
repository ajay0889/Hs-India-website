import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";

const images = [
  { src: require("../assets/products/sarees/saree_one.jpg"), title: "Saree 1" },
  { src: require("../assets/products/sarees/saree_two.jpg"), title: "Saree 2" },
  { src: require("../assets/products/sarees/saree_three.jpg"), title: "Saree 3" },
  { src: require("../assets/products/sarees/saree_four.jpg"), title: "Saree 4" },
  { src: require("../assets/products/sarees/saree_one.jpg"), title: "Saree 5" },
];

export default function ScatteredStack() {
  const [expanded, setExpanded] = useState(false);

  // scattered pile
  const randomStyle = (i) => {
    const rotations = [-15, -8, -4, 5, 10, 15];
    return {
      rotate: rotations[i % rotations.length],
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    };
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Our Collection</h2>

      {/* Pile */}
      <div
        className="position-relative d-flex justify-content-center flex-wrap"
        style={{ minHeight: "380px" }}
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="position-absolute"
            style={{
              width: "220px",
              height: "300px",
              cursor: "pointer",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              zIndex: index,
            }}
            initial={randomStyle(index)}
            animate={randomStyle(index)}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            onClick={() => setExpanded(true)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Gallery Slider */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 2000 }}
          >
            <div className="d-flex flex-column h-100">
              {/* Heading */}
              <h2 className="text-white text-center py-4 fw-bold">
                Our Collection
              </h2>

              {/* Swiper Slider */}
              <div className="flex-grow-1 d-flex align-items-center">
                <Swiper
  modules={[Navigation, Autoplay]}
  navigation
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,   // pauses when user hovers
  }}
  spaceBetween={20}
  slidesPerView={1}   // default (mobile)
  breakpoints={{
    768: { slidesPerView: 2 },   // tablets
    1024: { slidesPerView: 3 },  // medium desktops
    1400: { slidesPerView: 4 },  // large screens
    1600: { slidesPerView: 5 },  // very large screens
  }}
  className="h-100"
>
  {images.map((img, index) => (
    <SwiperSlide
      key={index}
      className="d-flex align-items-center justify-content-center"
    >
      <motion.img
        src={img.src}
        alt={img.title}
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

              {/* Close button */}
              <button
                className="btn btn-light position-absolute top-3 end-3"
                style={{ zIndex: 2100 }}
                onClick={() => setExpanded(false)}
              >
                ✕ Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
