
import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema(
{
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true
    },

    text:String,

    image:String

},
{timestamps:true}
);

const  GMessage= mongoose.model("GroupMessage",groupMessageSchema);

export default GMessage