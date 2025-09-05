import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "../styles/FlexSlider.css";

const FlexSlider = () => {
  useEffect(() => {
    new Swiper(".custom-swiper-container .swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true,
      },
      keyboard: { enabled: true },
      mousewheel: { thresholdDelta: 70 },
      loop: true,
      pagination: {
        el: ".custom-swiper-container .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
        1560: { slidesPerView: 3 },
      },
    });
  }, []);

  return (
    <section className="custom-swiper-container">
      <main className="custom-main">
        <div className="custom-header-content">
          <span className="text-uppercase text-secondary">Our Brands</span>
          <h1 className="custom-heading">Meet the Brands That Define HS India</h1>
          <hr className="custom-divider" />
          <p className="custom-paragraph">
          <span>Three Labels. One Legacy. All Style.</span><br/>From opulent bridal couture to everyday festive fashion, our in-house brands are designed to drive retail success. Discover collections that resonate with resellers, retailers, and export partners worldwide.
          </p>
        </div>

        <div className="swiper">
          <div className="swiper-wrapper">
            {slides.map((slide, idx) => (
              <div key={idx} className={`swiper-slide ${slide.className}`}>
                <div>
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <a href={slide.link} target="_blank" rel="noopener noreferrer">
                    explore
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </main>
    </section>
  );
};

const slides = [
  {
    title: "House Of Surya",
    description:
      "A staple in Chandni Chowk and beyond, House Of Surya offers timeless sarees and lehengas for generations of celebration—and modern expansion.",
    link: "https://www.houseofsurya.com/",
    className: "swiper-slide--one",
  },
  {
    title: "Raagwaas",
    description:
      "A tribute to India’s timeless artistry. Raagwaas is crafted for connoisseurs and stores that value deep-rooted design and cultural storytelling.",
    link: "https://raagwaas.com/",
    className: "swiper-slide--two",
  },
  {
    title: "Siyonee",
    description:
      "Playful. Vibrant. Loved online. Siyonee is perfect for resellers and fashion retailers seeking trending ethnicwear that moves fast.",
    link: "https://www.instagram.com/siyoneeclothing/?hl=en",
    className: "swiper-slide--four",
  },
  {
    title: "Surya Sarees",
    description:
      "A staple in Chandni Chowk and beyond, Surya Sarees offers timeless sarees and lehengas for generations of celebration—and modern expansion.",
    link: "https://www.houseofsurya.com/",
    className: "swiper-slide--three",
  },
  {
    title: "Raagwaas",
    description:
      "A tribute to India’s timeless artistry. Raagwaas is crafted for connoisseurs and stores that value deep-rooted design and cultural storytelling.",
    link: "https://raagwaas.com/",
    className: "swiper-slide--five",
  },
  {
    title: "Siyonee",
    description:
      "Playful. Vibrant. Loved online. Siyonee is perfect for resellers and fashion retailers seeking trending ethnicwear that moves fast.",
    link: "https://www.instagram.com/siyoneeclothing/?hl=en",
    className: "swiper-slide--six",
  },
];

export default FlexSlider;