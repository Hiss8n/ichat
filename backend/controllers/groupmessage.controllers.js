
import GMessage from "../model/Gmessage.js";
import Group from "../model/Group.js";

 const messageGroup=async(req,res)=>{

  const {groupId}=req.params
   const senderId = req.user && (req.user._id || req.user.id);
    const {text,imageUrl,video}=req.body;

    try {

     if( !text){
        return res.json({message:"can not send empty message"})
        }

  const group = await Group.findOne({
  _id: groupId,
  members: { $in: [senderId] },
});

    if((!group))return res.status(500).json({message:'No such group found!'})


    const message=await GMessage.create({

    sender:senderId,

    group:groupId,

    text:text,

    image:imageUrl

    });

   res.json(message);
        
    } catch (error) {
    console.log("Something went wrong",error)
     return res.status(500).json({ message: 'Server error' });
        
    }
}


const getGroupsMessages=async(req,res)=>{
      const { groupId } = req.params;
    const userId =  req.user && (req.user._id || req.user.id);

    try {
     // Ensure the user belongs to the group
    const group = await Group.findOne({
      _id: groupId,
      members: userId,
    });

      if (!group) {
      return res.status(404).json({
        message: "Group not found or you are not a member.",
      });
    }

     const messages = await GMessage.find({
      group: groupId,
    })
      .populate("sender", "name,email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
        
    } catch (error) {
     console.log("Error getting group messages:", error);
    res.status(500).json({
      message: "Internal server error",
    });
        
    }
    
}

export {messageGroup,getGroupsMessages}
