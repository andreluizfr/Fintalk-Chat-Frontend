import './styles.scss';

import { CiSearch } from "react-icons/ci";
import { RiChatForwardLine } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { RiChatNewFill } from "react-icons/ri";

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { createChat } from '@store/redux/features/chatSlice';
import { useNavigate } from 'react-router-dom';

import Chat from '@entities/Chat';

import { v4 as uuidv4 } from 'uuid';

export default function ChatsContainer() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  const chatStore = useSelector((state: StoreState) => state.chat);
  const allChats = chatStore.chats;
  const chats = user ? allChats.filter(chat=>chat.members.find(member=>member.email===user.email)?true:false) : [];

  const newChatModal = useRef<HTMLDivElement | null>(null);
  const chatNameInput = useRef<HTMLInputElement | null>(null);

  function createNewChat() {
    
    const randomMembersNumber = Math.floor((Math.random() * 9) + 2);

    if(user && chatNameInput.current && chatNameInput.current.value.length > 0){
      const chat = {
        id: uuidv4(),
        name: chatNameInput.current.value,
        icon: "https://cdn-icons-png.flaticon.com/512/5327/5327004.png",
        membersQuantity: randomMembersNumber,
        members: [user],
        messages: []
      } satisfies Chat;
      
      dispatch(createChat(chat));
    }
  }

  function showModal() {
    if(newChatModal?.current)
      newChatModal.current.style.visibility = 'visible';
  }

  function hideModal() {
    if(newChatModal?.current)
      newChatModal.current.style.visibility = 'hidden';
  }

  return (
    <aside className='chats-container' data-theme={themeStore.selectedTheme}>

      <header className='chats-header' data-theme={themeStore.selectedTheme}>
        <div className='chats-header-toolbar'>
          <h1 className='title' data-theme={themeStore.selectedTheme}>Messages</h1>
          <RiChatNewFill 
            className='creat-chat-icon'
            onClick={()=>showModal()}
            data-theme={themeStore.selectedTheme}
          />
        </div>

        <div className='search-input-wrapper'>
          <input className='search-input' placeholder='Search...'/>
          <CiSearch className='search-icon' />
        </div>
        
      </header>
      
      {chats.length > 0 &&
        <main className='chats'>

          {chats.map(chat=>{

            const lastMessage = chat.messages.length > 0 ? 
              chat.messages[chat.messages.length-1]
              : null;
  
            return (
              <article 
                className='chat' 
                key={chat.id} 
                data-theme={themeStore.selectedTheme}
                onClick={()=>navigate('/chats?id='+chat.id)}
              >
                <img 
                  className='chat-icon'
                  src={chat.icon} 
                  alt='chat icon'
                  decoding='async'
                />

                <ul className='chat-infos-wrapper'>
                  <li data-theme={themeStore.selectedTheme}>{chat.name}</li>
                  <li data-theme={themeStore.selectedTheme}>{lastMessage? lastMessage.time : ""}</li>
                  <li data-theme={themeStore.selectedTheme}>{lastMessage? (lastMessage.sender+": "+lastMessage.message) : ""}</li>
                  <li data-theme={themeStore.selectedTheme}>{""}</li> {/* notificação, número de mensagens não lidas*/}
                </ul>
              </article>
            )
          })}

        </main>
      }

      {chats.length === 0 &&
        <main className='chats'>
          <p className='empty-chats' data-theme={themeStore.selectedTheme}>{languageStore.messages.emptyChats}</p>
        </main>
      }

      <div className='new-chat-modal-background' ref={newChatModal} onClick={()=>hideModal()}>
        <article className='new-chat-modal' data-theme={themeStore.selectedTheme} onClick={(e)=>e.stopPropagation()}>
          <form className='create-chat-wrapper' data-theme={themeStore.selectedTheme}>
            <input className='chat-name-input' data-theme={themeStore.selectedTheme} placeholder='Enter the chat name' ref={chatNameInput}/>
            <IoAdd className='create-chat-icon' data-theme={themeStore.selectedTheme} onClick={createNewChat}/>
          </form>

          <div className='all-chats'>
            {allChats.length > 0 && allChats.map(chat=>
              <div className='chat-wrapper' key={'allchats-'+chat.id}>
                <p className='chat-name' data-theme={themeStore.selectedTheme}>{chat.name}</p>
                <RiChatForwardLine className='enter-chat-icon' data-theme={themeStore.selectedTheme}/>
              </div>
            )} 
            {
              allChats.length == 0 && languageStore.messages.allChatsEmpty
            } 
          </div>
        </article>
      </div>

    </aside>
  )
}