import React from 'react'
import GroupChat from './groupChat';
import { IndividualChats } from './individualChat';



import NoConversation from './NoConversation';
import { chatStore, useGroupStore } from '../../../../packages/api/src/store';




  export const Chat = () => {


    const selectedContact = chatStore(state => state.selectedContact);

    const selectedGroup = useGroupStore( state => state.selectedGroup);

 

    if (selectedGroup) {
        return <GroupChat/>
    }

    return <IndividualChats/>
}