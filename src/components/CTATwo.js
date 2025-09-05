import 'bootstrap/dist/css/bootstrap.min.css';

const CTATwo = () => {
  return (
    <section
      style={{
        width: '100%',
        background: '#faebd7',
        color: '#000',
        padding: '2rem 0',
      }}
    >
      <div
        className="container d-flex flex-column flex-md-row align-items-center justify-content-between"
        style={{ minHeight: '100px' }}
      >
        <div className="mb-3 mb-md-0">
          <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '0.5rem' }}>
          Let’s Build Something Timeless Together!
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: 0 }}>
          Join 10,000+ retailers, resellers & fashion entrepreneurs who trust HS India for trend-driven ethnicwear, global shipping, and business support that scales.
          </p>
        </div>
        <a href="tel:9210740822" className="btn btn-lg btn-primary px-4 py-2 Primary-Button">Contact Us</a>
      </div>
    </section>
  );
};

export default CTATwo; 