import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTasks, addTask } from './toDoSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


export default function ToDo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.tasks.tasks);
    const error = useSelector((state) => state.tasks.error);
  

    useEffect(() => {
      dispatch(getTasks());
    }, [dispatch]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = {
        
        title,
        description,
        deadline,
        timestamp: new Date().toISOString(),
        status: 'todo',
      };
  
      dispatch(addTask(formData));
      setTitle('');
      setDescription('');
      setDeadline('');
    };
  
    if (error) {
      return <div>Error loading tasks</div>;
    }
  return (
    <div>
      <h1>
        <Badge bg="warning">ADD NEW TASK</Badge>
      </h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control  type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} rows={3}
          placeholder='Type what are you going toDoo' />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="deadline">Deadline</Form.Label>
        <Form.Control type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)} 
          placeholder="Deadline" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <div>
    <Button variant="danger" onClick={() => navigate("/")}>Go Back</Button>
    </div>
    </div>
  );
}
