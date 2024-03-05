import './styles.scss';

import MessageBar from '@components/MessageBar';

import Message from '@entities/Message';

import { RiArrowDropDownLine } from "react-icons/ri";

import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { useEffect, useRef, useState } from 'react';

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
  const [updateMessagesList, setUpdateMessagesList] = useState(true);

  function onScroll(event: React.UIEvent<HTMLElement>) {

    const { scrollTop, clientHeight, scrollHeight } = (event.target as HTMLElement);

    if ((-scrollTop) + clientHeight >= scrollHeight - 20) {
      fetchMoreMessages();
    }

    if((-scrollTop) === 0) {
      resetMessages();
    }
  }

  function lastIndex () {
    return messages.length>offset*ITEMS_LIMIT ? offset*ITEMS_LIMIT : messages.length;
  }

  function fetchMoreMessages() {
    if(hasMore && !loading) {
      setOffset(prev=>prev+1);
      setUpdateMessagesList(true);
      setLoading(true);
    }
  }

  useEffect(()=>{
    
    if(updateMessagesList) {

      const lastMessageIndex = lastIndex();

      setTimeout(()=> {
        setMessagesList([...messagesList, ...messages.slice(messagesList.length, lastMessageIndex)]);
        setUpdateMessagesList(false);
        setLoading(false);
      }, 500);

      if(lastMessageIndex === messages.length)
        setHasMore(false);
    }

  }, [offset, updateMessagesList]);

  const messagesContainerRef = useRef<HTMLElement | null>(null);
  const [showDownArrow, setShowDownArrow] = useState(false);
  
  useEffect(()=>{

    console.log(messages);
    if(messagesContainerRef.current){

      let { scrollTop } = messagesContainerRef.current;

      if ((-scrollTop) >= 50) {
        setShowDownArrow(true);
      } else {
        resetMessages();
      }
    }
  }, [messages]);

  function DownArrowClick() { //zerar estado do container
    resetMessages();
  }

  function resetMessages() {
    const lastMessageIndex = lastIndex();
    setMessagesList([...messages.slice(0, lastMessageIndex)]);
    setOffset(1);

    if(messagesContainerRef.current){
      messagesContainerRef.current.scrollTop = 0;
      setShowDownArrow(false);
    }
  }
  
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
            data-theme={themeStore.selectedTheme}
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
      ref={messagesContainerRef}
    >
      {messagesList.map((_item, index)=><Message key={index} index={index}/>)}
      <MessageBar chatId={chatId} />
      <RiArrowDropDownLine 
        className='down-arrow' 
        data-visible={showDownArrow}
        data-theme={themeStore.selectedTheme}
        onClick={DownArrowClick}
      />
    </main>
  );
}