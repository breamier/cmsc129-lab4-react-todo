import { useState } from "react"

export default function SortControl({ onSortChange }) {
  const [field, setField] = useState("priority")
  const [order, setOrder] = useState("asc")

  const handleFieldChange = (e) => {
    const newField = e.target.value
    let newOrder = newField === "priority" ? "asc" : "latest"
    setField(newField)
    setOrder(newOrder)
    onSortChange(newField, newOrder)
  }

  const handleOrderChange = (e) => {
    const newOrder = e.target.value
    setOrder(newOrder)
    onSortChange(field, newOrder)
  }

  return (
    <div className="sort-control">
      <select value={field} onChange={handleFieldChange}>
        <option value="priority">Priority</option>
        <option value="addedAt">Date Added</option>
        <option value="date">Due Date</option>
      </select>

      <select value={order} onChange={handleOrderChange}>
        {field === "priority" ? (
          <>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </>
        ) : (
          <>
            <option value="latest">Latest</option>
            <option value="oldest">Earliest</option>
          </>
        )}
      </select>
    </div>
  )
}
