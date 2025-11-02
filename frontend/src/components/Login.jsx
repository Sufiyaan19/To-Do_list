import React, { useState } from 'react';
import { API_BASE } from '../utils/api';

// Animated button for submitting
function AnimatedButton({ loading, children, ...props }) {
  return (
    <button
      className={`accent-btn${loading ? " loading" : ""}`}
      type="submit"
      disabled={loading}
      {...props}
    >
      {loading ? <span className="spinner" aria-hidden="true"></span> : children}
    </button>
  );
}

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim()) return "Email is required.";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,7}$/.test(email)) return "Please enter a valid email.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card login-form" onSubmit={submit} autoComplete="off" aria-label="Login">
      <h2 className="gradient-text">Login</h2>
      <label>
        <span className="label-text">Email <span className="accent">*</span></span>
        <input
          className="glass-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoFocus
        />
      </label>
      <label>
        <span className="label-text">Password <span className="accent">*</span></span>
        <input
          className="glass-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength={6}
        />
      </label>
      {error && (
        <div className="error-msg" role="alert">{error}</div>
      )}
      <AnimatedButton loading={loading}>Login</AnimatedButton>
      <p style={{marginTop: 8, textAlign: 'center'}}>
        <span className="muted">Don't have an account?</span>{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="alt-btn"
          style={{
            background: "none",
            border: "none",
            color: "var(--accent)",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "1em"
          }}
        >Register</button>
      </p>
    </form>
  );
}
