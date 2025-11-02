import React, { useEffect, useState } from 'react';
import { API_BASE, getAuthHeaders } from '../utils/api';
import AddTodo from './AddTodo.jsx';
import TodoItem from './TodoItem.jsx';
import SearchBar from './SearchBar.jsx';
import Pagination from './Pagination.jsx';

export default function TodoList({ token }) {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch todos according to current page and query
  const fetchTodos = async (p = 1, q = '') => {
    setLoading(true);
    setError('');
    try {
      const url = `${API_BASE}/todos?page=${p}&limit=8&search=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers: getAuthHeaders(token) });
      const data = await res.json();
      if (res.ok) {
        setTodos(data.todos);
        setTotal(data.total);
        setPage(data.page);
      } else {
        setError(data.message || 'Failed to fetch todos');
      }
    } catch (err) {
      setError('Network error while fetching todos');
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos on mount and when page or query changes
  useEffect(() => {
    fetchTodos(page, query);
  }, [page, query]);

  // Handle add updates list, refresh page 1
  const handleAdd = (todo) => {
    setTodos(prev => [todo, ...prev]);
    setPage(1);
  };

  const handleUpdate = (updated) => {
    setTodos(prev => prev.map(t => t._id === updated._id ? updated : t));
  };

  const handleDelete = (id) => {
    const filtered = todos.filter(t => t._id !== id);
    setTodos(filtered);
    // If after delete, page is empty and not first page, go back one page
    if (filtered.length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = (q) => {
    setQuery(q);
    setPage(1);
  };

  return (
    <div className="todo-list-container">
      <div className="toolbar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <AddTodo token={token} onAdd={handleAdd} />
      {loading && <div className="loading-text">Loading todos...</div>}
      {error && <div className="error-msg" role="alert">{error}</div>}
      {!loading && todos.length === 0 && <div className="empty-state">No todos found.</div>}
      {!loading && todos.length > 0 &&
        todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} token={token} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))
      }
      <Pagination total={total} page={page} limit={8} onPage={setPage} />
    </div>
  );
}
