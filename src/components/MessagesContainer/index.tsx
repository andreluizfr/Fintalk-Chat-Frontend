import './styles.scss';

import MessageBar from '@components/MessageBar';

import Message from '@entities/Message';

import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';

interface props {
  chatId: string | null;
  messages: Message[];
}

export default function MessagesContainer({chatId, messages}: props) {
  
  const themeStore = useSelector((state: StoreState) => state.theme);
  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  return (
    <main className='messages-container' data-theme={themeStore.selectedTheme}>

      {messages.map((message, index) => {
        if(message.sender === user?.email)
          return (
            <article className='message' key={index}>
              <div className='message-infos-wrapper' data-selfie-message>
                <div className='first-row'>
                  <span className='time' data-theme={themeStore.selectedTheme}>
                    {message.time}
                  </span>
                </div>

                <p className='message-text' data-selfie-message>
                  {message.message}
                </p>
              </div>
            </article>
          );
        else  
          return (
            <article className='message' key={index}>
              <img
                className='user-icon'
                src="https://cdn-icons-png.freepik.com/512/1144/1144760.png"
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

      <MessageBar chatId={chatId} />

    </main>
  );
}