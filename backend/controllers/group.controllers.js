import Group from "../model/Group.js";

const createGroup = async (req,res)=>{

   const {name,description,members}=req.body;
   try {


    if (!name | !description |! members){
        return res.status(400).json({message:"Must a name,description and at east 2 members"})
    }
    const group=await Group.create({
    name,
    description,

    admin:req.user._id,

    members:[
        req.user._id,
        ...members
    ]

    });

    res.json(group);
    
} catch (error) {

    console.log("some thing went wrong",error)
    return res.status(500).json({ message: 'Server error01' });
    
}
}

const getAgroupMember=async(req,res)=>{
    try {

        const group=await Group.findById(req.params.groupId)
        .populate("members","fullName profilePic");

        res.json(group);  
        
    } catch (error) {
        console.log("some thing went wrong",error)
        return res.status(500).json({message:"server errror"}); 
        

        

    }
}

const getAllGroups=async(req,res)=>{
    
const myId = req.user && (req.user._id || req.user.id);

    try {
  if(!myId) return res.status(404).json({message:'You are not part of any group!!!'})

   const groups=await Group.find({

    members:myId

    }).populate("members","fullName profilePic");

      res.json(groups);
         
    } catch (error) {
        console.log("some thing went wrong",error)
        return res.status(500).json({message:"server errror"});  
    }
}



const addPersonToGroup=async(req,res)=>{
    try {
    await Group.findByIdAndUpdate(
     req.params.id,

    {
     $addToSet:{
      members:req.body.memberId
     }
      }

   );
    } catch (error) {
    console.log("some thing went wrong",error)
    return res.status(500).json({ message: 'Server error' });
        
    }

    res.json(addPerson)
}

const removePersonFromGroup=async(req,res)=>{

    try {       
     const userMember=await Group.findByIdAndUpdate(
    req.params.id,

    {
    $pull:{
       members:req.body.memberId
    }
    }
     );

    res.json(userMember)

    } catch (error) {
    console.log("Some error just occured",error);   
    return res.status(500).json({ message: 'Server error' });   
    }

}

export  {createGroup,getAgroupMember,getAllGroups,removePersonFromGroup,addPersonToGroup};