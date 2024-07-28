import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/ToDo/toDoSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;