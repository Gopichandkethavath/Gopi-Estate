import React from 'react'
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function Header() {

  const  {currentUser}= useSelector((state)=> state.user)
  

  return (
    <header className='shadow-md  bg-slate-200'>
      <div className='color-slate  p-3 bg-slate-200 flex justify-between items-center mx-auto max-w-6xl'>
       <Link to='/'>
      
        <h2 className='text-sm sm:text-xl'>
            <span className='text-slate-800 text-400 font-bold'>Gopi</span>
            <span className='text-slate-500 font-bold'>Estates</span>
        </h2>
        </Link>
        <form className='gap-4 bg-slate-100 rounded-lg p-3 flex items-center auto'>  
            <input type="text"id='search' placeholder='search.....'className='bg-transperent bg-slate-100 focus:outline-none w-24 sm:w-64' />
            < FaSearch className='text-slate-600'/>
        
        </form>
        <div>
            <ul className='flex gap-4  '>
                <Link to='/Home'> <li className='hover:underline'>Home</li></Link>
               
              <Link to='/about'><li className='hover:underline'>About</li></Link>  
               <Link to='/profile'>
               {currentUser ? (
                <img className='h-6  w-6 rounded-full object-cover' src={currentUser.avatar} alt="profile"/>

                
              ) : (
                <li className='hover:underline '>Signin</li>
              )}
              
               </Link>


            </ul>
        </div>
        </div>


    </header>
  )
}
