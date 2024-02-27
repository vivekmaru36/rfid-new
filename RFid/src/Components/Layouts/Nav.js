import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiStudent, PiUser, PiBooks } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";

const Nav = () => {
  const { user } = useContext(UserContext);
  // console.log(user.role);
  return (
    <nav
      id="nav"
      className="z-0 hidden h-full flex-col justify-stretch bg-slate-950 px-4 py-4 text-slate-100 dark:bg-gradient-to-b dark:from-slate-950 dark:from-65% dark:to-violet-950/60 dark:to-95% lg:flex "
    >
      <ul className="m-auto flex flex-grow flex-col items-center justify-start gap-[6px]">
        <NavLink to={"./lec"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <GiBookshelf className="pt-[0.1rem] text-2xl  " />
            LecDetails
          </li>
        </NavLink>
        <NavLink to={"./attendance"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <IoCalendarOutline className="pt-[0.1rem] text-2xl  " />
            Attendance
          </li>
        </NavLink>
        <NavLink to={"./time_schedule"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <AiOutlineSchedule className="pt-[0.1rem] text-2xl  " />
            Time Schedule
          </li>
        </NavLink>
        {user.role === "teacher" && (
          <NavLink to={"./RecentRecords"} className="w-full font-medium">
            <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
              <FaHistory className="pt-[0.1rem] text-2xl  " />
              Recent Records
            </li>
          </NavLink>
        )}
        {user.role === "student" && (
          <NavLink to={"./RecentRecords"} className="w-full font-medium">
            <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
              <FaHistory className="pt-[0.1rem] text-2xl  " />
              Recent Records
            </li>
          </NavLink>
        )}
        
      </ul>
      <ul className="flex flex-grow flex-col items-start justify-end gap-[6px]">
        <NavLink to={"./profile"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            {user.role === "student" ? (
              <PiStudent className="pt-[0.1rem] text-2xl" />
            ) : (
              <PiUser className="pt-[0.1rem] text-2xl" />
            )}
            {user.name}
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
