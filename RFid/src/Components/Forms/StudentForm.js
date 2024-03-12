import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorStrip from "../ErrorStrip";

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
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(student);
      toast.loading("Registering .....");
      const response = await axios.post("student", reqData);
      // navigate("../");
      // navigate("/otp",{ state: { student: student } });
      toast.dismiss();
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form className="scrollWidth w-full  font-medium tracking-wide accent-violet-600">
      <label className="block" htmlFor="name">
        Name:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        required
        id="name"
        value={student.name}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="email">
        Email:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        required
        id="email"
        value={student.email}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="course">
        Course:
      </label>
      <select
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        id="course"
        value={student.course}
        onChange={(e) => handleFormChange(e)}
      >
        <option value="">Select Course</option>
        <option value="BSC CS">BSC CS</option>
        <option value="BCOM">BCOM</option>
        <option value="BA">BA</option>
      </select>

      {/* Year */}

      <label className="block" htmlFor="course">
        Year
      </label>
      <select
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        id="Year"
        value={student.Year}
        onChange={(e) => handleFormChange(e)}
      >
        <option value="">Select Year</option>
        <option value="1st">First</option>
        <option value="2nd">Second</option>
        <option value="3rd">Third</option>
      </select>

      <label className="block" htmlFor="username">
        Rfid
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="number"
        id="rfid"
        required
        value={student.rfid}
        // onChange={(e) => handleFormChange(e)}
        onChange={(e) => {
          // Check if the input value exceeds 10 digits
          if (e.target.value.length <= 10) {
            // If not, update the state
            handleFormChange(e);
          }
        }}
      />
      {student.rfid.length !== 10 && <p style={{ color: 'white', textAlign: "center", fontWeight: "bold" }}>Numeric RFID must be 10 digits</p>}
      <label className="block" htmlFor="password">
        Password:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="password"
        id="password"
        value={student.password}
        onChange={(e) => handleFormChange(e)}
        required
      />
      <button
        type="submit"
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 "
        onClick={(e) => addStudent(e)}
      >
        Register
      </button>
      {error ? <ErrorStrip error={error} /> : ""}
    </form>
  );
};

export default StudentForm;
