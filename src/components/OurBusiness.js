import '../styles/OurBusiness.css';
import SEO from './SEO';
import {Link} from 'react-router-dom';
import business from '../assets/business.jpg'

const OurBusiness = () => (
  <>
    <SEO title="Our Business - HS India" description="Discover HS India's business segments, key brands, and our commitment to excellence in ethnic fashion." />
    <section className="Padding-Top pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="custom-heading">Powering Fashion — From Design to Delivery</h1>
            <hr className="custom-divider" />
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <p className="ourbusiness-lead mb-4">At HS India, we don’t just create fashion — we build businesses around it. Our strength lies in a vertically integrated model that connects design, manufacturing, wholesale, and global retail under one powerful brand ecosystem.</p>
            <Link to={`/contact`} className="hs-blog-link">
                Partner With Us <span className="hs-blog-arrow">&rarr;</span>
              </Link>
          </div>
          <div className="col-lg-6 text-center">
            <img src= {business} alt="Our Business" className="img-fluid rounded-4 shadow" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default OurBusiness; 