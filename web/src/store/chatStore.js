import { create } from 'zustand';
import { BACKEND_URL } from '../API/api';
import { authStore } from './authStore';

export const chatStore = create((set) => ({
  contacts: [],
  messages: [],
  selectedContact: null,
  searchQuery: '',
  isContactLaoding: false,
  isMessageLoading: false,
  isSendingMedia: false,
  isSendingMessage:false,

  addContact: async (name, email) => {
    const user = authStore.getState().user;
    const token = authStore.getState().token;
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();
      console.log('added contact', data);
      return data;
    } catch (error) {
      console.log('Error occured adding contact', error);
    }
  },
  setSelectedContact: (selectedContact) => set({ selectedContact }),

  sendMessage: async (receiverId, payload = {}) => {
    const token = authStore.getState().token;

    if (!token || !receiverId) return null;

    try {
      const response = await fetch(`${BACKEND_URL}/api/message/send/${receiverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data?.message) {
        set((state) => ({
          messages: [...state.messages, data.message],
          selectedContact:
            state.selectedContact &&
            (state.selectedContact._id === receiverId || state.selectedContact.id === receiverId)
              ? {
                  ...state.selectedContact,
                  messages: [...(state.selectedContact.messages || []), data.message],
                }
              : state.selectedContact,
        }));
      }

      return data;
    } catch (error) {
      console.log('Error sending message', error);
      return null;
    }
  },

  getMyContacts: async () => {
    set({ isContactLaoding: true });
     const user = authStore.getState().user;
    const token = authStore.getState().token;
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact/me`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        }
      });
      const data = await response.json();

     
      set({ contacts:data.contacts, isContactLaoding: false });
       
    } catch (error) {
      set({ isContactLaoding: false });
    } finally {
      set({ isContactLaoding: false });
    }
  },
  getMessages:async(selectedContactId)=>{
  set({isMessageLoading:true})
      const token = authStore.getState().token;

    if (!token || !selectedContactId) return null;
    const response=await fetch(`${BACKEND_URL}/api/message/${selectedContactId}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      }
    });

    const data= await response.json();
    console.log("Here are the msgs with the sletec con:",data.messages);

    set({message:data.messages});

    try {
      
    } catch (error) {
      console.log('Something went wrong',error)
      
    } finally{
      set({isMessageLoading:false});
    }
  }
}));
