import React from "react";
import styles from "./Layout.module.css";

import Navbar from "../navbar_component/Navbar";
import Sidebar from "../sidebar_component/Sidebar";
import Footer from "../footer_component/Footer";

const Layout = ({ username='User2', role, children }) => {
  return (
    <div className={styles.page}>
      <Navbar username={username} />

      <div className={styles.body}>
        <Sidebar role={role} />

        <main className={styles.content}>{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
