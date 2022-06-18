import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import TodoList from "./components/TodoList";
import Inputs from "./components/Inputs";
import { FaCheckCircle } from "react-icons/fa";
import { useCallback } from "react";

/* set default Todos using localStorage for offline use */

function defaultTodos() {
  if (localStorage.getItem("lists")) {
    return JSON.parse(localStorage.getItem("lists"));
  }
  return [];
}

/* App Component */

function App() {
  /* 
  create two states
  1. To set all todos 
  2. For current todo state 
  */
  const [todoList, setTodoList] = useState(defaultTodos);
  const [todo, setTodo] = useState("");

  /* 
   to add new todo in a Todolist 
  */
  function handleSubmit() {
    /* if todo is empty then we return nothing (edge case) */
    if (todo === "") return;
    setTodoList((todos) => {
      /* create new todo and we use nanoid for unique key */
      const newTodo = {
        id: nanoid(),
        text: todo,
        isCompeleted: false,
      };
      const newTodoList = [newTodo, ...todos];
      return newTodoList;
    });
    setTodo("");
  }

  /* 
  To reset TodoList 
  */
  function handleReset() {
    setTodoList([]);
  }

  /* 
  set compeleted the Todos 
  */
  function handleComelete(id) {
    /* 
    here is the logic for move to bottom and maintain the order of compeletion 
    */
    const newTodo = todoList.find((item) => id === item.id);
    const newTodoList = todoList.filter((item) => id !== item.id);
    let compeleted = newTodoList.filter((item) => item.isCompeleted === true);

    /* here we return nothing because if todo is already compeleted */
    if (newTodo.isCompeleted) {
      return;
    }

    const inCompeleted = newTodoList.filter(
      (item) => item.isCompeleted === false
    );

    /* here we set to compeleted */
    newTodo.isCompeleted = true;
    compeleted = [newTodo, ...compeleted];

    setTodoList(() => {
      return [...inCompeleted, ...compeleted];
    });
  }

  /* 
  To listen for Enter key and call the handleSubmit 
  */
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });
  // function handleKeyDown(e) {

  // }

  /* 
  here we add event listener for key press and remove as well for memory optimization 
  */
  useEffect(() => {
    window.addEventListener("keypress", handleKeyDown);
    return () => window.removeEventListener("keypress", handleKeyDown);
  }, [todo, handleKeyDown]);

  /* 
  here we set the todos in localstorage whenever todolist state changes 
  */
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="app">
      <div className="container">
        <div className="heading">
          <h4>Todo</h4>
          <FaCheckCircle className="logo" />
        </div>
        <Inputs todo={todo} setTodo={setTodo} handleReset={handleReset} />
        <TodoList todoList={todoList} handleCompelete={handleComelete} />
      </div>
    </div>
  );
}

export default App;
