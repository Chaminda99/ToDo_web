import React from 'react'
import './Comp.css'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export default function Tab(props) {
    const { title, description, deadline, status,onDelete,onUpdate } = props;
    return (
        <div className='tab'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h1>{props.title}</h1></Accordion.Header>
                    <Accordion.Body>
                    <h5>Description: {props.description}</h5>
                    <h6>Deadline: {props.deadline} </h6>
                    <span>
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                    <Button variant="success" onClick={onUpdate}>Edit</Button>
                    <h6>Status: {props.status}</h6>
                    </span>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
