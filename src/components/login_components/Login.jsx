import React, { useState } from "react";

import styles from "./Login.module.css";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";

import Footer from "../footer_component/Footer";

const Login = () => {
  const navigate = useNavigate(); //function to navigate

  const { setUserData } = useUser(); //to set user context

  const [form, setForm] = useState({ email: "", password: "" }); //store form data
  const [error, setError] = useState(null); //store login error
  const [showPassword, setShowPassword] = useState(false); // toggle show pass

  const handleChange = (e) => {
    //changes in form fields
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents page refresh
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        form
      );
      const data = response.data;

      setUserData(data);

      switch (data.userRole) {
        case "ADMIN":
          navigate("/admin/dash");
          break;
        case "TEACHER":
          navigate("/teacher/dash");
          break;
        case "STUDENT":
          navigate("/student/dash");
          break;
        default:
          setError("Unknown user role");
      }
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid credentials"
          : "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Welcome</h2>
            <p className={styles.subheading}>Login to your account</p>

            {error && <p className={styles.error}>{error}</p>}

            <label className={styles.label}>Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={styles.toggleButton}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
