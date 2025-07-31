import React from 'react';
import styles from './Teacher.module.css';
import Layout from '../layout_component/Layout';

const Teacher = ({ name = "Teacher" }) => {
  return (
    <Layout username={name} role="teacher">
      <div className={styles.container}>
        <h2>Welcome, {name}</h2>
        <p>This is your teacher dashboard.</p>
      </div>
    </Layout>
  );
};

export default Teacher;
