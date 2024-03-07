import { useState, useContext, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const TimeScheduleFormstu = () => {
  const { user } = useContext(UserContext);
  const [timeSchedule, setTimeSchedule] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  // updating attendance state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it WORKS.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const day = e.target.name;
    const value = e.target.value;
    const newDay = timeSchedule[day].map((val, ind) => {
      if (ind === index) {
        return value;
      } else return val;
    });
    setTimeSchedule({
      ...timeSchedule,
      [e.target.name]: newDay,
    });
  };

  useEffect(() => {
    const fetchTimeSchedule = async () => {
      try {
        // fetching time schedule record
        const response = await axios.get("time_schedule/" + user._id);
        // saving record id for updating/deleting record
        setId(response.data._id);
        delete response.data.schedule._id;
        setTimeSchedule(response.data.schedule);
      } catch (err) {
        // incase the record doesn't exist
        if (err?.response?.status === 404) {
          setDisabled(false);
          setTimeSchedule({
            monday: ["--", "--", "--", "--", "--"],
            tuesday: ["--", "--", "--", "--", "--"],
            wednesday: ["--", "--", "--", "--", "--"],
            thursday: ["--", "--", "--", "--", "--"],
            friday: ["--", "--", "--", "--", "--"],
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
      teacher: user._id,
      schedule: timeSchedule,
    };
    try {
      // adding a new time schedule record
      const response = await axios.post("time_schedule/" + user._id, data);
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

  return (
    <main className="time_schedule">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        View Time Schedule
      </h2>
 
    </main>
  );
};

export default TimeScheduleFormstu;
