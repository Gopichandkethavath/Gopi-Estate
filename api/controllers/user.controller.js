import bcryptjs from  'bcryptjs';
import User from '../models/user.model.js';
export const updateUser=async (req,res,next)=>
{
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "You are not authorized to update this user's information." });
    }
try {
    if(req.body.password)
    {
        req.body.password=await bcryptjs.hash(req.body.password,10)

    }
    const  updateUser=await User.findByIdAndUpdate(req.params.id,
        {
            $set:

    {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar,
    }

  },{new:true,runValidators:true});
  
  if (!updateUser) {
    return res.status(404).json({ message: 'User not found.' });

}
const {password,...rest}=updateUser.toObject();
res.status(200).json(rest);  
    
} catch (error) {
    next(error)
    
}
};