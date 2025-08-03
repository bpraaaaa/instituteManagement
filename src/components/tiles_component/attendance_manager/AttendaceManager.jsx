import React, { useState } from 'react';

import styles from './AttendanceManager.module.css';

import axios from 'axios';

const AttendanceManager = () => {
  const [attendance, setAttendance] = useState({
    date: '',
    attendanceStatus: 'PRESENT',
    projectId: '',
    projectName: '',
    studentId: '',
    studentName: '',
    teacherId: '',
    teacherName: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { projectId } = attendance;

    if (!projectId) {
      setMessage('Project ID is required');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/add/students/${projectId}`,
        {
          ...attendance,
          date: attendance.date || new Date().toISOString().split('T')[0], // default to today
        }
      );
      setMessage('Attendance marked successfully!');
      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data || 'Error marking attendance');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Attendance Manager</h2>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.form}>
        <input
          name="date"
          type="date"
          value={attendance.date}
          onChange={handleChange}
        />

        <select
          name="attendanceStatus"
          value={attendance.attendanceStatus}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>

        <input
          name="projectId"
          placeholder="Project ID"
          value={attendance.projectId}
          onChange={handleChange}
        />
        <input
          name="projectName"
          placeholder="Project Name"
          value={attendance.projectName}
          onChange={handleChange}
        />
        <input
          name="studentId"
          placeholder="Student ID"
          value={attendance.studentId}
          onChange={handleChange}
        />
        <input
          name="studentName"
          placeholder="Student Name"
          value={attendance.studentName}
          onChange={handleChange}
        />
        <input
          name="teacherId"
          placeholder="Teacher ID"
          value={attendance.teacherId}
          onChange={handleChange}
        />
        <input
          name="teacherName"
          placeholder="Teacher Name"
          value={attendance.teacherName}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Mark Attendance</button>
      </div>
    </div>
  );
};

export default AttendanceManager;
