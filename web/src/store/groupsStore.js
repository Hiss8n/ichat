import { create } from "zustand";
import { BACKEND_URL } from "../API/api";
import { authStore } from "./authStore";
import { getAllGroups } from "../../../backend/controllers/group.controllers";
import { chatStore } from "./chatStore";


export const useGroupStore= create((set,get)=>({
    addedContact:null,
    newMembers:[],
    allGroups:[],
    oneGroup:null,
    groupName:"",
    createAgroup:false,
    selectedGroup:null,
    setAddedContact:(addedContact) => set({ addedContact }),
    setGroupName:(name) => set({ groupName:name }),


    setcreateAgroup:()=>{   
    const createAgroup=get().createAgroup
    set({createAgroup:!createAgroup});

    },
    setSelectedGroup:(group)=>set({selectedGroup:group}),

    addToNewMembers:async(addedContact)=>{
    const newMembers = get().newMembers || [];

        const updatedMembers = newMembers.includes(addedContact)
        ? newMembers.filter(id => id !== addedContact)
        : [...newMembers, addedContact];

       set({ newMembers: updatedMembers });
    },
    createNewGroup:async(groupName)=>{
        const token = authStore.getState().token;
        const groupMembers=get().newMembers
        console.log("mmbers",groupMembers);
        console.log("name:",groupName);
        try {
            const response= await fetch(`${BACKEND_URL}/api/groups`,{
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    name:groupName,
                    members:groupMembers,
                    createdAt:Date.now()
                })
            })

            const result =await response.json()
           console.log(result); 
           set({allGroups:allGroups!==null? [...allGroups, result]:[result]});

            get().getAllGroups() 
            
        } catch (error) {
            console.log("Something went wrong",error)
            
        }
    },
    clearNewMembers: () => {
     set({ newMembers: [] });
      },
    getAllGroups:async()=>{
          const token = authStore.getState().token;
        try {
            const response=await fetch(`${BACKEND_URL}/api/groups`,{
                method:'GET',
                headers:{
                    'Content-Type':"application/json",
                    Authorization:`Bearer ${token}`
                },
              
            })


            const data = await response.json();
            

        set({allGroups:data})
            
        } catch (error) {
            console.log('Some thing went wrong,cant get groups',error)
            
        }
    }
    


}))