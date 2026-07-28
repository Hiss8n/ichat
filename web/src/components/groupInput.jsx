import { useState } from "react";
import { chatStore } from "../store/chatStore";
import { useEffect } from "react";



function GroupInput() {


    const [groupName,setGroupName]=useState("")


  const handleChange=(event)=>{
   setGroupName(event.target.value);
  }

  const handleKeyDown=(e)=>{
   if(e.key==="Enter"){
    
    
   }; 
  }

 
  return (
    
      
        <input
        id="group-name"
        name="group-name"
          onKeyDown={(e)=>handleKeyDown(e)}
          type="text"
          value={groupName}
          onChange={handleChange}
          placeholder="Write group name..."
           className="w-full rounded-sm px-2.5 py-1.5 text-sm  text-slate-800 outline-blue-400 transition  focus:outline-1 "  
        />
     
  
  );
}

export default GroupInput;