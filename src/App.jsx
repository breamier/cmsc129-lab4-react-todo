import { useEffect, useState } from "react"
import "./styles.css"
import NewTodoForm from "./NewTodoForm.jsx"
import TodoList from "./TodoList.jsx"
import { getTodos, createTodoAsync, updateTodoAsync, deleteTodoAsync, getTodosAsync } from "./services/services.jsx"
import SortControls from "./SortControl.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function App(){
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)
  const [sortedTodos, setSortedTodos] = useState([]) 
  const [sortField, setSortField] = useState("priority");
  const [sortOrder, setSortOrder] = useState("asc");


  useEffect(() => {
   
    async function loadTodos(){
      const firestoreTodos = await getTodos();
      if(firestoreTodos){
        setTodos(firestoreTodos);
        setSortedTodos(firestoreTodos) 
      }
    }

    loadTodos();
  }, [])

  useEffect(() => {
    handleSortChange(sortField, sortOrder);
  }, [todos, sortField, sortOrder])

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
          setSortedTodos((currentTodos) => [...currentTodos, added])
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
      setSortedTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === updated.id ? updated : todo))
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
      )
      setSortedTodos((currentTodos) => 
      currentTodos.map((todo) => todo.id === id? updated: todo))
    }
    
  }

  async function deleteTodo(id){
    await deleteTodoAsync(id);
    setTodos((currentTodos) => 
      currentTodos.filter(todo => todo.id !== id)
    )
    setSortedTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  function handleSortChange(field, order) {
    setSortField(field);
    setSortOrder(order);
    
    const sorted = [...todos].sort(
      (a, b) => {
      
      // If completed, go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      if (field === "priority") {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 }
        return order === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      } else if (field === "addedAt"){
        const aAdded = new Date(a.addedAt)
      const bAdded = new Date(b.addedAt)
        return order === "latest" ? bAdded - aAdded : aAdded - bAdded
      }

      const aDue = new Date(`${a.date}T${a.time}:00`)
      const bDue = new Date(`${b.date}T${b.time}:00`)
      return order === "latest" ? bDue - aDue : aDue - bDue
      
    })

    setSortedTodos(sorted)
  }

  function removeFromUI(id) {
    setTodos(current => current.filter(todo => todo.id !== id))
    setSortedTodos(current => current.filter(todo => todo.id !== id))
  }
  
  function restoreToUI(todo) {
    setTodos(current => [...current, todo])
    // const reSorted = sortTodos([...todos, todo], field, order)
    setSortedTodos(todos)
  }


  return (
  <>
  <div className="app-layout">
    
    <div className="form-container">
      <div className="logo-container">
        <img src="logo.png"></img>
      </div>
      <h1>{editingTodo ? "Update Todo": "Add Todo"}</h1>
      <NewTodoForm 
        onSubmit={editingTodo ? updateTodo : addTodo} 
        initialValues={editingTodo} 
        isEditing={!!editingTodo} 
        cancelEdit={() => setEditingTodo(null)}></NewTodoForm>
    </div>
    <div className="list-container">
      <h1 className="header">Todo List</h1>
      <SortControls onSortChange={handleSortChange}/>
      <div className="scrollable-list">
        <TodoList  todos={sortedTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} startEditTodo={startEditTodo} removeFromUI={removeFromUI} restoreToUI={restoreToUI}></TodoList>
      </div>
    </div>
    <ToastContainer />
  </div>
  </>
  )
}