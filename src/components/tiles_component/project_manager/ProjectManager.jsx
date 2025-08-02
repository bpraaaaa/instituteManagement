import React, { useState } from 'react';
import styles from './ProjectManager.module.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'AI Chatbot', supervisor: 'Dr. Sharma' },
  ]);
  const [newProject, setNewProject] = useState({ title: '', supervisor: '' });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newProject.title && newProject.supervisor) {
      setProjects([...projects, { id: Date.now(), ...newProject }]);
      setNewProject({ title: '', supervisor: '' });
    }
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Project Management</h2>
      <p className={styles.description}>List, create, or update project here.</p>

      <div className={styles.form}>
        <input
          name="title"
          placeholder="Project Title"
          value={newProject.title}
          onChange={handleChange}
        />
        <input
          name="supervisor"
          placeholder="Supervisor"
          value={newProject.supervisor}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Project</button>
      </div>

      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.supervisor}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;
