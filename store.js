import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/tasksSlice';

const store = configureStore({
       reducer: {
              tasks: taskReducer,
       }
})
export default store;