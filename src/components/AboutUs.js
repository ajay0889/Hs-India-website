import '../styles/AboutUs.css';
import SEO from './SEO';

const AboutUs = () => (
  <>
    <SEO title="About Us - HS India" description="Learn about HS India's brand story, mission, vision, and values in the world of ethnic fashion." />
    <section className="aboutus-hero Padding-Top">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="custom-heading">Where Heritage Meets Couture</h1>
            <hr className="custom-divider" />
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <p className="aboutus-lead mb-4">At HS India, fashion is not just fabric — it's a feeling, a story, and a legacy. Established with a vision to blend timeless Indian craftsmanship with modern design sensibilities, we have become one of the country's leading names in ethnic and bridal wear. From intricate bridal lehengas to ready-to-ship festive collections, our creations are cherished by resellers, retailers, and fashion lovers across the globe.</p>
          </div>
          <div className="col-lg-6 text-center">
            <img src={require('../assets/people-hands.jpg')} alt="About HS India" className="img-fluid rounded-4 shadow" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AboutUs; 