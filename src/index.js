import React from 'react';
import ReactDOM from 'react-dom';
import TodoListApp from './TodoListApp';
import validateGroups from './Validation';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <TodoListApp />
  </React.StrictMode>,
  document.getElementById('root')
);