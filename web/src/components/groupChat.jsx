import React, { useEffect, useRef } from 'react'
import { MessageInput } from './messageInput';
import { formatTime } from './individualChat';
import { chatStore } from '../store/chatStore';
import { useGroupStore } from '../store/groupsStore';
import { authStore } from '../store/authStore';

function GroupChat() {
  const user =authStore((state)=>state.user);
   const messageRef=useRef(null);
  
    const selectedContact = chatStore((state) => state.selectedContact);
    const selectedGroup = useGroupStore((state) => state.selectedGroup);
    const groupsMessages = useGroupStore((state) => state.groupsMessages);
    const setSelectedContact = chatStore((state) => state.setSelectedContact);

    console.log("convers::",groupsMessages);


    useEffect(()=>{
      messageRef?.current?.scrollIntoView({
       behavior: "smooth",
        });
    },[groupsMessages]);


  return (
   <main className="flex w-full flex-1 items-center justify-center bg-white p-4 lg:w-full lg:p-8">
            { selectedGroup ? (
            <div className="flex h-full w-full flex-col">
              <div className="mb-4 flex items-center border-b border-slate-200 pb-4">
                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                  {selectedGroup?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{selectedGroup.name}</h2>
                  <p className="text-sm text-slate-500">{selectedGroup.description}</p>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto rounded-sm bg-slate-50 p-4 scrollbar-hide">
                {groupsMessages?.length > 0 ? (
                  groupsMessages?.map((message) => {
                    const me=user?.id || user?.id
                    const isMine = String(message?.sender?._id || message?.sender) === String(me);
                    const sender = message?.sender?.name || (isMine ? user?.name : selectedGroup?.name);
                    const avatarLabel = sender?.charAt(0)?.toUpperCase() || '?';
                    const messageTime = formatTime(message?.createdAt || message?.updatedAt);
                    return (
                      <div
                        key={message?._id || message._id || message?.createdAt}

                        className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[80%] items-end gap-3 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 sm:flex">
                            {avatarLabel}
                          </div>
                          <div className={`rounded-[4px] border px-4 py-1  text-sm shadow-sm ${isMine ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900 border-slate-200'}`}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
                                {sender}
                              </p>
                             
                            </div>
                            <div className="whitespace-pre-line break-words text-sm leading-6">
                                {message?.image ? (
                              <img src={message?.image} alt="sent media" className="mt-3 w-full rounded-lg object-cover" />
                            ) : null}
                            {message?.video ? (
                              <video controls src={message?.video} className="mt-3 w-full rounded-lg object-cover" />
                            ) : null}
                              {message?.text || 'Sent a message'}

                              
                                 {messageTime ? (
                                <p className={`text-[8px] top-8 ${isMine ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {messageTime}
                                </p>
                              ) : null}
                            
                               
                            </div>
                        
                          </div>
                        </div>
                         <div ref={messageRef}/>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex h-full items-center justify-center text-center text-sm text-slate-500">
                    Start a conversation with {selectedGroup?.name}.
                  </div>
                )}
                
              </div>
              <div>
              <MessageInput/>

              </div> 
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
               {/*  <MessageCircleQuestionMark size={156} color="#2065ee" /> */}
              <h2 className="text-2xl font-semibold text-slate-800">No group selected</h2>
              <p className="mt-2 text-sm text-slate-500">Tap a group  conversation.</p>
            </div>
          )}
    </main>
  
  )
}

export default GroupChat