import listing from "../models/list.model.js";
export const createlist=async(req,res,next)=>
{
    try {
        const listing=new listing.create(req.body);
        res.status(201).json(listing)


        
    } catch (error) {
        next(error);
        
    }
}