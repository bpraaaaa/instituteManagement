import React, { useEffect, useState } from 'react';

import styles from './TeacherManager.module.css';

import axios from 'axios';

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    userRole: 'TEACHER',  // uppercase to match Enum if required
    projectId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_GET = 'http://localhost:8080/api/admin/teachers';
  const API_POST = 'http://localhost:8080/api/admin/create-user';

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(API_GET);
      setTeachers(res.data);
    } catch (err) {
      setError('Failed to load teachers');
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
      const res = await axios.post(API_POST, form);
      setSuccess('Teacher added successfully');
      setError('');
      setForm({
        name: '',
        email: '',
        password: '',
        userRole: 'TEACHER',
        projectId: '',
      });
      fetchTeachers(); // reload
    } catch (err) {
      setError(err.response?.data || 'Failed to add teacher');
      setSuccess('');
    }
  };

  return (
    <div className={styles.teacherManager}>
      <h2>Teacher Management</h2>
      <p>List, create, or update teacher records here.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Add Teacher Form */}
      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
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
          type="number"
          name="projectId"
          placeholder="Project ID"
          value={form.projectId}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Teacher</button>
      </div>

      {/* Teacher Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Project</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.projectName || t.projectId}</td>
              <td>{t.userRole}</td>
            </tr>
          ))}
          {teachers.length === 0 && (
            <tr>
              <td colSpan="4">No teachers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherManager;
