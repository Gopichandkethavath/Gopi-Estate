import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
username:{
    type:String,
    required:true,
    unique:true,
      } ,
      email:{
        type:String,
        required:true,
        unique:true,
          } ,
      password:
      {
        type:String,
        require:true,
      },
      avatar:
      {
        type:String,
        default:"https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png"
      }
      
},{timestamps:true}
);
const User =mongoose.model('User',userSchema);
export default User;