import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useRef } from "react"

export default function TodoItem({ id , title , date, time, priority, addedAt, completed, toggleTodo, deleteTodo, startEditTodo}){
  
  const timeoutRef = useRef(null)

  function handleDelete(){
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;


    const toastId = toast.success(
      ({ closeToast }) => 
      (
        <div className="toast">
          Task Deleted
          <button
            className="btn"
            onClick={() => {
              clearTimeout(timeoutRef.current)
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
      <li key={id}>
        <label>
          <input type="checkbox" checked={completed} 
          onChange={e => toggleTodo(id, e.target.checked)}
          />
          {title}
        </label>
        <p>Date Added: {addedAt.toLocaleString()}</p><br></br>
        <p>Date Due: {date}</p>
        <p>Time Due: {time}</p>
        <p>Priority: {priority}</p>
        <button className="btn btn-danger" 
        onClick={handleDelete}>Delete</button>
        <button onClick={() => startEditTodo({ id, title, date, time, priority, completed })} className="btn">Edit</button>
      </li>

      </>
    )
}