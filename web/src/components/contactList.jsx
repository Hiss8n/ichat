import React, { useMemo, useState } from 'react'
import { chatStore } from '../store/chatStore'
const initialContacts = [
  {
    id: 1,
    name: 'Alicia',
    role: 'Product Designer',
    avatar: 'A',
    messages: [
      { id: 1, sender: 'them', text: 'Hi! Are we still on for the demo?' },
      { id: 2, sender: 'me', text: 'Absolutely. I will share the updated files soon.' },
    ],
  },
  {
    id: 2,
    name: 'Daniel',
    role: 'Frontend Engineer',
    avatar: 'D',
    messages: [
      { id: 1, sender: 'them', text: 'The new layout looks great.' },
    ],
  },
  {
    id: 3,
    name: 'Mina',
    role: 'Project Manager',
    avatar: 'M',
    messages: [
      { id: 1, sender: 'them', text: 'Please review the sprint update.' },
    ],
  },
];


function ContactList() {

  const addContact = chatStore((state) => state.addContact);
     const [contacts, setContacts] = useState(initialContacts);
      const [selectedContactId, setSelectedContactId] = useState(initialContacts[0].id);
        const [searchTerm, setSearchTerm] = useState('');

      const filteredContacts = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return contacts.filter((contact) => contact.name.toLowerCase().includes(term));
  }, [contacts, searchTerm]);

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId) || null;

  return(
    <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
            {filteredContacts.map((contact) => {
              const isActive = contact.id === selectedContactId;

              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelectedContactId(contact.id)}
                  className={`flex w-full items-center rounded-md px-3 py-3 text-left transition ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    {contact.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{contact.name}</p>
                    <p className={`truncate text-sm ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                      {contact.role}
                    </p>
                  </div>
                </button>
              );
            })}

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