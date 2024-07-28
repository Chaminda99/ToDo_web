import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from './components/Tab';
import { removeTask ,getTasks} from './features/ToDo/toDoSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';


export default function Home() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleDelete = (taskId) => {
    dispatch(removeTask(taskId));
  };

  useEffect(() => {
    const storedTasks =[];
    dispatch(getTasks(storedTasks));
  }, [dispatch]);

  useEffect(() => {
     }, [tasks]);

  

  return (
    <div className="App">
      <header>
        <h1>ToDo</h1>
      </header>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task, index) =>(
          
            <Tab
              key={index}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              status={task.status}
              onDelete={() => handleDelete(task.id)}
              onUpdate={() => navigate(`/EditToDo/${task.id}`, { state: { task } })}
            />
            
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
      <div className="d-grid gap-2">
      <Button variant="primary" size="lg" onClick={() => navigate("/toDo")}>Add New todo</Button>
      </div>
    </div>
  );
}
