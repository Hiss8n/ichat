import { create } from 'zustand';
import { BACKEND_URL } from '../API/api';
import { authStore } from './authStore';
import { Socket } from 'socket.io-client';

export const chatStore = create((set,get) => ({
  contacts: [],
  queryContacts:[],
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
  
    if(!selectedContact||!token ) return;
    const userId=selectedContact?.userId;
    try {
      const response = await fetch(`${BACKEND_URL}/api/message/send/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
     
        set({messages:messages!==null? [...messages, data.message]:[data.messages]});
  
      return true;
    } catch (error) {
      console.log('Error sending message', error);
      
    }
  },
  searchForContact:async(searchTerm)=>{
    const token = authStore.getState().token;
    try {
      const response=await fetch(`${BACKEND_URL}/api/contact/search?searchTerm=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
           headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        }
        },
       
       
      )
      const data= await response.json()
      set({queryContacts:data.contacts});

      return 
      
    } catch (error) {
      console.log("something went wrong",error)
      
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
    const userId=selectedContact.userId
  set({isMessageLoading:true});
    try {
      
    const response=await fetch(`${BACKEND_URL}/api/message/${userId}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      }
    });

    const data= await response.json();
    set({...messages,messages:data.messages});
    return true
    } catch (error) {
      console.log('Something went wrong',error);
      
    } finally{
      set({isMessageLoading:false});
    }
  },
  subscribeToMessages:async(receiverId)=>{
    
    if (!receiverId) return;
    const socket=authStore.getState().socket;
   
  /*   socket.off("newMessage"); */
    socket.on("newMessage",(newMessage)=>{
      
      console.log('instant Msg',newMessage);
      console.log("usId",receiverId)
      console.log("nmSender",newMessage.sender);
      console.log("intand text",newMessage);

        if(String(newMessage.sender)!==String(receiverId)) return;
      set((state) => ({
      messages:(state.messages!==null) ?[...state.messages, newMessage]:[messages,newMessage],
    })); 
    /*   get().getMyContacts(); */
    })
    
  },
  unsubscribeToMessages:async()=>{
    console.log("Unsubs")
  }

}));
