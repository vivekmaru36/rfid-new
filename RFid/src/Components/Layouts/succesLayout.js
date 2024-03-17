import { useState, useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SucessLayout() {
    //const { user } = useContext(UserContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const {userId,rfid,money} = useParams();
    const fetchWallet = async () => {
        console.log("Fetching wallet...");
        setLoading(true);
        setError(null);

        console.log(userId);
        console.log(rfid);
        console.log(money);
    
        try {
            const response = await axios.post('http://localhost:3500/addMoney/sucess', {userId:userId,rfid:rfid,money:money,email:user.email});

            if (response.data.success){
                navigate("/dash/wallet");
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallet();
    }, []); 

    return loading ? (<Loading/>) : (
        <>
            <div className="wallet drop-shadow-md md:drop-shadow-3xl">
                Adding Money to wallet!
            </div>
   

        </>
    );
}

export default SucessLayout;
