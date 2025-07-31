import React from 'react';
import styles from './Admin.module.css';
import Layout from '../layout_component/Layout';

const Admin = ({ name = "Admin" }) => {
  return (
    <Layout username={name} role="admin">
      <div className={styles.container}>
        <h2>Welcome, {name}</h2>
        <p>This is your Admin dashboard.</p>
      </div>
    </Layout>
  );
};

export default Admin;
