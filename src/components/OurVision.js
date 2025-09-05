import './OurPeople';
import peopleImg from '../assets/vision.jpg';
import { Link } from 'react-router-dom';

const OurVision = () => (
  <section className="our-people-section py-5">
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-12">
          <div className="our-people-bg rounded-4 d-flex flex-column flex-lg-row align-items-stretch overflow-hidden">
            <div className="our-people-img-wrap flex-grow-1 d-flex align-items-center justify-content-center">
              <img src={peopleImg} alt="Our People" className="img-fluid h-100 w-100 object-fit-cover" />
            </div>
            <div className="our-people-card bg-white rounded-4 p-5 flex-grow-1 d-flex flex-column justify-content-center">
              <h2 className="our-people-title mb-4">Our Vision</h2>
              <p className="our-people-desc mb-4">
                At HS India, our vision is to blend timeless tradition with modern innovation, setting new standards in ethnic fashion. We aspire to empower individuals and communities by celebrating heritage, fostering creativity, and leading with integrity. Our commitment is to create a world where every occasion is adorned with elegance, and every customer experiences the pride of Indian craftsmanship.
              </p>
              <Link to={`/about`} className="hs-blog-link">
                Read More <span className="hs-blog-arrow">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OurVision; 