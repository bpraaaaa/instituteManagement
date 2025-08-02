import React from 'react';
import styles from './Teacher.module.css';

import { Outlet } from 'react-router-dom';
import { useUser } from '../UserContext';

import Navbar from '../navbar_component/Navbar';
import Sidebar from '../sidebar_component/Sidebar';
import Footer from '../footer_component/Footer';

const Teacher = () => {

  const { userData } = useUser();

 return (
    
    <div className={styles.page}>
      <Navbar username={userData.name} />

      <div className={styles.body}>
        <Sidebar role='teacher' />

        <main className={styles.content}>
         <Outlet /> 
        </main>

      </div>

      <Footer />
    </div>



    /*
    <Layout username={username} role="teacher">
      <>
        <div className={styles.container}>

          <div className={styles.container1}>
            <h2 className={styles.heading}>Welcome, {username}</h2>
            <p>This is your teacher dashboard. Here you can manage projects, and students.</p>
          </div>

          <br />


          <div className={styles.tileGrid}>
            {tiles.map((tile, index) => (
              <a href={tile.href} key={index} className={styles.tile}>
                <div className={styles.icon}>{tile.icon}</div>
                <span>{tile.title}</span>
              </a>
            ))}
          </div>
        </div>
      </>
    </Layout>
    */
  );
};

export default Teacher;
