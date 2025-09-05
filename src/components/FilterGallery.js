import { useState } from 'react';
import '../styles/FilterGallery.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import album_one from '../assets/album/album_one.jpg';
import album_two from '../assets/album/album_two.jpg';
import album_three from '../assets/album/album_three.jpg';
import album_four from '../assets/album/album_four.jpg';
import album_five from '../assets/album/album_five.jpg';
import album_six from '../assets/album/album_six.jpg';
import album_seven from '../assets/album/album_seven.jpg';
import album_eight from '../assets/album/album_eight.jpg';
import album_nine from '../assets/album/album_nine.jpg';
import album_ten from '../assets/album/album_ten.jpg';
import album_eleven from '../assets/album/album_eleven.jpg';
import album_twelve from '../assets/album/album_twelve.jpg';
import album_fourteen from '../assets/album/album_fourteen.jpg';
import album_fifteen from '../assets/album/album_fifteen.jpg';
import album_seventeen from '../assets/album/album_seventeen.jpg';
import omaxe_one from '../assets/album/omaxe.jpg';
import omaxe_two from '../assets/album/omaxeee.jpg';
import one from '../assets/album/one.jpg';
import two from '../assets/album/two.jpg';


const categories = ['all', 'Surya Sarees', 'Raagwaas', 'Siyonee'];

const images = [
  { category: 'Surya Sarees', src: omaxe_one },
  { category: 'Surya Sarees', src: omaxe_two },
  { category: 'Surya Sarees', src: album_one },
  { category: 'Raagwaas', src: album_eight },
  { category: 'Surya Sarees', src: album_two },
  { category: 'Surya Sarees', src:  one},
  { category: 'Surya Sarees', src:  two},
  { category: 'Siyonee', src: album_fifteen },
  { category: 'Surya Sarees', src: album_seven },
  { category: 'Surya Sarees', src: album_five },
  { category: 'Surya Sarees', src: album_three },
  { category: 'Raagwaas', src: album_nine },
  { category: 'Raagwaas', src: album_eleven },
  { category: 'Surya Sarees', src: album_twelve },
  { category: 'Surya Sarees', src: album_seventeen },
  { category: 'Raagwaas', src: album_ten },
  { category: 'Surya Sarees', src: album_six },
  { category: 'Siyonee', src: album_fourteen },
  { category: 'Surya Sarees', src: album_four }
];

const FilterGallery = () => {
  const [filter, setFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);

  return (
    <section className="py-5">
      <div className="container">
        {/* Filter Buttons */}
        <ul className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map(cat => (
            <li
              key={cat}
              className={`brand-tab ${filter === cat ? 'brand-tab-active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>

        {/* Gallery Grid */}
        <div className="row g-3 brand-gallery">
          {filteredImages.map((img, idx) => (
            <div className="col-6 col-md-4 col-lg-3" key={idx}>
              <div className="brand-gallery-item" onClick={() => setLightboxImg(img.src)}>
                <img src={img.src} alt={`Gallery ${idx}`} className="img-fluid rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImg && (
          <div className="brand-lightbox open" onClick={() => setLightboxImg(null)}>
            <div className="brand-lightbox-wrapper">
              <div className="brand-lightbox-content">
                <img src={lightboxImg} className="img-fluid brand-lightbox-img" alt="Preview" />
              </div>
            </div>
            <div className="brand-lightbox-close" onClick={() => setLightboxImg(null)}>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterGallery;