import {GoogleAuthProvider, getAuth ,signInWithPopup} from 'firebase/auth';
import { app } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import { sigInSuccess } from '../redux/user/userSlice.js';
import  {  useDispatch} from    "react-redux"

function Goath() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  

    const handleGoogleclick=async()=>{
    try {
      const provider=new GoogleAuthProvider();

      const auth=getAuth(app);
      const result=await signInWithPopup(auth,provider); 
      console.log(result)   
      const res=await fetch('/api/auth/google',
      {
        method:'POST',
        headers:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL}),
      }
      );
      
      const data=await res.json();
      dispatch(sigInSuccess(data));

      

    
  
    } 
    catch (error) {
        console.error("Error signing in with Google: ", error);
        console.log(error)
        
    }
            
    
} 
  return (

    <button onClick={handleGoogleclick} className='text-white bg-red-900 p-4 hover:opacity-80 rounded-lg'>Sign in with Google</button>
      )
}

export default Goath