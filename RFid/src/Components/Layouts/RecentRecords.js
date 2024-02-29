import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const RecentRecords = () => {
    const RecentRecordsTeacher = React.lazy(() =>
        import("../Forms/RecentRecordsForm")
    );
    const RecentRecordsStudent = React.lazy(() =>
        import("../Queries/RecentRecords")
    );
    const { user } = React.useContext(UserContext);
    return (
        <>
            {user.userType === "student" ? (
                <React.Suspense fallback={<Loading />}>
                    < RecentRecordsStudent />
                </React.Suspense>
            ) : (
                <React.Suspense fallback={<Loading />}>
                    <RecentRecordsTeacher />
                </React.Suspense>
            )}
        </>
    );
};

export default RecentRecords;
