import './App.css'

import Navbar from './components/navbar_component/Navbar'
import Footer from './components/footer_component/Footer'

import Login from './components/login_components/Login'

import Student from './components/student_component/Student'
import Teacher from './components/teacher_component/Teacher'
import Admin from './components/admin_component/Admin'

function App() {
  
  const role = "admin"; // "student" or 'teacher' or 'admin'

  return (
    <>
    <Login/>

    <hr /><hr /><br /><br />


      {role === 'student' && <Student name="Alice" />}
      {role === 'teacher' && <Teacher name="Mr. Sharma" />}
      {role === 'admin' && <Admin name="Admin John" />}

      
    </>
  )
}

export default App
