import TodoItem from "./TodoItem"

export default function TodoList({ todos , toggleTodo, deleteTodo, startEditTodo, removeFromUI, restoreToUI}){
    return (
        <ul className="list">
            {todos.length === 0 && "No Todos"}
            {todos.map(todo => {
            return <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} startEditTodo={startEditTodo} removeFromUI={ removeFromUI } restoreToUI={restoreToUI}></TodoItem>
            })}
        </ul>
    )
}