import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import './otp.css';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";




export default function Otp() {
  const [otp, setOtp] = useState('');
  const [buttonText, setButtonText] = useState('Submit');
  const [status, setStatus] = useState({});
  const [error,setError] = useState("");
  const { user } = React.useContext(UserContext);

  console.log(user);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set button text to "Sending..."
    setButtonText('Sending...');

    const token = Cookies.get("token");
    setError("Error");

    try {
      const reqData = JSON.stringify(otp);
      const reqData2 = JSON.stringify(user.id);
      const response = await axios.post("student", reqData,reqData2);
    } catch (error) {
      
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
            <p style={{textAlign:"center",fontSize:"30px"}}className={status.success === false ? "danger" : "success"}>{status.message}</p>
          }
        </form>
      </div>
    </div>
  );
}
