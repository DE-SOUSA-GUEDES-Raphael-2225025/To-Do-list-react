import React, { useState } from 'react';
import './App.css';
import MyButton from './MyButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Task({ task, onUpdate, onDelete, onToggleCheck, onDateChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleUpdate = () => {
    onUpdate(task.id, editValue);
    setIsEditing(false);
  };

  return (
    <div style={{ color: task.checked ? 'grey' : 'black' }}>
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleUpdate}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{task.title}</span>
      )}
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => onToggleCheck(task.id)}
      />
      <MyButton type="button" name="🗑️" onClick={() => onDelete(task.id)} />
      <MyButton type="button" name="📅" onClick={() => onDateChange(task.id)} />
      {task.date && <input type="text" value={task.date.toLocaleDateString()} readOnly />}
    </div>
  );
}

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showCalendarId, setShowCalendarId] = useState(null);

  const addTask = () => {
    const newTaskId = todo.length + 1;
    const newTask = { 
      id: newTaskId, 
      title: inputValue, 
      status: false, 
      checked: false, 
      date: null,
    };
    setTodo([...todo, newTask]);
    setInputValue('');
  };

  const updateTask = (id, newTitle) => {
    setTodo(todo.map(task => task.id === id ? { ...task, title: newTitle } : task));
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
        <Task
          key={task.id}
          task={task}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggleCheck={toggleCheck}
          onDateChange={(id) => setShowCalendarId(id)}
        />
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
