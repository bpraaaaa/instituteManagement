import React, { useEffect, useState } from "react";
import styles from "./TeacherManager.module.css";
import axios from "axios";

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [projects, setProjects] = useState([]); //store projects from db
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userRole: "TEACHER",
    projectId: "",
  });

  const [editId, setEditId] = useState(null); // for tracking edit mode
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE = "http://localhost:8080/api/admin";

  useEffect(() => {
    fetchTeachers();
    fetchProjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/teachers`);
      setTeachers(res.data);
    } catch (err) {
      setError("Failed to load teachers");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/projects/all`);
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const { name, email, password, projectId } = form;
    if (!name || !email || !password || !projectId) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(`${API_BASE}/create-user`, form);
      setSuccess("Teacher added successfully");
      setError("");
      setForm({
        name: "",
        email: "",
        password: "",
        userRole: "TEACHER",
        projectId: "",
      });
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data || "Failed to add teacher");
      setSuccess("");
    }
  };

  const handleEdit = (teacher) => {
    setEditId(teacher.id);
    setForm({
      name: teacher.name,
      email: teacher.email,
      password: teacher.password || "",
      userRole: "TEACHER",
      projectId: teacher.projectId,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/update-user/${editId}`, form);
      setSuccess("Teacher updated successfully");
      setError("");
      setEditId(null);
      setForm({
        name: "",
        email: "",
        password: "",
        userRole: "TEACHER",
        projectId: "",
      });
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data || "Failed to update teacher");
      setSuccess("");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE}/delete-user/${id}`);
      setSuccess("Teacher deleted successfully");
      fetchTeachers();
    } catch (err) {
      setError("Failed to delete teacher");
      setSuccess("");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      name: "",
      email: "",
      password: "",
      userRole: "TEACHER",
      projectId: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <div className={styles.teacherManager}>
      <h2>Teacher Management</h2>
      <p>List, create, update, or delete teacher records here.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Add / Edit Teacher Form */}
      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
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
        <select name="projectId" value={form.projectId} onChange={handleChange}>
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {editId ? (
        <>
          <button onClick={handleUpdate}>Update Teacher</button>
          <button onClick={handleCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </>
      ) : (
        <button onClick={handleAdd}>Add Teacher</button>
      )}
      <br />
      <br />
      <br />

      {/* Teacher Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Project</th>
            {/* <th>Role</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.projectName || t.projectId}</td>
              {/* <td>{t.userRole}</td> */}
              <td>
                <button
                  onClick={() => handleEdit(t)}
                  style={{ backgroundColor: "#0056b3" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {teachers.length === 0 && (
            <tr>
              <td colSpan="4">No teachers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherManager;
