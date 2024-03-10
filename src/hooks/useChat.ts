import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';

export default function useChat(chatId: string | null) {

  const chatStore = useSelector((state: StoreState) => state.chat);

  const chat = chatStore.chats.find(chat=>chat.id===chatId);

  const messages = chat ? chat.messages : [];

  const membersQuantity = chat ? chat.membersQuantity : 1;

  return { chat, messages, membersQuantity };
}
