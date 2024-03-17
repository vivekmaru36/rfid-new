import { useState, useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CheckoutLayout() {
    //const { user } = useContext(UserContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rfidNumber, setRfidNumber] = useState('');

    const navigate = useNavigate();
    const {transactionId,amount} = useParams();
    
    const checkoutProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3500/placeOrder/sucess', {transactionId:transactionId,rfidNumber:rfidNumber});
            console.log(response.data.message);

            if (response.data.success){
                if (response.data.message){
                    navigate("/dash/cancel", { 
                        state: { 
                            amount: amount,
                            description: response.data.message
                        },
                        replace: true 
                    }); 
                    }
                else{
                    navigate("/dash/wallet",{ replace: true });
                }
            }
            

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /* useEffect(() => {
        checkoutProduct();
    }, []);  */

    return loading ? (<Loading/>) : (
        <>
            <div>
                <h2>Swipe Rfid to Checkout the product</h2>
                <form className='flex flex-col justify-center items-center gap-3' onSubmit={checkoutProduct}>
                    <input
                        type="text"
                        value={rfidNumber}
                        onChange={(e) => setRfidNumber(e.target.value)}
                        placeholder="Swipe RFID card..."
                        autoFocus
                    />
                    <button className='bg-white px-4 py-2 rounded-lg text-black'>Swipe</button>

                    <p> Transaction ID : {transactionId}</p>
                    <p>The amount will be debited from your account: {amount}</p>
                </form>
                
                
            </div>
        </>
    );
}

export default CheckoutLayout;
