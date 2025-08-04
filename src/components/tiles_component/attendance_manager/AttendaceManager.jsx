import React, { useEffect, useState } from "react";

import axios from "axios";
import styles from "./AttendanceManager.module.css";

import { useUser } from "../../UserContext";

const AttendanceManager = () => {
  const { userData } = useUser(); //user details from user context
  // console.log("on attendance page", userData)

  const [students, setStudents] = useState([]); //store students assigned to teacher's project
  const [message, setMessage] = useState(""); //store msg from fetching students

  const [attendanceData, setAttendanceData] = useState({}); // track change in studentId -> status from form

  const [attendanceRecords, setAttendanceRecords] = useState([]); //store attendance data assigned to teacher's project from db

  const [submittedDates, setSubmittedDates] = useState(new Set()); // store already added dates in the db

  const [editingRow, setEditingRow] = useState(null); //set attendance id of the record to be updated
  const [editValues, setEditValues] = useState({}); //set attendance for selected id to update

  useEffect(() => {
    handleFetchStudents();
    fetchAttendanceRecords(); // <--- fetch attendance data assigned to teacher's project from db
  }, []);

  const handleFetchStudents = async () => {
    //fetch students assigned to teacher's project
    try {
      const response = await axios.get(
        `http://localhost:8080/api/teachers/students/${userData.projectId}`
      );
      setStudents(response.data);
      setMessage("");
    } catch (err) {
      setMessage("Error fetching students.");
      setStudents([]);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/attendance/students"
      );
      setAttendanceRecords(res.data);

      // Extract and deduplicate dates from the records
      const dates = new Set(res.data.map((record) => record.date));
      setSubmittedDates(dates);
    } catch (err) {
      console.error("Error fetching attendance records:", err);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    //store changes in form
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleUpdate = async (record) => {
    try {
      const payload = {
        date: record.date,
        attendanceStatus: editValues.attendanceStatus,
        projectId: record.projectId,
        projectName: record.projectName,
        studentId: record.studentId,
        studentName: record.studentName,
        teacherId: record.teacherId,
        teacherName: record.teacherName,
      };

      await axios.put(
        `http://localhost:8080/api/attendance/students/update-by-date`,
        payload,
        {
          params: {
            date: record.date,
            studentId: record.studentId,
          },
        }
      );

      setMessage("Attendance updated successfully!");
      setEditingRow(null);
      fetchAttendanceRecords();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      setMessage("Failed to update attendance.");
    }
  };

  const handleSubmitAttendance = async () => {
    const today = new Date().toISOString().split("T")[0];

    if (submittedDates.has(today)) {
      const proceed = window.confirm(
        `Attendance for ${today} is already recorded. Do you want to override it?`
      );
      if (proceed) {
        //update logic - delete record of today'sdate and then add new records

        let date = today;

        try {
          const response = await axios.delete(
            `http://localhost:8080/api/attendance/students/delete-by-date`,
            { params: { date } }
          );

          setMessage(`Deleted attendance for ${today}`);
          fetchAttendanceRecords(); // refresh data
        } catch (err) {
          console.error(err);
          setMessage("Failed to delete attendance.");
        }
      } else {
        return;
      }
    }

    try {
      const promises = students.map((student) => {
        const status = attendanceData[student.id] || "Absent";

        const payload = {
          date: new Date().toISOString().split("T")[0],
          attendanceStatus: status,
          projectId: userData.projectId,
          projectName: userData.projectName,
          studentId: student.id,
          studentName: student.name,
          teacherId: userData.id,
          teacherName: userData.name,
        };

        return axios.post(
          `http://localhost:8080/api/attendance/students/${userData.projectId}`,
          payload
        );
      });

      await Promise.all(promises);
      setMessage("Attendance submitted successfully!");
      fetchAttendanceRecords(); // refresh table
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit attendance.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Mark Attendance of Project {userData.projectName}
      </h2>

      {students.length > 0 && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>
                    <select
                      value={attendanceData[student.id]} //|| 'Present'}
                      onChange={(e) =>
                        handleAttendanceChange(student.id, e.target.value)
                      }
                    >
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className={styles.submitButton}
            onClick={handleSubmitAttendance}
          >
            Submit Attendance
          </button>
        </>
      )}

      {message && <p className={styles.message}>{message}</p>}

      {submittedDates.has(new Date().toISOString().split("T")[0]) && (
        <p style={{ color: "orange", fontWeight: "bold" }}>
          Attendance already marked for today. You can override it.
        </p>
      )}

      {attendanceRecords.length > 0 && (
        <>
          <h3 className={styles.subHeading}>Attendance Records</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Status</th>
                <th>Teacher</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, idx) => (
                <tr key={idx}>
                  <td>{record.date}</td>
                  <td>{record.studentName}</td>

                  <td>
                    {editingRow === idx ? (
                      <select
                        value={
                          editValues.attendanceStatus || record.attendanceStatus
                        }
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            attendanceStatus: e.target.value,
                          })
                        }
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                      </select>
                    ) : (
                      record.attendanceStatus
                    )}
                  </td>

                  <td>{record.teacherName}</td>
                  <td>{record.projectName}</td>

                  <td>
                    {editingRow === idx ? (
                      <>
                        <button
                          className={styles.updateButton}
                          onClick={() => handleUpdate(record)}
                        >
                          Save
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={() => setEditingRow(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className={styles.editButton}
                        onClick={() => {
                          setEditingRow(idx);
                          setEditValues({
                            attendanceStatus: record.attendanceStatus,
                          });
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AttendanceManager;
