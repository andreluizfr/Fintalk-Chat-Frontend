import './styles.scss';

import { LuSticker } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { addMessage } from '@store/redux/features/chatSlice';

import Message from '@entities/Message';

import { v4 as uuidv4 } from 'uuid';

interface props {
  chatId: string | null
}

export default function MessageBar({chatId}: props) {

  const dispatch = useDispatch();

  const themeStore = useSelector((state: StoreState) => state.theme);
  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  const expandingTextarea = useRef<HTMLTextAreaElement | null>(null);

  function dispatchNewMessageFromTextarea() {

    if(expandingTextarea.current && user) {
      const time = new Date();
      const hours = (time.getHours() < 10)? "0"+time.getHours() : time.getHours();
      const minutes = (time.getMinutes() < 10)? "0"+time.getMinutes() : time.getMinutes();

      const message = {
        id: uuidv4(),
        sender: user.email,
        message: expandingTextarea.current.value,
        time: hours+":"+minutes
      } satisfies Message;

      dispatch(addMessage({chatId: chatId, message: message}));

      expandingTextarea.current.value = "";
    }
  }

  function adjustSize(e: React.FormEvent<HTMLTextAreaElement>) {

    const el = e.target as HTMLTextAreaElement;

    el.style.height = 'auto';

    if (el.scrollHeight > el.clientHeight) 
      el.style.height = el.scrollHeight + 'px';
  }

  function dontSkipLine(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13 || e.key === 'Enter') {
      e.preventDefault();
    }
  }

  function checkEnterToSendMessage(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13 || e.key === 'Enter') {
      dispatchNewMessageFromTextarea();
    }
  }

  return (
    <aside className='message-writing-bar'>
      <LuSticker className='sticker-icon' data-theme={themeStore.selectedTheme}/>
      <textarea 
        className='expanding-textarea' 
        placeholder='Write a message...' 
        rows={1}
        ref={expandingTextarea}
        onChange={(e)=>adjustSize(e)}
        onKeyDown={(e)=>dontSkipLine(e)}
        onKeyUp={(e)=>checkEnterToSendMessage(e)}
      />
      <IoMdSend className='send-icon' onClick={()=>dispatchNewMessageFromTextarea()} data-theme={themeStore.selectedTheme}/>
    </aside>
  )
}