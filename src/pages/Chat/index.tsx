import './styles.scss';
import Layout from '@components/Layout';
import ChatsContainer from '@components/ChatsContainer';
import ChatContainer from '@components/ChatContainer';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export default function ChatPage() {

  const themeStore = useSelector((state: StoreState) => state.theme);

  const [chatId, setChatId] = useState<null | string>(null);

  return (
    <Layout>
      <main className='chat-page' data-theme={themeStore.selectedTheme}>
        <ChatsContainer setChatId={setChatId}/>
        <ChatContainer chatId={chatId}/>
      </main>
    </Layout>
  )
}