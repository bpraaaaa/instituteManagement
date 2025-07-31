import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', form);
    // Add login logic here
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Login</h2>

        <label className={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
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
  );
};

export default Login;
