import React, { useEffect, useMemo, useState } from 'react'
import { chatStore } from '../store/chatStore'
import { authStore } from '../store/authStore';
import { useGroupStore } from '../store/groupsStore';

function ContactList() {


  const token = authStore((state) => state.token);

  const user = authStore((state) => state.user);

  const selectedContact = chatStore((state) => state.selectedContact);
  const setSelectedContact = chatStore((state) => state.setSelectedContact);

  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);

  const contacts = chatStore((state) => state.contacts);
  const addContact = chatStore((state) => state.addContact);

  const getMessages = chatStore((state) => state.getMessages);
  const getMyContacts = chatStore((state) => state.getMyContacts);

  const onlineUsers=authStore((state)=>state.onlineUsers);

  const subscribeToMessages=chatStore((state)=>state.subscribeToMessages);
  const unsubscribeToMessages=chatStore((state)=>state.unsubscribeToMessages);

  const queryContacts=chatStore((state)=>state.queryContacts);




const [isActive,setIsActive]=useState(false);

useEffect(()=>{
  setSelectedContact(selectedContact);
  /*  getMessages(selectedContact?.userId); */

},[selectedContact,selectedContact]);

useEffect(()=>{
  subscribeToMessages(selectedContact?.userId);

   return ()=> unsubscribeToMessages();

},[selectedContact])

   useEffect(()=>{
    getMyContacts();
   },[token])

   const handleActiveContact=(contact)=>{
  setSelectedGroup(null);
  setSelectedContact(contact);
  



/*     if(selectedContact) setSelectedContact(null);
   setSelectedContact(contact); */
  getMessages(selectedContact?.userId|| contact?.userId);

   }


    const matchedIds = new Set(
             (queryContacts ?? []).map(contact => contact?._id)
            )

            const displayedContacts =[
  ...(queryContacts ?? []),
  ...(contacts ?? [])?.filter(
    contact => !matchedIds.has(contact._id)
  )
].sort((a, b) => {
               const aMatched = matchedIds.has(a._id);
              const bMatched = matchedIds.has(b._id);

            if (aMatched === bMatched) return 0; // keep their relative order
            return aMatched ? -1 : 1;            // matched contacts go first
            });

  return(
    <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">

            {
              contacts?.length>=0? displayedContacts.map((contact) => {
              const isActive = contact.id === selectedContact?.id;
            /*   const isOnline = getOn(contact.id); */
             const isOnline = onlineUsers.includes(contact?.userId)
              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => handleActiveContact(contact)}
                  className={`flex w-full items-center rounded-md px-3 py-3 text-left transition ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="relative mr-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                      {contact.name?.charAt(0).toUpperCase()}
                    </div>
                    {isOnline && (
                      <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" title="Online" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{contact.name}</p>
                    <p className='text-sm'>{contact?.email}</p>
                  </div>
                </button>
              ); 

            }):(<p>Add you Contacts</p>)
              }

</div>
  )      
}

export default ContactList