

import {create, zustand} from 'zustand';


const authStore = create((set,get) => ({
  user: null,
  checkingAuth: true,

  register: async (name, email, password) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: {  
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (data.user) {
            set({ user: data.user });
        }
    }catch(error){
        console.error('Error during registration:', error);
    }
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));