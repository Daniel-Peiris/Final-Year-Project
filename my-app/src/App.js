import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editInput, setEditInput] = useState('');

  // Add new task
  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), name: taskInput }]);
      setTaskInput('');
    }
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit task
  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditInput('');
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <div className="card new-task-card">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="card task-card">
              {editingTask === task.id ? (
                <div>
                  <input
                    type="tex"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    placeholder="Edit task"
                  />
                  <button onClick={() => editTask(task.id, editInput)}>Save</button>
                </div>
              ) : (
                <div>
                  <h2>{task.name}</h2>
                  <button onClick={() => { setEditingTask(task.id); setEditInput(task.name); }}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default App;
