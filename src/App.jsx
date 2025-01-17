/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserDetailsPage from "./components/UserDetailsPage";
import ReportsPage from "./components/ReportsPage";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const handlePhoneNumberSubmit = async (number) => {
    setPhoneNumber(number);
    try {
      const response = await axios.post("https://pavancheckmedbackend-2.onrender.com/api/user", {
        phoneNumber: number,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/home-page/:city/:companyName"
          element={
            <HomePage onPhoneNumberSubmit={handlePhoneNumberSubmit} />
          }
        />
        <Route
          path="/user-details/:city/:companyName"
          element={
            <UserDetailsPage
              phoneNumber={phoneNumber}
              userData={userData}
            />
          }
        />
        <Route
          path="/reports"
          element={<ReportsPage phoneNumber={phoneNumber} userData={userData} />}
        />
        <Route path="*" element={<navigate to="/home-page/chennai/Casio" />} /> 
      </Routes>
    </Router>
  );
}

export default App;
