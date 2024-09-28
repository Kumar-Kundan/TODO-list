import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos,setTodos]=useState([]);

  const addTodo=(todo)=>{
    //adding new todo as object in previous todo
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }

  const updateTodo=(id,todo)=>{
    //updating the previous todo text
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id) === id ? todo: prevTodo))
  }

  const deleteTodo=(id)=>{
    //returning todo that not matched id
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id));
  }

  const toggleComplete=(id)=>{
    //toggling the todo completed attribute
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed:!prevTodo.completed}:prevTodo))
  }

  //getting todos from local storage on first rendering
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"));

    //checking for empty todo
    if(todos && todos.length > 0){
      setTodos(todos);
    }
  },[])

  //storing todos in local storage when todos changes
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
       <div className="bg-[#172842] min-h-screen py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                <div className="mb-4">
                    {/* Todo form goes here */} 
                    <TodoForm />
                </div>
                <div className="flex flex-wrap gap-y-3">
                    {/*Loop and Add TodoItem here */}
                    {todos.map((todo)=>(
                      <div className='w-full' key={todo.id}>
                        <TodoItem todo={todo}/>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    </TodoProvider>
  )
}

export default App;