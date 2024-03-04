import { useContext, lazy, Suspense } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const AttendanceLayout = () => {
  const AttendanceStudent = lazy(() => import("../Queries/AttendanceStudent"));
  const AtttendanceTeacherView = lazy(() => import("../Queries/Teacher_Stu_Attendance"));
  const { user } = useContext(UserContext);
  return (
    <>
      {user.userType === "student" ? (
        <Suspense fallback={<Loading />}>
          <AttendanceStudent />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <AtttendanceTeacherView />
        </Suspense>
      )}
    </>
  );
};

export default AttendanceLayout;
