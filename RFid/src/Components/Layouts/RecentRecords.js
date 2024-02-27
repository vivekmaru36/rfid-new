import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const RecentRecords = () => {
    const RecentRecordsForm = React.lazy(() =>
        import("../Forms/RecentRecordsForm")
    );
    const RecentInternalStudent = React.lazy(() =>
        import("../Queries/RecentInternalStudent")
    );
    const { user } = React.useContext(UserContext);
    return (
        <>
            {user.userType === "student" ? (
                <React.Suspense fallback={<Loading />}>
                    < RecentInternalStudent />
                </React.Suspense>
            ) : (
                <React.Suspense fallback={<Loading />}>
                    <RecentRecordsForm />
                </React.Suspense>
            )}
        </>
    );
};

export default RecentRecords;
