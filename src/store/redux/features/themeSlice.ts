import { makePersistentStorage } from '@factories/makePersistentStorage';
import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  selectedTheme: string;
  light: boolean;
  dark: boolean;
}

const persistentStorage = makePersistentStorage();

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    selectedTheme: persistentStorage.get<string>("selectedTheme") ? persistentStorage.get<string>("selectedTheme") : "light",
    light: persistentStorage.get<string>("selectedTheme") === "dark" ? false : true,
    dark: persistentStorage.get<string>("selectedTheme") === "dark" ? true : false
  } as ThemeState,
  reducers: {
    selectTheme(state, action) {
      if (action.payload) {
        switch (action.payload) {
          case "light": {
            persistentStorage.set("selectedTheme", action.payload);
            state.selectedTheme = action.payload;
            state.light = true;
            state.dark = false;
            break;
          }
          case "dark": {
            persistentStorage.set("selectedTheme", action.payload);
            state.selectedTheme = action.payload;
            state.light = false;
            state.dark = true;
            break;
          }
        }
      }
    }
  }
});

export const { selectTheme } = themeSlice.actions;
export default themeSlice.reducer;