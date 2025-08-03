import React, { useState } from 'react';
import styles from './Login.module.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import Footer from '../footer_component/Footer';

import { motion } from 'framer-motion';





const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', form);
      const data = response.data;

      setUserData(data);
      switch (data.userRole) {
        case 'ADMIN': navigate('/admin/dash'); break;
        case 'TEACHER': navigate('/teacher/dash'); break;
        case 'STUDENT': navigate('/student/dash'); break;
        default: setError('Unknown user role');
      }
    } catch (err) {
      setError(err.response?.status === 401 ? 'Invalid credentials' : 'Something went wrong');
    }
  };

  return (
    <>

      <div className={styles.container}>
        <motion.form
  className={styles.form}
  onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 3 }}
>
          <h2 className={styles.heading}>Welcome Back</h2>
          <p className={styles.subheading}>Login to your account</p>

          {error && <p className={styles.error}>{error}</p>}

          <label className={styles.label}>Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.toggleButton}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className={styles.button}>Login</button>
        </motion.form>
      </div>

      <Footer />
    </>
  );
};

export default Login;
