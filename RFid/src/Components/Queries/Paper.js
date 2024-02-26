import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setHours, setMinutes } from 'date-fns';



const Paper = () => {
  const { setPaper, paperList } = useContext(UserContext);
  const { user } = React.useContext(UserContext);
  // console.log(user.role);

  // pick Date
  const [startDate, setStartDate] = useState(new Date());

  // pick stime 
  const [starttime, setStarttime] = useState(new Date());

  // pick etime 
  const [endtime, setEndtime] = useState(starttime);

  // Update minTime for endtime based on selected starttime
  const handleStarttimeChange = (date) => {
    setStarttime(date);
    // Update endtime to prevent setting it before starttime
    setEndtime(date);
  };

  // current hour and minute
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const [LecDetails, setLecDetails] = useState({
    Teacher: "",
    course: "",
    rfid: "",
    Subject: "",
    LectureStartTime: "",
    LectureEndTime: "",
  });

  // pick subject
  const [Subject, setSubject] = useState('');

  if (user.role === 'teacher') {
    return (
      <form className="mt-8">
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
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>


    )
  } else if (user.role === 'student') {
    return (
      <div>Student</div>
    )
  }
  return (
    <main className="paper">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Papers
      </h2>
      {paperList.length ? (
        <section className="pt-4">
          {paperList.map((paper, index) => (
            <Link to={paper.paper} key={index} onClick={() => setPaper(paper)}>
              <article className="mb-4 flex items-center whitespace-break-spaces rounded-md border-2 border-slate-900 bg-violet-200 p-2 hover:bg-violet-950 hover:text-slate-100 dark:border-slate-200 dark:bg-slate-950/5 dark:hover:border-slate-200 dark:hover:bg-slate-950/80 lg:p-4 ">
                <AiFillBook className="text-[3rem] lg:text-[4rem]" />
                <div className="">
                  <h3 className="px-1 text-xl font-semibold lg:px-2 lg:text-2xl">
                    {paper.paper}
                  </h3>
                  <hr className="border-[1px]" />
                  <p className="px-2 text-sm font-medium lg:text-base ">
                    {paper.year}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <p className="text-lg">No Papers Found.</p>
      )}
    </main>
  );
};

export default Paper;
