import React , { Component }  from "react"
import ToDoData from "./ToDoData"
import ToDoItem from "./ToDoItem"

class ToDo extends Component{

  constructor(){
    super()
    this.state = {
      todos: ToDoData,
      dodo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.addTodo = this.addTodo.bind(this) 
  }

  handleChange(id){
    this.setState(prevState =>{
      const newTodosArray = prevState.todos.map(todo =>{
        if (todo.id === id){
          todo.done = !todo.done
        }
        return todo 
      })
      return{
      todos: newTodosArray
      }
    })
  }
    
  handleForm(event) {
    const {name, value, type, checked} = event.target
      type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

  addTodo(val){
    this.setState(prevState => ({
      todos: [...prevState.todos, 
      {   
        "id": prevState.todos[prevState.todos.length - 1].id + 1,
        "txt": val,
        "done": false
        }],
      dodo: ''
    }))
  }
  render() {
      const todoList = this.state.todos.map(item => <ToDoItem key={item.id} item={item} handleChange = {this.handleChange}/>)
      return (
          <ul>
            <li>
            {todoList}
              <form>
                <input 
                  type="text" 
                  value={this.state.dodo} 
                  name="dodo" 
                  placeholder="Fyll på här..." 
                  onChange={this.handleForm} 
                 /><br/>
              </form>
            </li>
          {this.state.dodo &&  <button className="todo-button" onClick={() => this.addTodo(this.state.dodo)}>Lägg till</button> }
          
          </ul>
          )
  }
}
export default ToDo