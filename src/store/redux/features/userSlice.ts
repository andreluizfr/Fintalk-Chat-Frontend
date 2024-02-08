import { makePersistentStorage } from '@factories/makePersistentStorage';
import User from '@entities/User';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  loggedUser: User | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedUser: null
  } as UserState,
  reducers: {
    addUser(state, action) {
      state.loggedUser = action.payload;

      const persistentStorage = makePersistentStorage();
      persistentStorage.set("user", action.payload);
    },
    removeUser(state: UserState) {
      state.loggedUser = null;

      const persistentStorage = makePersistentStorage();
      persistentStorage.remove("user");
      persistentStorage.remove("x-access-token");
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;