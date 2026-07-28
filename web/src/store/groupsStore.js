import { create } from "zustand";
import { BACKEND_URL } from "../API/api";


export const useGroupStore= create((set,get)=>({
    addedContact:null,
    newMembers:[],
    allGroups:[],

    setAddedContact:(addedContact) => set({ addedContact }),

    addToNewMembers:(addedContact)=>{
         const newMembers = get().newMembers || [];

        const updatedMembers = newMembers.includes(addedContact)
        ? newMembers.filter(id => id !== addedContact)
        : [...newMembers, addedContact];

       set({ newMembers: updatedMembers });
    },
    createNewGroup:async(payload)=>{

         const token = authStore.getState().token;
        try {
            const response= await fetch(`${BACKEND_URL}/api/groups`,{
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    _id:payload._id,
                    name:payload.name,
                    email:payload.email,
                    createdAt:payload.createdAt | Date.now()
                })
            })

            const result =await response.json()

            get().getAllGroups()
            
        } catch (error) {
            console.log("Something went wrong",error)
            
        }
    },
    getAllGroups:async(id)=>{
        try {
            const response=await fetch(`${BACKEND_URL}/api/groups/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':"application/json",
                    Authorization:`Bearer ${token}`
                },
              
            })


            const data = await response.json()

            set({allGroups:data.groups})
            
        } catch (error) {
            console.log('Some thing went wrong,cant get groups',error)
            
        }
    }
    


}))