import React from "react";

import styles from "./TeacherDash.module.css";

import { useUser } from "../../../UserContext";

import { MdSchool, MdClass, MdAccessTime, MdAssignment } from "react-icons/md";

const tiles = [
  { title: "Projects", href: "projects", icon: <MdAssignment size={32} /> },
  // { title: "Manage Classes", href: "classes", icon: <MdClass size={32} /> },
  {
    title: "Manage Attendance",
    href: "attend",
    icon: <MdAccessTime size={32} />,
  },
  {
    title: "Student Management",
    href: "students",
    icon: <MdSchool size={32} />,
  },
];

export default function TeacherDash() {
  const { userData } = useUser(); //user details from user context
  // console.log("on teacher dash", userData)

  return (
    <>
      <div className={styles.container1}>
        <h2 className={styles.heading}>Welcome, {userData.name}</h2>
        <p>
          This is your teacher dashboard. Here you can manage projects and
          students.
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
