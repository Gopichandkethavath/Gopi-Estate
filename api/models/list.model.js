import mongoose from "mongoose";
const listSchema=new  mongoose.Schema({
    Name:
    {
        type:String,
        required:true,
    },
    Description:
    {
        type:String,
        // required:true

    },
    address:
    {
        type:String,
        required:true

    },
    regularprice:
    {
        type : Number,
        // required:true,

    },
    discountprice:
    {
        type : Number,
        // required:true,
    },
    bathrooms:
    {
        type : Number,
        // required:true,

    },
    parking:
    {
        type:Boolean,
        // required:true,
    },
    furnished:
    {
        type:Boolean,
        // required:true,

    },
    type:
    {
        type:String,
        // required:true
    },
    offer:
    {
        type:Boolean,
        // required:true,  
    },
    imageUrls:
    {
        type:Array,
        // required:true,

    },
    UseRef:
    {
         type:String,
        // required:true,
    }
})
const listing=mongoose.model('listing',listSchema);
export default listing;