import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/tasksSlice';
import usersReducer from './features/authSlice';

const store = configureStore({
       reducer: {
              users: usersReducer,
              tasks: taskReducer,
       }
})
export default store;