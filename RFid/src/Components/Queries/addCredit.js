import React, { useState, useContext } from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../config/api/axios';
import UserContext from '../../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';


function AddCredit({ credit,onClose }) {
    
    const [creditPoint, setcreditPoint] = useState('');

    const navigate = useNavigate();
      
    const [orderPlaced, setOrderPlaced] = useState(false);

    const { user } = useContext(UserContext);

    const creditChange = (e) => {
        e.preventDefault();
        setcreditPoint(e.target.value);
      };
    
    
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:3500/fetchCreditPoint/placeOrder', {
            creditPoint:creditPoint,
            rfid: user.rfid,
            email: user.email,
        });
        if (response.status === 200) {
            setOrderPlaced(true);
            console.log(response.data.transactionId);
            
            navigate(`/checkout/${response.data.transactionId}/${response.data.amount}`, { replace: true });


        } else {
            setOrderPlaced(false);
        }
        } catch (error) {
        console.error('Error placing order:', error);
        }
    };

    return (
        <div className='fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-5 flex flex-col gap-3 text-white'>
                <div className='flex justify-end'>
                <Link to='./'>
                    <button onClick={onClose} className='rounded-full bg-white p-2 text-black'>
                    <XCircle size={25} />
                    </button>
                </Link>
                </div>
                <div className='bg-opacity-40 rounded-xl px-5 py-5 flex flex-col gap-8 items-center addMoneydiv'>
                <form className='flex flex-col justify-center items-center gap-3' onSubmit={handlePlaceOrder}>
                    <label className='text-3xl font-extrabold'>Redeem The Credit Point To Your wallet</label>
                    <div className='flex flex-row'>
                        <input
                            type='number'
                            style={{color:"white",border:"1px solid white",marginTop:"50px;"}}
                            value={creditPoint}
                            placeholder='Enter Credit Amount'
                            required
                            className='text-center text-black h-10 w-80 rounded-xl noscroll'
                            onChange={creditChange}
                        />
                    </div>
                    <button className='bg-white px-4 py-2 rounded-lg text-black'>Redeem Credit</button>
                    <span style={{marginTop: "10px", }}>Credit balance: {credit}</span>
                    <span style={{fontFamily: "Arial, sans-serif"}}>Enter the points you want to transfer to your wallet!</span>
                    <span style={{fontFamily: "Arial, sans-serif"}}>By transferring the credit points to the wallet, </span>
                    <span style={{fontFamily: "Arial, sans-serif"}}>they can be used for various purposes, such as payments at the canteen.</span>

                </form>
                
                </div>
            </div>
        </div>
    );
}

export default AddCredit;
