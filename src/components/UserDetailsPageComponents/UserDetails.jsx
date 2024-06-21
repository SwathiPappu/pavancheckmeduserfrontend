/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// labby-labs\frontEnd\src\components\UserDetailsPageComponents\UserDetails.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = ({
  phoneNumber,
  userData,
  packages,
  city,
  companyName,
}) => {
  const [selectedGender, setSelectedGender] = useState(userData?.gender || "");
  const [patientName, setPatientName] = useState(userData?.patientName || "");
  const [employeeId, setEmployeeId] = useState(userData?.employeeId || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [age, setAge] = useState(userData?.age || "");
  const [bookingId, setBookingId] = useState(userData?.bookingId || "");
  const [selectedPackage, setSelectedPackage] = useState(
    userData?.package || ""
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      setSelectedGender(userData.gender);
      setPatientName(userData.patientName);
      setEmployeeId(userData.employeeId);
      setEmail(userData.email);
      setAge(userData.age);
      setSelectedPackage(userData.package);
      setBookingId(userData.bookingId);
    }
  }, [userData]);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
  const timestamp = Date.now(); // Get the current timestamp
  const date = new Date(timestamp); // Create a Date object from the timestamp
  const day = date.getDate(); // Get the day of the month (1-31)
  const month = date.getMonth() + 1; // Get the month (1-12)
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const handleNextClick = async () => {
    if (
      patientName.trim() === "" ||
      employeeId.trim() === "" ||
      email.trim() === "" ||
      age.toString().trim() === "" ||
      selectedGender.trim() === "" ||
      selectedPackage.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newBookingId = `${employeeId}${day.toString().padStart(2, "0")}${month
      .toString()
      .padStart(2, "0")}${year}`;
    console.log(newBookingId);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (isNaN(age) || parseInt(age) <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    try {
      const response = await axios.post(
        "https://pavancheckmedbackend-2.onrender.com/api/user/update",
        {
          phoneNumber,
          patientName,
          employeeId,
          email,
          age,
          gender: selectedGender,
          package: selectedPackage,
          bookingId: newBookingId,
          city,
          companyName,
        }
      );

      // Assuming the response contains the updated user data including userId
      const updatedUserData = response.data;
      navigate("/reports", {
        state: {
          userId: updatedUserData.userId,
          patientName,
          phoneNumber,
          bookingId: newBookingId,
          selectedPackage : selectedPackage,
        },
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const handlePackageChange = (packageName) => {
    setSelectedPackage(packageName);
  };
  return (
    <>
      <form style={{ padding: "40px" }}>
        <div className="form-group,">
          <label
            htmlFor="formGroupExampleInput"
            style={{
              fontWeight: "700",
              position: "absolute",
              left: "60px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              transition: "all 0.3s ease",
            }}
          >
            YOUR DETAILS
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            placeholder={phoneNumber}
            readOnly
          />
        </div>
        <div className="form-group" style={{ marginTop: "30px" }}>
          <label
            htmlFor="formGroupExampleInput2"
            style={{ marginBottom: "20px", fontWeight: "600" }}
          >
            PATIENT INFORMATION
          </label>
          <br />
          <span style={{ color: "#1B9DF5" }}>
            Employee ID<span style={{ color: "red" }}>*</span> :
          </span>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              borderWidth: "3px",
            }}
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <span style={{ color: "#1B9DF5" }}>
            Name<span style={{ color: "red" }}>*</span> :
          </span>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              borderWidth: "3px",
            }}
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <span style={{ color: "#1B9DF5" }}>
            Email<span style={{ color: "red" }}>*</span> :
          </span>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              borderWidth: "3px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span style={{ color: "#1B9DF5" }}>
            Age<span style={{ color: "red" }}>*</span> :
          </span>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              borderWidth: "3px",
            }}
            value={age}
            onChange={(e) => setAge(String(e.target.value))}
          />
          <span style={{ color: "#1B9DF5" }}>
            Gender<span style={{ color: "red" }}>*</span> :
          </span>

          <br />
          <div
            className="form-group"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "10px",
              marginBottom: "30px",
            }}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="Male"
                checked={selectedGender === "Male"}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="Female"
                checked={selectedGender === "Female"}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="other"
                value="Other"
                checked={selectedGender === "Other"}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
        </div>
        <span style={{ color: "#1B9DF5" }}>
          Select Package<span style={{ color: "red" }}>*</span> :
        </span>
        <select
          className="form-control"
          id="selectPackage"
          value={selectedPackage}
          onChange={(e) => handlePackageChange(e.target.value)}
          style={{
            marginTop: "10px",
            marginBottom: "15px",
            borderWidth: "3px",
          }}
        >
          <option value="">Select a package</option>
          {packages.map((pkg, index) => (
            <option key={index} value={pkg}>
              {pkg}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            width: "100%",
            marginTop: "10px",
            backgroundColor: "#1B9DF5",
            borderColor: "#1B9DF5",
          }}
          onClick={handleNextClick}
        >
          Next
        </button>
      </form>
    </>
  );
};

export default UserDetails;
