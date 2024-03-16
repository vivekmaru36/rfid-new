import { useState, useContext, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';

const AdminSetTimeSchedule = () => {
    const { user } = useContext(UserContext);
    const [timeSchedule, setTimeSchedule] = useState({});

    const [disabled, setDisabled] = useState(true);
    const [id, setId] = useState("");
    const [error, setError] = useState("");

    const [Teachers, setTeachers] = useState([]);

    const [selectedSubjects, setSelectedSubjects] = useState({});
    const [selectedTeachers, setSelectedTeachers] = useState({});
    const [selectedVenue, setSelectedVenue] = useState({});

    // const [combinedData, setCombinedData] = useState({}); // New state variable



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




    const Venue = [
        "Hardware Lab",
        "CS Lab",
        "1 Law"
    ];

    // updating attendance state on "onChange" event.
    // const handleFormChange = (e) => {
    //     // the whole thing is a convoluted mess, but it WORKS.
    //     // if you have an alternative, DM ;).
    //     const index = parseInt(e.target.id);
    //     const day = e.target.name;
    //     const value = e.target.value;
    //     const newDay = timeSchedule[day].map((val, ind) => {
    //         if (ind === index) {
    //             return value;
    //         } else return val;
    //     });
    //     setTimeSchedule({
    //         ...timeSchedule,
    //         [e.target.name]: newDay,
    //     });
    // };

    const handleFormChange = (e) => {
        const day = e.target.name;
        const index = parseInt(e.target.id);
        const value = e.target.value;
        const updatedSelectedSubjects = { ...selectedSubjects };
        updatedSelectedSubjects[`${day}-${index}`] = value;
        setSelectedSubjects(updatedSelectedSubjects);
        console.log("Subject : ", selectedSubjects)
    };

    const handleTeacher = (e) => {
        const day = e.target.name;
        const index = parseInt(e.target.id);
        const value = e.target.value;
        const updatedSelectedTeachers = { ...selectedTeachers };
        updatedSelectedTeachers[`${day}-${index}`] = value;
        setSelectedTeachers(updatedSelectedTeachers);
        console.log("Teacher : ", selectedTeachers)
    };


    const handleVenue = (e) => {
        const day = e.target.name;
        const index = parseInt(e.target.id);
        const value = e.target.value;
        const updatedSelectedVenue = { ...selectedVenue };
        updatedSelectedVenue[`${day}-${index}`] = value;
        setSelectedVenue(updatedSelectedVenue);
        console.log("Venue : ", selectedVenue)
    };

    const [scheduleYesOrNo, setscheduleYesOrNo] = useState(false);

    useEffect(() => {
        const fetchTimeSchedule = async () => {
            try {
                // fetching time schedule record
                const response = await axios.get("time_schedule/" + user._id);
                // saving record id for updating/deleting record
                setId(response.data._id);

                const { schedule } = response.data;
                setscheduleYesOrNo(true);

                setSelectedSubjects(schedule.monday || {});
                setSelectedTeachers(schedule.monday || {});
                setSelectedVenue(schedule.monday || {});
                // delete response.data.schedule._id;
                setTimeSchedule(response.data.schedule);
            } catch (err) {
                // incase the record doesn't exist
                if (err?.response?.status === 404) {
                    setDisabled(false);
                    // setTimeSchedule({
                    //     monday: {"--", "--", "--", "--", "--"},
                    //     tuesday: {"--", "--", "--", "--", "--"},
                    //     wednesday: {"--", "--", "--", "--", "--"},
                    //     thursday: {"--", "--", "--", "--", "--"},
                    //     friday: {"--", "--", "--", "--", "--"},
                    // });
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
    }, [user]);

    const addTimeSchedule = async (e) => {
        e.preventDefault();
        const data = {
            //TODO change Schema to user.
            // admin: user._id,
            schedule: combinedDatas,
            // Include the picked date
        };
        try {
            // adding a new time schedule record
            const response = await axios.post("time_schedule/add", {
                admin: user._id,
                // admin :"snjnsn",
                data: data,
                Week: dateRange,
                Year: currentYear
            });
            toast.success(response.data.message);
        } catch (err) {
            // conflict, record already exists
            if (err.response.status === 409) {
                // updating existing record
                const response = await axios.patch("time_schedule/" + user._id, data);
                toast.success(response.data.message);
            } else setError(err);
        } finally {
            setDisabled(true);
        }
    };

    const deleteTimeSchedule = async (e) => {
        e.preventDefault();
        const response = await axios.delete("time_schedule/" + id);
        toast.success(response.data.message, {
            icon: ({ theme, type }) => <FaTrash />,
        });
        setTimeSchedule({
            monday: ["--", "--", "--", "--", "--"],
            tuesday: ["--", "--", "--", "--", "--"],
            wednesday: ["--", "--", "--", "--", "--"],
            thursday: ["--", "--", "--", "--", "--"],
            friday: ["--", "--", "--", "--", "--"],
        });
    };

    // pick Date
    const [startDate, setStartDate] = useState(new Date());

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


    function getMondaysAndFridaysOfMonth(month, year) {
        const result = [];
        const currentDay = new Date(); // Current date
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);
        let currentDate = firstDayOfMonth;

        while (currentDate <= lastDayOfMonth) {
            if (currentDate.getDay() === 1) {
                const monday = new Date(currentDate);
                const friday = new Date(monday);
                friday.setDate(monday.getDate() + 4);

                // Check if the Friday is in the future relative to the current date
                if (friday >= currentDay) {
                    result.push({ monday, friday });
                }
                currentDate.setDate(currentDate.getDate() + 7);
            } else {
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        return result.map(({ monday, friday }) => ({
            monday: formatISTDate(monday),
            friday: formatISTDate(friday)
        }));
    }


    function formatISTDate(date) {
        const options = { timeZone: 'Asia/Kolkata', weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleString('en-IN', options);
    }
    // console.log(user)
    // Example usage:
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const mondaysAndFridays = getMondaysAndFridaysOfMonth(currentMonth, currentYear);
    // console.log(mondaysAndFridays);

    const dateRange = mondaysAndFridays.length > 0 ? `${mondaysAndFridays[0].monday} - ${mondaysAndFridays[0].friday}` : 'No data available';

    console.log(dateRange);

    const [combinedDatas, setCombinedData] = useState();

    useEffect(() => {
        const combinedData = {};

        // Iterate over the selected subjects, teachers, and venues
        Object.keys(selectedTeachers).forEach(key => {
            // Extract the day and index from the key
            const [dayIndex, timeIndex] = key.split('-');

            // Ensure the day exists in the combinedData object
            if (!combinedData[dayIndex]) {
                combinedData[dayIndex] = {};
            }

            // Ensure the timeIndex exists in the combinedData object for the current day
            if (!combinedData[dayIndex][timeIndex]) {
                combinedData[dayIndex][timeIndex] = {};
            }

            // Assign the subject, teacher, and venue to the combinedData object
            combinedData[dayIndex][timeIndex] = {
                venue: selectedVenue[key],
                teacher: selectedTeachers[key],
                subject: selectedSubjects[key]
            };
        });

        console.log("this is inside", combinedData);

        setCombinedData(combinedData);

        console.log("This is outside", combinedDatas);

    }, [selectedSubjects, selectedTeachers, selectedVenue]);

    console.log(timeSchedule)


    if (scheduleYesOrNo) {
        return (
            <main className="time_schedule">
                <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                    Time Schedule For First Year
                </h2>
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
                                                            onChange={(e) => handleTeacher(e)}
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
                                                            onChange={(e) => handleFormChange(e)}
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
                                                            onChange={(e) => handleVenue(e)}
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
                                <p>{dateRange}</p>
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

                    {timeSchedule.monday && disabled && (
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                                onClick={() => setDisabled(false)}
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                type="submit"
                                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-red-700 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-red-700"
                                onClick={(e) => deleteTimeSchedule(e)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    )}
                    {!disabled && (
                        <button
                            type="submit"
                            className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                            onClick={(e) => addTimeSchedule(e)}
                        >
                            <FaPlus /> Save
                        </button>
                    )}
                </form>
                {error ? <ErrorStrip error={error} /> : ""}
            </main>
        );
    }else {
        return (
            <main className="time_schedule">
                <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                    Time Schedule For First Year
                </h2>
                <form>
                    {timeSchedule.monday ? (
                        <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                            <table className=" w-full text-center">
                                <TableHeader
                                    AdditionalHeaderClasses={"h-[3rem]"}
                                    Headers={["Day/Hour", "8:00-8:40", "9:00-9:40", "10:00 - 10:40", "11:00 - 11:40", "12:00 - 12:40"]}
                                />
                                <tbody>
                                    {Object.entries(timeSchedule)?.map(([key, value]) => {
                                        return (
                                            <tr key={key}>
                                                <th className="border-none bg-slate-900 px-4 py-4 text-base capitalize text-slate-100">
                                                    {key} s
                                                </th>
                                                {/* {value.map((day, index) => ( */}
                                                {Object.entries(value)?.map(([index, value]) => (
                                                    <td
                                                        className="min-w-[180px] border-l-[1px]  border-t-[1px] border-slate-400 p-1 first:border-none"
                                                        id="table__td"
                                                        key={index}
                                                    >

                                                        <select
                                                            className="select-img h-[3rem] w-full appearance-none text-center leading-6 focus:border-0 disabled:opacity-100"
                                                            // value={day}
                                                            value={selectedTeachers[`${key}-${index}`] || ""}
                                                            // value={timeSchedule.monday[0].teacher}
                                                            name={key}
                                                            id={index}
                                                            // id={${key}-${index}-teacher}
                                                            disabled={disabled}
                                                            onChange={(e) => handleTeacher(e)
                                                                // onChange={(e) => handleFormChange(e)
                                                            }
                                                        >
                                                            <option defaultValue>Assign Teacher</option>
                                                            {Teachers.filter(teacher => teacher.Year === '1st').map((teacher) => (
                                                                <option key={teacher._id} value={teacher.name}>
                                                                    {teacher.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <select
                                                            className="select-img h-[3rem] w-full appearance-none text-center leading-6 focus:border-0 disabled:opacity-100"
                                                            // value={day}
                                                            value={selectedSubjects[`${key}-${index}`] || ""}
                                                            name={key}
                                                            id={index}
                                                            disabled={disabled}
                                                            onChange={(e) => handleFormChange(e)}
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
                                                            // value={day}
                                                            value={selectedVenue[`${key}-${index}`] || ""}
                                                            name={key}
                                                            id={index}
                                                            // id={${key}-${index}-teacher}
                                                            disabled={disabled}
                                                            onChange={(e) => handleVenue(e)
                                                                // onChange={(e) => handleFormChange(e)
                                                            }
                                                        >
                                                            <option defaultValue>Select Venue</option>
                                                            {Venue.map((venue, index) => (
                                                                <option key={index} value={venue}>
                                                                    {venue}
                                                                </option>
                                                            ))}

                                                        </select>
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <br />
                            <br />
                            <div className="mb-4">

                                <label className="block font-bold" htmlFor="name">Week : </label>
                                {/* <p>{mondaysAndFridays.length > 0 ? `${mondaysAndFridays[0].monday} - ${mondaysAndFridays[0].friday}` : 'No data available'}</p> */}
                                <p>{dateRange}</p>
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

                    {timeSchedule.monday && disabled && (
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                                onClick={() => setDisabled(false)}
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                type="submit"
                                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-red-700 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-red-700"
                                onClick={(e) => deleteTimeSchedule(e)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    )}
                    {!disabled && (
                        <button
                            type="submit"
                            className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                            onClick={(e) => addTimeSchedule(e)}
                        >
                            <FaPlus /> Save
                        </button>
                    )}
                </form>
                {error ? <ErrorStrip error={error} /> : ""}
            </main>
        );
    }



};

export default AdminSetTimeSchedule;
