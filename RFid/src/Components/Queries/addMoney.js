import React, { useState,useContext,useRef } from 'react';
import { XCircle } from 'lucide-react';
import { Link} from 'react-router-dom';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { loadStripe } from "@stripe/stripe-js";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";


function AddMoney({ onClose }) {
  const [money, setMoney] = useState('');
  const { user } = useContext(UserContext);
  const moneyref = useRef();



  const SendData = async (data) =>{
    console.log(data);
    try {
       
      const stripe = await loadStripe("pk_test_51OufCySGj8IwMIKiaZRvLz7RleKOcRM0GR3c3BRnotWcRo8mw9zd1fmBkfxhgMoHoiVQhG6p3n2GO7pCeQfSbyoE00zYW6CQbP")
      const response = await axios.post('http://localhost:3500/addMoney',data);

      if (response) {
        console.log(response);
        
        const session = await response.data.session;
        console.log(session.id);
      
        const result = stripe.redirectToCheckout({
          sessionId:session.id
        })

        if (result.error){
          console.log(result.error);
        }
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      money: moneyref.current.value,
      rfid: user.rfid,
      userId: user._id,
      email: user.email
    };
    SendData(data);
    setMoney('');
    
  };
  
  const handleMoneyChange = () => {
    setMoney(moneyref.current.value);
  }

  return (
    <div className='fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center'>
      <div className='mt-5 flex flex-col gap-3 text-white'>

      <div className='flex justify-end'>
      <Link to="./">
          <button onClick={onClose} className='rounded-full bg-white p-2 text-black'>
              <XCircle size={25} />
          </button>
      </Link>
      </div>

      <div className='bg-opacity-40 rounded-xl px-5 py-5 flex flex-col gap-8 items-center addMoneydiv' >
          <form className='flex flex-col justify-center items-center gap-3' onSubmit={handleSubmit}>
            <label className='text-3xl font-extrabold'>Add Money</label>

              <div className='flex flex-row'>
                <RiMoneyDollarCircleFill size={35} className='mr-2 mt-1' />
                <input
                  type='number'
                  id="money"
                  ref={moneyref}
                  style={{color:"white"}}
                  value={money}
                  placeholder='Enter Amount'
                  required
                  className='text-center text-black h-10 w-80 rounded-xl noscroll'
                  onChange={handleMoneyChange}
                />
              </div>
              <button className='bg-white px-4 py-2 rounded-lg text-black'>Add Money</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMoney;