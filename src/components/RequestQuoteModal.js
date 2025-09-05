import React, { useState } from 'react';
import '../styles/RequestQuoteModal.css';
import { withBase } from '../config/api';

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (name.trim().length > 50) return 'Name must be less than 50 characters';
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required';
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Please enter a valid 10-digit Indian mobile number';
    return '';
  };

  const validateCity = (city) => {
    if (!city.trim()) return 'City is required';
    if (city.trim().length < 2) return 'City must be at least 2 characters';
    if (city.trim().length > 30) return 'City must be less than 30 characters';
    return '';
  };

  const validateBusiness = (business) => {
    if (!business) return 'Please select your business type';
    return '';
  };

  const validateYears = (years) => {
    if (!years) return 'Please select years in business';
    return '';
  };

  const validateSize = (size) => {
    if (!size) return 'Please select store size';
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      city: validateCity(form.city),
      business: validateBusiness(form.business),
      years: validateYears(form.years),
      size: validateSize(form.size),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    
    // Validate form before submission
    if (!validateForm()) {
      setMessage('Please fix the errors below before submitting.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(withBase('/api/quotes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage('Thank you! Your request has been submitted successfully.');
        setForm({
          name: '',
          email: '',
          phone: '',
          city: '',
          business: '',
          years: '',
          size: '',
        });
        setTimeout(() => {
          onClose();
          setMessage('');
          setErrors({});
        }, 2000);
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          // Handle validation errors from backend
          setErrors(errorData.errors);
          setMessage('Please fix the errors below before submitting.');
        } else {
          setMessage('Sorry, there was an error submitting your request. Please try again.');
        }
      }
    } catch (error) {
      setMessage('Sorry, there was an error submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <form className="rq-modal-form" onSubmit={handleSubmit} noValidate>
          <div className="rq-modal-row">
            <div className="rq-field-group">
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Full Name" 
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="rq-error-text">{errors.name}</span>}
            </div>
            <div className="rq-field-group">
              <input 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                type="text" 
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="rq-error-text">{errors.email}</span>}
            </div>
          </div>
          <div className="rq-modal-row">
            <div className="rq-field-group">
              <input 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="rq-error-text">{errors.phone}</span>}
            </div>
            <div className="rq-field-group">
              <input 
                name="city" 
                value={form.city} 
                onChange={handleChange} 
                placeholder="City" 
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="rq-error-text">{errors.city}</span>}
            </div>
          </div>
          <div className="rq-modal-row">
            <div className="rq-field-group">
              <select 
                name="business" 
                value={form.business} 
                onChange={handleChange} 
                className={errors.business ? 'error' : ''}
              >
                {businessTypes.map((b, i) => <option key={i} value={b}>{b || 'Nature of Business'}</option>)}
              </select>
              {errors.business && <span className="rq-error-text">{errors.business}</span>}
            </div>
            <div className="rq-field-group">
              <select 
                name="years" 
                value={form.years} 
                onChange={handleChange} 
                className={errors.years ? 'error' : ''}
              >
                {yearsInBusiness.map((y, i) => <option key={i} value={y}>{y || 'No. of Years in Business'}</option>)}
              </select>
              {errors.years && <span className="rq-error-text">{errors.years}</span>}
            </div>
          </div>
          <div className="rq-modal-row">
            <div className="rq-field-group">
              <select 
                name="size" 
                value={form.size} 
                onChange={handleChange} 
                className={errors.size ? 'error' : ''}
              >
                {storeSizes.map((s, i) => <option key={i} value={s}>{s || 'Size of Store'}</option>)}
              </select>
              {errors.size && <span className="rq-error-text">{errors.size}</span>}
            </div>
            <div className="rq-field-group">
              <button className="rq-modal-submit" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Apply to Become a Partner'}
              </button>
            </div>
          </div>
          {message && (
            <div className={`rq-message ${message.includes('error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestQuoteModal; 