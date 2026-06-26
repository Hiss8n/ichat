import React, { useState } from 'react'
import {MessageCircleQuestionMark} from 'lucide-react';

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


export const Chats = () => {
       const [contacts, setContacts] = useState(initialContacts);
          const [selectedContactId, setSelectedContactId] = useState(null);
 const selectedContact = contacts.find((contact) => contact.id === selectedContactId) || null;


  return (
    <main className="flex w-full flex-1 items-center justify-center bg-white p-4 lg:w-3/4 lg:p-8">
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
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <MessageCircleQuestionMark size={156} color="#2065ee" />
              <h2 className="text-2xl font-semibold text-slate-800">No contact selected</h2>
              <p className="mt-2 text-sm text-slate-500">Tap a contact to start a conversation.</p>
            </div>
          )}
        </main>
       
  )
}
