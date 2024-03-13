import React, { useState, useContext, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import ErrorStrip from "../ErrorStrip";

const AdminRecentRecords = () => {
    const { user } = React.useContext(UserContext);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            const response = await axios.post('http://localhost:3500/RecentRecords/AdminRecent', { rfid: user.role });
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

    return (
        <main className="internal">
            <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                Recent Records Admin
            </h2>
            <button
                className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                type="submit"
                onClick={fetchRecords}
            >
                Fetch
            </button>

            {loading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <ErrorStrip className="error" error={error} />
            ) : records.length > 0 ? (
                <div className="students-container">
                    {Object.entries(records.reduce((acc, record) => {
                        if (!acc[record.Venue]) {
                            acc[record.Venue] = [];
                        }
                        acc[record.Venue].push(record);
                        return acc;
                    }, {})).map(([venue, venueRecords]) => (
                        <div key={venue} className="year-container">
                            <h3 className="font-bold">{venue}</h3>
                            <table className="student-table">
                                <thead>
                                    <tr>
                                        <th className="border">Name</th>
                                        <th className="border">Role</th>
                                        <th className="border">Rfid Swiped at Time</th>
                                        <th className="border">Rfid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venueRecords.sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime)).map((record, index) => (
                                        <tr key={index} className="year-container">
                                            <td className="border border-gray-500">{record.details.name}</td>
                                            <td className="border border-gray-500">{record.foundInCollection}</td>
                                            <td className="border border-gray-500">{convertToIST12HourFormatWithDate(record.currentTime)}</td>
                                            <td className="border border-gray-500">{record.details.rfid}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-records">No recent Records To Display</p>
            )}
        </main>
    );
};

export default AdminRecentRecords;
