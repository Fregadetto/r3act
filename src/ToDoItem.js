import React from "react"

function ToDoItem(props){
  return(
    <li className={props.item.done ? "todo-item-completed" : "to-do-item"}>
      <input
        type="checkbox"
        checked={props.item.done}
        onChange={() => props.handleChange(props.item.id)}
        />
        {props.item.txt}
    </li>
  )
}

export default ToDoItem