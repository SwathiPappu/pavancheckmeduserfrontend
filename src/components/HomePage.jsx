/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// labby-labs\frontEnd\src\components\HomePage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Body from "./HomePageComponents/Body.jsx";
import Header from "./HomePageComponents/Header.jsx";

const HomePage = ({ onPhoneNumberSubmit }) => {
  const { city, companyName } = useParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div
        className="body-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Body
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onPhoneNumberSubmit={onPhoneNumberSubmit}
          city={city}
          companyName={companyName}
        />
      </div>
    </div>
  );
};

export default HomePage;
