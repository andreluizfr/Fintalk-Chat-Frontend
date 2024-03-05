import './styles.scss';

import MessagesContainer from '@components/MessagesContainer';
import ChatHeader from '@components/ChatHeader';

import { GetMessagesService } from '@services/GetMessages/GetMessagesService';

import useChat from '@hooks/useChat';

import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { useMemo } from 'react';

interface props {
  chatId: string | null
}

export default function ChatContainer({chatId}: props) {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  const { chat, messages, membersQuantity } = useChat(chatId);
 
  GetMessagesService(chatId, membersQuantity);

  const allMessages = useMemo(()=>[...messages].reverse(), [messages]);
  
  if(chat)
    return (
      <article className='chat-container'>
        <ChatHeader chatName={chat?.name} membersQuantity={membersQuantity} />
        <MessagesContainer chatId={chatId} messages={allMessages} />
      </article>
    );
  
  else
    return (
      <article className='chat-container' data-theme={themeStore.selectedTheme}>
        <p className='empty-chats-message' data-theme={themeStore.selectedTheme}>{languageStore.messages.noChatSelected}</p>
      </article>
    );
}