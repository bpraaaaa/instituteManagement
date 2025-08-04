import React from "react";

import styles from "./Teacher.module.css";

import { Outlet } from "react-router-dom";
// import { useUser } from '../UserContext';

import Navbar from "../navbar_component/Navbar";
import Sidebar from "../sidebar_component/Sidebar";
import Footer from "../footer_component/Footer";

const Teacher = () => {
  // const { userData } = useUser(); //user details from user context
  // console.log("on teacher page", userData)

  return (
    <>
      <div className={styles.page}>
        <Navbar />

        <div className={styles.body}>
          <Sidebar role="teacher" />

          <main className={styles.content}>
            <Outlet /> {/* renders routed pages */}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Teacher;
