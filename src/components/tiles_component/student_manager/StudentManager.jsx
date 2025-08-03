import React, { useEffect, useState } from 'react';

import styles from './StudentManager.module.css';

import axios from 'axios';

const StudentManager = () => {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    userRole: 'STUDENT',
    projectId: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const GET_URL = 'http://localhost:8080/api/admin/students';
  const POST_URL = 'http://localhost:8080/api/admin/create-user';

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(GET_URL);
      setStudents(res.data);
    } catch (err) {
      setError('Failed to load students');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const { name, email, password, projectId } = form;
    if (!name || !email || !password || !projectId) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post(POST_URL, form);
      setSuccess('Student added successfully');
      setForm({ name: '', email: '', password: '', userRole: 'STUDENT', projectId: '' });
      fetchStudents(); // refresh list
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Failed to add student');
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Student Management</h2>
      <p className={styles.description}>List, create, or update student records here.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Add Student Form */}
      <div className={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="projectId"
          placeholder="Project ID"
          value={form.projectId}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      {/* List Students */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.projectName || s.projectId}</td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="3">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManager;
