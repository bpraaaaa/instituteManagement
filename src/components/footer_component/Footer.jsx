import React from 'react';

import styles from './Footer.module.css';

import logo from '../../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.left}>

          <h4 className={styles.instituteName}>
            <img src={logo} alt="Logo" className={styles.logo} />
            P.E.S Institute of Technology</h4>

          <p className={styles.address}>
            123 Knowledge Lane, EduCity, India - 000001
          </p>
          <p>Email: info@pesinstitute.edu.in</p>
          <p>Phone: +91-123-456-7890</p>
        </div>

        <div className={styles.right}>
          <p>© {new Date().getFullYear()} P.E.S Institute.</p>
          <p> All rights reserved.</p>
          <p>Designed by the Web Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
