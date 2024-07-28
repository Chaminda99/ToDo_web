import React from 'react';
import { render, screen ,waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { getTasks } from '../features/ToDo/toDoSlice';
import Home from '../Home';
import store from '../app/store.js';
import '@testing-library/jest-dom/extend-expect'; 

test('renders Home component without crashing', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
  const headerElement = screen.getByRole('heading', { name: /ToDo/i });
  expect(headerElement).toBeInTheDocument();
});

test('displays "No tasks available" when there are no tasks', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
  const noTasksMessage = screen.getByText(/No tasks available/i);
  expect(noTasksMessage).toBeInTheDocument();
});

test('displays tasks correctly', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', deadline: '2023-01-01' },
      { id: 2, title: 'Task 2', description: 'Description 2', deadline: '2023-02-01' }
    ];
  
    // Dispatch the tasks synchronously before rendering the component
    store.dispatch(getTasks());
  
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  
    // Wait for the tasks to be rendered
    waitFor(() => {
      const taskElements = screen.getAllByText(/Task/i);
      expect(taskElements).toHaveLength(2);
    });
  });





