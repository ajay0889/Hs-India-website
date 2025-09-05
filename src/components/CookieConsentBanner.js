import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      className="position-fixed bottom-0 w-100 bg-dark text-white p-3 shadow-lg"
      style={{ zIndex: 1050 }}
    >
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        <p className="mb-2 mb-md-0" style={{ fontSize: '14px' }}>
          We use cookies to enhance your wholesale shopping experience for sarees, lehengas, readymade garments, and gowns. 
          By continuing to use our website, you agree to our <a href="/cookie-policy" className="text-warning">Cookie Policy</a>.
        </p>
        <button className="btn btn-warning btn-sm ms-md-3" onClick={handleAccept}>
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
