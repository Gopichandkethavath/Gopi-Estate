import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from  'jsonwebtoken'
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json("User already exists with that email.");
        }

        // Hash password
        const salt = await bcryptjs.hash(password, 10);

        // Create and save new user
        const newUser = new User({ username, email, password: salt });
        await newUser.save();

        res.status(201).json("User created successfully.");
    } catch (error) {
        next(error);
    }
};



export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try
    {
    const  validuser=await User.findOne({email})
    if(!validuser)
     return  res.status(404).send('user not found');
    const validpassword=bcryptjs.compareSync(password,validuser.password);
    if(!validpassword)
     return res.status(404).send('inavlaid password ');
    const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET);
    const {password:pass,...rest}=validuser._doc;

    res.cookie('access_token',token ,{httpOnly:true}).status(200).json(rest);
    console.log(data)
}
 catch (error) {
    next(error);
}
}
export const signout=async(req,res,next)=>
{
    try {
        res.clearCookie(access_token);
    res.status(200).json('user logged out');
    } catch (error) {
        next(error)
        
    }
    
}
export const google=  async(req,res,next)=>
{ 
try {
    const user=await User.findOne({email:req.body.email})
    if(user)
    {
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=user._doc;
        res
        .cookie('access_token',token ,{httpOnly:true})
        .status(200)
        .json(rest)
    }
    else{
        const generatepassword= Math.random().toString(36).slice(-8);
        const hashpassword= bcryptjs.hashSync(generatepassword,10)    
        const newUser = await User.create({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashpassword});
      
    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
       const {password:pass,...rest}=newUser._doc;
       res.cookie('access_token',token ,{httpOnly:true}).status(200).json(rest); 
       

}
}
 catch(error) {
    next(error)
    
}
};
