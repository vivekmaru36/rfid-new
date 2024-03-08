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
import ForgotPasswordForm from './Components/Forms/ForgotPasswordForm';
import ResetPasswordForm from './Components/Forms/ResetPasswordForm';

import Otp from "./Components/otp/otp";
import Otpt from "./Components/otp/otpt";
import Lecture from "./Components/Queries/Lecture";
import HardwareRoom from "./Rooms/HardwareRoom";
import RecentRecords from "./Components/Layouts/RecentRecords";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterLayout />}>
          <Route path="reg_teacher" element={<TeacherForm />} />
          <Route path="reg_student" element={<StudentForm />} />
          {/* <Route path="otp" element={< Otp/>} />
          // <Route path="Verfied" element={<Verified />} /> */}
        </Route>
        {/* <Route path="Verfied" element={<Verified />} /> */}
        <Route path="otp" element={< Otp/>} />
        <Route path="otpt" element={< Otpt/>} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

        {/* Route for Hardware Room */}
        <Route path="HardwareRoom" element={<HardwareRoom/>} />
        
        <Route
          path="/dash"
          element={<Layout />}
          errorElement={<ErrorElement />}
        >
          <Route index element={<Dash />} />
          
          <Route path="otp" element={< Otp/>} />
          
          <Route path="lec" element={<Lecture />} />
          
          <Route path="attendance" element={<AttendanceLayout />} />
          <Route path="Lectures_History" element={<AttendanceLayout />} />
          <Route path="RecentRecords" element={<RecentRecords />} />
          <Route path="time_schedule" element={<TimeScheduleForm />} />
          <Route path="profile" element={<Profile />} />
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
