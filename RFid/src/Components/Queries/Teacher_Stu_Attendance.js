import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import React from "react";


import ErrorStrip from "../ErrorStrip";

const Teacher_Stu_Attendance = () => {

    // fetching students for teacher
    const { user } = React.useContext(UserContext);

    // const [Totalstudents, setTotalstudents] = useState([]);
    const [studentsFirstYear, setStudentsFirstYear] = useState([]);
    const [studentsSecondYear, setStudentsSecondYear] = useState([]);
    const [studentsThirdYear, setStudentsThirdYear] = useState([]);



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

    return (
        <main className="self-center">
            <div>
                <h2>Students in 1st Year</h2>
                {studentsFirstYear.map((student) => (
                    <div key={student._id}>
                        <p>Name: {student.name}</p>
                        <p>Course: {student.course}</p>
                        {/* Add more student information as needed */}
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
                    </div>
                ))}
            </div>
        </main>

    );
};
export default Teacher_Stu_Attendance;
