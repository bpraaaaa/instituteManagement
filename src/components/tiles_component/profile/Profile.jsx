import React from "react";

import styles from "./Profile.module.css";

import { useUser } from "../../UserContext";

import { MdPerson, MdEmail, MdAssignmentInd, MdWork } from "react-icons/md";

const Profile = () => {
  const { userData } = useUser(); //user details from user context
  // console.log("on porfile page", userData)

  const getRoleClass = (role) => {
    return styles.roleBadge + " " + styles[role.toLowerCase()];
  };

  return (
    <>
      <div className={styles.altProfileWrapper}>
        <h2 className={styles.title}>My Profile</h2>

        <div className={styles.card}>
          <div className={styles.field}>
            <MdAssignmentInd className={styles.icon} />
            <span className={styles.label}>ID:</span>
            <span>{userData.id}</span>
          </div>

          <div className={styles.field}>
            <MdPerson className={styles.icon} />
            <span className={styles.label}>Name:</span>
            <span>{userData.name}</span>
          </div>

          <div className={styles.field}>
            <MdEmail className={styles.icon} />
            <span className={styles.label}>Email:</span>
            <span>{userData.email}</span>
          </div>

          <div className={styles.field}>
            <MdWork className={styles.icon} />
            <span className={styles.label}>Role:</span>
            <span className={getRoleClass(userData.userRole)}>
              {userData.userRole}
            </span>
          </div>

          {userData.projectId && (
            <div className={styles.field}>
              <span className={styles.label}>Project ID:</span>
              <span>{userData.projectId}</span>
            </div>
          )}

          {userData.projectName && (
            <div className={styles.field}>
              <span className={styles.label}>Project Name:</span>
              <span>{userData.projectName}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
