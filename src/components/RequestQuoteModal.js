import React, { useState } from 'react';
import './RequestQuoteModal.css';

const businessTypes = [
  '',
  'Retailer',
  'Wholesaler',
  'Distributor',
  'Online Seller',
  'Other',
];
const yearsInBusiness = [
  '',
  'Less than 1 year',
  '1-3 years',
  '3-5 years',
  '5+ years',
];
const storeSizes = [
  '',
  'Small (<500 sq ft)',
  'Medium (500-1500 sq ft)',
  'Large (>1500 sq ft)',
];

const RequestQuoteModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    business: '',
    years: '',
    size: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Thank you for your request!');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="rq-modal-overlay">
      <div className="rq-modal">
        <button className="rq-modal-close" onClick={onClose}>&times;</button>
        <h2 className="rq-modal-title">
          Partner with <span className="rq-brand">HS India</span>
        </h2>
        <div className="rq-modal-underline"></div>
        <p className="rq-modal-desc">
          Join our growing network of trusted fashion wholesalers across India. We offer exclusive designs, competitive margins, and full support for your business growth.
        </p>
        <form className="rq-modal-form" onSubmit={handleSubmit}>
          <div className="rq-modal-row">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" type="email" required />
          </div>
          <div className="rq-modal-row">
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
          </div>
          <select name="business" value={form.business} onChange={handleChange} required>
            {businessTypes.map((b, i) => <option key={i} value={b}>{b || 'Nature of Business'}</option>)}
          </select>
          <select name="years" value={form.years} onChange={handleChange} required>
            {yearsInBusiness.map((y, i) => <option key={i} value={y}>{y || 'No. of Years in Business'}</option>)}
          </select>
          <select name="size" value={form.size} onChange={handleChange} required>
            {storeSizes.map((s, i) => <option key={i} value={s}>{s || 'Size of Store'}</option>)}
          </select>
          <button className="rq-modal-submit" type="submit">
            Apply to Become a Partner
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestQuoteModal; 