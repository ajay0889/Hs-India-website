import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', paddingTop: '4rem' }}>
    <h1 style={{ fontSize: '4rem', color: '#d70077', marginBottom: '1rem' }}>404</h1>
    <h2 style={{ color: '#d29a39', marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ color: '#333', marginBottom: '2rem' }}>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" style={{ color: '#fff', background: '#d70077', padding: '0.75rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600 }}>Go Home</Link>
  </div>
);

export default NotFound; 