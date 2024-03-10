import { useState, useContext, useEffect, useRef } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { Bar } from "react-chartjs-2";
import ErrorStrip from "../ErrorStrip";
import Chart from "chart.js/auto";

const AttendanceStudent = () => {
  const { user } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");
  const chartRef = useRef(null);

  const fetchAttendance = async () => {
    try {
      const response = await axios.post("http://localhost:3500/student/getattendance", {
        rfid: user.rfid,
        course: user.course,
        Year: user.Year
      });
      setAttendance(response.data.lecturesWithAttendance);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById("attendance-chart");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Present", "Absent"],
        datasets: [
          {
            label: "Attendance",
            backgroundColor: ["green", "red"],
            borderColor: ["green", "red"],
            borderWidth: 1,
            data: calculateAttendanceData()
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    chartRef.current = newChartInstance;
  }, [attendance]);

  const calculateAttendanceData = () => {
    const attendanceCounts = {
      Present: 0,
      Absent: 0
    };

    attendance.forEach(record => {
      attendanceCounts[record.attendance]++;
    });

    return [attendanceCounts.Present, attendanceCounts.Absent];
  };

  function convertToIST12HourFormatWithDate(timestampString) {
    // Parse the input timestamp string
    const timestampUTC = new Date(timestampString);

    console.log(timestampUTC);

    // // Set the time zone to Indian Standard Time (IST)
    // timestampUTC.setUTCHours(timestampUTC.getUTCHours() + 5);
    // timestampUTC.setUTCMinutes(timestampUTC.getUTCMinutes() + 30);

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
        <button
          className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"
          onClick={fetchAttendance}
        >
          Fetch
        </button>
      </section>
      {error && <ErrorStrip error={error.message} />}
      <div className="bar-chart-container">
        <canvas id="attendance-chart"></canvas>
      </div>
      <div>
        {attendance.map((recorda, index) => (
          <div key={index}>
            <ul>
              <li>Classroom: {recorda.venue}</li>
              <li>Lecture Date: {convertToIST12HourFormatWithDate(recorda.sTime)}</li>
              <li>Subject: {recorda.Subject}</li>
              <li>Teacher: {recorda.Teacher}</li>
              <li>Attendance: {recorda.attendance}</li>
            </ul>
            <br />
          </div>
        ))}
      </div>
    </main>
  );
};

export default AttendanceStudent;
