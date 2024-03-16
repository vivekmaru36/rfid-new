import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";

const TimeScheduleFormstu = () => {
    const [timeSchedule, setTimeSchedule] = useState({});
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);
    const { user } = useContext(UserContext);

    const [selectedSubjects, setSelectedSubjects] = useState({});
    const [selectedTeachers, setSelectedTeachers] = useState({});
    const [selectedVenue, setSelectedVenue] = useState({});
    

    const [Week , setWeek]=useState('');
    const Venue = [
        "Hardware Lab",
        "CS Lab",
        "1 Law"
    ];

    // const [id, setId] = useState("");
    const [Teachers, setTeachers] = useState([]);

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
                // console.log(Teachers)

                // setLoading(false);
            } catch (error) {
                console.error("Error fetching Teachers:", error);
                // setLoading(false);
            }
        };

        fetchTeachers();
    }, []);


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

    useEffect(() => {
        const fetchTimeSchedule = async () => {
            try {
                // fetching time schedule record
                const response = await axios.get("time_schedule/View_Time_Schedule");
                // saving record id for updating/deleting record


                const { schedule } = response.data;
                // setscheduleYesOrNo(true);

                setSelectedSubjects(schedule.monday || {});
                setSelectedTeachers(schedule.monday || {});
                setSelectedVenue(schedule.monday || {});
                // delete response.data.schedule._id;
                setTimeSchedule(response.data.schedule);
                setWeek(response.data.Week);
            } catch (err) {
                // incase the record doesn't exist
                if (err?.response?.status === 404) {
                    setDisabled(false);

                    setTimeSchedule({
                        monday: { 0: { teacher: '', subject: '', venue: '' }, 1: { teacher: '', subject: '', venue: '' }, 2: { teacher: '', subject: '', venue: '' }, 3: { teacher: '', subject: '', venue: '' }, 4: { teacher: '', subject: '', venue: '' }, },
                        tuesday: { 0: { teacher: '', subject: '', venue: '' }, 1: { teacher: '', subject: '', venue: '' }, 2: { teacher: '', subject: '', venue: '' }, 3: { teacher: '', subject: '', venue: '' }, 4: { teacher: '', subject: '', venue: '' }, },
                        wednesday: { 0: { teacher: '', subject: '', venue: '' }, 1: { teacher: '', subject: '', venue: '' }, 2: { teacher: '', subject: '', venue: '' }, 3: { teacher: '', subject: '', venue: '' }, 4: { teacher: '', subject: '', venue: '' }, },
                        thursday: { 0: { teacher: '', subject: '', venue: '' }, 1: { teacher: '', subject: '', venue: '' }, 2: { teacher: '', subject: '', venue: '' }, 3: { teacher: '', subject: '', venue: '' }, 4: { teacher: '', subject: '', venue: '' }, },
                        friday: { 0: { teacher: '', subject: '', venue: '' }, 1: { teacher: '', subject: '', venue: '' }, 2: { teacher: '', subject: '', venue: '' }, 3: { teacher: '', subject: '', venue: '' }, 4: { teacher: '', subject: '', venue: '' }, },
                    });

                } else setError(err);
            }
        };
        fetchTimeSchedule();
    }, [user])

    // Function to render the time schedule table
    const RenderTimeScheduleTable = () => {
        // Check if time schedule data is available
        if (Object.keys(timeSchedule).length === 0) {
            return <Loading />;
        }
        console.log(timeSchedule);
        

        const subjects = [
            "Programming Fundamentals",
            "Data Structures and Algorithms",
            "Computer Architecture",
            "Operating Systems",
            "Database Management Systems",
            "Software Engineering",
            "Networking",
            "Web Development",
            "Cybersecurity",
            "Artificial Intelligence",
            "Machine Learning",
            "Computer Graphics",
            "Human-Computer Interaction",
            "Parallel and Distributed Computing",
            "Mobile Application Development",
            "Cloud Computing",
            "Big Data Analytics",
            "Computer Vision",
            "Natural Language Processing",
            "Information Retrieval"
        ];


        return (
            <form>
                {timeSchedule.monday ? (
                    <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                        <table className=" w-full text-center">
                            <TableHeader
                                AdditionalHeaderClasses={"h-[3rem]"}
                                Headers={["Day/Hour", "8:00-8:40", "9:00-9:40", "10:00 - 10:40", "11:00 - 11:40", "12:00 - 12:40"]}
                            />
                            <tbody>
                                {Object.entries(timeSchedule)?.map(([day, schedule]) => (
                                    <tr key={day}>
                                        <th className="border-none bg-slate-900 px-4 py-4 text-base capitalize text-slate-100">
                                            {day}
                                        </th>
                                        {Array.from({ length: 5 }, (_, index) => index).map((hour) => {
                                            const scheduleEntry = schedule[hour.toString()];
                                            return (
                                                <td
                                                    className="min-w-[180px] border-l-[1px] border-t-[1px] border-slate-400 p-1 first:border-none"
                                                    key={hour}
                                                >
                                                    <select
                                                        className="select-img h-[3rem] w-full appearance-none text-center leading-6 focus:border-0 disabled:opacity-100"
                                                        value={scheduleEntry?.teacher || ""}
                                                        name={day}
                                                        id={hour}
                                                        disabled={disabled}
                                                    // onChange={(e) => handleTeacher(e)}
                                                    >
                                                        <option defaultValue>Assign Teacher</option>
                                                        {Teachers.filter((teacher) => teacher.Year === '1st').map((teacher) => (
                                                            <option key={teacher._id} value={teacher.name}>
                                                                {teacher.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <select
                                                        className="select-img h-[3rem] w-full appearance-none text-center leading-6 focus:border-0 disabled:opacity-100"
                                                        value={scheduleEntry?.subject || ""}
                                                        name={day}
                                                        id={hour}
                                                        disabled={disabled}
                                                    // onChange={(e) => handleFormChange(e)}
                                                    >
                                                        <option defaultValue>--</option>
                                                        {subjects.map((subject, index) => (
                                                            <option key={index} value={subject}>
                                                                {subject}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <select
                                                        className="select-img h-[3rem] w-full appearance-none text-center leading-6 focus:border-0 disabled:opacity-100"
                                                        value={scheduleEntry?.venue || ""}
                                                        name={day}
                                                        id={hour}
                                                        disabled={disabled}
                                                    // onChange={(e) => handleVenue(e)}
                                                    >
                                                        <option defaultValue>Select Venue</option>
                                                        {Venue.map((venue, index) => (
                                                            <option key={index} value={venue}>
                                                                {venue}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <br />
                        <br />
                        <div className="mb-4">

                            <label className="block font-bold" htmlFor="name">Week : </label>
                            {/* <p>{mondaysAndFridays.length > 0 ? `${mondaysAndFridays[0].monday} - ${mondaysAndFridays[0].friday}` : 'No data available'}</p> */}
                            <p>{Week}</p>
                            {/* <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 3)}
                            className="border border-gray-300 rounded px-4 py-2"
                        /> */}
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </form>

        );
    };


    return (
        <main className="time_schedule">
            <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                Time Schedule
            </h2>
            {RenderTimeScheduleTable()}
            {error && <ErrorStrip error={error} />}
        </main>
    );
};

export default TimeScheduleFormstu;
