import React, { useState, useEffect } from "react";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const TimeScheduleFormstu = () => {
    const [timeSchedule, setTimeSchedule] = useState({});
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);

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
                // Fetch time schedule data
                const response = await axios.get("time_schedule/View_Time_Schedule");
                // Set the fetched data to state
                setTimeSchedule(response.data);
            } catch (err) {
                // Handle errors
                setError(err.message);
            }
        };
        fetchTimeSchedule();
    }, []);

    // Function to render the time schedule table
    const renderTimeScheduleTable = () => {
        // Check if time schedule data is available
        if (Object.keys(timeSchedule).length === 0) {
            return <Loading />;
        }

        return (
            <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                <table className="w-full text-center">
                    <tbody>
                        {Object.entries(timeSchedule.schedule).map(([day, subjects], index) => (
                            <tr key={index}>
                                <th className="border-none bg-slate-900 px-4 py-4 text-base capitalize text-slate-100">
                                    {day}
                                </th>
                                {Array.isArray(subjects) ? (
                                    subjects.map((subject, subIndex) => (
                                        <td
                                            key={subIndex}
                                            className="min-w-[180px] border-l-[1px] border-t-[1px] border-slate-400 p-1 first:border-none"
                                        >
                                            {subject}
                                        </td>
                                    ))
                                ) : (
                                    <td className="min-w-[180px] border-l-[1px] border-t-[1px] border-slate-400 p-1 first:border-none">
                                        {subjects}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                    <p>{convertToIST12HourFormatWithDate(timeSchedule.sdate)}</p>
                </table>
            </div>
        );
    };


    return (
        <main className="time_schedule">
            <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                Time Schedule
            </h2>
            {renderTimeScheduleTable()}
            {error && <ErrorStrip error={error} />}
        </main>
    );
};

export default TimeScheduleFormstu;
