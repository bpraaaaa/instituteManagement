import Student from '../student_component/Student'
import Teacher from '../teacher_component/Teacher'
import Admin from '../admin_component/Admin'

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Logged() {

    const location = useLocation();
    const { name = 'User0', role = 'student' } = location.state// || {};

    const navigate=useNavigate();

    

    return (

        <>
            {role === 'student' && <Student username={name} />}
            {role === 'teacher' && <Teacher username={name} />}
            {role === 'admin' && <Admin username={name} />}
        </>

    )


}

export default Logged