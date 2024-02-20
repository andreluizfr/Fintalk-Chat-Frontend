import './styles.scss';

import { CiSearch } from "react-icons/ci";
import { RiChatForwardLine } from "react-icons/ri";

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { createChat } from '@store/redux/features/chatSlice';

import Chat from '@entities/Chat';

import { v4 as uuidv4 } from 'uuid';

interface props {
  setChatId: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ChatsContainer({setChatId}: props) {

  const dispatch = useDispatch();

  const themeStore = useSelector((state: StoreState) => state.theme);

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
          <img 
            className='creat-chat-icon'
            src="https://cdn.icon-icons.com/icons2/3412/PNG/512/chat_add_icon_217458.png"
            alt="enter or create chat"
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
        <main className='chats' data-theme={themeStore.selectedTheme}>

          {chats.map(chat=>{
            console.log(chat);
            const lastMessage = chat.messages.length > 0 ? 
              chat.messages[chat.messages.length-1]
              : null;
            console.log(lastMessage);
            return (
              <article className='chat' key={chat.id} onClick={()=>setChatId(chat.id)}>
                <img 
                  className='chat-icon'
                  src={chat.icon} 
                  alt='chat icon'
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
        <main className='chats' data-theme={themeStore.selectedTheme}>
          {"Você ainda não participa de nenhum grupo :("}
        </main>
      }

      <div className='new-chat-modal-background' ref={newChatModal} onClick={()=>hideModal()}>
        <article className='new-chat-modal' onClick={(e)=>e.stopPropagation()}>
          <form className='create-chat-wrapper' data-theme={themeStore.selectedTheme}>
            <input className='chat-name-input' placeholder='Enter the chat name' ref={chatNameInput}/>
            <img 
              className='create-chat-icon'
              src="https://cdn.icon-icons.com/icons2/3412/PNG/512/chat_add_icon_217458.png"
              alt="create chat"
              onClick={createNewChat}
            />
          </form>

          <div className='all-chats'>

            {allChats.length > 0 && allChats.map(chat=>
              <div className='chat-wrapper'>
                <p className='chat-name'>{chat.name}</p>
                <RiChatForwardLine className='enter-chat-icon' />
              </div>
            )} 
          
            {
              allChats.length == 0 && "Nenhum chat disponível"
            } 

          </div>
        </article>
      </div>

    </aside>
  )
}