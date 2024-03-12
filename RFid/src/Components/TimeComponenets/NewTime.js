import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function MinMaxDemo() {
    const [date, setDate] = useState(null);

    // Get current date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    
    // Find the last day of the current week (Sunday)
    const lastDayOfWeek = new Date(currentYear, currentMonth, currentDate + (7 - today.getDay()));

    // Set minDate to today's date
    const minDate = today;

    // Set maxDate to the last day of the current week
    const maxDate = lastDayOfWeek;

    return (
        <div className="card flex justify-content-center">
            <Calendar 
                value={date} 
                onChange={(e) => setDate(e.value)} 
                minDate={minDate} 
                maxDate={maxDate} 
                readOnlyInput 
                required
            />
        </div>
    )
}
