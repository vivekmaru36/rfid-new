import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import React from "react";


// context
import { UserProvider } from "./Hooks/UserContext";

// components
import Loading from "./Components/Layouts/Loading";
// layouts
import AppLayout from "./Components/Layouts/AppLayout";
import Layout from "./Components/Layouts/Layout";
import Dash from "./Components/Layouts/Dash";
import ErrorElement from "./Components/Layouts/ErrorElement";
import AttendanceLayout from "./Components/Layouts/AttendanceLayout";

import RegisterLayout from "./Components/Layouts/RegisterLayout";

// queries
import Profile from "./Components/Queries/Profile";

// forms
import TeacherForm from "./Components/Forms/TeacherForm";
import StudentForm from "./Components/Forms/StudentForm";

import TimeScheduleForm from "./Components/Forms/TimeScheduleForm";
import Login from "./Components/Forms/Login";

import Otp from "./Components/otp/otp";
import Otpt from "./Components/otp/otpt";
import Lecture from "./Components/Queries/Lecture";
import HardwareRoom from "./Rooms/HardwareRoom";
import RecentRecords from "./Components/Layouts/RecentRecords";
import Lecture_History from "./Components/Queries/Lecture_History";
import EntryGate from "./Rooms/Entry_Gate";
import TimeScheduleFormstu from "./Components/Queries/TimescheduleFormstu";
import Library from "./Rooms/Library";
import Auditorium from "./Rooms/Auditorium";
import AdminStudent from "./Components/Admin/AdminStudent";
import AdminTeacher from "./Components/Admin/AdminTeacher";
import AdminViewStudents from "./Components/Admin/AdminViewStudent";
import AdminViewTeacher from "./Components/Admin/AdminViewTeacher";
import AdminAssignLectures from "./Components/Admin/AdminAssignLectures";
import AdminSetTimeSchedule from "./Components/Admin/AdminSetTimeSchedule";




function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<RegisterLayout />}>
          <Route path="reg_teacher" element={<TeacherForm />} />
          <Route path="reg_student" element={<StudentForm />} />
          {/* <Route path="otp" element={< Otp/>} />
          // <Route path="Verfied" element={<Verified />} /> */}
        </Route>
        {/* <Route path="Verfied" element={<Verified />} /> */}
        <Route path="otp" element={< Otp/>} />
        <Route path="otpt" element={< Otpt/>} />

        {/* Route for Hardware Room */}
        <Route path="HardwareRoom" element={<HardwareRoom/>} />

        {/* Route for Entry Gate */}
        <Route path="EntryGate" element={<EntryGate/>} />

        {/* Route for Library */}
        <Route path="Library" element={<Library/>} />

        {/* Route for Auditorium */}
        <Route path="Auditorium" element={<Auditorium/>} />
        
        <Route
          path="/dash"
          element={<Layout />}
          errorElement={<ErrorElement />}
        >
          <Route index element={<Dash />} />
          
          <Route path="otp" element={< Otp/>} />
          
          <Route path="lec" element={<Lecture />} />
          
          {/* <Route path="attendance" element={<AttendanceLayout />} /> */}
          <Route path="attendance" element={<AttendanceLayout />} />
          <Route path="AllStudents" element={<AttendanceLayout />} />
          {/* <Route path="Lectures_History" element={<AttendanceLayout />} /> */}
          <Route path="Lectures_History" element={<Lecture_History />} />
          <Route path="RecentRecords" element={<RecentRecords />} />
          <Route path="time_schedule" element={<TimeScheduleForm />} />
          <Route path="time_schedulestu" element={<TimeScheduleFormstu />} />
          <Route path="profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="Students" element={<AdminStudent />} />
          <Route path="Teachers" element={<AdminTeacher />} />
          <Route path="View_Students" element={<AdminViewStudents />} />
          <Route path="View_Teachers" element={<AdminViewTeacher />} />
          <Route path="AssignLec" element={<AdminAssignLectures />} />
          <Route path="SetTimeSchedule" element={<AdminSetTimeSchedule />} />
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer
        className="toast"
        toastClassName="toast-rounded"
        bodyClassName="toast-body"
        // progressClassName="toast-progress"
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        hideProgressBar={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
