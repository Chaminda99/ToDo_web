import { useState, useEffect } from 'react';

function UseTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      console.log('Loaded tasks:', JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever the tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Current tasks array:', tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, task];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return { tasks, addTask };
}

export default UseTasks;
