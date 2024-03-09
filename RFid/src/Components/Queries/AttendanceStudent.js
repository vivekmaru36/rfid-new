import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import ErrorStrip from "../ErrorStrip";

import { useEffect } from "react";

const AttendanceStudent = () => {
  const { user } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  // const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const [AllLecs, setLecs] = useState([]);

  const fetchallLectures = async (e) => {
    e.preventDefault();
    setLecs([]);
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:3500/student/getAllLecs`, {
        rfid: user.rfid,
        course: user.course,
        Year: user.Year
      });
      setLecs(response.data.AllLecs);
    } catch (err) {
      setError(err);
    }
  }
  useEffect(() => {
    fetchallLectures();
  }, []);

  console.log(user);

  // fetching Attendance
  const fetchAttendance = async (e) => {
    e.preventDefault();
    setAttendance([]);
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:3500/student/getattendance`, {
        rfid: user.rfid,
        course: user.course,
        Year: user.Year
      });
      setAttendance(response.data.lecturesWithAttendance);
      console.log(attendance);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    console.log(attendance); // Log records here
  }, [attendance]);

  function convertToIST12HourFormatWithDate(timestampString) {
    // Parse the input timestamp string
    const timestampUTC = new Date(timestampString);

    console.log(timestampUTC);

    // Format the date and time in 12-hour format with AM/PM
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'short',
      minute: 'short',
      second: 'short',
      hour12: true,
    };
    const istTime12HourFormatWithDate = timestampUTC.toLocaleString('en-US',);

    return istTime12HourFormatWithDate;
  }

  return (
    <main className="attendance">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Attendance
      </h2>
      <section className="attendance__head">
        <form className="w-full gap-4 accent-violet-900 md:flex ">

          <div className="flex items-end">
            <button
              className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"
              type="submit"
              onClick={(e) => fetchAttendance(e)}
            >
              Fetch
            </button>
          </div>
        </form>
      </section>
      <div>{error ? <ErrorStrip error={error.message} /> : ""}</div>

      {attendance && attendance.length > 0 ? (
        <div>
          {attendance.map((recorda, index) => (
            <div key={index}>
              <ul>
                <li>Classrrom : {recorda.venue}</li>
                <li>Lecture Date : {convertToIST12HourFormatWithDate(recorda.sTime)}</li>
                <li>Subject : {recorda.Subject}</li>
                <li>Teacher : {recorda.Teacher}</li>
                <li>Attendance : {recorda.attendance}</li>
              </ul>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <p>No recent Records To Display</p>
      )}

    </main>
  );
};
export default AttendanceStudent;
