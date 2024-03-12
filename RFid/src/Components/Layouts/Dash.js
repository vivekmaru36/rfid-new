import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiBooks, PiUser, PiStudent } from "react-icons/pi";
import { useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import { FaHistory, FaUsers } from "react-icons/fa";

const Dash = () => {
  const { user } = useContext(UserContext);
  // console.log("This is dahs",user);

 

  if (user.role === "teacher") {
    return (
      <main className="self-center">
        <h2 className="m-6 mx-auto text-center text-6xl font-bold dark:text-slate-400">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./lec"}
          >
            <GiBookshelf className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              LecDetails
              <p className="text-sm font-normal lg:text-base ">
                View Lec
              </p>
            </div>
          </Link>

          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./AllStudents"}
          >
            {/* <IoCalendarOutline className="text-[2.5rem] lg:text-[4rem] " /> */}
            <FaUsers className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
                  All Students in Your Course
              <p className="text-sm font-normal lg:text-base ">
                
              </p>
            </div>
          </Link>

          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./RecentRecords"}
          >
            <FaHistory className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              RecentRecords
              <p className="text-sm font-normal lg:text-base ">
                Last Location For Rfid Swipe
              </p>
            </div>
          </Link>


          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./time_schedulestu"}
          >
            <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Time Schedule
              <p className="text-sm font-normal lg:text-base ">
                View Time Schedule
              </p>
            </div>
          </Link>

          

          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./profile"}
          >
            <PiUser className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Profile
              <p className="text-sm font-normal lg:text-base ">
                View Profile
              </p>
            </div>
          </Link>
          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./Lectures_History"}
          >
            <PiBooks className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Lectures History
              <p className="text-sm font-normal lg:text-base ">
                All Lectures History
              </p>
            </div>
          </Link>

          {/* only aditya sir for now can add time schedule */}
          {user.rfid === "3424265225" && (
          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./time_schedule"}
          >
            {/* <PiBooks className="text-[2.5rem] lg:text-[4rem] " /> */}
            <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Set Time Schedule
              <p className="text-sm font-normal lg:text-base ">
              </p>
            </div>
          </Link>
        )}
        </div>
      </main>
    );
  } else if (user.role === "student") {
    return (

      <main className="self-center">
      <h2 className="m-6 mx-auto text-center text-6xl font-bold dark:text-slate-400">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./lec"}
        >
          <GiBookshelf className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            LecDetails
            <p className="text-sm font-normal lg:text-base ">
              View Lec
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./attendance"}
          >
          <IoCalendarOutline className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Attendance
            
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./time_schedulestu"}
          >
          <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Time Schedule
            <p className="text-sm font-normal lg:text-base ">
              View
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./RecentRecords"}
          >
          <FaHistory className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            RecentRecords
            <p className="text-sm font-normal lg:text-base ">
              Last Location For Rfid Swipe
            </p>
          </div>
        </Link>

        
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./profile"}
          >
          <PiStudent className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Profile
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Profile
            </p>
          </div>
        </Link>
        {/* <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./Attendace_Summary"}
            >
            <PiBooks className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Attendance Summary
              <p className="text-sm font-normal lg:text-base ">
              </p>
            </div>
          </Link> */}
      </div>
    </main>
  );
  }

  else if (user.role === "admin") {
    return (

      <main className="self-center">
      <h2 className="m-6 mx-auto text-center text-6xl font-bold dark:text-slate-400">
        Dashboard Admin
      </h2>
      <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./Students"}
        >
          <GiBookshelf className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Students
            <p className="text-sm font-normal lg:text-base ">
              Add or Delete Students
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./Teachers"}
          >
          <IoCalendarOutline className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Add or Delete Teachers 
            
          </div>
        </Link>
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./View_Students"}
          >
          <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            View Students
            <p className="text-sm font-normal lg:text-base ">
              View
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./View_Teachers"}
          >
          <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            View Teachers
            <p className="text-sm font-normal lg:text-base ">
              View
            </p>
          </div>
        </Link>

        <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./time_schedule"}
          >
            {/* <PiBooks className="text-[2.5rem] lg:text-[4rem] " /> */}
            <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Set Time Schedule
              <p className="text-sm font-normal lg:text-base ">
              </p>
            </div>
          </Link>

          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./AssignLec"}
          >
            {/* <PiBooks className="text-[2.5rem] lg:text-[4rem] " /> */}
            <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Assign Lectures
              <p className="text-sm font-normal lg:text-base ">
              </p>
            </div>
          </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./time_schedulestu"}
          >
          <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Time Schedule
            <p className="text-sm font-normal lg:text-base ">
              View
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./RecentRecords"}
          >
          <FaHistory className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            RecentRecords
            <p className="text-sm font-normal lg:text-base ">
              Last Location For Rfid Swipe
            </p>
          </div>
        </Link>

        
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./profile"}
          >
          <PiStudent className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Profile
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Profile
            </p>
          </div>
        </Link>
        {/* <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./Attendace_Summary"}
            >
            <PiBooks className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Attendance Summary
              <p className="text-sm font-normal lg:text-base ">
              </p>
            </div>
          </Link> */}
      </div>
    </main>
  );
  }
  
  






  // the big gap

};

export default Dash;
