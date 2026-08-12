import { useState,useEffect } from "react";
import { chatStore } from "../../../../packages/api/src/store";




function SearchInput() {
  const [searchTerm,setSearchTerm]=useState("");
  const searchForContact=chatStore((state)=>state.searchForContact)
   
  const  queryContacts=chatStore((state)=>state.queryContacts);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      if(searchTerm.trim()!==""){
        searchForContact(searchTerm);

      }
    },2000)
    return () => clearTimeout(timer);
  },[searchTerm])


  const handleChange=(event)=>{
   setSearchTerm(event.target.value);
  }

  const handleKeyDown=(e)=>{
   if(e.key==="Enter"){
    console.log("searching for",searchTerm);
    searchForContact(searchTerm);
   setSearchTerm("")
    
   }; 
  }

 
  return (
    <div>
      <label className="block">
        <span className="text-slate-100">Search for contacts</span>
         </label>
        <input
        id="search"
        name="search"
          onKeyDown={(e)=>handleKeyDown(e)}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search contact"
           className="w-full rounded-sm px-3 py-1.5 text-sm text-slate-800 outline-none transition focus:border-slate-200"  
        />
     
    </div>
  );
}

export default SearchInput;