import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon">
        <path d="M3 12L12 4l9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Skills",
    href: "/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon">
        <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Résumé ↗",
    href: "https://drive.google.com/file/d/1ftJbPvZBC2-N6iB6eu4n7OsFebdeavRk/view?usp=drive_link",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="nav-icon">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="layout-root">

      {/* ── HAMBURGER ── */}
      <button
        className={`ham-btn ${navOpen ? "open" : ""}`}
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation"
      >
        <span /><span /><span />
      </button>

      {/* ── VERTICAL NAVBAR ── */}
      <nav className={`vertical-nav ${navOpen ? "visible" : ""}`}>

        {/* Logo / Name */}
        <div className="nav-logo">
          <span className="nav-logo-initial">K</span>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Khwaish</span>
            <span className="nav-logo-tagline">Portfolio</span>
          </div>
        </div>

        <ul>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.label}>
              <a                                          
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`nav-link ${hoveredIndex === i ? "hovered" : ""}`}
                onClick={() => setNavOpen(false)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="nav-icon-wrap">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="nav-arrow">→</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-footer-hint">
          <span>khwaish.goel123@gmail.com</span>
        </div>

      </nav>

      {navOpen && (
        <div className="nav-overlay" onClick={() => setNavOpen(false)} />
      )}

      {/* ── PAGE CONTENT ── */}
      <main className="layout-main">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-title">Let's Connect</p>
          <p className="footer-sub">Open to opportunities, collabs, and good conversations.</p>
          <div className="footer-links">
            <a href="mailto:khwaish.goel123@gmail.com" className="footer-icon-link" aria-label="Email me">
              <svg viewBox="0 0 24 24" fill="none" className="icon">
                <path d="M2 6.5C2 5.67 2.67 5 3.5 5h17c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-17C2.67 19 2 18.33 2 17.5v-11Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Gmail</span>
            </a>
            <a href="https://www.linkedin.com/in/khwaish-goel-billionaire232006/" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" className="icon">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/Khwaish06" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" className="icon">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
          <p className="footer-copy">© 2026 Khwaish Goel. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}