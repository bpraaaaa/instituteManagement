import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MyProject.module.css';
import { useUser } from '../../UserContext';

const MyProject = () => {
  const { userData } = useUser();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/projects/${userData.projectId}`);
        setProject(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load project data.');
      }
    };

    if (userData.projectId) {
      fetchProject();
    } else {
      setError('No project ID found for user.');
    }
  }, [userData.projectId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Project</h2>

      {error && <p className={styles.error}>{error}</p>}

      {project ? (
        <div className={styles.card}>
          <div className={styles.item}>
            <span className={styles.label}>Project ID:</span>
            <span>{project.id}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Name:</span>
            <span>{project.name}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Duration:</span>
            <span>{project.duration}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Start Date:</span>
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      ) : (
        !error && <p>Loading project details...</p>
      )}
    </div>
  );
};

export default MyProject;
