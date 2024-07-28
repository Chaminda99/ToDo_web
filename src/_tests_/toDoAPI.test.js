import { fetchTasks, saveTasks, deleteTask } from '../features/ToDo/toDoAPI'; 
import fetchMock from 'jest-fetch-mock';

describe('API functions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches tasks successfully', async () => {
    const tasks = [{ id: 1, title: 'Test Task' }];
    fetchMock.mockResponseOnce(JSON.stringify(tasks));

    const result = await fetchTasks();
    expect(result).toEqual(tasks);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks');
  });

  it('saves a new task successfully', async () => {
    const newTask = { title: 'New Task' };
    const savedTask = { id: 2, title: 'New Task' };
    fetchMock.mockResponseOnce(JSON.stringify(savedTask));

    const result = await saveTasks(newTask);
    expect(result).toEqual(savedTask);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
  });

  it('deletes a task successfully', async () => {
    const taskId = 1;
    const remainingTasks = [{ id: 2, title: 'Remaining Task' }];
    fetchMock
      .mockResponseOnce('', { status: 200 }) // Mock delete response
      .mockResponseOnce(JSON.stringify(remainingTasks)); // Mock fetchTasks response

    const result = await deleteTask(taskId);
    expect(result).toEqual(remainingTasks);
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks');
  });

  it('handles delete task failure', async () => {
    const taskId = 1;
    fetchMock.mockResponseOnce('', { status: 500 });

    const result = await deleteTask(taskId);
    expect(result).toEqual([]);
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });
  });
});
