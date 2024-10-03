import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/tasksSlice';
import usersReducer from './features/authSlice';

const store = configureStore({
       reducer: {
              tasks: taskReducer,
              users: usersReducer
       }
})
export default store;