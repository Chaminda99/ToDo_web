import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Application() {
  const [Tasks, setformData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const goBack = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      title,
      description,
      deadline,
      timestamp: new Date().toISOString(),
      status:"todo"
    };

    console.log('Form Data as JSON:', JSON.stringify(formData));
    
    console.log('Title:', title);

  
    setformData([...Tasks, formData]);
    setTitle('');
    setDescription('');
    setDeadline('');
    console.log('Updated objects array:', JSON.stringify(Tasks));
    goBack("/");
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
        /><br></br>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br></br>
        <label>Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
     <button onClick={()=>goBack("/")}>Go Back</button>
    </div>
  );
}

