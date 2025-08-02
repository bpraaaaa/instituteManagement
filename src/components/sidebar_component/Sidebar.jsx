import React from 'react';
import styles from './Sidebar.module.css';

import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const commonLinks = [
    { label: 'Dashboard', href: 'dash' },
    { label: 'Profile', href: 'profile' },
  ];

  const roleLinks = {
    student: [
      { label: 'My Attendance', href: 'attendance' },
      { label: 'My Projects', href: 'projects' },
      { label: 'My Grades', href: 'grades' },
    ],
    teacher: [
      { label: 'Projects', href: 'projects' },
      { label: 'Manage Classes', href: 'classes' },
      { label: 'Student Management', href: 'students' },
    ],
    admin: [
      { label: 'Teacher Management', href: 'teachers' },
      { label: 'Projects', href: 'projects' },
      { label: 'Manage Classes', href: 'classes' },
      { label: 'Student Management', href: 'students' },
    ],
  };

  return (
    <aside className={styles.sidebar}>
      <ul>
        {commonLinks.map((link, index) => (
          // <li key={index}>
          //   <a href={link.href}>{link.label}</a>
          // </li>

          <li key={index}>
             <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
        <hr />
        {roleLinks[role]?.map((link, index) => (
          // <li key={index}><a href={link.href}>{link.label}</a></li>
          
          <li key={index}>
             <Link to={link.href}>{link.label}</Link>
          </li>
          
        ))}
        <hr />
          <li><a href='/'>Log Out</a></li>

      </ul>
    </aside>
  );
};

export default Sidebar;
