import { BACKEND_URL } from '../API/api';

import {create} from 'zustand';


export const authStore = create((set,get) => ({
  user: null,
  token:null,
  checkingAuth: true,

  register: async (name, email, password) => {
    set({checkingAuth:true})
    try{
        const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: {  
            'Content-Type':'application/json',
            
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        console.log('data res',data);
        localStorage.setItem("token",data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user) {
            set({ user: data.user});
        }
        return data
    }catch(error){
        console.error('Error during registration:', error);
    } finally{
        set({checkingAuth:false})
    }
  },
  
  login:async(email,password)=>{
    set({checkingAuth:true})
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {  
            'Content-Type':'application/json',
            
            },
            body: JSON.stringify({  email, password })
        });
        const data = await response.json();
        localStorage.setItem("token",data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user) {
            set({ user: data.user});
        }
        return data
        
    } catch (error) {
        console.log('Error login in')
        
    }finally{
        set({checkingAuth:false})
    }
  },
  logout:async()=>{
    try {
        console.log('logout')
        
    } catch (error) {
        console.log('cannot log out now',error)
        
    }
  }
  
}));