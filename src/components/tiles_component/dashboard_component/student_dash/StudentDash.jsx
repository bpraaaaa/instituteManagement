import React from "react";

import styles from "./StudentDash.module.css";

import { useUser } from "../../../UserContext";

import { MdAccessTime, MdAssignment, MdScore } from "react-icons/md";

const tiles = [
  {
    title: "My Attendance",
    href: "attendance",
    icon: <MdAccessTime size={32} />,
  },
  { title: "My Project", href: "projects", icon: <MdAssignment size={32} /> },
  { title: "My Grades", href: "grades", icon: <MdScore size={32} /> },
];

export default function StudentDash() {
  const { userData } = useUser(); //user details from user context
  // console.log("on student dash", userData)

  return (
    <>
      <div className={styles.container1}>
        <h2 className={styles.heading}>Welcome, {userData.name}</h2>
        <p>
          This is your student dashboard. Here you can view your attendance,
          projects, and grades.
        </p>
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
    </>
  );
}
