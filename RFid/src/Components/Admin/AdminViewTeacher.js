import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin, PiStudentThin } from "react-icons/pi";
import { toast } from "react-toastify";


import { useEffect } from "react";
import { useState } from "react";

const AdminViewTeacher = () => {
    const { user } = React.useContext(UserContext);
    const [profile, setProfile] = React.useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [Teachers, setTeachers] = useState([]);
    // console.log(user);

    const DeleteTeacher = async (teacher) => {
        try {
            console.log(teacher._id)
            const response = await axios.post("http://localhost:3500/teacher/deleteTeacher", {
                id: teacher._id
            });

            setTeachers(prevStudents => prevStudents.filter(s => s._id !== teacher._id));

            toast.success("Teacher Deleted");

        } catch (err) {
            setError(err);
        }
    };

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

        <main className="students-container">
            {loading ? (
                <Loading />
            ) : (
                <div className="students-container">
                    <div className="year-container">
                        <h2 className="font-bold">First Year</h2>
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th className="border"><i>Name</i></th>
                                    <th className="border"><i>Email</i></th>
                                    <th className="border"><i>Course</i></th>
                                    <th className="border"><i>Rfid</i></th>
                                    <th className="border"><i>Remove User</i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* First Year students */}
                                {Teachers.filter(student => student.Year === '1st').map((student) => (
                                    <tr key={student._id}>
                                        <td className="border border-gray-500">{student.name}</td>
                                        <td className="border border-gray-500">{student.email}</td>
                                        <td className="border border-gray-500">{student.course}</td>
                                        <td className="border border-gray-500">{student.rfid}</td>
                                        <td className="border border-gray-500">
                                            <button
                                                type="button"
                                                className="delete-button bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() => DeleteTeacher(student)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="year-container">
                        <h2 className="font-bold">Second Year</h2>
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th className="border"><i>Name</i></th>
                                    <th className="border"><i>Email</i></th>
                                    <th className="border"><i>Course</i></th>
                                    <th className="border"><i>Rfid</i></th>
                                    <th className="border"><i>Remove User</i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Second Year students */}
                                {Teachers.filter(student => student.Year === '2nd').map((student) => (
                                    <tr key={student._id}>
                                        <td className="border border-gray-500">{student.name}</td>
                                        <td className="border border-gray-500">{student.email}</td>
                                        <td className="border border-gray-500">{student.course}</td>
                                        <td className="border border-gray-500">{student.rfid}</td>
                                        <td className="border border-gray-500">
                                            <button
                                                type="button"
                                                className="delete-button bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() => DeleteTeacher(student)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="year-container">
                        <h2 className="font-bold">Third Year</h2>
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th className="border"><i>Name</i></th>
                                    <th className="border"><i>Email</i></th>
                                    <th className="border"><i>Course</i></th>
                                    <th className="border"><i>Rfid</i></th>
                                    <th className="border"><i>Remove User</i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Third Year students */}
                                {Teachers.filter(student => student.Year === '3rd').map((student) => (
                                    <tr key={student._id}>
                                        <td className="border border-gray-500">{student.name}</td>
                                        <td className="border border-gray-500">{student.email}</td>
                                        <td className="border border-gray-500">{student.course}</td>
                                        <td className="border border-gray-500">{student.rfid}</td>
                                        <td className="border border-gray-500">
                                            <button
                                                type="button"
                                                className="delete-button bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() => DeleteTeacher()}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AdminViewTeacher;
