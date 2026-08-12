import { useState } from "react";
import { useGroupStore } from "../../../../packages/api/src/store";




function GroupInput() {


    const [name,setName]=useState("")
    const setGroupName=useGroupStore((state)=>state.setGroupName);

  const handleChange=async(event)=>{
   setName(event.target.value);
   console.log('name:',name);
   await setGroupName(name)
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
          value={name}
          onChange={handleChange}
          placeholder="Write group name..."
           className="w-full rounded-sm px-2.5 py-1.5 text-sm  text-slate-800 outline-blue-400 transition  focus:outline-1 "  
        />
     
  
  );
}

export default GroupInput;