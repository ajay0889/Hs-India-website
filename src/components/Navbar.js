import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  {
    label: 'Home',
    href: '/',
    icon: null,
  },
  {
    label: 'About Us',
    href: '/about',
    icon: null,
  },
  {
    label: 'Our Business',
    href: '/our-business',
    icon: null,
  },
  {
    label: 'Media',
    href: '/media',
    icon: null,
  },
  {
    label: 'Contact Us',
    href: '/contact',
    icon: 'null',
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`} role="navigation"> 
      <div className="container">
      <Link className="navbar-brand" to="/">
        <img src={require('../assets/hs-logo-white.png')} alt="HS India" className="logo" />
      </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {menu.map((item, idx) => {
              if (item.mega) {
                return (
                  <li
                    className="nav-item dropdown"
                    key={item.label}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="nav-link" type="button">{item.label}</button>
                    {activeMenu === item.label && (
                      <div className="dropdown-menu mega-menu show">
                        <div className="mega-menu-row row g-5">
                          {item.columns.map((col, cidx) => (
                            <div className="mega-menu-col col-lg-12" key={col.header.label}>
                              <div className="mega-menu-section">
                                <h6 className="dropdown-header">
                                  {col.header.icon && <i className={`bi ${col.header.icon}`}></i>} {col.header.label}
                                </h6>
                                <div className="mega-menu-links">
                                  {col.items.map((sub, sidx) => (
                                    <a className="dropdown-item" href={sub.href} key={sub.label}>
                                      {sub.icon && <i className={`bi ${sub.icon}`}></i>} {sub.label}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              } else if (item.dropdown) {
                return (
                  <li
                    className="nav-item dropdown"
                    key={item.label}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="nav-link" type="button">{item.label}</button>
                    {activeMenu === item.label && (
                      <div className="dropdown-menu show">
                        {item.items.map((sub, sidx) => (
                          <a className="dropdown-item" href={sub.href} key={sub.label}>
                            {sub.icon && <i className={`bi ${sub.icon}`}></i>} {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                );
              } else {
                return (
                  <li className="nav-item" key={item.label}>
                    <Link
                      className={`nav-link${location.pathname === item.href ? ' active' : ''}`}
                      to={item.href}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                    >
                      {item.icon && <i className={`bi ${item.icon}`}></i>} {item.label}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 