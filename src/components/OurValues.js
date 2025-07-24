import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const valuesData = [
  {
    icon: 'bi-people-fill',
    title: 'Teamwork',
    desc: 'We believe in the power of collaboration and working together to achieve common goals.'
  },
  {
    icon: 'bi-lightbulb-fill',
    title: 'Innovation',
    desc: 'We encourage creativity and embrace new ideas to stay ahead in the industry.'
  },
  {
    icon: 'bi-shield-check',
    title: 'Integrity',
    desc: 'We act with honesty and transparency in all our business dealings.'
  },
  {
    icon: 'bi-award-fill',
    title: 'Excellence',
    desc: 'We strive for the highest standards in our products, services, and operations.'
  },
  {
    icon: 'bi-globe',
    title: 'Diversity',
    desc: 'We value diverse perspectives and foster an inclusive environment for all.'
  },
  {
    icon: 'bi-heart-fill',
    title: 'Passion',
    desc: 'We are passionate about what we do and are committed to making a positive impact.'
  },
];

const brandSecondary = '#d70077';

const OurValues = () => (
  <section style={{background: '#faebd7'}}>
  <div className="container py-5">
    <div className="row">
      <div className="col-12">
        <h1 className="custom-heading">Rooted in Values. Growing with Integrity.</h1>
        <hr className="custom-divider" />
      </div>
    </div>
    <div className="row g-4 justify-content-center">
      {valuesData.map((val, idx) => (
        <div className="col-12 col-sm-6 col-lg-4" key={idx}>
          <div className="card h-100 text-center shadow-sm border-0 p-4 animate-fadein" style={{backgroundColor: 'rgb(255, 255, 255, 50%)'}}>
            <div className="mb-3">
              <i className={`bi ${val.icon} display-4`} style={{ color: brandSecondary }}></i>
            </div>
            <h5 className="mb-2" style={{ fontFamily: 'Satisfy, serif', fontWeight: 600 }}>{val.title}</h5>
            <p className="mb-0" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>{val.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  </section>
);

export default OurValues; 