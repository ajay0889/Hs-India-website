import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const categories = [
  { name: "Sarees", image: require("../assets/products/sarees/saree_one.jpg") },
  { name: "Lehengas", image: require("../assets/products/lehenga/lehenga_one.jpg") },
  { name: "Gowns", image: require("../assets/products/gowns/gown_one.jpg") },
  { name: "Readymade", image: require("../assets/products/readymade/readymade_one.jpg") },
];

export default function CategoryCarousel() {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={16}
      breakpoints={{
        768: { slidesPerView: 2.5 },
        1024: { slidesPerView: 3.5 },
      }}
    >
      {categories.map((cat, i) => (
        <SwiperSlide key={i}>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-6 left-6 text-white text-2xl font-bold drop-shadow-lg">
              {cat.name}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}