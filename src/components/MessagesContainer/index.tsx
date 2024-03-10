import './styles.scss';

import MessageBar from '@components/MessageBar';
import MessageContainer from '@components/MessageContainer';

import Message from '@entities/Message';

import { RiArrowDropDownLine } from "react-icons/ri";

import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { useEffect, useRef, useState } from 'react';

interface props {
  chatId: string | null;
  messagesList: Message[];
}

const ITEMS_LIMIT = 20;

export default function MessagesContainer({chatId, messagesList}: props) {
  
  const themeStore = useSelector((state: StoreState) => state.theme);

  const [messagesListInView, setMessagesListInView] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [offset, setOffset] = useState(1);
  const [updateMessagesList, setUpdateMessagesList] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(false);

  const messagesContainerRef = useRef<HTMLElement | null>(null);

  function lastIndex () {
    return messagesList.length>offset*ITEMS_LIMIT ? offset*ITEMS_LIMIT : messagesList.length;
  }

  function loadInitialMessages() {
    if(!loadingMessages) {
      setOffset(1);
      setUpdateMessagesList(true);
    }
    resetScrollToBottom();
  }

  function loadOldMessages() {
    if(hasMoreMessages && !loadingMessages) {
      setOffset(prev=>prev+1);
      setUpdateMessagesList(true);
    }
  }
  
  function resetScrollToBottom() {
    if(messagesContainerRef.current){
      messagesContainerRef.current.scrollTop = 0;
      setShowDownArrow(false);
    }
  }
  
  function onScroll(event: React.UIEvent<HTMLElement>) {

    const { scrollTop, clientHeight, scrollHeight } = (event.target as HTMLElement);

    if ((-scrollTop) + clientHeight >= scrollHeight - 20) {
      loadOldMessages();
    }
    else if((-scrollTop) === 0) {
      loadInitialMessages();
    }
  }

  function updateLoadedMessagesInView() {

    const lastListIndex = lastIndex();

    if(offset===1){
      setMessagesListInView([...messagesList.slice(0, lastListIndex)]);
    } else {
      setMessagesListInView(prevList => [...prevList, ...messagesList.slice(messagesListInView.length, lastListIndex)]);
    }

    if (lastListIndex === messagesList.length) 
      setHasMoreMessages(false);
  }

  useEffect(()=>{
    
    if(updateMessagesList) {
      setLoadingMessages(true);

      setTimeout(() => {
        updateLoadedMessagesInView();
        setLoadingMessages(false);
      }, 500);

      setUpdateMessagesList(false);
    }

  }, [offset, updateMessagesList]);

  useEffect(()=>{

    if(messagesContainerRef.current){

      let { scrollTop } = messagesContainerRef.current;

      if ((-scrollTop) >= 50) {
        setShowDownArrow(true); //if scrollbar is far from bottom, only shows a downArrow to user choose weather keep scrolling top or be coming back to the new messages
      } else {
        loadInitialMessages(); //if scrollbar is at the bottom, automatically resets the list states to the initial with a new updated messageList
      }
    }
  }, [messagesList]);

  return (
    <main 
      className='messages-container'
      onScroll={onScroll}
      ref={messagesContainerRef}
      data-theme={themeStore.selectedTheme}
    >
      {messagesListInView.map((item, index)=><MessageContainer key={index} message={item}/>)}

      <MessageBar chatId={chatId} />

      <RiArrowDropDownLine 
        className='down-arrow' 
        data-visible={showDownArrow}
        data-theme={themeStore.selectedTheme}
        onClick={loadInitialMessages}
      />
    </main>
  );
}