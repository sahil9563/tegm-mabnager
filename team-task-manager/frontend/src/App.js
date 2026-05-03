import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
      fetchProjects();
      fetchTasks();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Fetch projects error', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch tasks error', err);
    }
  };

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <header>
        <h1>Team Task Manager</h1>
        <div>
          <span>{user?.username} ({user?.role})</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main>
        <nav>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
          <button onClick={() => setView('projects')}>Projects</button>
        </nav>
        {view === 'dashboard' && <TaskList tasks={tasks} setTasks={setTasks} />}
        {view === 'projects' && <ProjectList projects={projects} setProjects={setProjects} />}
      </main>
    </div>
  );
}

export default App;

