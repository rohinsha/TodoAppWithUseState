import "./styles.css";
import data from "./data.json";
import TodoList from "./TodoList";
import StaticTodo from "./StaticTodo";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
const LOCALSTORAGE_KEY = "todos.data";
export default function App() {
  const [cTitle, setCTitle] = useState("");
  // const inputTextRef = useRef();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    console.log(JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    // console.log(JSON.stringify(todos));
    const newTodos1 = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (newTodos1) setTodos(newTodos1);
  }, []);
  useEffect(() => {
    console.log(JSON.stringify(todos));
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    console.log(JSON.stringify(todos));
  }, [todos]);
  const addTodo = () => {
    if (cTitle === "") return;
    setTodos((prev) => {
      return [
        ...prev,
        {
          id: v4(),
          title: cTitle,
          complete: false
        }
      ];
    });
    setCTitle("");
  };
  const deleteTodo = () => {
    const kol = todos.filter((item) => item.complete === false);
    setTodos(kol);
  };
  const toggleTodoById = (id) => {
    const newTodos = [...todos];
    const newTodo = newTodos.find((item) => item.id === id);
    newTodo.complete = !newTodo.complete;
    setTodos(newTodos);
  };
  return (
    <div className="App">
      <h2>Todo App</h2>
      <StaticTodo staticTodos={data} />
      <TodoList todos={todos} toggleTodoById={toggleTodoById} />
      <input
        type="text"
        value={cTitle}
        onChange={(e) => setCTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add todo </button>
      <button onClick={deleteTodo}>Delete todo </button>
      <h4>
        {todos.filter((item) => item.complete === false).length} Todo left to
        complete
      </h4>
    </div>
  );
}
