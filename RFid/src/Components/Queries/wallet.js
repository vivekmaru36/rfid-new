import { useState, useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import walletImg from './wallet.png';

/* add money to the wallet */
import AddMoney from "./addMoney";

/* place order of any item */
import AddProduct from "./addProduct";

/* add credit to wallet */
import AddCredit from "./addCredit";


function Wallet() {
    const { user } = useContext(UserContext);
    const [wallet, setWallet] = useState(null);
    const [creditPoint, setcreditPoint] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showProductModal, setProductModal] = useState(false);
    const [showCreditModal,setCreditModal] = useState(false);

    const [transactions, setTransactions] = useState([]);


    const fetchWallet = async () => {
        console.log("Fetching wallet...");
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:3500/walletFetch', { rfid: user.rfid });
            setWallet(response.data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);

       
        try {
            const response = await axios.post('http://localhost:3500/transactionsFetch', { rfid: user.rfid });
            console.log(response.data.transactions);
            setTransactions(response.data.transactions);
            

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchCreditPoint = async () => {
        setLoading(true);
        setError(null);

       
        try {
            const response = await axios.post('http://localhost:3500/fetchCreditPoint', { rfid: user.rfid });
            console.log(response.data.creditpoint);
            setcreditPoint(response.data.creditpoint);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallet();
        fetchTransactions();
        fetchCreditPoint();
    },[]); 

    return loading ? (<Loading/>) : (
        <>
        
            <div className="wallet drop-shadow-md md:drop-shadow-3xl">
                <img src={walletImg} className="walletimg" alt="wallet_image"/>
                <h2>Wallet Balance Rs.{wallet}</h2>
        
                <div className="credit-balance">
                    <span>Credit balance : {creditPoint}</span>
                </div>
            </div>
            <div className="walletNavigation">
                
                {/* add money in the wallet */}
                <button onClick={() => setShowModal(true)} className="vvd sign-in" style={{ height: "40px", padding: "6px 20px 20px 20px" }}><span>Add Money</span></button>
                {showModal && <AddMoney onClose={() => setShowModal(false)}/>}
                
                {/* place order */}
                <button onClick={() => setProductModal(true)} className="vvd sign-in order-item" style={{ height: "40px", padding: "6px 20px 20px 20px", background: "white", marginLeft: "30px", marginTop: "5px", borderRadius: "3px" }}><span>Order Item</span></button>
                {showProductModal && <AddProduct onClose={() => setProductModal(false)}/>}

                {/* add credit point in the wallet */}
                <button onClick={() => setCreditModal(true)} className="vvd sign-in order-item" style={{ height: "40px", padding: "6px 20px 20px 20px", background: "white", marginLeft: "30px", marginTop: "5px", borderRadius: "3px" }}><span>Redeem Credit</span></button>
                {showCreditModal && <AddCredit credit={creditPoint} onClose={() => setCreditModal(false)}/>}
                
            </div>
            <div className="transactions">
                <table className="w-full text-center table-transactions table-auto overflow-scroll w-full">
                    <thead>
                        <tr>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Transaction Date</th>
                            <th>Total Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction, index) => {
                        return (
                            <tr key={index}>
                                
                                <td>{transaction.credit}</td>
                                <td>{transaction.debit}</td>
                                <td>{transaction.transactionDate}</td>
                                <td>{transaction.totalBalance}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
    
}

export default Wallet;
