import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js"
import cookieParser  from "cookie-parser";
import Userrouter from "./routes/user.routes.js";
import listingRouter from  "./routes/listing.route.js";


//server created first in backend
const app=express();

app.listen(5000,()=>{
    console.log("server is running at port 5000");
});
//connected to data base
dotenv.config();
mongoose.connect(process.env.Mongo).then(() => { 
    console.log("connected to mongodb");
    
}).catch((err) => {
    console.log("failed in connecting")
    
});


app.use(express.json());
app.use(cookieParser());

app.use('/api',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/user',Userrouter)
app.use('/api/listing',listingRouter);
app.use((err,req,res,next)=>
{
    const Statuscode=err.Statuscode || 500;
    const Message=err.Message || "internal server error";
    res.status(Statuscode).json({
        success:'false',
        Statuscode,
        Message,        

    })
      
})