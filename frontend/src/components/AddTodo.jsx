import React, { useState } from 'react';
import { API_BASE, getAuthHeaders } from '../utils/api';

// Helper: animated button and error feedback
function AnimatedButton({ loading, children, ...props }) {
  return (
    <button
      className={`accent-btn${loading ? " loading" : ""}`}
      type="submit"
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="spinner" aria-hidden="true"></span>
      ) : (
        children
      )}
    </button>
  );
}

export default function AddTodo({ token, onAdd }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState('low');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simple validators
  const validate = () => {
    if (!title.trim()) return "Title is required.";
    if (title.length > 80) return "Title is too long (max 80 chars).";
    if (tags.length > 64) return "Tags are too long (max 64 chars).";
    if (due && new Date(due) < new Date(Date.now() - 86400000)) return "Due date can't be in the past.";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({
          title,
          tags: tags.split(',').map(s => s.trim()).filter(Boolean),
          dueDate: due || null,
          priority
        })
      });
      const data = await res.json();
      if (res.ok) {
        onAdd(data);
        setTitle('');
        setTags('');
        setDue('');
        setPriority('low');
      } else {
        setError(data.message || 'Server error');
      }
    } catch (err) {
      setError("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card addtodo-form" onSubmit={submit} autoComplete="off" aria-label="Add Todo">
      <h3>Add a new Todo</h3>

      <label>
        <span className="label-text">Title <span className="accent">*</span></span>
        <input
          className="glass-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
          maxLength={80}
        />
      </label>

      <label>
        <span className="label-text">Tags</span>
        <input
          className="glass-input"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="tags: school, urgent, personal"
          maxLength={64}
        />
      </label>

      <div className="row">
        <label>
          <span className="label-text">Due Date</span>
          <input
            className="glass-input"
            value={due}
            onChange={e => setDue(e.target.value)}
            type="date"
            min={new Date().toISOString().split('T')[0]}
          />
        </label>
        <label>
          <span className="label-text">Priority</span>
          <select
            className="glass-input"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </label>
      </div>

      {error && (
        <div className="error-msg" role="alert">
          {error}
        </div>
      )}

      <AnimatedButton loading={loading}>Add</AnimatedButton>
    </form>
  );
}
