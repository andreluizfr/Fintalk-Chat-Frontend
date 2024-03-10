import './styles.scss';

import Message from '@entities/Message';

import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';

interface props {
  message: Message;
}

export default function MessageContainer({ message }: props) {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  const selfieMessage = message.sender === user?.email;

  return (
    <article className='message' id={"message"+message.id}>

      {selfieMessage ?
        <></>
        :
        <img
          className='user-icon'
          src="https://cdn-icons-png.freepik.com/512/1144/1144760.png"
          alt="message user icon"
          data-theme={themeStore.selectedTheme}
        />
      }

      <div className='message-infos-wrapper' data-selfie-message={selfieMessage}>
        <div className='first-row'>
          {selfieMessage ?
            <></>
            :
            <span className='username' data-theme={themeStore.selectedTheme}>
              {message.sender}
            </span>
          }
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
}