import React, { useEffect, useState } from 'react'
import { authStore, useGroupStore,chatStore } from '../../../../packages/store/src';


function GroupContactList() {


     const user = authStore((state) => state.user);
      const users = authStore((state) => state.users);
      const contacts = chatStore((state) => state.contacts);
      const addContact = chatStore((state) => state.addContact);
      const onlineUsers = authStore((state) => state.onlineUsers);
    
      const addedContact=useGroupStore((state)=>state.addedContact);
      const setAddedContact=useGroupStore((state)=>state.setAddedContact);
      const addToNewMembers=useGroupStore((state)=>state.addToNewMembers);
      const newMembers=useGroupStore((state)=>state.newMembers);
      const brightColors = [
  "#FF5733", // Bright Orange
  "#FF1493", // Deep Pink
  "#00E5FF", // Bright Cyan
  "#39FF14", // Neon Green
  "#FFD700", // Gold
  "#FF00FF", // Magenta
  "#00FF7F", // Spring Green
  "#FF4500", // Orange Red
  "#7CFC00", // Lawn Green
  "#1E90FF", // Dodger Blue
  "#FF69B4", // Hot Pink
  "#00FA9A", // Medium Spring Green
  "#FF6347", // Tomato
  "#40E0D0", // Turquoise
  "#FFFF00", // Yellow
  "#8A2BE2", // Blue Violet
  "#FF6EC7", // Bright Pink
  "#00BFFF", // Deep Sky Blue
  "#ADFF2F", // Green Yellow
  "#FFA500", // Orange
];

const getRandomBg = (id) => {
  // Convert the id string into a number
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return brightColors[hash % brightColors.length];
};

  const handleAddToGroup=(contact)=>{
        setAddedContact(contact?.id);
        addToNewMembers(contact?.id);

    /*     if(newMembers.length>2){

      alert("You can't create a group with less than 2 people")
      return
        } else{
          alert("Created successfull")
        } */

    }

  return (
      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">

            {
              contacts?.length>=0? contacts?.map((contact) => {
              const isAdded =newMembers.includes(contact?.id);
     
            /*   const isOnline = getOn(contact.id); */
            /*  const isChecked = onlineUsers.includes(contact?.userId) */
              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => handleAddToGroup(contact)}
                  className="flex w-full items-center rounded-md px-2.5 py-2.5 text-left transition"
                >
                  <div className="relative mr-3 flex items-center justify-between">
                    <div
                      style={{ backgroundColor: getRandomBg(contact?.id) }}
                     className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold `}>
                      {contact.name?.charAt(0).toUpperCase()}
                    
                    </div>

                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{contact?.name}</p>
                    <p className='text-sm'>{contact?.email}</p>
                  </div>
                   <input type='radio' className={`w-3 h-3 mb-4 ${isAdded ? "accent-green-400":"accent-slate-50"}`} />
                </button>
              ); 

            }):(<p>Add you Contacts to add</p>)
              }

</div>
  )
}

export default GroupContactList
