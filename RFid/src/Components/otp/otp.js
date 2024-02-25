import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import './otp.css';
// import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
// import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
// import { useContext, useEffect } from 'react';

import { useLocation } from 'react-router-dom';


export default function Otp() {
  const [otp, setOtp] = useState('');
  const [buttonText, setButtonText] = useState('Submit');
  const [status, setStatus] = useState({});
  const [error, setError] = useState("");

  // Accessing student data from location state
  const location = useLocation();
  const { student } = location.state;

  console.log(student)

  const navigate = useNavigate();


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Set button text to "Sending..."
  //   setButtonText('Sending...');

  //   // const token = Cookies.get("token");
  //   setError("Error");

  //   try {
  //     const reqData = JSON.stringify(otp);
  //     const reqData2 = JSON.stringify(student.rfid);
  //     let result = await axios.post("/otp", reqData, reqData2);

  //     if (result.success) {
  //       console.log(result.token);

  //       setStatus({
  //         success: true,
  //         message: 'Data sent successfully',
  //       });

  //       navigate("/Verfieds");

  //     }
  //     else {
  //       setStatus({
  //         success: false,
  //         message: result.message,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error: ', error);
  //   }
  //   finally{
  //     // Reset button text to "Submit" after the request is complete
  //     setButtonText('Submit');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set button text to "Sending..."
    setButtonText('Sending...');

    // const token = Cookies.get("token");
    setError("");

    try {
      const requestData = {
        otp: otp,
        rfid: student.rfid
      };

      // Send combined data object in the request
      let result = await axios.post("/otp", requestData);

      if (result.data.success) {
        console.log(result.data.token);

        setStatus({
          success: true,
          message: 'Data sent successfully',
        });

        navigate("/Verified");
      } else {
        setStatus({
          success: false,
          message: result.data.message,
        });
      }
    } catch (error) {
      console.error('Error: ', error);
      setStatus({
        success: false,
        message: 'Error occurred while sending data',
      });
    } finally {
      // Reset button text to "Submit" after the request is complete
      setButtonText('Submit');
    }
  };

  return (
    <div className="container-otp">
      <div className="otp-box">
        <form onSubmit={handleSubmit}>
          <OtpInput
            className="otp"
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: '45px',
              height: '50px',
              borderRadius: '7px',
              border: '2px solid black',
              background: 'transparent',
              fontSize: '30px',
            }}
          />
          <button
            type="submit"
            style={{
              marginBottom: '30px',
              left: '8%',
              marginTop: '35px',
            }}
          >
            <span>{buttonText}</span>
          </button>

          {
            status.message &&
            <p style={{ textAlign: "center", fontSize: "30px" }} className={status.success === false ? "danger" : "success"}>{status.message}</p>
          }
        </form>
      </div>
    </div>
  );
}
