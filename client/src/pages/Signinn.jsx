import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Removed Navigate from import as it's not used
import Goath from './Goath';
import {  useDispatch } from 'react-redux';
import { signInStart,sigInSuccess,signInFailure } from '../redux/user/userSlice';

function Signinn() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
     // State to track loading status
     const dispatch=useDispatch();
    
    const navigate = useNavigate();

    const changeHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Start loading
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
           
           const data= await res.json();
           console.log(data);
           if(data.succes==false)
           {
            dispatch(signInFailure(data.message));
            return
           }
            dispatch(sigInSuccess(data))
            navigate('/Home'); // Navigate on success
            console.log("navigated to home ")
        } catch (error) {
            setError('Invalid Creditinals ' ); // Set error message
        } finally {
            setIsLoading(false); // Stop loading regardless of the outcome
        }
    };

    return (
        <div className='p-4 max-w-lg mx-auto'>
            <h1 className='text-3xl text-white text-center my-4 font-semibold'>Sign In </h1>
            {error && <p className='text-red-500'>{error}</p>} {/* Display error message if any */}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="email" id="email" placeholder='email' autoComplete="off" className='rounded-lg p-3 border' onChange={changeHandle} />
                <input type="password" id="password" placeholder='password' autoComplete="off" className='rounded-lg p-3 border' onChange={changeHandle} />
                <button className='p-3 text-white uppercase rounded-lg border bg-green-600 hover:opacity-50 disabled:opacity-70' disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'} {/* Change button text based on loading state */}
                </button>
                 <Goath/>
            </form>
    
            <div className='flex m-2 gap-3'>
                <p className='text-white'>Have an Account?</p>
                <Link to='/signup' className='text-blue-300'>Sign up</Link> {/* Correct the Link to point to Sign In page */}
            </div>
        </div>
    );
}

export default Signinn;
