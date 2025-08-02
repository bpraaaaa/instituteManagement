import React, { useState } from 'react';
import styles from './ClassManager.module.css';

const ClassManager = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 10-A', teacher: 'Mrs. Gupta' },
  ]);
  const [newClass, setNewClass] = useState({ name: '', teacher: '' });

  const handleChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newClass.name && newClass.teacher) {
      setClasses([...classes, { id: Date.now(), ...newClass }]);
      setNewClass({ name: '', teacher: '' });
    }
  };

  const handleDelete = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Class Management</h2>
      <p className={styles.description}>List, create, or update class records here.</p>

      <div className={styles.form}>
        <input
          name="name"
          placeholder="Class Name"
          value={newClass.name}
          onChange={handleChange}
        />
        <input
          name="teacher"
          placeholder="Class Teacher"
          value={newClass.teacher}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Class</button>
      </div>

      <ul className={styles.list}>
        {classes.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> — {c.teacher}
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassManager;
