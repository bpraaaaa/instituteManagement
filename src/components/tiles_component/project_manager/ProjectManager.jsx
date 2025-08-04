import React, { useEffect, useState } from "react";

import styles from "./ProjectManager.module.css";
import axios from "axios";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]); //store projects from db
  const [newProject, setNewProject] = useState({
    //store project from form
    name: "",
    duration: "",
    startDate: "",
  });

  const [editId, setEditId] = useState(null); // Track project being edited
  const [error, setError] = useState(""); //store error msg from fetching projects
  const [success, setSuccess] = useState(""); //store success msg from adding project

  const API_BASE = "http://localhost:8080/api/projects";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const handleChange = (e) => {
    //change in form field
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    //add new project
    const { name, duration, startDate } = newProject;
    if (!name || !duration || !startDate) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/add`, newProject);
      setProjects([...projects, res.data]); //add newly add project in feched projecs list
      setNewProject({ name: "", duration: "", startDate: "" }); //reset fields
      setSuccess("Project added successfully");
      setError("");
    } catch (err) {
      setError("Failed to add project");
      setSuccess("");
    }
  };

  const handleEdit = (project) => {
    //edit fetched projects
    setEditId(project.id); //select a project to edit
    setNewProject({
      name: project.name,
      duration: project.duration,
      startDate: project.startDate.slice(0, 10), // ISO date for input[type="date"]
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_BASE}/update/${editId}`, newProject);
      setProjects(projects.map((p) => (p.id === editId ? res.data : p))); //update project in feched projecs list
      setSuccess("Project updated successfully");
      setError("");
      setNewProject({ name: "", duration: "", startDate: "" }); //reset fields
      setEditId(null); //deselect proj for editing
    } catch (err) {
      setError("Failed to update project");
      setSuccess("");
    }
  };

  const handleCancel = () => {
    setNewProject({ name: "", duration: "", startDate: "" }); //reset fields
    setEditId(null); //deselect proj for editing
    setError("");
    setSuccess("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Project Management</h2>
      <p className={styles.description}>
        List, create, or update projects here.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div className={styles.form}>
        <input
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration (e.g. 6 months)"
          value={newProject.duration}
          onChange={handleChange}
        />
        <input
          name="startDate"
          type="date"
          value={newProject.startDate}
          onChange={handleChange}
        />

        {editId ? (
          <>
            <button onClick={handleUpdate}>Update Project</button>
            <button onClick={handleCancel} className={styles.cancelBtn}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAdd}>Add Project</button>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.duration}</td>
              <td>{new Date(p.startDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan="4">No projects available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectManager;
