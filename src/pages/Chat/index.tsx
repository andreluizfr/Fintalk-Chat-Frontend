import './styles.scss';
import ChatsContainer from '@components/ChatsContainer';
import ChatContainer from '@components/ChatContainer';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

export default function ChatPage() {

  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <main className='chat-page' data-theme={themeStore.selectedTheme}>
      <ChatsContainer />
      <ChatContainer />
    </main>
  )
}