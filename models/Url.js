import mongoose from "mongoose";

const shorturlSchema = new mongoose.Schema({
    shortcode: {type:String},
    longURL: {type:String},
    createdAt: {
        type:Date,
        default:Date.now
    }
    
    
})

export const Url = mongoose.model("shorturl", shorturlSchema)