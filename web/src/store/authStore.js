import { BACKEND_URL } from '../API/api';

import {create} from 'zustand';


export const authStore = create((set) => ({
  user: null,
  token: null,
  checkingAuth: true,

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
      let parsedUser = null;

      if (storedUser) {
        try {
          parsedUser = JSON.parse(storedUser);
        } catch (error) {
          console.log('Invalid stored user data', error);
        }
      }

      set({ user: parsedUser, token: storedToken });
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

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token });
      }

      return data;
    } catch (error) {
      console.log('Error login in', error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, token: null });
    } catch (error) {
      console.log('cannot log out now', error);
    }
  },
}));