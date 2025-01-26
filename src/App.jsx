import { useEffect, useState } from "react";
import "./App.css";
import { TodoContext, useTodo, TodoProvider } from "./Contexts";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";


function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => {
      return [{ id: Date.now(), ...todo }, ...prev];
    });
  };

  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const editTodo = (todo, id) => {
    setTodos((prev) => {
      return prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      );
    });
  };

  const toggleChecked = (id) => {
    setTodos((prev) => {
      return prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, checked: !prevTodo.checked } : prevTodo
      );
    });
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, editTodo, toggleChecked }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">

          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <TodoItem todo={todo} />
            </div>
          ))}
       
              
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
