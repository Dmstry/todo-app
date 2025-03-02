import ToDoList from '../ToDoList/ToDoList';
import css from './App.module.css';

export default function App() {
  return (
    <>
      <div className={css.container}>
        <h1>Список задач</h1>
        <ToDoList />
      </div>
    </>
  );
}
