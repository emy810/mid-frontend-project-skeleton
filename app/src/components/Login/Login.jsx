import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = !email.includes("@") || password.length < 6;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isInvalid) return;

    try {
      await login(email, password);
      navigate("/events");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={isInvalid}>
          Login
        </button>
      </form>
      <div className="register-link">
        Don’t have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
