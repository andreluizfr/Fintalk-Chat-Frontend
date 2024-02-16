import userReducer from './features/userSlice';
import themeReducer from './features/themeSlice';
import languageReducer from './features/languageSlice';
import chatReducer from './features/chatSlice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
      user: userReducer,
      theme: themeReducer,
      language: languageReducer,
      chat: chatReducer
    }
});
  
export default store;
  
export type StoreState = ReturnType<typeof store.getState>;
  
export type StoreDispatch = typeof store.dispatch;