import { createSlice } from '@reduxjs/toolkit';
import { makePersistentStorage } from '@factories/makePersistentStorage';
import Chat from '@entities/Chat';

export interface IChatState {
  chats: Chat[];
}

const persistentStorage = makePersistentStorage();

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: persistentStorage.get<Chat[]>("chats") ? persistentStorage.get<Chat[]>("chats") : [],
  } as IChatState,
  reducers: {
    createChat(state, action) {
      state.chats.push(action.payload); //action.payload é do tipo Chat

      const persistentStorage = makePersistentStorage();
      persistentStorage.set("chats", state.chats);
    },
    removeChat(state, action) {
      state.chats.filter(chat => chat.id === action.payload); //action.payload é o id do chat

      const persistentStorage = makePersistentStorage();
      persistentStorage.set("chats", state.chats);
    },
    editChat(state, action) {
      state.chats = state.chats.map(chat => {
        if(chat.id === action.payload.id)  //action.payload é do tipo Chat
          return action.payload;
        return chat;
      })

      const persistentStorage = makePersistentStorage();
      persistentStorage.set("chats", state.chats);
    },
    addMessage(state, action) {
      state.chats.find(chat => chat.id === action.payload.chatId) //action.payload é {chatId: string e message: Message}
        ?.messages.push(action.payload.message);

      const persistentStorage = makePersistentStorage();
      persistentStorage.set("chats", state.chats);
    }
  }
});

export const { createChat, removeChat, editChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;