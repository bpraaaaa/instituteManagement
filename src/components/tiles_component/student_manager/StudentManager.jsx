import React, { useEffect, useState } from "react";
import styles from "./StudentManager.module.css";
import axios from "axios";

const StudentManager = () => {
  const [students, setStudents] = useState([]); //store students from db
  const [form, setForm] = useState({
    //store data from form
    name: "",
    email: "",
    password: "",
    userRole: "STUDENT",
    projectId: "",
  });

  const [editId, setEditId] = useState(null); //store id from fetched students to update
  const [error, setError] = useState(""); //store error msg from fetching students
  const [success, setSuccess] = useState(""); //store success mdg from adding students

  const API_BASE = "http://localhost:8080/api/admin";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/students`);
      setStudents(res.data);
    } catch (err) {
      setError("Failed to load students");
    }
  };

  const handleChange = (e) => {
    //changes in form
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    //add new student
    const { name, email, password, projectId } = form;
    if (!name || !email || !password || !projectId) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(`${API_BASE}/create-user`, form);
      setSuccess("Student added successfully");
      setForm({
        name: "",
        email: "",
        password: "",
        userRole: "STUDENT",
        projectId: "",
      }); //reset form
      setError("");
      fetchStudents();
    } catch (err) {
      setError(err.response?.data || "Failed to add student");
      setSuccess("");
    }
  };

  const handleEdit = (student) => {
    //edit student from fetched students
    setEditId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      password: student.password || "",
      userRole: "STUDENT",
      projectId: student.projectId,
    });
  };

  const handleUpdate = async () => {
    //update student details
    try {
      await axios.put(`${API_BASE}/update-user/${editId}`, form);
      setSuccess("Student updated successfully");
      setForm({
        name: "",
        email: "",
        password: "",
        userRole: "STUDENT",
        projectId: "",
      });
      setEditId(null);
      setError("");
      fetchStudents();
    } catch (err) {
      setError(err.response?.data || "Failed to update student");
      setSuccess("");
    }
  };

  const handleDelete = async (id) => {
    //delete student
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE}/delete-user/${id}`);
      setSuccess("Student deleted successfully");
      fetchStudents();
    } catch (err) {
      setError("Failed to delete student");
      setSuccess("");
    }
  };

  const handleCancel = () => {
    //cancel edit
    setEditId(null);
    setForm({
      name: "",
      email: "",
      password: "",
      userRole: "STUDENT",
      projectId: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Student Management</h2>
      <p className={styles.description}>
        List, create, update, or delete student records here.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Add / Edit Student Form */}
      <div className={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="projectId"
          placeholder="Project ID"
          value={form.projectId}
          onChange={handleChange}
        />
        {editId ? (
          <>
            <button onClick={handleUpdate}>Update Student</button>
            <button onClick={handleCancel} className={styles.cancelBtn}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAdd}>Add Student</button>
        )}
      </div>

      {/* List Students */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Project</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.projectName || s.projectId}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button
                  onClick={() => handleDelete(s.id)}
                  style={{ marginLeft: "8px", backgroundColor: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManager;
