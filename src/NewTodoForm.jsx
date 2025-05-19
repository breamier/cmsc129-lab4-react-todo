import { useEffect, useState } from "react"

export default function NewTodoForm({ onSubmit, initialValues = {},  isEditing = false, cancelEdit }){
    
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [priority, setPriority] = useState("")
    const [errors, setErrors] = useState({
      title: "",
      date: "",
      time: "",
      priority: "",
    });
    
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
        let formIsValid = true;
        const newErrors = { title: "", date: "", time: "", priority: "" };

        if (title.trim() === "") {
          newErrors.title = "Title is required";
          formIsValid = false;
        }
        if (!date) {
          newErrors.date = "Date is required";
          formIsValid = false;
        }
        if (!time) {
          newErrors.time = "Time is required";
          formIsValid = false;
        }
        if (!priority) {
          newErrors.priority = "Priority is required";
          formIsValid = false;
        }

        setErrors(newErrors);

        if (!formIsValid) return;
        onSubmit({ title, date, time, priority })

        if (!isEditing) {
            setTitle("");
            setDate("");
            setTime("");
            setPriority("Low");
            setErrors({ title: "", date: "", time: "", priority: "" });
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
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          id="date"
        />
        {errors.date && <p className="error">{errors.date}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="time">Time</label>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="time"
          id="time"
        />
        {errors.time && <p className="error">{errors.time}</p>}
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
        {errors.priority && <p className="error">{errors.priority}</p>}
      </div>
            <button className="add-btn">{isEditing ? "Update": "Add"}</button>
            {isEditing && <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>}
        </form>
    )
}