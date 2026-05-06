import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

import "./Layout.css";
export default function Layout() {
  const { user, logout } = useAuth();
  const { cartCount } = useContext(CartContext);

  return (
    <div>
      <header className="main-header">
        <div className="header-left">
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            className="logo-link"
          >
            <img src={hyfLogo} alt="HackYourFuture logo" className="logo" />
          </a>
          <nav className="header-nav">
            <Link to="/events">Events</Link>
          </nav>
        </div>

        <div className="header-right">
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} HYF - Event Startup Project</p>
        </div>
      </footer>
    </div>
  );
}
