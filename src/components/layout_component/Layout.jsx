import React from 'react';

import Navbar from '../navbar_component/Navbar';
import Footer from '../footer_component/Footer';

import Sidebar from '../sidebar_component/Sidebar';

import styles from './Layout.module.css';

const Layout = ({ username, role, children }) => {
  return (
    <div className={styles.page}>
      <Navbar username={username} />
      <div className={styles.body}>
        <Sidebar role={role} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
