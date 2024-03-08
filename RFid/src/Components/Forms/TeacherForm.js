import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorStrip from "../ErrorStrip";

// Teacher Registration Form
const TeacherForm = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    course: "",
    role: "",
    rfid: "",
    password: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [rfidError, setRfidError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const nameRegex = /[a-zA-Z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFormChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
      // [e.target.id]: e.target.value,
    });
  };

  //TODO Add more departments
  const addTeacher = async (e) => {
    e.preventDefault();

        // Validation
        if (!nameRegex.test(teacher.name.trim())) {
          setNameError("Name required & should contain only letters");
          return;
        }
    
        if (!emailRegex.test(teacher.email.trim())) {
          setEmailError("Invalid email format");
          return;
        }
    
        if (!teacher.course.trim()) {
          setCourseError("Please select a course");
          return;
        }
    
        if (teacher.rfid.length !== 10) {
          setRfidError("Numeric RFID must be 10 digits");
          return;
        }
    
        if (!teacher.password.trim() || teacher.password.trim().length < 6) {
          setPasswordError("Password should be at least 6 characters");
          return;
        }

    try {
      const reqData = JSON.stringify(teacher);
      // const response = await axios.post("teacher/123", reqData);
      toast.loading("Registering .....");

      const response = await axios.post("Teacher", reqData);
      // navigate("../");
      navigate("/otpt",{ state: { teacher: teacher } });
      toast.dismiss();
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form className="scrollWidth w-full font-medium tracking-wide accent-violet-600">
      <label className="block" htmlFor="name">
        Name:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-[1.5px] focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        name="name"
        required
        id="name"
        value={teacher.name}
        onChange={(e) => {
          handleFormChange(e);
          setNameError("");
        }}
      />
      {nameError && <p style={{ color: "red" }}>{nameError}</p>}

      <label className="block" htmlFor="email">
        Email:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="email"
        required
        id="email"
        name="email"
        value={teacher.email}
        onChange={(e) => {
          handleFormChange(e);
          setEmailError("");
        }}
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}

      <label className="block" htmlFor="course">
        Course:
      </label>
      <select
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        placeholder="select course"
        name="course"
        id="course"
        value={teacher.course}
        required
        onChange={(e) => {
          handleFormChange(e);
          setCourseError("");
        }}
      >
        <option value="">Select Department</option>
        <option value="BSC CS">BSC CS</option>
        <option value="BCOM">BCOM</option>
        <option value="BA">BA</option>
      </select>
      {courseError && <p style={{ color: "red" }}>{courseError}</p>}

      <label className="block" htmlFor="username">
        Rfid :
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        name="rfid"
        type="text"
        required
        id="username"
        value={teacher.rfid}
        onChange={(e) => {
          if (e.target.value.length <= 10) {
            handleFormChange(e);
            setRfidError("");
          } else {
            setRfidError("Numeric RFID must be 10 digits");
          }
        }}
      />
      {rfidError && <p style={{ color: "red" }}>{rfidError}</p>}

      <label className="block" htmlFor="password">
        Password:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="password"
        name="password"
        id="password"
        value={teacher.password}
        onChange={(e) => {
          handleFormChange(e);
          setPasswordError("");
        }}
        required
      />
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

      <button
        type="submit"
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900"
        onClick={(e) => addTeacher(e)}
      >
        Register
      </button>

      {error ? <ErrorStrip error={error} /> : ""}
    </form>
  );
};

export default TeacherForm;
