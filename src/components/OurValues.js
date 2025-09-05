import 'bootstrap/dist/css/bootstrap.min.css';

const valuesData = [
  {
    icon: 'bi-lightbulb-fill',
    title: 'Innovation',
    desc: 'We embrace creative thinking and continuously seek new solutions to drive progress.'
  },
  {
    icon: 'bi-shield-check',
    title: 'Integrity',
    desc: 'We uphold honesty, fairness, and transparency in everything we do.'
  },
  {
    icon: 'bi-people-fill',
    title: 'Collaboration',
    desc: 'We work together, combining strengths to achieve shared success.'
  },
  {
    icon: 'bi-hand-thumbs-up-fill',
    title: 'Respect',
    desc: 'We value every individual, treating everyone with dignity and fairness.'
  },
  {
    icon: 'bi-shield-lock',
    title: 'Trust',
    desc: 'We build lasting relationships based on reliability and accountability.'
  },
  {
    icon: 'bi-emoji-smile-fill',
    title: 'Positive Attitude',
    desc: 'We approach challenges with optimism and a can-do spirit.'
  },
];

const brandSecondary = '#d70077';

const OurValues = () => (
  <section style={{ background: '#faebd7' }}>
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
            <div className="card h-100 text-center shadow-sm border-0 p-4 animate-fadein" style={{ backgroundColor: 'rgb(255, 255, 255, 50%)' }}>
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