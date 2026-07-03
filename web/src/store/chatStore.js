import { create } from 'zustand';
import { BACKEND_URL } from '../API/api';
import { authStore } from './authStore';

export const chatStore = create((set,get) => ({
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

  sendMessage: async ( payload = {}) => {
    const token = authStore.getState().token;
    const user = authStore.getState().user;

    const {selectedContact,messages}=get();
    console.log("this selected",selectedContact);
    if(!selectedContact||!token ) return;
    const id=selectedContact._id||selectedContact.id
    try {
      const response = await fetch(`${BACKEND_URL}/api/message/send/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('sender $ receiver',selectedContact._id,user._id);
        set({messages: [...messages, data.message]});
  
      return true;
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
  getMessages:async()=>{
    const {selectedContact,messages}=get();
   
      const token = authStore.getState().token;
    if(!selectedContact||!token ) return;
    const id=selectedContact._id||selectedContact.id
  set({isMessageLoading:true});
    try {
      
    const response=await fetch(`${BACKEND_URL}/api/message/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      }
    });

    const data= await response.json();
    set({messages:data.messages});
    return true
    } catch (error) {
      console.log('Something went wrong',error)
      
    } finally{
      set({isMessageLoading:false});
    }
  }
}));
