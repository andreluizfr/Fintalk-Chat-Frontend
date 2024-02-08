import labels from '@constants/labels.json';
import messages from '@constants/messages.json';
import { makePersistentStorage } from '@factories/makePersistentStorage';
import { createSlice } from '@reduxjs/toolkit';

export interface LanguageState {
  selectedLanguage: string;
  labels: any;
  messages: any;
}

const persistentStorage = makePersistentStorage();

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    selectedLanguage: persistentStorage.get<string>("selectedLanguage") ? persistentStorage.get<string>("selectedLanguage") : "pt-BR",
    labels: persistentStorage.get<string>("selectedLanguage") === "en-US" ? labels.en : labels.pt,
    messages: persistentStorage.get<string>("selectedLanguage") === "en-US" ? messages.en : messages.pt,
  } as LanguageState,
  reducers: {
    selectLanguage(state, action) {
      if (action.payload) {
        state.selectedLanguage = action.payload;
        persistentStorage.set("selectedLanguage", action.payload);

        if (action.payload === "pt-BR")
          state.labels = labels.pt;
        else if (action.payload === "en-US")
          state.labels = labels.en;

        if (action.payload === "pt-BR")
          state.messages = messages.pt;
        else if (action.payload === "en-US")
          state.messages = messages.en;
      }
    }
  }
});

export const { selectLanguage } = languageSlice.actions;
export default languageSlice.reducer;