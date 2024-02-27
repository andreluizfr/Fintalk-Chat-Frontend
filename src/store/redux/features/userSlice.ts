import { makePersistentStorage } from '@factories/makePersistentStorage';
import User from '@entities/User';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  users: User[];
  loggedUser: User | null;
}

const persistentStorage = makePersistentStorage();

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: persistentStorage.get<User>("users") ? persistentStorage.get<User>("users") : [],
    loggedUser: persistentStorage.get<User>("user"),
  } as UserState,
  reducers: {
    addUser(state, action) {
      state.loggedUser = action.payload;

      const persistentStorage = makePersistentStorage();
      persistentStorage.set("user", action.payload);
    },
    removeUser(state) {
      state.loggedUser = null;

      const persistentStorage = makePersistentStorage();
      persistentStorage.remove("user");
      persistentStorage.remove("x-access-token");
    },
    createUser(state, action) {
      state.users.push(action.payload);

      const persistentStorage = makePersistentStorage();
      persistentStorage.set("users", state.users);
    }
  }
});

export const { addUser, removeUser, createUser } = userSlice.actions;
export default userSlice.reducer;