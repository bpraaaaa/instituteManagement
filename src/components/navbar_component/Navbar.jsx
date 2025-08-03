import React from 'react';

import styles from './Navbar.module.css';

import { useUser } from '../UserContext';

import logo from '../../assets/logo.jpeg';

const Navbar = ({username}) => {

  const { userData } = useUser();
  console.log("on navbar page", userData)

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.siteName}>P.E.S</span>
      </div>
      <div className={styles.right}>
        <span className={styles.welcome}>Welcome, {userData.name}</span>
      </div>
    </nav>
  );
};

export default Navbar;
