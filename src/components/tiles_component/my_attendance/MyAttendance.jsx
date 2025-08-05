import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MyAttendance.module.css';
import { useUser } from '../../UserContext';

const MyAttendance = () => {
  const { userData } = useUser();
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/attendance/students/by-student/${userData.id}`);
        setRecords(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load attendance data.');
      }
    };

    fetchAttendance();
  }, [userData.id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Attendance</h2>
      <p className={styles.subheading}>Overview of your attendance records</p>

      {error && <p className={styles.error}>{error}</p>}

      {records.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Teacher</th>
              <th>Project</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td className={styles[record.attendanceStatus.toLowerCase()]}>
                  {record.attendanceStatus}
                </td>
                <td>{record.teacherName}</td>
                <td>{record.projectName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

export default MyAttendance;
