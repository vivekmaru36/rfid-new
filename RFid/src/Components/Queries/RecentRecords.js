import React from "react";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { useEffect } from "react";

import { useState } from "react";
import { toast } from "react-toastify";

const RecentInternalStudent = () => {

    const { user } = React.useContext(UserContext);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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


    const fetchRecords = async () => {
        setLoading(true);
        setError(null);
        try {
            // toast.loading("Fetching");
            const response = await axios.post('http://localhost:3500/RecentRecords', { rfid: user.rfid });
            // toast.dismiss();
            setRecords(response.data.document);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    useEffect(() => {
        console.log(records); // Log records here
    }, [records]);

    return (
        <main className="internal">
            <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                Recent Records Student
            </h2>
            <button
                className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                type="submit"
                onClick={fetchRecords}
            >
                Fetch
            </button>

            {records.length > 0 ? (
                <div>
                    {records.map((record, index) => (
                        <div key={index}>
                            <ul>
                                <li>Place : {record.Venue}</li>
                                <li>Rfid Swipped at Time : {convertToIST12HourFormatWithDate(record.currentTime)}</li>
                            </ul>
                            <br /> 
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recent Records To Display</p>
            )}
        </main>
    );
};

export default RecentInternalStudent;
