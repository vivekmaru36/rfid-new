import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin, PiStudentThin } from "react-icons/pi";

import { useEffect } from "react";
import { useState } from "react";

const AdminViewStudents = () => {
    const { user } = React.useContext(UserContext);
    const [profile, setProfile] = React.useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [students, setStudents] = useState([]);
    // console.log(user);

    const DeleteStudent = async (student) => {
        try {
            console.log(student._id)
            const response = await axios.post("http://localhost:3500/student/deletestudent",{
                id : student._id
            });

        
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("/student  "); // Assuming your backend endpoint is /students
                const sortedStudents = response.data.sort((a, b) => {
                    // Sort students by course and then by year
                    if (a.course !== b.course) {
                        return a.course.localeCompare(b.course);
                    }
                    return a.year - b.year;
                });
                setStudents(sortedStudents);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching students:", error);
                setLoading(false);
            }
        };

        fetchStudents();
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
                    <h1>View Students</h1>
                    <ul>
                        {students.map((student) => (
                            <li key={student._id}>
                                <span>Name: {student.name}</span>
                                <span>Course: {student.course}</span>
                                <span>Emai: {student.email}</span>
                                <span>Year: {student.Year}</span>
                                <span>
                                    <button
                                        type="submit"
                                        className="delete-button"
                                        onClick={() => DeleteStudent(student)}
                                    >
                                        Delete
                                    </button>
                                </span>
                                {/* Add more details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    );
};

export default AdminViewStudents;
