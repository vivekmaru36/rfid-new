import { useState, useContext, useRef } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ErrorStrip from "../ErrorStrip";
import { Pie } from "react-chartjs-2";

const Teacher_Stu_Attendance = () => {

    // fetching students for teacher
    const { user } = React.useContext(UserContext);

    // const [Totalstudents, setTotalstudents] = useState([]);
    const [studentsFirstYear, setStudentsFirstYear] = useState([]);
    const [studentsSecondYear, setStudentsSecondYear] = useState([]);
    const [studentsThirdYear, setStudentsThirdYear] = useState([]);

    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState("");
    const chartRef = useRef(null);


    const fetchAttendance = async (rfid, course, Year) => {
        try {
            const response = await axios.post("http://localhost:3500/student/getattendance", {
                rfid: rfid,
                course: course,
                Year: Year
            });
            setAttendance(response.data.lecturesWithAttendance);
            //   console.log(attendance)
        } catch (err) {
            setError(err);
        }
    };

    const [attendanceChartData, setAttendanceChartData] = useState(null); // State for attendance chart data

    const [showChart, setShowChart] = useState(true); // State to control chart visibility

    function handleToggleChart() {
        setShowChart(!showChart);
    }

    const generateChartData = (attendanceData) => {
        const labels = attendanceData.map((lecture) => lecture.Subject);
        const data = attendanceData.map((lecture) => {
            return lecture.attendance === "Present" ? 1 : 1;
        });

        const backgroundColors = attendanceData.map((lecture) => {
            return lecture.attendance === "Present" ? "green" : "red"; // Set color based on attendance
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: "Attendance : green for Present  and Red for Absent",
                    data: data,
                    // backgroundColor: ["green", "red"], // Colors for Present and Absent
                    backgroundColor: backgroundColors,
                },
            ],
        };
    };
    const [attendanceData, setAttendanceData] = useState({}); // State for attendance data

    const fetchAttendanceAndUpdateChart = async (student) => {
        try {
            const response = await axios.post("http://localhost:3500/student/getattendance", {
                rfid: student.rfid,
                course: student.course,
                Year: student.Year
            });

            // Generate chart data and update state
            const chartData = generateChartData(response.data.lecturesWithAttendance);
            setAttendanceData({ ...attendanceData, [student._id]: { attendance: response.data.lecturesWithAttendance, chartData: chartData } });
        } catch (err) {
            setError(err);
        }
    };


    useEffect(() => {
        const fetchstudentsinyourcourse = async () => {
            try {
                const response = await axios.post('http://localhost:3500/LecHistory/StudentInYourCourse', {
                    rfid: user.rfid,
                    course: user.course
                });
                if (response.data.studentsFirstYear) {
                    setStudentsFirstYear(response.data.studentsFirstYear);
                }
                if (response.data.studentsSecondYear) {
                    setStudentsSecondYear(response.data.studentsSecondYear);
                }
                if (response.data.studentsThirdYear) {
                    setStudentsThirdYear(response.data.studentsThirdYear);
                }
            } catch (error) {
                toast.error("Failed to fetch students in your course");
            }
        };

        fetchstudentsinyourcourse();
    }, []);

    // function of date conversion

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

    const toggleChartVisibility = (studentId) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            [studentId]: {
                ...prevData[studentId],
                showChart: !prevData[studentId]?.showChart, // Toggle visibility if already exists
            },
        }));
    };



    return (
        <main className="self-center">
            <div>
                <h2>Students in 1st Year</h2>
                {studentsFirstYear.map((student) => (
                    <div key={student._id}>
                        <p>Name: {student.name}</p>
                        <p>Course: {student.course}</p>
                        {/* Add more student information as needed */}
                        {/* <br /> */}
                        <button
                            className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"


                            onClick={() => fetchAttendanceAndUpdateChart(student)}

                        >
                            Fetch
                        </button>

                        <button
                            className="mb-4 ml-2 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"

                            // onClick={handleToggleChart}
                            onClick={() => toggleChartVisibility(student._id)}
                        >
                            {attendanceData[student._id]?.showChart ? 'Hide Chart' : 'Show Chart'}

                        </button>

                        {attendanceData[student._id]?.showChart && (
                            <Bar data={attendanceData[student._id]?.chartData} />
                        )}

                        <br ></br>
                    </div>
                ))}
            </div>

            <div>
                <h2>Students in 2nd Year</h2>
                {studentsSecondYear.map((student) => (
                    <div key={student._id}>
                        <p>Name: {student.name}</p>
                        <p>Course: {student.course}</p>
                        {/* Add more student information as needed */}
                        <button
                            className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"


                            onClick={() => fetchAttendanceAndUpdateChart(student)}

                        >
                            Fetch
                        </button>

                        <button
                            className="mb-4 ml-2 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"

                            // onClick={handleToggleChart}
                            onClick={() => toggleChartVisibility(student._id)}
                        >
                            {attendanceData[student._id]?.showChart ? 'Hide Chart' : 'Show Chart'}

                        </button>

                        {attendanceData[student._id]?.showChart && (
                            <Bar data={attendanceData[student._id]?.chartData} />
                        )}

                        <br ></br>
                    </div>
                ))}
            </div>

            <div>
                <h2>Students in 3rd Year</h2>
                {studentsThirdYear.map((student) => (
                    <div key={student._id}>
                        <p>Name: {student.name}</p>
                        <p>Course: {student.course}</p>
                        {/* Add more student information as needed */}
                        <button
                            className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"


                            onClick={() => fetchAttendanceAndUpdateChart(student)}

                        >
                            Fetch
                        </button>

                        <button
                            className="mb-4 ml-2 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"

                            // onClick={handleToggleChart}
                            onClick={() => toggleChartVisibility(student._id)}
                        >
                            {attendanceData[student._id]?.showChart ? 'Hide Chart' : 'Show Chart'}

                        </button>

                        {attendanceData[student._id]?.showChart && (
                            <Bar data={attendanceData[student._id]?.chartData} />
                        )}
                        <br ></br>
                    </div>
                ))}
            </div>
        </main>

    );
};
export default Teacher_Stu_Attendance;
