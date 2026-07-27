import React, { useState } from 'react'
import { chatStore } from '../store/chatStore';
import { authStore } from '../store/authStore';

function GroupContactList() {


     const user = authStore((state) => state.user);
      const users = authStore((state) => state.users);
      const selectedContact = chatStore((state) => state.selectedContact);
      const setSelectedContact = chatStore((state) => state.setSelectedContact);
      const contacts = chatStore((state) => state.contacts);
      const addContact = chatStore((state) => state.addContact);
      const onlineUsers = authStore((state) => state.onlineUsers);


      const [isChecked,setIsChecked]=useState(false);

      const handleAddToGroup=(contact)=>{

        let member=0
        setIsChecked(!isChecked);
    
        member++
        if(member.length<2){
            console.log("Cannot create a group with less than 2 Members")
            return
        } else{
         console.log('TO ADD',contact)
        }


        

      }
  return (
      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">

            {
              contacts?.length>=0? contacts?.map((contact) => {
              const isActive = contact.id === selectedContact?.id;
            /*   const isOnline = getOn(contact.id); */
            /*  const isChecked = onlineUsers.includes(contact?.userId) */
              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => handleAddToGroup(contact)}
                  className={`flex w-full items-center rounded-md px-2.5 py-2.5 text-left transition ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="relative mr-3 flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold`}>
                      {contact.name?.charAt(0).toUpperCase()}
                    
                    </div>
                     
                 
                      
            
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{contact.name}</p>
                    <p className='text-sm'>{contact?.email}</p>
                   
    
                  </div>
                   <input type='radio' className={`w-4 h-4 ${isChecked ? "bg-red-500":"bg-slate-600"}`} />
                </button>
              ); 

            }):(<p>Add you Contacts to add</p>)
              }

</div>
  )
}

export default GroupContactList
