import { BACKEND_URL } from '../API/api';
import { create } from 'zustand';
import {io} from "socket.io-client"
import { chatStore } from './chatStore';


export const authStore = create((set,get) => ({
  user: null,
  token: null,
  users:[],
  checkingAuth: true,
  socket:null,
  onlineUsers:[],

  register: async (name, email, password) => {
    set({ checkingAuth: true });
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      get().connectSocket(data.user);

      

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token });
      }
      

      return data;
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const myUser=JSON.parse(storedUser)
      set({ user: myUser, token: storedToken });
      get().connectSocket(myUser);
       set({ checkingAuth: false });
      return Boolean(storedToken);
    } catch (error) {
      console.log('There is error in auth', error);
      set({ user: null, token: null });
      return false;
    } finally {
      set({ checkingAuth: false });
    }
  },

  login: async (email, password) => {
    set({ checkingAuth: true });
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
       get().connectSocket(data.user);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token });
      }
     /*  get().connectSocket(data.user) */

      return data;
    } catch (error) {
      console.log('Error login in', error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  logout: async () => {
       get().dissconnectSocket();
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, token: null });
   
    } catch (error) {
      console.log('cannot log out now', error);
    }
  },
  getUsers:async()=>{
    set({checkingAuth:true});
    const {token}=get()
    try{
      const response= await fetch(`${BACKEND_URL}/api/auth/users`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          Authorisation:`Bearer ${token}`
        }
      })
      const data=await response.json()
      set({users:data.users,checkAuth:false})

    }catch(error){
      console.log('Error getting my users',error)
    }finally{
      set({checkAuth:false});
    }

  },
  
  connectSocket:(user)=>{

    if(!user ||get().socket?.connected) return;
    const socket=io(BACKEND_URL,{query:{userId:user._id}})
     //send message via socket io

  socket.on('newMessage', (message) => {
    const { selectedUser, getMessages } = chatStore.getState();

  if (
    selectedUser &&
    (message.sender === selectedUser.userId ||
     message.receiver === selectedUser._id)
  ) {
    getMessages(message);
  }
});

//get Online Users Instantly
    socket.on('onlineUsers',(userIds)=>{
      set({ onlineUsers:userIds});
    })
      set({socket});

  },

  dissconnectSocket:()=>{
    const socket=get().socket;
    if(socket?.connected) socket.disconnect();
    set({socket:null})
  }
}));
