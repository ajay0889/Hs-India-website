import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import CookieConsentBanner from './components/CookieConsentBanner';
import ProductsPage from './components/Products';
import NewsDetail from './pages/NewsDetail';
import NewsList from "../src/pages/NewsList";
import NewsEditor from "./pages/NewsEditor";
import AllNews from "./pages/AllNews";
import AllBlogs from "./pages/AllBlogs";
import BlogDetail from "./pages/BlogDetail";
import BlogEditor from "./pages/BlogEditor";
import BlogList from "./pages/BlogList";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import AdminFooter from "./components/AdminFooter";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/dashboard" element={<RequireAuth><AdminNavbar /><AdminDashboard /><AdminFooter /></RequireAuth>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/newslist" element={<RequireAuth><AdminNavbar /><NewsList /><AdminFooter /></RequireAuth>} />
        <Route path="/bloglist" element={<RequireAuth><AdminNavbar /><BlogList /><AdminFooter /></RequireAuth>} />
        <Route path="/editor" element={<RequireAuth><AdminNavbar /><NewsEditor /><AdminFooter /></RequireAuth>} />
        <Route path="/blog-editor" element={<RequireAuth><AdminNavbar /><BlogEditor /><AdminFooter /></RequireAuth>} />
        <Route path="/" element={<><Navbar /><SEO title="HS India - Women Ethnic Wear" description="HS India is a leader in ethnic fashion, blending tradition with innovation. Explore our sarees, lehengas, and more." /><FullPageSlider /><HorizontalTabs /><StatsSection /><News /><FlexSlider /><VerticalTabs /><CTASection /><OurPeople /><StackedCards /><OurVision /><OurValues /><BlogSection /> </>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/about" element={<><Navbar /><AboutUs /><OurVision /> <OurValues /> <OurPeople /> </>} />
        <Route path="/our-business" element={<><Navbar /><OurBusiness /> <CTASection /><StackedCards /></>} />
        <Route path="/products" element={<><Navbar /><ProductsPage /></>} />
        <Route path="/media" element={<><Navbar /><Media /><FilterGallery /></>} />
        <Route path="/disclaimer" element={<><Navbar /><Disclaimer /></>} />
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /></>} />
        <Route path="/cookie-policy" element={<><Navbar /><CookiePolicy /></>} />
        <Route path="/news" element={<><Navbar /><AllNews /></>} />
        <Route path="/news/:slug" element={<><Navbar /><NewsDetail /></>} />
        <Route path="/blogs" element={<><Navbar /><AllBlogs /></>} />
        <Route path="/blogs/:slug" element={<><Navbar /><BlogDetail /></>} />
        {/* Add other routes here as needed */}
        <Route path="*" element={<><Navbar /><NotFound /></>} />
      </Routes>
      
      {/* Public site footer components - only show on public routes */}
      <Routes>
        <Route path="/admin/*" element={null} />
        <Route path="/newslist" element={null} />
        <Route path="/bloglist" element={null} />
        <Route path="/editor" element={null} />
        <Route path="/blog-editor" element={null} />
        <Route path="*" element={<><CTATwo /><Footer /><FloatingButtonGroup /><CookieConsentBanner /></>} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;