import React, { useEffect, useState } from 'react';
import { API_BASE, getAuthHeaders } from '../utils/api';

export default function Profile({ token, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: getAuthHeaders(token)
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          setError("");
        } else {
          setError(data.message || "Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        setError("Network error loading profile");
      }
      setLoading(false);
    })();
  }, [token]);

  return (
    <div className="profile card" role="region" aria-label="User Profile">
      <h3>Profile</h3>
      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : error ? (
        <div className="error-msg" role="alert">{error}</div>
      ) : (
        <div className="profile-info">
          <div><strong>{profile?.name || 'User'}</strong></div>
          <div>{profile?.email}</div>
          <div>{profile?.bio || "No bio available"}</div>
        </div>
      )}
      <button className="accent-btn logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
