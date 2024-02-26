import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import './otp.css';
// import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
// import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
// import { useContext, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { toast } from "react-toastify";


export default function Otp() {
  const [otp, setOtp] = useState('');
  const [buttonText, setButtonText] = useState('Submit');
  const [status, setStatus] = useState({});
  const [error, setError] = useState("");

  // Accessing student data from location state
  const location = useLocation();
  const { student } = location.state;

  // console.log(student)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonText('Sending...');
    setError("");

    try {
      const requestData = {
        otp: +otp,
        rfid: student.rfid
      };
      const request = JSON.stringify(requestData);

      let result = await axios.post("/otp", request);

      if (result.data.success) {
        setStatus({
          success: true,
          message: 'Data sent successfully',
        });

        navigate("/");
        toast.success(result.data.message);
      } else {
        setStatus({
          success: false,
          message: result.data.message,
        });
      }
    } catch (error) {
      console.error('Error: ', error.response.data);
      setStatus({
        success: false,
        message: error.response.data.message || 'Error occurred while sending data',
      });
    } finally {
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
