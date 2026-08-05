import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import AddContact from '../components/addContact';
import ContactList from '../components/contactList';
import SearchInput from '../components/searchInput';
import Groups from '../components/groups';
import CreateGroup from '../components/createGroup';
import { useGroupStore } from '../store/groupsStore';
import {Chat} from "../components/chat"


function HomePage() {

  const user = authStore((state) => state.user);
  const logout = authStore((state) => state.logout);
  const navigate = useNavigate();
 const getAllGroups = useGroupStore((state) => state.getAllGroups);

 useEffect(()=>{
  getAllGroups()
 },[])
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const displayName = user?.name || 'Guest User';
  const bio = user?.bio || 'Ready to chat';
  const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently joined';
  const profileInitial = displayName.charAt(0).toUpperCase();
  return (
    <div className="min-h-screen top-10 bg-slate-100 p-3 sm:p-4 md:p-6 ">
      <div className="mx-auto flex h-[90vh] max-w-7xl flex-col overflow-hidden rounded-sm border border-slate-200 bg-white md:flex-row">
        <aside className="flex w-full flex-col border-b border-slate-200 bg-slate-50 p-4 sm:w-1/5 lg:border-b-0 lg:border-r">
         {/* Profile */}
        <div className="mb-1 rounded-none border border-slate-200 bg-white p-1  shadow-sm">
            <div className="flex items-start">
              <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                {profileInitial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
                    <p className="truncate text-sm text-slate-500">{bio}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-xs whitespace-nowrap text-slate-400">Joined {createdAt}</p>
                    <button
                      onClick={handleLogout}
                      className="rounded-sm bg-red-500 px-2 py-1 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Add and contact email */}
          <div className="mb-1 h-9 flex items-center justify-between ">
            <div>
            <h1 className="text-sm font-semibold text-slate-600">My Contacts</h1>

            </div>
            <AddContact/>

        
          </div>

          <SearchInput/>
            
          <hr className="mb-3 border-slate-800 w-[100%]" />
           <ContactList/>

          
        </aside>
         <aside className="flex w-full flex-col border-b border-slate-200 bg-slate-50 p-4 sm:w-3/5 lg:border-b-0 lg:border-r">
           <Chat/>

         </aside>
      
         <aside className="flex w-full flex-col border-b border-slate-200 bg-slate-50 p-4 sm:w-1/5 lg:border-b-0 lg:border-r">
         <CreateGroup/>
         </aside>
        {/* Right handbar */}

       
      </div>
    </div>
  );
}

export default HomePage;
