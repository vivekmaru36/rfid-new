import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import React from "react";


import ErrorStrip from "../ErrorStrip";

const Lecture_History = () => {


    // fetching Lecture for tea
    const { user } = React.useContext(UserContext);

    const [lectureHistory, setLectureHistory] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    const [lectureHistorydetails, setLectureHistorydetails] = useState([]);

    const [selectedName, setSelectedName] = useState('');


    useEffect(() => {
        const fetchLecHistory = async () => {
            try {
                const response = await axios.post('http://localhost:3500/LecHistory', {
                    rfid: user.rfid
                });
                if (response.data.TotalLecs) {
                    setLectureHistory(response.data.TotalLecs);
                    sendIdsToBackend(response.data.TotalLecs);
                } else {
                    toast.error("No lectures to display");
                }
            } catch (error) {
                toast.error("Failed to fetch lecture history");
            }
        };

        fetchLecHistory();
    }, []);

    
    useEffect(() => {

    }, []);
    const sendIdsToBackend = async (lectures) => {
        try {
            const ids = lectures.map(lecture => lecture._id);
            const response = await axios.post('http://localhost:3500/LecHistory/ids', {
                ids: ids
            });
            setLectureHistorydetails(response.data.TotalLecsdetails);
            // console.log(response.data.TotalLecsdetails); // Assuming you want to log the response
        } catch (error) {
            toast.error("Failed to send lecture IDs to backend");
        }
    };

    const handleDropdownChange = (id,selectedName) => {
        setSelectedId(id);
        setSelectedName(selectedName);
        console.log(selectedName);
    };

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
            {lectureHistory.length > 0 ? (
                <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
                    {lectureHistory.map(lecture => (
                        <div key={lecture._id} className="font-semibold">
                            <p>Lecture Date: {convertToIST12HourFormatWithDate(lecture.Lecdate)}</p>
                            <p>Start Time: {convertToIST12HourFormatWithDate(lecture.sTime)}</p>
                            <p>End Time: {convertToIST12HourFormatWithDate(lecture.eTime)}</p>
                            <p>Classroom: {convertToIST12HourFormatWithDate(lecture.venue)}</p>
                            <p>Course: {lecture.course}</p>
                            <p>Subject: {lecture.Subject}</p>
                            {/* <select onChange={() => handleDropdownChange(lecture._id)}> */}
                            <select onChange={(e) => handleDropdownChange(lecture._id, e.target.value)}>
                                <option value="">Those who were There</option>
                                {lectureHistorydetails
                                    .filter(details => details.hardwaredetails._id === lecture._id)
                                    .map(details => (
                                        <option key={details._id} value={details.details.name}>
                                            {details.details.name}
                                        </option>
                                    ))}
                            </select>
                            {selectedId === lecture._id && (
                                <div>
                                    <p>Attendance: {
                                        lectureHistorydetails
                                            .find(details => details.details.name === selectedName)
                                            ?.attendance
                                    }</p>
                                    {/* Assuming lectureHistorydetails has 'attendance' */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-red-500">No lectures to display</div>
            )}
        </main>

    );
};
export default Lecture_History;
