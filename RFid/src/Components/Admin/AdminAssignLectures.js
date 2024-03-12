import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin, PiStudentThin } from "react-icons/pi";

import { useEffect } from "react";
import { useState } from "react";
import TimeDemo from "../TimeComponenets/TimePicker12";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setHours, setMinutes } from 'date-fns';
import BasicDemo from "../TimeComponenets/NewTime";
import BasicDateCalendar from "../TimeComponenets/NewTime";
import { Calendar } from "primereact/calendar";
import MinMaxDemo from "../TimeComponenets/NewTime";
import BasicTimePicker from "../TimeComponenets/Starttime";

import { StaticTimePicker } from '@mui/x-date-pickers';
import TimePickerViewRenderers from "../TimeComponenets/Starttime";
import TimePickerViewRendererse from "../TimeComponenets/Endtime";


const AdminAssignLectures = () => {
    const { user } = React.useContext(UserContext);
    const [profile, setProfile] = React.useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [Teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get("/teacher/allTeachers");
                const sortedStudents = response.data.sort((a, b) => {
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

    const handleStarttimeChange = (date) => {
        setStarttime(date);
        // Update endtime to prevent setting it before starttime
        // setEndtime(date);
        // setEndtime(date);
    };
    const [starttime, setStarttime] = useState(new Date());
    // current hour and minute
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    return (
        <main className="flex w-full flex-col justify-center md:w-fit">
            {loading ? (
                <Loading />
            ) : (

                <div>
                    <h1>Assign Lectures</h1>
                    {/* Include BasicDateCalendar inside the else block */}
                    {/* <BasicDateCalendar/> */}
                    <h1>Pick Date</h1>
                    <MinMaxDemo />
                    
                    <br />
                    <h1>Start Time</h1>
                    <TimePickerViewRenderers/>

                    <br />
                    <h1>End Time</h1>
                    <TimePickerViewRendererse/>
                    {/* <BasicTimePicker/> */}
                    
                    {/* <BasicTimePicker/> */}
                    {/* </>                     */}
                    {/* <DatePicker
                        selected={starttime}
                        onChange={handleStarttimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        minTime={setHours(setMinutes(new Date(), currentMinute), currentHour)}
                        maxTime={setHours(setMinutes(new Date(), 30), 18)}
                        onKeyDown={(e) => {
                            if (!/[0-9:apm]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        className="border border-gray-300 rounded px-4 py-2"
                        required
                    />   */}
                </div>
            )}
        </main>
    );
};

export default AdminAssignLectures;
