// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login_components/Login";

import Admin from "./components/admin_component/Admin";
import AdminDash from "./components/tiles_component/dashboard_component/admin_dash/AdminDash";
import Profile from "./components/tiles_component/profile/Profile";
import TeacherManager from "./components/tiles_component/teacher_manager/TeacherManager";
import ProjectManager from "./components/tiles_component/project_manager/ProjectManager";
import AttendanceManager from "./components/tiles_component/attendance_manager/AttendaceManager";
import StudentManager from "./components/tiles_component/student_manager/StudentManager";

import Teacher from "./components/teacher_component/Teacher";
import TeacherDash from "./components/tiles_component/dashboard_component/teacher_dash/TeacherDash";

import Student from "./components/student_component/Student";
import StudentDash from "./components/tiles_component/dashboard_component/student_dash/StudentDash";
import MyAttendance from "./components/tiles_component/my_attendance/MyAttendance";
import MyProject from "./components/tiles_component/my_project/MyProject";

// import ClassManager from "./components/tiles_component/class_manager/ClassManager";
// import GradeManager from "./components/tiles_component/grade_manager/GradeManager";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/admin" element={<Admin />}>
            <Route index path="dash" element={<AdminDash />} />
            <Route path="profile" element={<Profile />} />
            <Route path="teachers" element={<TeacherManager />} />
            <Route path="projects" element={<ProjectManager />} />
            {/* <Route path="classes" element={<ClassManager />} /> */}
            <Route path="attend" element={<AttendanceManager />} />
            <Route path="students" element={<StudentManager />} />
          </Route>

          <Route path="/teacher" element={<Teacher />}>
            <Route index path="dash" element={<TeacherDash />} />
            <Route path="profile" element={<Profile />} />
            <Route path="projects" element={<ProjectManager />} />
            {/* <Route path="classes" element={<ClassManager />} /> */}
            <Route path="attend" element={<AttendanceManager />} />
            <Route path="students" element={<StudentManager />} />
          </Route>

          <Route path="/student" element={<Student />}>
            <Route index path="dash" element={<StudentDash />} />
            <Route path="profile" element={<Profile />} />
            <Route path="myattend" element={<MyAttendance />} />
            <Route path="myproject" element={<MyProject />} />
            {/* <Route path="grades" element={<GradeManager />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
