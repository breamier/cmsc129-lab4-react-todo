import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useRef } from "react"

export default function TodoItem({ id , title , date, time, priority, addedAt, completed, toggleTodo, deleteTodo, startEditTodo, removeFromUI, restoreToUI}){
  
  const timeoutRef = useRef(null)

  function handleDelete(){
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    const todo = { id, title, date, time, priority, addedAt, completed }

    removeFromUI(id)
    const toastId = toast.success(
      ({ closeToast }) => 
      (
        <div className="toast">
          Task Deleted
          <button
            className="btn"
            onClick={() => {
              clearTimeout(timeoutRef.current)
              restoreToUI(todo)
              closeToast();
            }}
          >
            Undo
          </button>
        </div>
      ),
      {
        autoClose: 15000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      }
    );

    timeoutRef.current = setTimeout(() => {
      deleteTodo(id)
      toast.dismiss(toastId)
    }, 10000);

  }
  
  return(
    <>
      <li key={id} className="todo-card">
        <div className="todo-header">
          <label>
            <input type="checkbox" checked={completed} 
            onChange={e => toggleTodo(id, e.target.checked)}
            />
            <span className="todo-title">{title}</span>
          </label>
        </div>
        <div className="todo-details">
          <p><strong>Date Added:</strong> {new Date(addedAt).toLocaleDateString("en-US", {month: "long",  day: "numeric",  year: "numeric"})}</p>
          <p><strong>Date Due:</strong> {new Date(`${date}T${time}`).toLocaleDateString("en-US", {  month: "long",  day: "numeric",  year: "numeric"})}</p>
          <p><strong>Time Due:</strong> {new Date(`${date}T${time}`).toLocaleTimeString("en-US", {  hour: "numeric",  minute: "2-digit",  hour12: true})}</p>
          <p><strong>Priority:</strong><span  className={`priority ${priority.toLowerCase()}`}>{priority}</span></p>
        </div>
        <div className="todo-actions">
          <button className="btn btn-danger" 
          onClick={handleDelete}>Delete</button>
          <button onClick={() => startEditTodo({ id, title, date, time, priority, completed })} className="btn">Edit</button>
        </div>
      </li>

      </>
    )
}