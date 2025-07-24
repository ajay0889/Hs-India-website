import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import FullPageSlider from './components/FullPageSlider';
import News from './components/News';
import FlexSlider from './components/FlexSlider';
import Footer from './components/Footer';
import BlogSection from './components/BlogSection';
import VerticalTabs from './components/VerticalTabs';
import Contact from './components/Contact';
import OurPeople from './components/OurPeople';
import OurVision from './components/OurVision';
import AboutUs from './components/AboutUs';
import OurBusiness from './components/OurBusiness';
import Media from './components/Media';
import NotFound from './components/NotFound';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import StackedCards from './components/StackedCards';
import OurValues from './components/OurValues';
import FilterGallery from './components/FilterGallery';
import CTASection from './components/CTASection';
import CTATwo from './components/CTATwo';
import HorizontalTabs from './components/HorizontalTabs';
import FloatingButtonGroup from './components/FloatingButtonGroup';
import Disclaimer from './components/Disclaimer';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import StatsSection from './components/StatsSection';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<><SEO title="HS India - Women Ethnic Wear" description="HS India is a leader in ethnic fashion, blending tradition with innovation. Explore our sarees, lehengas, and more." /><FullPageSlider /><HorizontalTabs /><StatsSection /><News /><FlexSlider /><VerticalTabs /><CTASection /><OurPeople /><StackedCards /><OurVision /><OurValues /><BlogSection /></>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<><AboutUs /><OurVision /> <OurValues /> <OurPeople /> </>} />
        <Route path="/our-business" element={<> <OurBusiness /> <CTASection /><StackedCards /></>} />
        <Route path="/media" element={<><Media /><FilterGallery /></>} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        {/* Add other routes here as needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CTATwo />
      <Footer />
      <FloatingButtonGroup />
    </BrowserRouter>
  );
}

export default App;