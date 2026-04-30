import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Layout.css";
export default function Layout() {
  const { user, logout } = useAuth();

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
    </div>
  );
}
