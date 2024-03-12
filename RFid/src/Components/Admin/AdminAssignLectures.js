import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin, PiStudentThin } from "react-icons/pi";

import { useEffect } from "react";
import { useState } from "react";
import TimeDemo from "../TimeComponenets/TimePicker12";

const AdminAssignLectures = () => {
    const { user } = React.useContext(UserContext);
    const [profile, setProfile] = React.useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [Teachers, setTeachers] = useState([]);
    // console.log(user);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get("/teacher/allTeachers"); // Assuming your backend endpoint is /students
                const sortedStudents = response.data.sort((a, b) => {
                    // Sort students by course and then by year
                    if (a.course !== b.course) {
                        return a.course.localeCompare(b.course);
                    }
                    return a.year - b.year;
                });
                setTeachers(sortedStudents);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Teachers:", error);
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    return (
        // <main className="flex w-full flex-col justify-center md:w-fit">
        // <div>
        //     ViewStudents
        // </div>
        // </main>

        <main className="flex w-full flex-col justify-center md:w-fit">
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>Assign Lectures</h1>
                    <TimeDemo/>
                    
                </div>
            )}
        </main>
    );
};

export default AdminAssignLectures;
