import React from 'react';
import styles from './Profile.module.css';

import { useUser } from '../../UserContext'; 

const Profile = () => {

  const { userData } = useUser();

  const user = {
    name: 'Prasad B',
    email: 'prasad@example.com',
    role: 'Admin',
    joined: '2023-01-15',
  };

  return (
    <>
    <div className={styles.container}>
      <h2 className={styles.heading}>User Profile</h2>
      <div className={styles.card}>

        <p><strong>I.D:</strong> {userData.id}</p>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Role:</strong> {userData.userRole}</p>
        {userData.userRole != 'ADMIN' && 
          <p><strong>Project I.D:</strong> {userData.projectId}</p> &&
          <p><strong>Project name:</strong> {userData.projectName}</p>
        }
        

        {/* <p><strong>Joined:</strong> {new Date(user.joined).toDateString()}</p> */}
      </div>
    </div>
    </>
  );
};

export default Profile;
