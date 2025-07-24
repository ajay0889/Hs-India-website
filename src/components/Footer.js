import React from 'react';
import './Footer.css';
import hsLogo from '../assets/hs-logo-white.png';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="hs-footer" role="contentinfo">
      <div className="hs-footer-main py-5">
        <div className="container">
          <div className="row justify-content-center align-items-start">
            <div className="col-12 col-md-2 d-flex mb-4 mb-md-0">
              <img src={hsLogo} alt="HS India Logo" className="hs-footer-logo" />
            </div>
            <div className="col-12 col-md-10">
              <div className="row">
                <div className="col-12 col-md-4 mb-4 mb-md-0">
                  <div className="hs-footer-heading">Company</div>
                  <ul className="hs-footer-list">
                    <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} aria-current={location.pathname === '/about' ? 'page' : undefined}>About Us</Link></li>
                    <li><Link to="/our-business" className={location.pathname === '/our-business' ? 'active' : ''} aria-current={location.pathname === '/our-business' ? 'page' : undefined}>Our Business</Link></li>
                    <li><Link to="/media" className={location.pathname === '/media' ? 'active' : ''} aria-current={location.pathname === '/media' ? 'page' : undefined}>Media</Link></li>
                    <li>Stories</li>
                    <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} aria-current={location.pathname === '/contact' ? 'page' : undefined}>Contact Us</Link></li>
                  </ul>
                  <div className="hs-footer-heading mt-4">Connect With us</div>
                  <div className="hs-footer-social mt-2">
                    <a href="https://www.instagram.com/hsindiaa/?hl=en" aria-label="Instagram" className="me-2"><i className="bi bi-instagram"></i></a>
                    <a href='https://www.facebook.com/hsindiaofficial/' aria-label='Facebook'><i className='bi bi-facebook'></i></a>
                    <a href="https://www.linkedin.com/company/hoshiyar-singh-suresh-chandra-sarees-private-limited/" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-4 mb-md-0">
                  <div className="hs-footer-heading">Legal Links</div>
                  <ul className="hs-footer-list">
                    <li><Link to="/disclaimer" className={location.pathname === '/disclaimer' ? 'active' : ''} aria-current={location.pathname === '/disclaimer' ? 'page' : undefined}>Disclaimer</Link></li>
                    <li><Link to="/privacy-policy" className={location.pathname === '/privacy-policy' ? 'active' : ''} aria-current={location.pathname === '/privacy-policy' ? 'page' : undefined}>Privacy Policy</Link></li>
                    <li><Link to="/cookie-policy" className={location.pathname === '/cookie-policy' ? 'active' : ''} aria-current={location.pathname === '/cookie-policy' ? 'page' : undefined}>Cookie Policy</Link></li>
                  </ul>
                </div>
                <div className="col-12 col-md-4">
                  <div className="hs-footer-heading">Subscribe</div>
                  <p className="text-white-50 mb-3">Get the latest updates, offers, and news from HS India directly to your inbox.</p>
                  <form className="hs-footer-subscribe-form" onSubmit={e => e.preventDefault()}>
                    <div className='col-12'>
                      <input type="email" className="form-control" id="subscribe" placeholder="Your Mail" required />
                    </div>
                    <div className='col-12 mt-3'>
                      <button type="submit" className="btn btn-primary px-4 py-2 Primary-Button">Subscribe</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hs-footer-bottom text-center py-3">
        <div className="container">
          <small className="text-white-50">&copy; {new Date().getFullYear()} HS India. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 