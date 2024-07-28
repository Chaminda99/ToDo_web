import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tab from './Tab';

test('renders Tab component with title, description, and deadline', () => {
  const title = 'Test Title';
  const description = 'Test Description';
  const deadline = '2023-12-31';
  const onDelete = jest.fn();

  render(<Tab title={title} description={description} deadline={deadline} onDelete={onDelete} />);

  expect(screen.getByText(`Title: ${title}`)).toBeInTheDocument();
  expect(screen.getByText(`Description: ${description}`)).toBeInTheDocument();
  expect(screen.getByText(`Deadline: ${deadline}`)).toBeInTheDocument();
});

test('calls onDelete when delete button is clicked', () => {
  const title = 'Test Title';
  const description = 'Test Description';
  const deadline = '2023-12-31';
  const onDelete = jest.fn();

  render(<Tab title={title} description={description} deadline={deadline} onDelete={onDelete} />);

  fireEvent.click(screen.getByText('Delete'));

  expect(onDelete).toHaveBeenCalledTimes(1);
});
