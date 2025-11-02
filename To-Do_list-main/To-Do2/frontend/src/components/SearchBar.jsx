import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  const handleChange = (e) => setQ(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar" aria-label="Search todos">
      <div className="search-input-container">
        <input
          className="glass-input"
          type="text"
          value={q}
          onChange={handleChange}
          placeholder="Search todos..."
          aria-label="Search todos"
        />
        <button className="search-icon" type="submit" aria-label="Search">
          <svg
            style={{ fill: "var(--accent)", width: "20px", height: "20px" }}
            viewBox="0 0 24 24"
          >
            <path d="M21.71 20.29l-3.388-3.388A8.958 8.958 0 0018 10a9 9 0 10-9 9 8.958 8.958 0 005.502-3.677l3.388 3.388a1 1 0 001.414-1.414zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
