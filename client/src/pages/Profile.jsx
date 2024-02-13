import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useRef} from 'react'
import {ref,getStorage, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { app } from '../firebase.js';
import { updateSuccess,updateStart,updateFailure,deletefailure,deletestart,deletesuccess
  ,signoutfailure,signoutstart,signoutsuccess
 } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { disconnect } from 'mongoose';
function Profile() {
  const fileref=useRef(null);
  const {currentUser}=useSelector(state=>state.user);
 const [file,setFile]=useState(undefined);
 const [progress,setprogress]=useState(0);
 const [formData,setFormData]=useState({});

 const dispatch=useDispatch();
 const navigate=useNavigate();

 const [uploaderror,setuploaderror]=useState(false);
 

 useEffect(()=>
 {
  if(file)
  {
    uploadhandle(file);

  }
 
  
 },[file])
 const uploadhandle=(file)=>
 {
  const storage=getStorage(app);
  const filename=`${new Date().getTime()}${file.name}`;
  const  storageref=ref(storage,filename);
  const uploadtask=uploadBytesResumable(storageref, file);
  uploadtask.on('state_changed',(snapshot)=>
  {
    //progress bar for the image 
    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    setprogress(Math.round(progress));
    
    },(error)=>
  {
    setuploaderror(true)
   
  },()=>
  {
    getDownloadURL(uploadtask.snapshot.ref).then
    ((downloadurl)=>
    setFormData({...formData,avatar:downloadurl})

  )}

  )
 }
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write:if request.resource.size<2*1024*1024&&
//       request.resource.contentType.matches('image/.*');
  const  handlechange=(e)=>
  {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handlesubmit=async(e)=>
  {
    
    e.preventDefault(e);
    dispatch(updateStart());


    try {
      const res=await fetch(`/api/user/update/${currentUser._id}`
      ,{
      method:'POST'
      ,headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(formData),

    });

    const data=await res.json();
    if(data.success==false)
    {
    dispatch(updateFailure(data.message))
    return;
    }
    dispatch(updateSuccess(data))
         
      
    } catch (error) {
      
      console.log("Error", error);
    };
    
  }
  const handledelete=async(e)=>
  {
    alert("are you sure to delete your account")
try {
  dispatch(deletestart());
  const res=await fetch(`/api/user/delete/${currentUser._id}`,
  {
    method:"DELETE",
    headers:{"Content-Type" : "Application/JSON"},
    

  })
  const  data=await res.json();
  if(data.succes==false)
  {
    dispatch(deletefailure(data.message))
return;
  }
  dispatch(deletesuccess(data))
  navigate("/signinn");
  data.currentUser=null;
  
} 
catch (error)
{
  console.log('error',error)
 
  
}
   

  }
  const handlesignout=async()=>
  {
    try {
      dispatch(signoutstart())
      const res=await fetch('api/auth/signout');
      const data= await res.json();
      if(data.success==false)
      {
        dispatch(signoutfailure())
        return
      }   
      dispatch(signoutsuccess())
      dispatch(sign)   
    } catch (error) {
      
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
    <h1 className='text-semi-bold text-white text-3xl text-center mt-3'>Profile</h1>
    <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
    <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileref} hidden accept='image/*' />
    <img onClick={()=>fileref.current.click()}   src= {formData.avatar || currentUser.avatar} alt="profile" className='h-14 w-14  rounded-full cursor-pointer object-cover self-center mt-4' />
    <p className='text-center'>
    {
      uploaderror?(
        <span className ='text-green-600'>error in uploading(must be lessthan 2mb)
          </span>
      ):progress>0 && progress<100   ?  (
      <span className = 'text-red-700'>{`Uploading ${progress}%`}
      </span> ): progress==100 ? (<span className='text-green-500'>Image uploaded</span>):(
        ' Upload an Image'
      )  

      }
    </p>

  <input type="text" placeholder='username' id='username' onChange={handlechange} defaultValue={currentUser.username} className='p-3 border rounded-lg' />

    <input type="email" placeholder='email' id='email' onChange={handlechange} defaultValue={currentUser.email} className='p-3 border rounded-lg' />
    <input type="password" placeholder='password'  onChange={handlechange}   id='password'  className='p-3 border rounded-lg'/>
    <button className='text-black bg-green-600 hover:opacity-90 p-3 uppercase rounded-lg border'>Update</button>
    <button className='text-black bg-red-500 hover:opacity-90 p-3 uppercase rounded-lg border'>create Listing</button>

    </form>

  <div className='mt-4 justify-between flex'>
    <span onClick={handledelete}  className='text-red-600 cursor-pointer'>Delete account</span>
    <span onClick={handlesignout} className='text-red-600 cursor-pointer'>sign out</span>
    </div>
    </div>
  )
}

export default Profile 