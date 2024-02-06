import jwt from 'jsonwebtoken'
export const verifyUser=(req,res,next)=>
{
    const token=req.cookies.access_token;
    if(!token) 
    {
        return res.status(401).json({ auth: false, message: "No token provided." });

    }
   
 jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>
{
    if(error) 
    {
        return res.status(403).json({ auth: false, message: "Failed to authenticate token." });

    }
    req.user=decoded;
     next();
 });

}