import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/ToDo/toDoSlice';
import store from '../app/store.js';

describe('Redux Store', () => {
  it('should configure the store with tasksReducer', () => {
    const testStore = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
    });

    expect(store.getState()).toEqual(testStore.getState());
  });

  it('should have tasks as part of the initial state', () => {
    const initialState = store.getState();
    expect(initialState).toHaveProperty('tasks');
  });
});
