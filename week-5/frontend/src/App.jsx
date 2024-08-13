import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/todo/todos').then(async function (res) {
      const json = await res.json();
      setTodos(json);
    });
  }, [])
  return (
    <>
      <div className='flex gap-24 overflow-hidden'>
        <CreateTodo></CreateTodo>
        <Todos todos={todos}></Todos>
      </div>
    </>
  )
}

export default App
