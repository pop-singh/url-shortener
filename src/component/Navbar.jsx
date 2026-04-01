import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Docs" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="logo-icon">🔗</span>
          <span className="logo-text">LinkSnap</span>
        </Link>

        {/* Desktop links */}
        <ul className={`navbar-links ${open ? "navbar-links--open" : ""}`}>
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
          {/* Mobile-only CTA inside drawer */}
          <li className="mobile-cta-item">
            <Link
              to="/shorten"
              className="navbar-cta"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link to="/shorten" className="navbar-cta desktop-cta">
          Get Started
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${open ? "hamburger--open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
