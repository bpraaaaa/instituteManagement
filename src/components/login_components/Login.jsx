import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../UserContext';

import styles from './Login.module.css';
import Footer from '../footer_component/Footer';

const Login = () => {
  
  const navigate = useNavigate();

  const { setUserData } = useUser();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', form);
      const data = response.data; // Expecting: { username, role }

      setUserData(data);

      // Navigate based on user role
      switch (data.userRole) {
        case 'ADMIN':
          navigate('/admin/dash');
          break;
        case 'TEACHER':
          navigate('/teacher/dash');
          break;
        case 'STUDENT':
          navigate('/student/dash');
          break;
        default:
          setError('Unknown user role');
      }

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.heading}>Login</h2>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label className={styles.label}>Username</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Login;
