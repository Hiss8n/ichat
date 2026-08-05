import React from 'react'
import GroupChat from './groupChat';
import { IndividualChats } from './individualChat';

import { chatStore } from '../store/chatStore';
import { useGroupStore } from '../store/groupsStore';
import NoConversation from './NoConversation';




  export const Chat = () => {


    const selectedContact = chatStore(state => state.selectedContact);

    const selectedGroup = useGroupStore( state => state.selectedGroup);

 

    if (selectedGroup) {
        return <GroupChat/>
    }

    return <IndividualChats/>
}