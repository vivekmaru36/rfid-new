import React, { useState, useContext } from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../config/api/axios';
import UserContext from '../../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';


function AddProduct({ onClose }) {
    
    const [products, setProducts] = useState([
        { name: 'Samosa', price: 10, quantity: 0, category: 'Savory Snacks' },
        { name: 'Lays', price: 20, quantity: 0, category: 'Packaged Snacks' },
        { name: 'Frooti', price: 30, quantity: 0, category: 'Beverages' },
        { name: 'Pani Puri', price: 15, quantity: 0, category: 'Street Food' },
        { name: 'Bhel Puri', price: 25, quantity: 0, category: 'Street Food' }
    ]);

    const navigate = useNavigate();
      
    const [orderPlaced, setOrderPlaced] = useState(false);

    const { user } = useContext(UserContext);

    const handleQuantityChange = (index, quantity) => {
        if (quantity >= 0 && quantity <= 5) {
        const updatedProducts = [...products];
        updatedProducts[index].quantity = quantity;
        setProducts(updatedProducts);
    }
    };

    const handlePlaceOrder = async () => {
        try {
        const response = await axios.post('http://localhost:3500/placeOrder', {
            products,
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
                <table className='border-collapse w-full'>
                    <thead>
                    <tr>
                        <th className='border border-white'>Product Name</th>
                        <th className='border border-white'>Product Price</th>
                        <th className='border border-white'>Quantity (Max: 5)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                        <td className='border border-white'>{product.name}</td>
                        <td className='border border-white'>{product.price}</td>
                        <td className='border border-white'>
                            <input
                            type='number'
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                            style={{color:"white"}}
                            className='text-center text-black h-10 w-20 rounded-xl noscroll'
                            min="0" max="5"
                            />
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={handlePlaceOrder} className='bg-white px-4 py-2 rounded-lg text-black'>
                    Place Order
                </button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
