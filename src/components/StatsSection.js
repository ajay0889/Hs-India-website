import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const stats = [
    {
      number: 65,
      suffix: '+',
      label: 'Years of Experience',
      icon: 'bi-briefcase-fill',
    },
    {
      number: 50000,
      suffix: '+',
      label: 'Happy Customers',
      icon: 'bi-emoji-smile-fill',
    },
    {
      number: 100,
      suffix: '+',
      label: 'Distributors Globally',
      icon: 'bi-globe',
    },
    {
      number: 30000,
      suffix: '+',
      label: 'Orders Delivered',
      icon: 'bi-truck',
    },
  ];

  return (
    <section className='Stats'>
      <div className='StatsOverlay'>
        <div className="container py-5">
          <div className="row g-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  number={stat.number}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

// ⬇️ StatCard: Single Stat Block with re-triggering animation
const StatCard = ({ number, suffix, label, icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) {
      setStart(true);
    } 
    // else {
    //   setStart(false); // Reset count to re-trigger on next view
    // }
  }, [inView]);

  return (
    <div className="col-md-6 col-lg-3">
      <div
        className="position-relative bg-white shadow-sm rounded-4 p-5 text-center overflow-hidden h-100"
        ref={ref}
      >
        {/* Background Icon */}
        <i
          className={`bi ${icon} position-absolute start-0`}
          style={{
            fontSize: '5rem',
            color: '#d70077',
            opacity: 0.3,
            zIndex: 1,
            top: '50%',
            transform: 'translateY(-50%) rotate(20deg)',
          }}
        ></i>

        {/* Foreground Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="fw-bold" style={{fontSize: '3rem', color:'#d70077'}}>
            {start && <CountUp end={number} duration={2} separator="," />}
            {suffix}
          </h2>
          <p className="mb-0" style={{color: '#000', fontSize:'1rem', fontWeight: '500'}}>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;