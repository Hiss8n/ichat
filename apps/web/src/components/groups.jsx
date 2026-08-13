import { useState } from "react";
import { authStore, useGroupStore,chatStore } from '../../../../packages/store/src';



export default function Groups() {

    const getAllGroups = useGroupStore((state) => state.getAllGroups);
      const allGroups = useGroupStore((state) => state.allGroups);
      const selectedGroup = useGroupStore((state) => state.selectedGroup);
      const getGroupsMessages = useGroupStore((state) => state.getGroupsMessages);
      const selectedContact = chatStore((state) => state.selectedContact);
      const setSelectedContact = chatStore((state) => state.setSelectedContact);
      const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
      const groups=allGroups!==null?allGroups:[];



  const handleSelectedGroup =(group)=>{
    setSelectedContact(null);
     setSelectedGroup(group);

     setTimeout(()=>{
       getGroupsMessages()
       console.log("idSel",group?._id);

     },1000) 
    

  }

   console.log('grou',selectedGroup);
   console.log("cont",selectedContact);

  return (
    <div className="flex h-full bg-base-1000 ">
      {/* Sidebar */}
      <aside className="w-50 border-r border-base-300 overflow-y-auto bg-base-100">
       
        {groups.length>0?groups?.map((group) => {
          const isActive=selectedGroup?._id===group?._id;
        
        return(
         /*const isActive=group.id===selectedGroup.id */

                 <button
                  key={group._id}
                   onClick={()=>handleSelectedGroup(group)}
                  type="button"
                
                  className={`flex w-full items-center rounded-md px-3 py-3 text-left transition ${
                    isActive ? "bg-slate-200" : ""
                  }`}
                >
                  <div className="relative mr-3">
                    {group?.image?(
                        <img
                        src={group?.image}
                        alt={group?.name}
                       className="w-10 h-10 rounded-full object-cover"
                       />
                    ):(
                      <div  className="flex h-10 w-10 items-center justify-center rounded-full font-semibold bg-blue-600/70 text-white">
                        {group?.name?.charAt(0).toUpperCase() + group.name.charAt(1) || "X"}
                      </div>)}
                  </div>
                    <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{group?.name}</h3>

              <p className="text-sm text-base-content/70 truncate">
               The is the last message or text
                {/* {group?.lastMessage.text} */}
              </p>
            </div>
              {group?.unreadCount > 0 && (
              <span className="bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {group?.unreadCount}
              </span>
                  )}

                </button>



        )} ):<p className="flex items-center text-2xl">No Groups🧹</p>}
      </aside>
      
    </div>
  );
}