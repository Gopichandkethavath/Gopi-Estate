import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Signinn from './Signinn'
import Goath from './Goath';


function Signup() {
  const [formData,setformdata]=useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading status


  const navigate=useNavigate();
  const changehandle=(e)=>
  { setformdata({
    ...formData,
    [e.target.id]:e.target.value,
  
  });
  console.log(formData);
  

  };
  const handlesubmit=async (e)=>
  {
    e.preventDefault();
    setIsLoading(true);
    try {

    const res=await fetch('/api/auth/signup',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',

      },
      body:JSON.stringify(formData),
    });
    if(!res.ok)
    { 
    throw new Error('HTTP error! Status:${res.status}');
  } 
   await res.json();

   navigate('/Signinn');

   console.log("user created succesfully")
  }
  catch(error)
  {
    setError('Signup failed: ' + error.message);
    setIsLoading(false);

    console.log(error)


  }
};
  
  return (
    <div className='p-4  max-w-lg mx-auto '>
    <h1 className='text-3xl text-white text-center my-4 font-semibold '>Signup</h1>
    <form onSubmit={handlesubmit} className='flex flex-col gap-4 '>
    <input type="text"  id="username" placeholder='username' autoComplete="Given-name" className='rounded-lg p-3 border ' onChange={changehandle}/>
    <input type="email"  id="email" placeholder='email' autoComplete="off" className='rounded-lg p-3 border 'onChange={changehandle} />
    <input type="password"  id="password" placeholder='password' autoComplete="off" className='rounded-lg p-3 border 'onChange={changehandle} />
    <button  className=' p-3 text-white uppercase rounded-lg border bg-green-600 hover:opacity-50 disabled:opacity-70'>Sign up</button>
    <Goath/>
    </form>
    

     <div className='flex m-2 gap-3'>
     <p className='text-white'>Have an Account ?</p>
     <Link to ={'/signinn'} className='text-blue-300'>Signin</Link>
     </div> 

   
    </div>
  )
}

export default Signup