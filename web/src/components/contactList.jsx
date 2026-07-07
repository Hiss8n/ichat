import React, { useEffect, useMemo, useState } from 'react'
import { chatStore } from '../store/chatStore'
import { authStore } from '../store/authStore';

function ContactList() {


  const token = authStore((state) => state.token);
  const user = authStore((state) => state.user);
  const users = authStore((state) => state.users);
  const selectedContact = chatStore((state) => state.selectedContact);
  const setSelectedContact = chatStore((state) => state.setSelectedContact);
  const contacts = chatStore((state) => state.contacts);
  const addContact = chatStore((state) => state.addContact);
  const getMessages = chatStore((state) => state.getMessages);
  const getMyContacts = chatStore((state) => state.getMyContacts);
  const onlineUsers=authStore((state)=>state.onlineUsers);


  console.log("Online Users arr:",onlineUsers);
  console.log('My cont:',contacts)
  console.log('Reg users',user.email);






   const [isActive,setIsActive]=useState(false);
useEffect(()=>{
  setSelectedContact(selectedContact);
   getMessages(selectedContact?.email);

},[selectedContact,selectedContact]);

   useEffect(()=>{
    getMyContacts();
   },[token])

   const handleActiveContact=(contact)=>{
   setSelectedContact(contact);
  getMessages(selectedContact?.email|| contact?.email);

   }
  return(
    <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
            {contacts?.length>=0?contacts.map((contact) => {
              const isActive = contact.id === selectedContact?.id;
            /*   const isOnline = getOn(contact.id); */
             const isOnline = onlineUsers.includes(contact?.userId);
             
              

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

            }):(<p>Add you Contacts</p>)}


          {/*   <main className="flex w-full flex-1 items-center justify-center bg-white p-4 lg:w-3/4 lg:p-8">
          {selectedContact ? (
            <div className="flex h-full w-full flex-col">
              <div className="mb-4 flex items-center border-b border-slate-200 pb-4">
                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                  {selectedContact.avatar}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{selectedContact.name}</h2>
                  <p className="text-sm text-slate-500">{selectedContact.role}</p>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-4 scrollbar-hide">
                {selectedContact.messages.length > 0 ? (
                  selectedContact.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                          message.sender === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-700 shadow-sm'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center text-center text-sm text-slate-500">
                    Start a conversation with {selectedContact.name}.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800">No contact selected</h2>
              <p className="mt-2 text-sm text-slate-500">Tap a contact to start a conversation.</p>
            </div>
          )}
        </main> */}
          </div>
  )  
       
}

export default ContactList