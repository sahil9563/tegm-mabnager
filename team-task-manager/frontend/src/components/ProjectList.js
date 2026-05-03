import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = ({ projects, setProjects }) => {
  const [newProject, setNewProject] = useState({ name: '', description: '' });



  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/projects', newProject);
      setProjects([...projects, res.data]);
      setNewProject({ name: '', description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <form onSubmit={createProject} className="form-group">
        <input placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} required />
        <textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} />
        <button type="submit">Create Project</button>
      </form>
      <div>
        {projects.map(project => (
          <div key={project._id} className="project-item">
            <div>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <p>Admin: {project.admin?.username}</p>
              <p>Members: {project.members?.length || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;

