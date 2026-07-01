import React, { useState, useRef, useEffect } from 'react'
import { chatStore } from '../store/chatStore'

function AddContact({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const panelRef = useRef(null)
  const addContact = chatStore((state)=>state.addContact)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const openModal = () => setOpen(true)
  const closeModal = () => {
    setOpen(false)
    setName('')
    setEmail('')
  }

 /*  const handleSubmit = async(e) => {
    e.preventDefault()
    if (typeof onAdd === 'function') onAdd(newContact)
    closeModal()
  } */

  const handleAddContact=async(e)=>{

    e.preventDefault();
  
    if (!name.trim() || !email.trim()) return;

    const res=await addContact(name,email);
  
    
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700"
        aria-label="Add contact"
      >
        +
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Add Contact</h3>
            <form  className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                onClick={handleAddContact}
                  type="submit"
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddContact