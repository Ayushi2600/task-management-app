import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', priority: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // call the fetchTasks function to fetch the task from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Create Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5001/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', due_date: '', priority: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5001/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Enable Edit Mode
  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask({ title: task.title, description: task.description, due_date: task.due_date, priority: task.priority });
  };

  // Update Task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5001/tasks/${currentTask.id}`, newTask);
      setTasks(tasks.map((task) => (task.id === currentTask.id ? response.data : task)));
      setIsEditing(false);
      setCurrentTask(null);
      setNewTask({ title: '', description: '', due_date: '', priority: '' });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className='container ms-auto w-75 p-4'>
      <h2 className='text-center mb-5'>Task Manager</h2>

      <form onSubmit={isEditing ? handleUpdateTask : handleCreateTask} className='form p-3'>
        <input className='w-100 py-2' type="text" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <input className='w-100 py-2 mt-4' type="text" placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <input className='w-100 py-2 mt-4' type="date" placeholder="Due Date" value={newTask.due_date} onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })} />
        <input className='w-100 py-2 mt-4' type="text" placeholder="Priority" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} />

        <button className={`btn ${isEditing ? 'btn-warning' : 'btn-success'} mt-3 w-25 py-2`} type="submit">
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>

        {isEditing && (
          <button className='btn btn-secondary mt-3 w-25 py-2 ms-2' type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>

      <ul className="list-group mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong> - {task.description} - Due: {task.due_date} - Priority: {task.priority}
            </div>
            <div>
              <button className='btn btn-primary m-2' onClick={() => handleEditTask(task)}>Edit</button>
              <button className='btn btn-danger m-2' onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
