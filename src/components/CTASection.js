import 'bootstrap/dist/css/bootstrap.min.css';

const bgImage = require('../assets/news_one.jpeg');

const CTASection = () => {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '60vh',
        background: `url(${bgImage}) center center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.55)',
          zIndex: 1,
        }}
      ></div>
      <div
        className="container text-center"
        style={{
          position: 'relative',
          zIndex: 2,
          color: '#fff',
          padding: '4rem 1rem',
          maxWidth: 700,
        }}
      >
        <h1 className="mb-4" style={{ fontFamily: 'Satisfy, serif', fontWeight: 700, fontSize: '2.5rem' }}>
        Come Be Part of Our Journey
        </h1>
        <p className="mb-4" style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.2rem' }}>
        Join the HS India family — whether you’re a fashion lover, a business partner, or a bride-to-be — and experience ethnic wear that inspires and empowers.
        </p>
        <a
          href="tel:9210740822"
          className="btn btn-lg btn-primary px-5 py-2 Primary-Button"
        >
          Become a Seller
        </a>
      </div>
    </section>
  );
};

export default CTASection; 