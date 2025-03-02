import { useState, useEffect } from 'react';
import css from './ToDoList.module.css';

export default function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  });
  const [task, setTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const startEditing = (id, text, completed) => {
    if (completed) return; // Забороняємо редагування виконаних завдань
    setEditingTaskId(id);
    setEditingText(text);
  };

  const handleEditChange = e => {
    setEditingText(e.target.value);
  };

  const saveEdit = id => {
    if (editingText.trim()) {
      setTasks(
        tasks.map(task =>
          task.id === id ? { ...task, text: editingText } : task
        )
      );
    }
    setEditingTaskId(null);
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    }
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
            <input
              type="checkbox"
              className={css.checkbox}
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {editingTaskId === task.id ? (
              <input
                className={css.editInput}
                type="text"
                value={editingText}
                onChange={handleEditChange}
                onBlur={() => saveEdit(task.id)}
                onKeyDown={e => handleEditKeyDown(e, task.id)}
                autoFocus
                disabled={task.completed} // Забороняємо редагування виконаних завдань
              />
            ) : (
              <span
                className={`${css.taskText} ${
                  task.completed ? css.disabledText : ''
                }`}
                onClick={() => startEditing(task.id, task.text, task.completed)}
              >
                {task.text}
              </span>
            )}
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
