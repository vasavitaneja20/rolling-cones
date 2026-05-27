import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./../styles/components/Navbar.css";

function NavBar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar">

      <Link
        to="/"
        className="navbar__brand"
        aria-label="The Rolling Cones Home"
      >
        <img
          src={logo}
          alt="The Rolling Cones logo"
          className="navbar__logo"
        />

        <span className="navbar__title">
          The Rolling Cones
        </span>
      </Link>

      <button
        type="button"
        className="navbar__hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`}>

        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `navbar__link ${
              isActive ? "navbar__link--active" : ""
            }`
          }
        >
          Menu
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `navbar__link navbar__cart ${
              isActive ? "navbar__link--active" : ""
            }`
          }
        >
          <span className="navbar__cart-icon">
            🛒
          </span>

          <span>Cart</span>

          <span className="navbar__cart-count">
            {cartCount}
          </span>
        </NavLink>

        <NavLink
          to="/staff-login"
          className={({ isActive }) =>
            `navbar__staff ${
              isActive ? "navbar__link--active" : ""
            }`
          }
        >
          👤
        </NavLink>

      </nav>

    </header>
  );
}

export default NavBar;