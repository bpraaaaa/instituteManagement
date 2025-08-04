import React from "react";

import styles from "./Navbar.module.css";
import logo from "../../assets/logo.jpeg";

import { useUser } from "../UserContext";

const Navbar = () => {
  const { userData } = useUser(); //user details from user context
  // console.log("on navbar page", userData)

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.siteName}>PES</span>
      </div>
      <div className={styles.right}>
        <span className={styles.welcome}>Welcome, {userData.name}</span>
      </div>
    </nav>
  );
};

export default Navbar;
