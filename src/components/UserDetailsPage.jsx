/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import UserDetails from './UserDetailsPageComponents/UserDetails.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetailsPage = ({ phoneNumber, userData }) => {
  const { city, companyName } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/packages', {
          params: { city, companyName }
        });
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, [city, companyName]);

  return (
    <>
      <UserDetails
        phoneNumber={phoneNumber}
        userData={userData}
        packages={packages}
        city={city}
        companyName={companyName}
      />
    </>
  );
};

export default UserDetailsPage;
