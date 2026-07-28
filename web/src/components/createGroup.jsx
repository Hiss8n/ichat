import { useState } from "react";
import { Search, Check } from "lucide-react";
import { chatStore } from "../store/chatStore";
import { useEffect } from "react";
import { authStore } from "../store/authStore";
import Groups from "./groups";
import ContactList from "./contactList";
import GroupContactList from "./groupContacts";
import { useGroupStore } from "../store/groupsStore";
import GroupInput from "./groupInput";

export default function CreateGroup() {

  const createAgroup=useGroupStore((state)=>state.createAgroup)
  const setcreateAgroup=useGroupStore((state)=>state.setcreateAgroup)

    const newMembers=useGroupStore((state)=>state.newMembers);
    const clearNewMembers=useGroupStore((state)=>state.clearNewMembers);

  const handleGroupCreation=()=>{
    if(newMembers.length<2){

      alert("You can't create a group with less than 2 people")
      return
        } else{
          alert("Created successfull")
        }
        const timer=setTimeout(()=>{
          setcreateAgroup(false);
        },200)

        clearNewMembers()

  }
 
  return (
     <div className="relative flex-1 w-full ">
   
          
         {/*   <div className="mb-1 rounded-none border border-slate-200 bg-white p-1  shadow-sm"> */}
               <div className="flex items-start">
                 
                 <div className="min-w-0 flex-1">
                   <div className="flex items-start justify-center gap-2">
                       <h1
                       /*   onClick={handleLogout} */
                         className="rounded-sm px-2 py-1 text-md font-semibold text-gray-800 transition hover:bg-slate-200"
                       >
                        Teams/Groups
                       </h1>
                    
                   </div>
               {/*   </div> */}
   
               </div>
             </div>
             {/* Add and contact email */}
             <div className="mb-1  flex flex-col items-center justify-between bg-slate-100 ">
               <div className="flex items-center justify-between h-16">  
               
                   <h1 className="text-lg text-slate-800 font-bold  mr-8">Groups </h1>
                  
                  
                         
                 
                  <button

                      onClick={()=>setcreateAgroup(!createAgroup)}
             
                        className="inline-flex items-center justify-center gap-0 px-1 py-0.5 text-sm font-semibold
                  text-white bg-pink-600 rounded-sm hover:bg-pink-500 focus:outline-none focus:ring-1
                   focus:ring-pink-600 focus:ring-offset-1 transition-all shadow-sm">
                
               <span> + Add </span>
             </button>
              
               </div>
               {createAgroup && <GroupInput/>}
             
          
          
      
           
             </div>

            
             <hr className="mb-3 border-slate-800 w-[100%]" />

             {
              createAgroup && newMembers.length!==null ?
              <div className="absolute  flex flex-col bottom-2 left-12 h-16 items-center">

      
               <button

               onClick={handleGroupCreation}
               
               className="items-center justify-center gap-0 px-3 py-2.5 text-sm font-semibold
                  text-white bg-red-500 rounded-sm hover:bg-pink-700 focus:outline-none focus:ring-1
                   focus:ring-pink-500 focus:ring-offset-1 transition-all shadow-sm sm:px-1 sm:py-1">
                
               <span className="text-md font-serif text-white"> Create Group</span>
             </button>
              </div>:null
   
             }
             {
              !createAgroup ? <Groups/> :<GroupContactList/>
             }


              

            
        
           </div>
  );
}