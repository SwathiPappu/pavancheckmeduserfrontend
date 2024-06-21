
/* eslint-disable react/prop-types */
import Header from "./HomePageComponents/Header";
import Reports from "./ReportsPageComponents/Reports";
import { useLocation } from "react-router-dom";
const ReportsPage = ({userData}) => {
  const location = useLocation();
  const { phoneNumber, userId, patientName, bookingId, selectedPackage } =
    location.state || {};
  return (
    <>
      <Header />
      <Reports
        phoneNumber={phoneNumber}
        userData={userData}
        userId={userId}
        patientName={patientName}
        bookingId={bookingId}
        selectedPackage={selectedPackage}
      />
    </>
  );
};

export default ReportsPage;
