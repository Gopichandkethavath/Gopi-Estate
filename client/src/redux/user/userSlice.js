import { createSlice } from "@reduxjs/toolkit";
const     initialState  ={
    currentUser:null,
    error:null,
    loading:false,
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>
        {
            state.loading=true;

        },
        sigInSuccess:(state,action)=>
        {
            
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false;

        },
        signInFailure:(state,action)=>
        {
            state.error=action.payload;
            state.loading=false;
        },
        updateStart:(state)=>
        {
            state.loading='true';
        },
        updateSuccess:(state,action)=>
        {
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false; 
        },
        updateFailure:(state,action)=>
        {
            
            state.error=action.payload;
            state.loading=false;
        },
        deletestart:(state)=>
        {
            state.loading='true';
        },
        deletesuccess:(state,action)=>
        {
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false; 
        },
        deletefailure:(state,action)=>
        {
            
            state.error=action.payload;
            state.loading=false;
        },
        
        signoutstart:(state)=>
        {
            state.loading='true';
        },
        signoutsuccess:(state,action)=>
        {
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false; 
        },
        signoutfailure:(state,action)=>
        {
            
            state.error=action.payload;
            state.loading=false;
        }

}
})
export const {sigInSuccess,signInFailure,signInStart
    ,updateStart,updateFailure,updateSuccess
    ,deletestart,deletefailure,deletesuccess
    ,signoutfailure,signoutstart,signoutsuccess
}=userSlice.actions;


export default userSlice.reducer;
