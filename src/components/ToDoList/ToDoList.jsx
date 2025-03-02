import { useState, useEffect } from 'react';
import css from './ToDoList.module.css';

export default function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  });
  const [task, setTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={css.container}>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Нове завдання..."
        />
        <button className={css.button} onClick={addTask}>
          Додати
        </button>
      </div>
      <ul className={css.list}>
        {tasks.map(task => (
          <li
            className={`${css.item} ${task.completed ? css.completed : ''}`}
            key={task.id}
          >
            <span className={css.taskText} onClick={() => toggleTask(task.id)}>
              {task.text}
            </span>
            <button
              className={css.deleteButton}
              onClick={() => removeTask(task.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
