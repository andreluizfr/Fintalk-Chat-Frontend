import './styles.scss';

import { LuSticker } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { addMessage } from '@store/redux/features/chatSlice';

import { v4 as uuidv4 } from 'uuid';

import { GetMessagesService } from '@services/GetMessages/GetMessagesService';
import Message from '@entities/Message';
import Chat from '@entities/Chat';

interface props {
  chatId: string | null
}

export default function ChatContainer({chatId}: props) {
  
  const dispatch = useDispatch();

  const themeStore = useSelector((state: StoreState) => state.theme);

  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  const chatStore = useSelector((state: StoreState) => state.chat);

  const chat = (chatStore.chats.find(chat=>chat.id===chatId) !== undefined)?
    (chatStore.chats.find(chat=>chat.id===chatId) as Chat)
    : null;

  const messages = (chat !== null)?
    (chat?.messages as Message[])
    : ([] as Message[]);

  const membersQuantity = (chat !== null)?
    (chat?.membersQuantity as number)
    : 1;

  GetMessagesService(chatId, membersQuantity);

  const expandingTextarea = useRef<HTMLTextAreaElement | null>(null);

  function adjustSize(e: React.FormEvent<HTMLTextAreaElement>) {

    const el = e.target as HTMLTextAreaElement;

    el.style.height = 'auto';

    if (el.scrollHeight > el.clientHeight) 
      el.style.height = el.scrollHeight + 'px';
  }
  
  function dispatchNewMessageFromTextarea() {
    console.log(chat);
    console.log(messages);

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

  if(chat === null)
    return (
      <article className='chat-container' data-theme={themeStore.selectedTheme}>
        Nenhum chat selecionado
      </article>
    )
  
  else
    return (
      <article className='chat-container'>
        <header className='chat-container-header' data-theme={themeStore.selectedTheme}>
          <img 
            className='chat-icon'
            src="https://static.vecteezy.com/ti/vetor-gratis/p3/3769720-group-chat-linear-icon-thin-line-illustration-chat-box-com-grupo-de-pessoas-dentro-do-contorno-simbolo-isolado-esboco-desenho-vetor.jpg"
            alt="chat icon"
          />

          <div className='chat-infos'>
            <h1 className='chat-name' data-theme={themeStore.selectedTheme}>
              {chat?.name}
            </h1>

            <span className='members' data-theme={themeStore.selectedTheme}>
              {membersQuantity} members
            </span>
          </div>

          <div className='chat-options'>
            <img
              className='options-icon'
              src="https://cdn2.iconfinder.com/data/icons/communication-vector-for-business/2000/Icon_15-512.png" 
              alt="more options icon"
            />
          </div>
        </header>

        <main className='messages-container' data-theme={themeStore.selectedTheme}>
          {messages.map((message, index) => {
            if(message.sender === user?.email)
              return (
                <article className='message' data-selfie-message key={index}>
                  <p className='message-text' data-selfie-message>
                    {message.message}
                  </p>
                </article>
              );
            else  
              return (
                <article className='message' key={index}>
                  <img
                    className='user-icon'
                    src="https://static.vecteezy.com/system/resources/previews/007/033/152/non_2x/users-people-icon-vector.jpg" 
                    alt="message user icon"
                  />

                  <div className='message-infos-wrapper'>
                    <div className='first-row'>
                      <span className='username' data-theme={themeStore.selectedTheme}>
                        {message.sender}
                      </span>
                      <span className='time' data-theme={themeStore.selectedTheme}>
                        {message.time}
                      </span>
                    </div>

                    <p className='message-text'>
                      {message.message}
                    </p>
                  </div>
                </article>
              );
          })}
        </main>

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
      </article>
    )
}