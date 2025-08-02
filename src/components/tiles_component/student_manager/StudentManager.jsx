import React, { useState } from 'react';
import styles from './StudentManager.module.css';

const StudentManager = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Mehta', roll: '202301' },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', roll: '' });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newStudent.name && newStudent.roll) {
      setStudents([...students, { id: Date.now(), ...newStudent }]);
      setNewStudent({ name: '', roll: '' });
    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Student Management</h2>
      <p className={styles.description}>List, create, or update student records here.</p>

      <div className={styles.form}>
        <input
          name="name"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={handleChange}
        />
        <input
          name="roll"
          placeholder="Roll Number"
          value={newStudent.roll}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      <ul className={styles.list}>
        {students.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> — {s.roll}
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManager;
