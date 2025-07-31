import React from 'react';
import styles from './Student.module.css';
import Layout from '../layout_component/Layout';

const Student = ({ name = "Student" }) => {
  return (
    <Layout username={name} role="student">
      <div className={styles.container}>
        <h2>Welcome, {name}</h2>
        <p>This is your student dashboard. Here you can view courses, assignments, and grades.</p>
      </div>
    </Layout>
  );
};

export default Student;
