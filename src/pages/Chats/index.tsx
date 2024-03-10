import './styles.scss';
import Layout from '@components/Layout';
import ChatsContainer from '@components/ChatsContainer';
import ChatContainer from '@components/ChatContainer';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


export default function ChatPage() {

  const themeStore = useSelector((state: StoreState) => state.theme);

  const [searchParams] = useSearchParams();
  const [chatId, setChatId] = useState<null | string>(searchParams.get("id"));

  useEffect(()=>{
    setChatId(searchParams.get("id"))
  }, [searchParams]);

  const isSmallScreen = useMediaQuery({
    query: '(max-width: 576px)'
  });

  return (
    <Layout>
      <main className='chats-page' data-theme={themeStore.selectedTheme}>
        {(!isSmallScreen || (isSmallScreen && !chatId)) && //mostrar se for tela grande ou tela pequena sem chat selecionado
          <ChatsContainer />
        }
        {(!isSmallScreen || chatId) && //mostrar se for tela grande ou se tiver chat selecionado
          <ChatContainer chatId={chatId}/>
        }
      </main>
    </Layout>
  )
}