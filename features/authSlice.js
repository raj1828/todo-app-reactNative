import { createSlice } from "@reduxjs/toolkit";
import {saveUserToLocalStorage, loadUserFromLocalStorage} from './storage';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        register: (state, action) => {
            state.push(action.payload);
            saveUserToLocalStorage(state);

        },
    },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;

