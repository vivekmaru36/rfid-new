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
    Year: ""
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
      // [e.target.id]: e.target.value,
    });
  };

  const handleFormChangeYear = (e) => {
    setTeacher({
      ...teacher,
      [e.target.id]: e.target.value,
      // [e.target.id]: e.target.value,
    });
  };

  //TODO Add more departments
  const addTeacher = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(teacher);
      // const response = await axios.post("teacher/123", reqData);
      toast.loading("Registering .....");

      const response = await axios.post("Teacher", reqData);
      // navigate("../");
      // navigate("/otpt",{ state: { teacher: teacher } });
      toast.dismiss();
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
      toast.dismiss();

    }
  };

  return (
    <form className="scrollWidth w-full  font-medium tracking-wide accent-violet-600">
      <label className="block" htmlFor="name">
        Name:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-[1.5px] focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 "
        type="text"
        name="name"
        required
        id="name"
        value={teacher.name}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="email">
        Email:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 "
        type="email"
        required
        id="email"
        name="email"
        value={teacher.email}
        onChange={(e) => handleFormChange(e)}
      />
    
      <label className="block" htmlFor="department">
        Course:
      </label>
      <select
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-[1.5px] focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        placeholder="select course"
        name="course"
        id="department"
        value={teacher.course}
        required
        onChange={(e) => handleFormChange(e)}
      >
        <option defaultValue hidden>
          Select Department
        </option>

        <option
          className="min-h-[2rem] bg-violet-500 font-semibold leading-8 text-slate-100"
          value="BSC CS"
        >
          BSC CS
        </option>

        <option
          className="min-h-[2rem] bg-violet-500 font-semibold leading-8 text-slate-100"
          value="BCOM"
        >
          BCOM
        </option>
        <option
          className="min-h-[2rem] bg-violet-500 font-semibold leading-8 text-slate-100"
          value="BA"
        >
          BA
        </option>

      </select>

      <label className="block" htmlFor="course">
        Year
      </label>
      <select
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        id="Year"
        value={teacher.Year}
        onChange={(e) => handleFormChangeYear(e)}
      >
        <option value="">Select Year</option>
        <option value="1st">First</option>
        <option value="2nd">Second</option>
        <option value="3rd">Third</option>
      </select>
      <label className="block" htmlFor="username">
        Rfid :
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 "
        name="rfid"
        type="number"
        required
        id="username"
        value={teacher.rfid}
        // onChange={(e) => handleFormChange(e)}
        onChange={(e) => {
          // Check if the input value exceeds 10 digits
          if (e.target.value.length <= 10) {
            // If not, update the state
            handleFormChange(e);
          }
        }}
      />
      {teacher.rfid.length !== 10 && <p style={{ color: 'white', textAlign: "center", fontWeight: "bold" }}>Numeric RFID must be 10 digits</p>}

      <label className="block" htmlFor="password">
        Password:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 "
        type="password"
        name="password"
        id="password"
        value={teacher.password}
        required
        onChange={(e) => handleFormChange(e)}
      />
      <button
        type="submit"
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 "
        onClick={(e) => addTeacher(e)}
      >
        Register
      </button>
      {error ? <ErrorStrip error={error} /> : ""}
    </form>
  );
};

export default TeacherForm;
