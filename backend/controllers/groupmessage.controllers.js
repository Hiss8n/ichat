
import GMessage from "../model/Gmessage.js";

 const messageGroup=async(req,res)=>{

  const {groupId}=req.params
   const senderId = req.user && (req.user._id || req.user.id);
    const {sender,text,imageUrl}=req.body;

    try {

     if(!sender | !text){
        return res.json({message:"can not send empty message"})
        }
    const message=await GMessage.create({

    sender:senderId,

    groupId:groupId,

    text:text,

    image:imageUrl

    });

   res.json(message);
        
    } catch (error) {
    console.log("Something went wrong",error)
     return res.status(500).json({ message: 'Server error' });
        
    }
}

export {messageGroup}
