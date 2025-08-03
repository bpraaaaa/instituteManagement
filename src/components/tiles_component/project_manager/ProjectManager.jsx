import React, { useEffect, useState } from 'react';

import styles from './ProjectManager.module.css';

import axios from 'axios';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);

  const [newProject, setNewProject] = useState({
    name: '',
    duration: '',
    startDate: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE = 'http://localhost:8080/api/projects';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setProjects(res.data);
    } catch (err) {
      setError('Failed to load projects');
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const { name, duration, startDate } = newProject;
    if (!name || !duration || !startDate) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/add`, newProject);
      setProjects([...projects, res.data]);
      setNewProject({ name: '', duration: '', startDate: '' });
      setSuccess('Project added successfully');
      setError('');
    } catch (err) {
      setError('Failed to add project');
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Project Management</h2>
      <p className={styles.description}>List, create, or update projects here.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Form */}
      <div className={styles.form}>
        <input
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration (e.g. 6 months)"
          value={newProject.duration}
          onChange={handleChange}
        />
        <input
          name="startDate"
          type="date"
          value={newProject.startDate}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Project</button>
      </div>

      {/* Project List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.duration}</td>
              <td>{new Date(p.startDate).toLocaleDateString()}</td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan="3">No projects available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectManager;
