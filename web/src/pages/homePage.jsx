import { useMemo, useState } from 'react';

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

function HomePage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(initialContacts[0].id);

  const filteredContacts = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return contacts.filter((contact) => contact.name.toLowerCase().includes(term));
  }, [contacts, searchTerm]);

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId) || null;

  const addContact = () => {
    const newContact = {
      id: Date.now(),
      name: 'New Contact',
      role: 'New contact',
      avatar: 'N',
      messages: [],
    };

    setContacts((prev) => [newContact, ...prev]);
    setSelectedContactId(newContact.id);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto flex h-[90vh] max-w-7xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:flex-row">
        <aside className="flex w-full flex-col border-b border-slate-200 bg-slate-50 p-4 lg:w-1/4 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Messages</p>
              <h1 className="text-xl font-bold text-slate-900">Contacts</h1>
            </div>
            <button
              type="button"
              onClick={addContact}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700"
              aria-label="Add contact"
            >
              +
            </button>
          </div>

          <label className="mb-4 block">
            <span className="sr-only">Search contacts</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search contact"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
            />
          </label>

          <div className="flex-1 space-y-2 overflow-y-auto">
            {filteredContacts.map((contact) => {
              const isActive = contact.id === selectedContactId;

              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelectedContactId(contact.id)}
                  className={`flex w-full items-center rounded-2xl px-3 py-3 text-left transition ${
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
          </div>
        </aside>

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

              <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-4">
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
        </main>
      </div>
    </div>
  );
}

export default HomePage;
