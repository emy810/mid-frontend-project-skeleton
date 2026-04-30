// TODO: build a register form with relevant fields
// TODO: call register(email, password) from useAuth() on submit
// TODO: show a clear error message if registration fails
// TODO: redirect to the event list on success
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const isInvalid =
    !email.includes("@") || password.length < 6 || password !== confirm;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isInvalid) return;

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await register(email, password);
      navigate("/events");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Register</h1>
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

        <label>
          Confirm Password:
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={isInvalid}>
          Create Account
        </button>
      </form>
      <div className="register-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}
