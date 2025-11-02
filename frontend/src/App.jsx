import React, { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import TodoList from './components/TodoList.jsx';
import Profile from './components/Profile.jsx';
import './styles/global.css';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [view, setView] = useState(token ? 'todos' : 'login');

  // Sync localStorage token with state
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setView('todos');
    } else {
      localStorage.removeItem('token');
      setView('login');
    }
  }, [token]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="gradient-text">TY23 Todo - MERN</h1>
      </header>
      <main className="app-main" role="main">
        {!token && view === 'login' && (
          <Login
            onLogin={(t) => {
              setToken(t);
            }}
            onSwitch={() => setView('register')}
          />
        )}
        {!token && view === 'register' && (
          <Register
            onRegister={(t) => {
              setToken(t);
            }}
            onSwitch={() => setView('login')}
          />
        )}
        {token && (
          <div className="app-grid">
            <aside>
              <Profile token={token} onLogout={() => setToken(null)} />
            </aside>
            <section>
              <TodoList token={token} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
