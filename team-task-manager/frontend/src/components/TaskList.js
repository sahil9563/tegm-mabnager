import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', status: 'todo' });
  const [showOverdue, setShowOverdue] = useState(false);



  const createTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tasks', newTask);
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', description: '', dueDate: '', status: 'todo' });
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      const res = await axios.put(`/api/tasks/${taskId}`, { status });
      setTasks(tasks.map(t => t._id === taskId ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Tasks Dashboard</h2>
      <label>
        <input type="checkbox" checked={showOverdue} onChange={(e) => setShowOverdue(e.target.checked)} />
        Show Overdue (Filter)
      </label>
      <form onSubmit={createTask} className="form-group">
        <input placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} required />
        <input placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} />
        <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} />
        <select value={newTask.status} onChange={(e) => setNewTask({...newTask, status: e.target.value})}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <div>
        {tasks.map(task => (
          <div key={task._id} className={`task-item status-${task.status} ${new Date(task.dueDate) < new Date() && task.status !== 'done' ? 'overdue' : ''}`}>
            <div>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due: {task.dueDate}</p>
              <p>Status: {task.status.replace('-', ' ')}</p>
            </div>
            <div>
              <button onClick={() => updateStatus(task._id, 'todo')}>To Do</button>
              <button onClick={() => updateStatus(task._id, 'in-progress')}>In Progress</button>
              <button onClick={() => updateStatus(task._id, 'done')}>Done</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

