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
  setSelectedContact: (selectedContact) => set({selectedContact}),

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
}));
