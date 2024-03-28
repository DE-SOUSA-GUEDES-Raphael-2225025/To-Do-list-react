import React, { useState } from 'react';
import './App.css';
import MyButton from './MyButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showCalendarId, setShowCalendarId] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTask = () => {
    const newTaskId = todo.length + 1;
    const newTask = { 
      id: newTaskId, 
      title: inputValue, 
      checked: false, 
      date: null,
    };
    setTodo([...todo, newTask]);
    setInputValue('');
  };

  const updateTask = (id, newTitle) => {
    setTodo(todo.map(task => task.id === id ? { ...task, title: newTitle } : task));
    setIsEditing(null);
  };

  const toggleCheck = (id) => {
    setTodo(todo.map(task => task.id === id ? { ...task, checked: !task.checked } : task));
  };

  const deleteTask = (id) => {
    setTodo(todo.filter(t => t.id !== id));
  };

  const updateDate = (id, date) => {
    setTodo(todo.map(task => task.id === id ? { ...task, date } : task));
    setShowCalendarId(null); 
  };

  const handleEdit = (task) => {
    setIsEditing(task.id);
    setEditValue(task.title);
  };

  const handleUpdate = (id) => {
    updateTask(id, editValue);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <MyButton type="button" name="+" onClick={addTask} />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {todo.map(task => (
        <div key={task.id} style={{ color: task.checked ? 'grey' : 'black' }}>
          {isEditing === task.id ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleUpdate(task.id)}
            />
          ) : (
            <span onDoubleClick={() => handleEdit(task)}>{task.title}</span>
          )}
          <input
            type="checkbox"
            checked={task.checked}
            onChange={() => toggleCheck(task.id)}
          />
          <MyButton type="button" name="🗑️" onClick={() => deleteTask(task.id)} />
          <MyButton type="button" name="📅" onClick={() => setShowCalendarId(task.id)} />
          {task.date && <input type="text" value={task.date.toLocaleDateString()} readOnly />}
        </div>
      ))}
      {showCalendarId && (
        <Calendar
          onChange={(date) => updateDate(showCalendarId, date)}
          value={todo.find(t => t.id === showCalendarId)?.date || new Date()}
        />
      )}
    </div>  
  );
}

export default App;
