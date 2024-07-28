export async function fetchTasks() {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  return tasks;
}

export async function saveTasks(newTask) {
  const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
      
  });
  console.log(response)
  const addedTask = await response.json();
  console.log(addedTask)
  return addedTask;
}

export async function updateTask(updatedTask) {
  const response = await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
      
  });

  console.log(response)

  if (response.ok) {
      const updatedTasks = await fetchTasks();
      console.log(updatedTasks)
      return updatedTasks;
  } else {
      console.error('Error updating task');
      console.log(response)
      return [];
  }
}

export async function deleteTask(taskId) {
  const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
  });

  if (response.ok) {
      const updatedTasks = await fetchTasks();
      return updatedTasks;
  } else {
      console.error('Error deleting task');
      return [];
  }
}