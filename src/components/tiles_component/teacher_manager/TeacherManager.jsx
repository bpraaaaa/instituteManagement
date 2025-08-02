
import React, { useState } from 'react';
import styles from './TeacherManager.module.css'; 

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Alice Johnson', subject: 'Math' },
    { id: 2, name: 'Bob Smith', subject: 'Science' },
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });

  const handleChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newTeacher.name && newTeacher.subject) {
      const id = Date.now();
      setTeachers([...teachers, { id, ...newTeacher }]);
      setNewTeacher({ name: '', subject: '' });
    }
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.teacherManager}>
      <h2>Teacher Management</h2>
      <p>List, create, or update teacher records here.</p> <br />

      {/* Add Teacher Form */}
      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={newTeacher.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Teacher</button>
      </div>

      {/* Teacher List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>
                <button onClick={() => handleDelete(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {teachers.length === 0 && (
            <tr>
              <td colSpan="3">No teachers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherManager;
