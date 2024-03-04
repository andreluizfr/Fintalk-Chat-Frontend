import './styles.scss';

import MessageBar from '@components/MessageBar';

import Message from '@entities/Message';

import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { useEffect, useState } from 'react';

interface messageProps {
  index: number;
}
interface props {
  chatId: string | null;
  messages: Message[];
}

const ITEMS_LIMIT = 20;

export default function MessagesContainer({chatId, messages}: props) {
  
  const themeStore = useSelector((state: StoreState) => state.theme);
  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  const [messagesList, setMessagesList] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(1);

  function onScroll(event: React.UIEvent<HTMLElement>) {

    const { scrollTop, clientHeight, scrollHeight } = (event.target as HTMLElement);

    if ((-scrollTop) + clientHeight >= scrollHeight - 20) {
      renderMoreMessages();
    }
  }

  function lastIndex () {
    return messages.length>offset*ITEMS_LIMIT ? offset*ITEMS_LIMIT : messages.length;
  }

  function renderMoreMessages() {
    if(hasMore && !loading) {
      setOffset(prev=>prev+1);
      setLoading(true);
    }
  }

  useEffect(()=>{
    
    const lastMessageIndex = lastIndex();
    setTimeout(()=> {
      setMessagesList([...messagesList, ...messages.slice(messagesList.length, lastMessageIndex)]);
      setLoading(false);
    }, 500);

    if(lastMessageIndex === messages.length)
      setHasMore(false);

  }, [offset]);
  
  const Message = ({index}: messageProps) => {

    const selfieMessage = messagesList[index].sender === user?.email;

    return (
      <article className='message' id={"message"+index}>

        {selfieMessage ?
          <></>
          :
          <img
            className='user-icon'
            src="https://cdn-icons-png.freepik.com/512/1144/1144760.png"
            alt="message user icon"
          />
        }
  
        <div className='message-infos-wrapper' data-selfie-message={selfieMessage}>
          <div className='first-row'>
            {selfieMessage ?
              <></>
              :
              <span className='username' data-theme={themeStore.selectedTheme}>
                {messagesList[index].sender}
              </span>
            }
            <span className='time' data-theme={themeStore.selectedTheme}>
              {messagesList[index].time}
            </span>
          </div>
  
          <p className='message-text'>
            {messagesList[index].message}
          </p>
        </div>

      </article>
    );
  }   

  return (
    <main 
      className='messages-container'
      onScroll={onScroll}
    >
        
      {messagesList.map((_item, index)=><Message key={index} index={index}/>)}

      <MessageBar chatId={chatId} />

    </main>
  );
}