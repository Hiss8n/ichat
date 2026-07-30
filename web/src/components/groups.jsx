import { useState } from "react";
import { groupMessages } from "../API/data/groupdMessages";
/* import { groups } from "../API/data/groups"; */
import { useGroupStore } from "../store/groupsStore";


export default function Groups() {



    const getAllGroups = useGroupStore((state) => state.getAllGroups);
        const allGroups = useGroupStore((state) => state.allGroups);
  const groups=allGroups!==null?allGroups:[]



 console.log('grps:here:',allGroups);





  const [selectedGroup, setSelectedGroup] = useState(null);
  return (
    <div className="flex h-full bg-base-1000 ">
      {/* Sidebar */}
      <aside className="w-50 border-r border-base-300 overflow-y-auto bg-base-100">
       
        {groups?.map((group) => (
                 <button
                  key={group._id}
                   onClick={() => setSelectedGroup(group)}
                  type="button"
                
                  className={`flex w-full items-center rounded-md px-3 py-3 text-left transition ${
                    selectedGroup?._id === group?._id ? "bg-base-200" : ""
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













        /*   <div
            key={group._id}
            onClick={() => setSelectedGroup(group)}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-base-200 ${
             selectedGroup?._id === group?._id ? "bg-base-200" : "" 
            }`}
          >
            <img
              src={group?.profilePic}
              alt={group?.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{group?.name}</h3>

              <p className="text-sm text-base-content/70 truncate">
                {group?.lastMessage.text}
              </p>
            </div>

            {group?.unreadCount > 0 && (
              <span className="bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {group?.unreadCount}
              </span>
            )}
          </div> */

        ))}
      </aside>
      
    </div>
  );
}