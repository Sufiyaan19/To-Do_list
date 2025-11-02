import React from 'react';

export default function Pagination({ total, page, limit, onPage }) {
  const pages = Math.ceil(total / limit) || 1;

  if (pages === 1) return null; // no pagination needed if only 1 page

  return (
    <nav className="pagination" aria-label="Page navigation">
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={p === page ? 'active' : ''}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Go to page ${p}`}
          tabIndex={p === page ? -1 : 0}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
