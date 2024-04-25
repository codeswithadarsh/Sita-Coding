import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoListApp from './TodoListApp';
import '@testing-library/jest-dom';

// Mocking global.fetch
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
  expect(screen.getAllByText(/Delete/i).length).toBe(2); // Assuming one group is already present initially
});

test('deletes a group', () => {
  render(<TodoListApp />);
  fireEvent.click(screen.getByText(/Add Group/i));
  fireEvent.click(screen.getAllByText(/Delete/i)[1]); // Deletes the newly added second group
  expect(screen.getAllByText(/Delete/i).length).toBe(1);
});

test('validates group input changes', () => {
  render(<TodoListApp />);
  const fromInput = screen.getByDisplayValue(1);
  fireEvent.change(fromInput, { target: { value: '0' } }); // Invalid input, less than 1
  fireEvent.blur(fromInput);
  expect(fromInput.value).toBe('1'); // Expect no change due to validation
});

test('shows status after fetching data', async () => {
  render(<TodoListApp />);
  fireEvent.click(screen.getByText(/Show Status/i));
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(10)); // 10 fetch calls for 10 items
  expect(screen.getByText(/True, /i)).toBeInTheDocument(); // Check if "True" from fetched data is rendered
});

