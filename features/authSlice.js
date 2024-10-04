import { createSlice } from "@reduxjs/toolkit";
import { saveUserToLocalStorage, loadUserFromLocalStorage } from './storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
       name: 'auth',
       initialState: {
              isAuthenticated: false,
              users: [],
              loggedInUser: null,
       },
       reducers: {
              login: (state, action) => {
                const user = action.payload; // Retrieve user from action payload
                state.loggedInUser = user; // Set loggedInUser to the retrieved user
                state.isAuthenticated = true;
                
                // Fetch user tasks based on loggedInUser's email
                const fetchUserTask = async () => {
                    try {
                        const tasks = await AsyncStorage.getItem(`tasks_${user.email}`);
                        state.tasks = tasks ? JSON.parse(tasks) : [];
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchUserTask();
              },
              logout: (state) => {
                state.loggedInUser = null;
                     state.isAuthenticated = false;
                     state.tasks = [];
              },
              register: (state, action) => {
                     state.users.push(action.payload);
                     saveUserToLocalStorage(state.users);

              },
       },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;

