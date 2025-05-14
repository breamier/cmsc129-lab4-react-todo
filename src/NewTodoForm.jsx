import { useEffect, useState } from "react"

export default function NewTodoForm({ onSubmit, initialValues = {},  isEditing = false, cancelEdit }){
    
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [priority, setPriority] = useState("")

    useEffect(()=> {
        if (initialValues) {
            setTitle(initialValues.title || "")
            setDate(initialValues.date || "")
            setTime(initialValues.time || "")
            setPriority(initialValues.priority || "Low")
          } else {
            setTitle("")
            setDate("")
            setTime("")
            setPriority("Low")
          }
        }, [initialValues?.id])

    function handleSubmit(e){
        e.preventDefault()
        if(title.trim() === "") return
        onSubmit({ title, date, time, priority })
        if (!isEditing) {
            setTitle("")
            setDate("")
            setTime("")
            setPriority("Low")
          }
      }

    return(
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
        />
      </div>

      <div className="form-row">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          id="date"
        />
      </div>

      <div className="form-row">
        <label htmlFor="time">Time</label>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="time"
          id="time"
        />
      </div>

      <div className="form-row">
        <label htmlFor="priority">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          id="priority"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
            <button className="add-btn">{isEditing ? "Update": "Add"}</button>
            {isEditing && <button type="button" className="btn cancel" onClick={cancelEdit}>Cancel</button>}
        </form>
    )
}