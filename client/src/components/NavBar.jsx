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

     {/* <button
        type="button"
        className="navbar__hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </button>*/}

      <div className="navbar__actions">

<NavLink
  to="/menu"
  className={({ isActive }) =>
    `navbar__floating-btn ${
      isActive ? "navbar__floating-btn--active" : ""
    }`
  }
>
  Menu
</NavLink>

<NavLink
  to="/cart"
  className={({ isActive }) =>
    `navbar__floating-btn navbar__cart-btn ${
      isActive ? "navbar__floating-btn--active" : ""
    }`
  }
>
  🛒 Cart
  <span className="navbar__cart-count">
    {cartCount}
  </span>
</NavLink>

<NavLink
  to="/staff-login"
  className={({ isActive }) =>
    `navbar__floating-btn navbar__login-btn ${
      isActive ? "navbar__floating-btn--active" : ""
    }`
  }
>
  👤
</NavLink>

</div>
    </header>
  );
}

export default NavBar;