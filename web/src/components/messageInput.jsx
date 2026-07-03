import { useState } from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import { chatStore } from '../store/chatStore';
import { authStore } from '../store/authStore';

export const MessageInput = () => {
     const user = authStore((state) => state.user);
  const [text, setText] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const selectedContact = chatStore((state) => state.selectedContact);
  const sendMessage = chatStore((state) => state.sendMessage);
  const getMessages = chatStore((state) => state.getMessages);

  const handleMediaChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

   
    const isImage = file.type.startsWith('image/');

    if (!isImage) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    const trimmedText = text.trim();
    if (!trimmedText && !mediaFile) return;
    setIsSending(true);

    try {
        const payload={
            sender:user?.email,
            receiver:selectedContact?.email,
            text:text,
            image:mediaFile,
            video:null
        }
      await sendMessage(payload);
      setText('');
      setMediaFile(null);
     
    } catch (error) {
      console.log('Error sending message from input', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
       getMessages(selectedContact?._id);
    }
  };

  return (
    <div className="mt-3 border-0 border-slate-200 pt-0 sticky">
      {mediaFile ? (
        <div className="mb-2 flex items-center justify-between rounded-md border border-slate-200 bg-slate-300 px-3 py-2 text-sm text-slate-600">
          <span>Attachment ready</span>
          <button
            type="button"
            onClick={() => {
              setMediaFile(null);
              setMediaType(null);
            }}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200"
          >
            <X size={16} />
          </button>
        </div>
      ) : null}

      <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50  p-2">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedContact ? 'Type a message...' : 'Select a contact to start chatting'}
          className="min-h-[44px] flex-1 resize-none border-0px-2 py-1 text-sm outline-none"
          rows={1}
          disabled={!selectedContact || isSending}
        />

        <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-slate-200">
          <Paperclip size={18} />
          <input type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaChange} />
        </label>

        <button
          type="button"
          onClick={handleSend}
          disabled={!selectedContact || isSending || (!text.trim() && !mediaFile)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
