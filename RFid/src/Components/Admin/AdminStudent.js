import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin, PiStudentThin } from "react-icons/pi";
import StudentForm from "../Forms/StudentForm";

const AdminStudent = () => {
  const { user } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState({});

  // console.log(user);

  return (
    <main className="flex w-full flex-col justify-center md:w-fit">
      <div>
        Add student
      </div>
      <StudentForm/>
      {/* <RegisterLayout/> */}
    </main>
  );
};

export default AdminStudent;
