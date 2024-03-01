import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentForm = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    rfid: "",
    password: "",
    Year: ""
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [yearError, setYearError] = useState("");
  const [rfidError, setRfidError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const nameRegex = /[a-zA-Z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFormChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };

  const addStudent = async (e) => {
    e.preventDefault();

    // Validation
    if (!nameRegex.test(student.name.trim())) {
      setNameError("Name required & should contain only letters");
      return;
    }

    if (!emailRegex.test(student.email.trim())) {
      setEmailError("Invalid email format");
      return;
    }

    if (!student.course.trim()) {
      setCourseError("Please select a course");
      return;
    }

    if (!student.Year.trim()) {
      setYearError("Please select a year");
      return;
    }

    if (student.rfid.length !== 10) {
      setRfidError("Numeric RFID must be 10 digits");
      return;
    }

    if (!student.password.trim() || student.password.trim().length < 6) {
      setPasswordError("Password should be at least 6 characters");
      return;
    }

    try {
      const reqData = JSON.stringify(student);
      toast.loading("Registering .....");
      const response = await axios.post("student", reqData);
      navigate("/otp", { state: { student: student } });
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
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        required
        id="name"
        value={student.name}
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
        type="text"
        required
        id="email"
        value={student.email}
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
        id="course"
        value={student.course}
        onChange={(e) => {
          handleFormChange(e);
          setCourseError("");
        }}
      >
        <option value="">Select Course</option>
        <option value="BSC CS">BSC CS</option>
        <option value="BCOM">BCOM</option>
        <option value="BA">BA</option>
      </select>
      {courseError && <p style={{ color: "red" }}>{courseError}</p>}

      <label className="block" htmlFor="Year">
        Year:
      </label>
      <select
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        id="Year"
        value={student.Year}
        onChange={(e) => {
          handleFormChange(e);
          setYearError("");
        }}
      >
        <option value="">Select Year</option>
        <option value="1st">First</option>
        <option value="2nd">Second</option>
        <option value="3rd">Third</option>
      </select>
      {yearError && <p style={{ color: "red" }}>{yearError}</p>}

      <label className="block" htmlFor="rfid">
        RFID:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="number"
        id="rfid"
        required
        value={student.rfid}
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
        id="password"
        value={student.password}
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
        onClick={(e) => addStudent(e)}
      >
        Register
      </button>

      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        ""
      )}
    </form>
  );
};

export default StudentForm;