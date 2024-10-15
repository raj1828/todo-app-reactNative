import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, loadFromLocalStorage } from './storage';


const tasksSlice = createSlice({
       name: 'tasks',
       initialState: [],
       reducers: {
              addTask: (state, action) => {
                     state.push(action.payload);
                     saveToLocalStorage(state);
              },
              editTask: (state, action) => {
                     const index = state.findIndex(task => task.id === action.payload.id);
                     // console.log("action is ",action);
                     // console.log("index",index);
                     if (index !== -1) {
                            state[index] = action.payload;
                            console.log("action is ",action.payload)
                            saveToLocalStorage(state);
                     }
              },
              deleteTask: (state, action) => {
                     const newState = state.filter(task => task.id !== action.payload);
                     saveToLocalStorage(state);
                     return newState;
              },
              updateTask: (state, action) => {
                     const index = state.findIndex(task => task.id === action.payload.id);
                     if (index !== -1) {
                            state[index] = action.payload;
                            saveToLocalStorage(state);
                     }
              },
              setTask: (state, action) => {
                     return action.payload;
              }
       }
});

export const { addTask, deleteTask, updateTask, editTask, setTask } = tasksSlice.actions;
export default tasksSlice.reducer;
