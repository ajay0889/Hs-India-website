import { useState, useEffect } from 'react';
import '../styles/FloatingButtonGroup.css';
import RequestQuoteModal from './RequestQuoteModal';

const buttons = [
  {
    icon: <i className="bi bi-ui-checks-grid"></i>,
    label: 'Partner With Us',
  }
];

const FloatingButtonGroup = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setShowScrollTop(scrolledPercent > 7);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="floating-btn-fixed-group">
        <button
          className="floating-btn-fixed"
          style={{ bottom: `180px` }}
          onClick={() => setModalOpen(true)}
          type="button"
        >
          <span className="floating-btn-fixed-icon">{buttons[0].icon}</span>
          <span className="floating-btn-fixed-label">{buttons[0].label}</span>
        </button>
        {showScrollTop && (
          <button
            className="floating-btn-fixed floating-btn-scrolltop"
            style={{ bottom: `320px` }}
            onClick={handleScrollToTop}
            type="button"
            aria-label="Scroll to top"
          >
            <span className="floating-btn-fixed-icon"><i className="bi bi-arrow-up-circle"></i></span>
            <span className="floating-btn-fixed-label">Top</span>
          </button>
        )}
      </div>
      <RequestQuoteModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default FloatingButtonGroup;