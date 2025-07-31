import React from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.jpeg';

const Navbar = ({ username = "User" }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.siteName}>P.E.S</span>
      </div>
      <div className={styles.right}>
        <span className={styles.welcome}>Welcome, {username}</span>
      </div>
    </nav>
  );
};

export default Navbar;
