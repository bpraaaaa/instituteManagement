import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ role }) => {
  const commonLinks = [
    { label: 'Dashboard', href: '#' },
    { label: 'Profile', href: '#' },
  ];

  const roleLinks = {
    student: [
      { label: 'My Courses', href: '#' },
      { label: 'Assignments', href: '#' },
      { label: 'Grades', href: '#' },
    ],
    teacher: [
      { label: 'Manage Classes', href: '#' },
      { label: 'Upload Material', href: '#' },
      { label: 'Student Reports', href: '#' },
    ],
    admin: [
      { label: 'User Management', href: '#' },
      { label: 'System Logs', href: '#' },
      { label: 'Settings', href: '#' },
    ],
  };

  return (
    <aside className={styles.sidebar}>
      <ul>
        {commonLinks.map((link, index) => (
          <li key={index}><a href={link.href}>{link.label}</a></li>
        ))}
        <hr />
        {roleLinks[role]?.map((link, index) => (
          <li key={index}><a href={link.href}>{link.label}</a></li>
        ))}

      </ul>
    </aside>
  );
};

export default Sidebar;
