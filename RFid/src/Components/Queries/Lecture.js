import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setHours, setMinutes } from 'date-fns';
import axios from "../../config/api/axios";
import { toast } from "react-toastify";



const Lecture = () => {

    const { user } = React.useContext(UserContext);
    console.log(user.rfid);

    // pick Date
    const [startDate, setStartDate] = useState(new Date());

    // pick stime 
    const [starttime, setStarttime] = useState(new Date());

    // pick etime 
    const [endtime, setEndtime] = useState(starttime);

    // current world time
    const currentWorldTime = new Date();

    // Update minTime for endtime based on selected starttime
    const handleStarttimeChange = (date) => {
        setStarttime(date);
        // Update endtime to prevent setting it before starttime
        // setEndtime(date);
        setEndtime(date);
    };

    const [LecDetails, setLecDetails] = useState({
        Teacher: "",
        course: "",
        rfidno: "",
        Subject: "",
        LectureStartTime: "",
        LectureEndTime: "",
        Lecdate: "",
        Year: ""
    });

    // auto del api
    const handleAutoDel = async () => {
        try {
            const response = await axios.delete("http://localhost:3500/Hardware/AutoDel", {
                data: {
                    etime: LecDetails.LectureEndTime,
                },
            });

            console.log("Lecture Auto deleted successfully : ", response.data);
        } catch (error) {
            console.error("Error deleting lecture : ", error);
        }
    };

    useEffect(() => {
        const fetchHardware = async () => {
            try {
                const response = await axios.get('http://localhost:3500/Hardware');
                if (response.data.success) {
                    const ldata = response.data.hardwaredetails;
                    setLecDetails({
                        Teacher: ldata.Teacher,
                        Lecdate: ldata.Lecdate,
                        LectureStartTime: ldata.sTime,
                        LectureEndTime: ldata.eTime,
                        Venue: ldata.venue,
                        course: ldata.course,
                        rfidno: ldata.rfidno,
                        Subject: ldata.Subject,
                        Year: ldata.Year
                    });

                    // Check if eTime has passed from the current time

                    const eTimeUTC = new Date(ldata.eTime);

                    if (currentWorldTime > eTimeUTC) {
                        // Call the delete API
                        handleAutoDel();
                    }
                } else {
                    console.error('Error fetching Law details:', response.data.message);
                    setLecDetails(null);
                }
            } catch (error) {
                console.error('Error fetching Law details:', error);
                setLecDetails(null);
            }
        };

        fetchHardware();
    }, []);

    console.log("Fecthed", LecDetails)

    // current hour and minute
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();



    // pick subject
    const [Subject, setSubject] = useState('');

    // pick Year
    const [Year, setYear] = useState('');

    // Update the selected year in the state
    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    // function to set 

    // console.log(user.email);

    const setlec = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Setting LEcture ....");

            const response = await axios.post("http://localhost:3500/Hardware", {

                Teacher: user.name,
                Subject: Subject,
                // date: startDate,
                date: new Date(startDate).toISOString(),
                stime: new Date(starttime).toISOString(),
                etime: new Date(endtime).toISOString(),
                rfidno: user.rfid,
                course: user.course,
                email: user.email,
                Year: Year
            });
            toast.dismiss();

            window.location.reload();
        } catch (error) {

        }

    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:3500/Hardware", {
                data: {
                    rfid: user.rfid
                },
            });

            console.log("Lecture deleted successfully:", response.data);
            //   alert("Lec Deleted Succesfully");
            toast.loading("Lec Deleted Successfully")
            window.location.reload();
            toast.dismiss();
        } catch (error) {
            console.error("Error deleting lecture:", error);
            alert("No Lec Set To Delete");
        }
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

    console.log("user info rfid ", user.rfid);

    if (user.role === 'teacher') {
        if (!LecDetails) {
            console.log("No lec");
            return (
                <form onSubmit={setlec} className="mt-8">
                    {/* Subject */}
                    <div className="mb-4">
                        <label className="block" htmlFor="name">Subject :</label>
                        <input
                            type="text"
                            placeholder="Add a subject"
                            value={Subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    {/* Pick Date */}
                    <div className="mb-4">
                        <label className="block" htmlFor="name">Pick Date :</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 0)}
                            className="border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    {/* Lec Start Time */}
                    <div className="mb-4">
                        <label className="block" htmlFor="name">Lec Start Time :</label>
                        <DatePicker
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
                        />
                    </div>
                    {/* Lec End Time */}
                    <div className="mb-4">
                        <label className="block" htmlFor="name">Lec End Time :</label>
                        <DatePicker
                            selected={endtime}
                            onChange={(date) => setEndtime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            minTime={starttime}
                            maxTime={setHours(setMinutes(new Date(), 30), 18)}
                            className="border border-gray-300 rounded px-4 py-2"
                            required
                        />
                    </div>
                    {/* Year */}
                    <div className="mb-4">
                        <label className="block" htmlFor="name">For Which Year :</label>
                        <select
                            className="mb-4 block h-10 "
                            id="Year"
                            value={Year}
                            onChange={handleYearChange}
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="1st">First</option>
                            <option value="2nd">Second</option>
                            <option value="3rd">Third</option>
                        </select>
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </form>
            );
        } else if (user.rfid === LecDetails.rfidno) {
            console.log("lec and owned by tea");
            return (
                <div class="w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                    <table class="w-full">
                        <tbody>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">name</th>
                                <td class="px-4 py-2">{LecDetails.Teacher}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Subject</th>
                                <td class="px-4 py-2">{LecDetails.Subject}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">ClassRoom</th>
                                <td class="px-4 py-2">{LecDetails.Venue}</td>
                            </tr>
                            {/* <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Lec Date</th>
                                <td class="px-4 py-2">{convertToIST12HourFormatWithDate(LecDetails.Lecdate)}</td>
                            </tr> */}
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Start Time</th>
                                <td class="px-4 py-2">{convertToIST12HourFormatWithDate(LecDetails.LectureStartTime)}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">End Time</th>
                                <td class="px-4 py-2">{convertToIST12HourFormatWithDate(LecDetails.LectureEndTime)}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">For </th>
                                <td class="px-4 py-2">{LecDetails.Year} Year</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={handleDelete} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                </div>

            );
        } else {
            console.log("Lec setted and not own my tea");
            return (
                <div class="w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                    <table class="w-full">
                        <tbody>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">name</th>
                                <td class="px-4 py-2">{LecDetails.Teacher}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Subject</th>
                                <td class="px-4 py-2">{LecDetails.Subject}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">ClassRoom</th>
                                <td class="px-4 py-2">{LecDetails.Venue}</td>
                            </tr>
                            {/* <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Lec Date</th>
                                <td class="px-4 py-2">{LecDetails.Lecdate}</td>
                            </tr> */}
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Start Time</th>
                                {/* <td class="px-4 py-2">{LecDetails.LectureStartTime}</td> */}
                                <td class="px-4 py-2">{convertToIST12HourFormatWithDate(LecDetails.LectureStartTime)}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">End Time</th>
                                {/* <td class="px-4 py-2">{LecDetails.LectureEndTime}</td> */}
                                <td class="px-4 py-2">{convertToIST12HourFormatWithDate(LecDetails.LectureEndTime)}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">For </th>
                                <td class="px-4 py-2">{LecDetails.Year} Year</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    } else if (user.role === 'student') {
        if (!LecDetails) {
            return (
                <div>No Lec currently there in Classroom by any teacher</div>
            );
        } else {
            return (
                <div class="w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                    <table class="w-full">
                        <tbody>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">name</th>
                                <td class="px-4 py-2">{LecDetails.Teacher}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Subject</th>
                                <td class="px-4 py-2">{LecDetails.Subject}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">ClassRoom</th>
                                <td class="px-4 py-2">{LecDetails.Venue}</td>
                            </tr>
                            {/* <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Lec Date</th>
                                <td class="px-4 py-2">{LecDetails.Lecdate}</td>
                            </tr> */}
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">Start Time</th>
                                {/* <td class="px-4 py-2">{LecDetails.LectureStartTime}</td> */}
                                <td class="px-4 py-2">{convertToIST12HourFormatWithDate(LecDetails.LectureStartTime)}</td>

                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">End Time</th>
                                {/* <td class="px-4 py-2">{LecDetails.LectureEndTime}</td> */}
                                <td class="px-4 py-2">{convertToIST12HourFormatWithDate(LecDetails.LectureEndTime)}</td>
                            </tr>
                            <tr class="border-t-[1px] border-slate-400 last:border-b-0">
                                <th class="bg-slate-900 p-2 text-base capitalize text-slate-100">For </th>
                                <td class="px-4 py-2">{LecDetails.Year} Year</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

    }
};

export default Lecture;
