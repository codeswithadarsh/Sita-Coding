import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoListApp from './TodoListApp';
import '@testing-library/jest-dom';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ completed: true })
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('renders without errors', () => {
  render(<TodoListApp />);
  expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
});

test('adds a new group', () => {
  render(<TodoListApp />);
  fireEvent.click(screen.getByText(/Add Group/i));
  expect(screen.getAllByText(/Delete/i).length).toBe(2); 
});

test('deletes a group', () => {
  render(<TodoListApp />);
  fireEvent.click(screen.getByText(/Add Group/i));
  fireEvent.click(screen.getAllByText(/Delete/i)[1]); 
  expect(screen.getAllByText(/Delete/i).length).toBe(1);
});

test('validates group input changes', () => {
  render(<TodoListApp />);
  const fromInput = screen.getByDisplayValue(1);
  fireEvent.change(fromInput, { target: { value: '0' } });
  fireEvent.blur(fromInput);
  expect(fromInput.value).toBe('1'); 
});

test('shows status after fetching data', async () => {
  render(<TodoListApp />);
  fireEvent.click(screen.getByText(/Show Status/i));
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(10)); 
  expect(screen.getByText(/True, /i)).toBeInTheDocument(); 
});

