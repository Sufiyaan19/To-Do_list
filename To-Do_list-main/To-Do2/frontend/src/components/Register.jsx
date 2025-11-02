import React, { useState } from 'react';
import { API_BASE } from '../utils/api';

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

export default function Register({ onRegister, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,7}$/.test(email)) return "Please enter a valid email.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        onRegister(data.token);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card register-form" onSubmit={submit} autoComplete="off" aria-label="Register a new account">
      <h2 className="gradient-text">Register</h2>

      <label>
        <span className="label-text">Name <span className="accent">*</span></span>
        <input
          className="glass-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          required
          autoFocus
        />
      </label>

      <label>
        <span className="label-text">Email <span className="accent">*</span></span>
        <input
          className="glass-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="your@email.com"
          required
        />
      </label>

      <label>
        <span className="label-text">Password <span className="accent">*</span></span>
        <input
          className="glass-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Create a password"
          required
          minLength={6}
        />
      </label>

      {error && <div className="error-msg" role="alert">{error}</div>}

      <AnimatedButton loading={loading}>Register</AnimatedButton>

      <p style={{ marginTop: 10, textAlign: 'center' }}>
        <span className="muted">Already have an account?</span>{' '}
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
        >
          Login
        </button>
      </p>
    </form>
  );
}
