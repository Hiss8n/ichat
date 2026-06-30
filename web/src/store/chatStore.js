import {create} from 'zustand';
import {BACKEND_URL} from '../API/api';

const chatStore = create((set) => ({
  contacts:[],
  messages: [],
  selectedContact: null,
  searchQuery:'',
  isContactLaoding: false,
  isMessageLoading: false,
  isSendingMedia: false,

  getContacts: async () => {
    set({isContactLaoding: true});
    try{
        const response=await fetch(`${BACKEND_URL}/contacts`);
        const contacts=await response.json();
        set({contacts, isContactLaoding: false});
    }catch(error){
        set({isContactLaoding: false});
    } finally {
        set({isContactLaoding: false});
    }
  }
 
}));

export default chatStore;