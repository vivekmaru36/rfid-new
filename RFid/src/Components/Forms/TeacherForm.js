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
  const [errors, setErrors] = useState({}); // Track errors for each field

  const handleFormChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });

    // Clear error for the field when the user starts typing again
    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  // Validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate Name
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(teacher.name.trim())) {
      newErrors.name = "Invalid or Empty Name field";
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!teacher.email.trim() || !emailRegex.test(teacher.email.trim())) {
      newErrors.email = "Invalid or empty email address";
      isValid = false;
    }

    // Validate Course
    if (!teacher.course.trim()) {
      newErrors.course = "Course is required";
      isValid = false;
    }

    // Validate RFID
    const rfidRegex = /^\d{10}$/;
    if (!teacher.rfid.trim() || !rfidRegex.test(teacher.rfid.trim())) {
      newErrors.rfid = "Numeric RFID must be 10 digits";
      isValid = false;
    }

    // Validate Password
    if (!teacher.password.trim() || teacher.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to add a new teacher
  const addTeacher = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Form validation failed, do not proceed with submission
      return;
    }

    try {
      const reqData = JSON.stringify(teacher);
      toast.loading("Registering .....");
      const response = await axios.post("Teacher", reqData);
      navigate("/otpt", { state: { teacher: teacher } });
      toast.success(response.data.message);
    } catch (err) {
      // Display errors for each field
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        // General error
        setErrors({ general: "Something went wrong. Please try again." });
      }
    }
  };

  // Render the form
  return (
    <form className="scrollWidth w-full font-medium tracking-wide accent-violet-600">
      {/* Name Field */}
      <label className="block" htmlFor="name">
        Name:
      </label>
      <input
        className={`mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 ${
          errors.name ? "border-red-500" : ""
        }`}
        type="text"
        name="name"
        required
        id="name"
        value={teacher.name}
        onChange={(e) => handleFormChange(e)}
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name}</p>
      )}

      {/* Email Field */}
      <label className="block" htmlFor="email">
        Email:
      </label>
      <input
        className={`mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 ${
          errors.email ? "border-red-500" : ""
        }`}
        type="email"
        required
        id="email"
        name="email"
        value={teacher.email}
        onChange={(e) => handleFormChange(e)}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )}

      {/* Course Field */}
      <label className="block" htmlFor="course">
        Course:
      </label>
      <select
        className={`mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 ${
          errors.course ? "border-red-500" : ""
        }`}
        placeholder="Select Course"
        name="course"
        id="course"
        value={teacher.course}
        required
        onChange={(e) => handleFormChange(e)}
      >
        <option defaultValue hidden>
          Select Course
        </option>
        <option value="BSC CS">BSC CS</option>
        <option value="BCOM">BCOM</option>
        <option value="BA">BA</option>
      </select>
      {errors.course && (
        <p className="text-red-500 text-sm">{errors.course}</p>
      )}

      {/* RFID Field */}
      <label className="block" htmlFor="rfid">
        RFID:
      </label>
      <input
        className={`mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 ${
          errors.rfid ? "border-red-500" : ""
        }`}
        type="text"
        name="rfid"
        required
        id="rfid"
        value={teacher.rfid}
        onChange={(e) => handleFormChange(e)}
      />
      {errors.rfid && (
        <p className="text-red-500 text-sm">{errors.rfid}</p>
      )}

      {/* Password Field */}
      <label className="block" htmlFor="password">
        Password:
      </label>
      <input
        className={`mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 ${
          errors.password ? "border-red-500" : ""
        }`}
        type="password"
        name="password"
        id="password"
        value={teacher.password}
        required
        onChange={(e) => handleFormChange(e)}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 "
        onClick={(e) => addTeacher(e)}
      >
        Register
      </button>

      {/* General Error Message */}
      {errors.general && (
        <ErrorStrip error={errors.general} />
      )}
    </form>
  );
};

export default TeacherForm;
