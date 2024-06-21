/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// labby-labs\frontEnd\src\components\ReportsPageComponents\Reports.jsx
import React, { useState, useEffect } from "react";
import bloodImage from "../../assets/bloodSample.png";
import axios from "axios";

const Reports = ({ phoneNumber, userData, patientName, bookingId, selectedPackage }) => {
  const [userId, setUserId] = useState(userData?.id || "");
  const [reportsTaken, setReportsTaken] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [otp, setOTP] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const api_key = "34042a44-c38b-11eb-8089-0200cd936042";
  const otp_template_name = "OTP Confirmation";
  useEffect(() => {
    if (userData) {
      setUserId(userData.id || "");
      setReportsTaken(
        userData.reportsTaken === 1 ||
          userData.reportsTaken === true ||
          userData.reportsTaken === "1"
      );
      setAdditionalInfo(userData.additionalInfo || "");
    }
  }, [userData]);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOnChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleCollectButtonClick = () => {
    if (phoneNumber.length === 10) {
      setTimer(30);
      let url = `https://2factor.in/API/V1/${api_key}/SMS/${phoneNumber}/AUTOGEN/${otp_template_name}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data["Status"] == "Success") {
            alert("OTP sent successfully");
          } else {
            alert("Failed to send OTP. Please try again.");
          }
        })
        .catch((err) => {
          alert("Error" + err.message);
        });
      setModalOpen(true);
    } else {
      alert("OTP wasn't able to send pls, relogin");

      setModalOpen(true);
    }
  };
  const handleVerifyOTP = () => {
    const enteredOTP = otp;
    let url = `https://2factor.in/API/V1/${api_key}/SMS/VERIFY3/${phoneNumber}/${enteredOTP}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data["Details"] == "OTP Matched") {
          handleCollectSample();
        } else {
          alert("Invalid OTP. Please try again.");
          setOTP("");
        }
      });
  };

  useEffect(() => {
    axios
      .get(`https://pavancheckmedbackend-2.onrender.com/api/users`)
      .then((response) => {})
      .catch((error) => {
        console.error("There was an error fetching the dashboard data!", error);
      });
  }, []);
  const handleCollectSample = async () => {
    try {
      const response = await fetch(
        `https://pavancheckmedbackend-2.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ReportsTaken: true,
            additionalInfo: additionalInfo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating ReportsTaken status");
      }
      setReportsTaken(true);
      setModalOpen(false);
      setAdditionalInfo("");
    } catch (error) {
      console.error("Error updating ReportsTaken status:", error);
    }
  };
  const handleResendOTP = () => {
    setTimer(30);
    setOTP("");
    if (phoneNumber.length === 10) {
      setTimer(30);
      let url = `https://2factor.in/API/V1/${api_key}/SMS/${phoneNumber}/AUTOGEN/${otp_template_name}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data["Status"] == "Success") {
            alert("OTP sent successfully");
            // console.log(data);
          } else {
            alert("Failed to send OTP. Please try again.");
          }
        })
        .catch((err) => {
          alert("Error" + err.message);
        });
    } else {
      alert("Something wrong");
    }
  };

  const formatTime = (time) => `00:${time.toString().padStart(2, "0")}`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <h4 style={{ color: "#1B9DF5" }}>Booking ID: {bookingId}</h4>
      <h4>
        Patient Name: <b>{patientName}</b>
      </h4>
      <hr />
      <h5
        style={{
          backgroundColor: reportsTaken ? "green" : "red",
          color: "white",
          width: "100%",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {reportsTaken
          ? "Blood sample collected"
          : "Pending blood sample collection"}
      </h5>
      <hr />
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div className="card" style={{ width: "10rem" }}>
          <img
            src={bloodImage}
            className="card-img-top"
            alt="blood sample image"
          />
          <div className="card-body">
            <h5 className="card-title">{selectedPackage} - sample</h5>
            {!reportsTaken ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCollectButtonClick}
              >
                {modalOpen ? "pending" : "collect"}
              </button>
            ) : (
              <button type="button" className="btn btn-success" disabled>
                Collected
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${modalOpen ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: modalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Collect Sample</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Enter the OTP below :</p>
              <input
                type="number"
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                className="form-control"
                placeholder="enter the OTP"
              />
              <br />
              <p>
                Type in the below box, for any important notes to be considered
                for the blood sample
              </p>
              <input
                type="text"
                className="form-control"
                value={additionalInfo}
                onChange={handleOnChange}
              />
            </div>
            {timer > 0 ? (
              <div style={{ marginLeft: "70%" }}>
                <p>Resend OTP in {formatTime(timer)}</p>
              </div>
            ) : (
              <div style={{ marginLeft: "70%" }}>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              </div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleVerifyOTP}
              >
                Mark as collected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
