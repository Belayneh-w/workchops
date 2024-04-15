import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";


import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addNewTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  };



  const deleteTodoById = (id:string)=>{
setTodos(todos.filter(todo => todo.id !==id))
  }

const checkAll = ()=>{
  setTodos(todos.map(todo =>({...todo, done:!todos.every(todo=>todo.done)}
  )))
}

  const deleteFinishedTasks = () => {
    setTodos( todos.filter(todo => !todo.done))
  };
  useEffect(() => {
    async function getTodos() {
     try{ const response = await fetch("http://localhost:9000/todos");
      const data = await response.json();
      setTodos(data);
    
    }catch(error){
        console.log(error)
      }
    }
    getTodos();
  }, []);
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header onAddNewTodo={addNewTodo} />
        {/* <Header onAddNewtask = {addNewTodo} /> */}
        <List
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodoById={deleteTodoById}
        />
        <Footer
          todos={todos}
          onCheckAll={checkAll}
          onDeleteFinishedTasks={deleteFinishedTasks}
        />
      </div>
    </div>
  );
}

export default App;
