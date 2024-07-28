import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTasks, saveTasks, deleteTask ,updateTask} from './toDoAPI';

const initialState = {
  tasks: [],
  error: false,
};

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const tasks = fetchTasks();
  return tasks;
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask, { getState}) => {
  
  const { tasks } = getState().tasks;
  //const updatedTask = { ...newTask, requestId };
  
  saveTasks(newTask);
  const updatedTasks=fetchTasks();
  return updatedTasks;
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (taskId, { getState }) => {
    const updatedTasks = deleteTask(taskId);
    return updatedTasks;
  });

export const updateTasks = createAsyncThunk('tasks/updateTasks', async (task, {getState }) => {
    const updatedTasks = updateTask(task);
    console.log(task)
    return updatedTasks;
  });

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getTasks.fulfilled, (state, action) => {
          state.tasks = action.payload;
          state.error = false;
        })
        .addCase(getTasks.rejected, (state) => {
          state.error = true;
        })
        .addCase(addTask.fulfilled, (state, action) => {
          state.tasks = action.payload;
          state.error = false;
        })
        .addCase(addTask.rejected, (state) => {
          state.error = true;
        })
        .addCase(updateTasks.fulfilled, (state, action) => {
          state.tasks = action.payload;
          state.error = false;
        })
        .addCase(updateTasks.rejected, (state) => {
          state.error = true;
        })
        .addCase(removeTask.fulfilled,(state,action)=>{
            state.tasks=action.payload;
            state.error=false;
        })
        .addCase(removeTask.rejected,(state)=>{
            state.error=true;
        });
    },
  });
  
  export default tasksSlice.reducer;