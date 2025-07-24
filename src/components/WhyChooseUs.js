import React from 'react';

const reasons = [
  'Unmatched craftsmanship and quality assurance',
  'Innovative designs blending tradition and modernity',
  'Ethically sourced materials and sustainable practices',
  'Exceptional customer service and support',
  'Trusted by thousands of satisfied customers',
];

const WhyChooseUs = () => (
  <section style={{ background: '#f8f9fa', minHeight: '60vh', padding: '3rem 0' }}>
    <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 700, marginBottom: '1rem', color: '#222' }}>Why Choose Us</h1>
      <p style={{ fontSize: '1.15rem', marginBottom: '2rem', color: '#444' }}>
        Discover what sets us apart in the world of ethnic fashion. We are committed to delivering excellence in every aspect of our business.
      </p>
      <ul style={{ listStyle: 'disc inside', color: '#333', fontSize: '1.08rem', lineHeight: 2 }}>
        {reasons.map((reason, idx) => (
          <li key={idx}>{reason}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default WhyChooseUs; 