import { useEffect, useState } from "react"
import "./styles.css"
import NewTodoForm from "./NewTodoForm.jsx"
import TodoList from "./TodoList.jsx"
import { getTodos, createTodoAsync, updateTodoAsync, deleteTodoAsync, getTodosAsync } from "./services/services.jsx"

export default function App(){
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)

  useEffect(() => {
   
    async function loadTodos(){
      const firestoreTodos = await getTodos();
      if(firestoreTodos){
        setTodos(firestoreTodos);
      }
    }

    loadTodos();
  }, [])

  async function addTodo(data) {
        const newTodo = {
          id: crypto.randomUUID(),
          title: data.title,
          date: data.date,
          time: data.time,
          priority: data.priority,
          completed: false,
        };
        const added = await createTodoAsync(newTodo);
        if(added){
          setTodos((currentTodos) => [...currentTodos, added])
        }
  }

  function startEditTodo(todo){
    setEditingTodo(todo);
  }

  async function updateTodo(data){
    const toUpdate = {
      ...editingTodo,
      title: data.title,
      date: data.date,
      time: data.time,
      priority: data.priority,
    }
  
    const updated = await updateTodoAsync(toUpdate)
    if (updated) {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === updated.id ? updated : todo
        )
      )
      setEditingTodo(null)
    }
  }

  async function toggleTodo(id, completed){
    const toUpdate = todos.find(todo => todo.id === id);
    if(!toUpdate) return;

    const updated = await updateTodoAsync({ ...toUpdate, completed});
    if(updated){
      setTodos((currentTodos) => 
        currentTodos.map(todo => 
          todo.id === id? updated: todo
        )
      );
    }
    
  }

  async function deleteTodo(id){
    await deleteTodoAsync(id);
    setTodos((currentTodos) => 
      currentTodos.filter(todo => todo.id !== id)
    )
  }

  console.log(todos)
  return (
  <>
  <h1>{editingTodo ? "Update Todo": "Add Todo"}</h1>
  <NewTodoForm 
    onSubmit={editingTodo ? updateTodo : addTodo} 
    initialValues={editingTodo} 
    isEditing={!!editingTodo} 
    cancelEdit={() => setEditingTodo(null)}></NewTodoForm>
    
  <h1 className="header">Todo List</h1>
  <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} startEditTodo={startEditTodo}></TodoList>
  </>
  )
}