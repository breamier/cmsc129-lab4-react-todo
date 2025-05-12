

export default function TodoItem({ id , title , date, time, priority, completed, toggleTodo, deleteTodo, startEditTodo}){
    return(
        <li key={id}>
      <label>
        <input type="checkbox" checked={completed} 
        onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button className="btn btn-danger" 
      onClick={() => deleteTodo(id)}>Delete</button>
      <button onClick={() => startEditTodo({ id, title, date, time, priority, completed })} className="btn">Edit</button>

    </li>
    )
}