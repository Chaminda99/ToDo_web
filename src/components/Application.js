import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Application() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      console.log('Loaded tasks:', JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Current tasks array:', tasks);
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      title,
      description,
      deadline,
      timestamp: new Date().toISOString(),
      status: "todo"
    };

    setTasks((prevTasks) => [...prevTasks, formData]);

    setTitle('');
    setDescription('');
    setDeadline('');
  };

  return (
    <div>
      <h2>Fill this</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <label>Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}
