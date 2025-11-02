import React from 'react';
import { API_BASE, getAuthHeaders } from '../utils/api';

export default function TodoItem({ todo, token, onUpdate, onDelete }) {
  const toggle = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos/${todo._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const data = await res.json();
      if (res.ok) onUpdate(data);
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete this todo?')) return;
    try {
      const res = await fetch(`${API_BASE}/todos/${todo._id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      });
      const data = await res.json();
      if (res.ok) onDelete(todo._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`todo card ${todo.completed ? 'completed' : ''}`} role="listitem" aria-checked={todo.completed}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggle}
          aria-label={`Mark todo '${todo.title}' as completed`}
        />
        <div className="meta">
          <h4>{todo.title}</h4>
          <div className="tags" aria-label="Tags">
            {todo.tags?.map(t => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="small">
            {todo.priority} {todo.dueDate ? `• due ${new Date(todo.dueDate).toLocaleDateString()}` : ''}
          </div>
        </div>
      </div>
      <div className="actions">
        <button
          onClick={remove}
          aria-label={`Delete todo '${todo.title}'`}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
