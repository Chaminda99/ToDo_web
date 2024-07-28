import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ToDo from '../features/ToDo/toDo'; // Adjust the path as needed
import { addTask, getTasks } from '../features/ToDo/toDoSlice'; // Adjust the path as needed

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../features/ToDo/toDoSlice', () => ({
  getTasks: jest.fn(),
  addTask: jest.fn(),
}));

describe('ToDo Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: { tasks: [], error: null },
    });
    store.dispatch = jest.fn();
  });

  test('handles form submission', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ToDo />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Deadline/i), { target: { value: '2023-12-31' } });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(addTask({
        title: 'Test Task',
        description: 'Test Description',
        deadline: '2023-12-31',
        timestamp: expect.any(String),
        status: 'todo',
      }));
    });
  });
});
