import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';
import ThemeToggler from './Components/ThemeToggler';
import {TodoProvider} from "./Context/TodoContext"
import { ThemeContextProvider } from './Context/ThemeContext';

function App() {
  
  const [todos, setTodos] = useState([]);

  function addTodo (todo) {
        setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  function updateTodo(id,newTodo)
  {
    setTodos((todos)=> todos.map((prevTodo)=>(prevTodo.id===id ? newTodo : prevTodo)))
  }

  function deleteTodo(id)
  {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
  }

  function toggleComplete(id, status)
  {
    setTodos((todos) => todos.map((prevTodo)=> (prevTodo.id === id ? {...prevTodo, complete : !prevTodo.complete} : prevTodo)))
  }

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("todos"));

    if(userData !== null && userData.length > 0 ) setTodos(userData);

  },[])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])



  const [mode, setMode] = useState("light");

  function darkTheme()
  {
    setMode("dark");
  }

  function lightTheme()
  {
    setMode("light");
  }

  function toggleTheme()
  {
    setMode((prevMode) => ( prevMode === "light" ? "dark" : "light"));
  }

  useEffect(()=>{

    document.querySelector("html").classList.remove("dark","light")
    document.querySelector("html").classList.add(mode)

  },[mode])

  return (
    <ThemeContextProvider value={{mode, darkTheme, lightTheme, toggleTheme}}> 
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div>
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-black translate-y-10 dark:bg-gray-800 dark:text-white">
                    <ThemeToggler/>
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2 text-black dark:text-white">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=> (
                        <div key={todo.id} className='w-full' >
                            <TodoItem todo = {todo}/>
                        </div>
                        ))}
                    </div>
                </div>
    </div>
    </TodoProvider>
    </ThemeContextProvider>
  )
}

export default App
