import React, { useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { toast } from "react-toastify";

const AdminViewStudents = () => {
    const { user } = React.useContext(UserContext);
    const [profile, setProfile] = React.useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [students, setStudents] = useState([]);

    const DeleteStudent = async (student) => {
        try {
            console.log(student._id);
            await axios.post("http://localhost:3500/student/deletestudent", {
                id: student._id
            });
            // Update the students array by filtering out the deleted student
            setStudents(prevStudents => prevStudents.filter(s => s._id !== student._id));
            toast.success("User Deleted");
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("/student"); // Assuming your backend endpoint is /students
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
                            {students.filter(student => student.Year === '1st').map((student) => (
                                <tr key={student._id}>
                                    <td className="border border-gray-500">{student.name}</td>
                                    <td className="border border-gray-500">{student.email}</td>
                                    <td className="border border-gray-500">{student.course}</td>
                                    <td className="border border-gray-500">{student.rfid}</td>
                                    <td className="border border-gray-500">
                                        <button
                                            type="button"
                                            className="delete-button bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => DeleteStudent(student)}
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
                            {students.filter(student => student.Year === '2nd').map((student) => (
                                <tr key={student._id}>
                                    <td className="border border-gray-500">{student.name}</td>
                                    <td className="border border-gray-500">{student.email}</td>
                                    <td className="border border-gray-500">{student.course}</td>
                                    <td className="border border-gray-500">{student.rfid}</td>
                                    <td className="border border-gray-500">
                                        <button
                                            type="button"
                                            className="delete-button bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => DeleteStudent(student)}
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
                            {students.filter(student => student.Year === '3rd').map((student) => (
                                <tr key={student._id}>
                                    <td className="border border-gray-500">{student.name}</td>
                                    <td className="border border-gray-500">{student.email}</td>
                                    <td className="border border-gray-500">{student.course}</td>
                                    <td className="border border-gray-500">{student.rfid}</td>
                                    <td className="border border-gray-500">
                                        <button
                                            type="button"
                                            className="delete-button bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => DeleteStudent(student)}
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

export default AdminViewStudents;