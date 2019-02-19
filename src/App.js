import React, { Component } from 'react';
import './App.css';
import ToDoData from "./ToDoData"
import ToDoItem from "./ToDoItem"

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      loading: false,
      person: '',
      name: '',
      todos: ToDoData,
      dodo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.addTodo = this.addTodo.bind(this) 
  }
  //APIData
  componentDidMount(){     
    this.setState({loading: true})
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => {
        this.setState({
          person: data.results[0],
          name: data.results[0].name,
          loading: false
        })
      })
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
    console.log( this.state.todos )
      const todoList = this.state.todos.map(item => <ToDoItem key={item.id} item={item} handleChange = {this.handleChange}/>)
      return (
      <div className="App">
        <ul className="todo-list">
        <li><i>Sincerely:<br/> { this.state.loading ? <div className="lds-hourglass"></div> : this.state.name.first +' '+ this.state.name.last    }</i></li>
          <h3>ToDoList</h3>
                   <form>
                <li><input 
                   type="text" 
                    value={this.state.dodo} 
                    name="dodo" 
                    placeholder="Skriv här" 
                    onChange={this.handleForm} 
                /></li>
              </form>
              {this.state.dodo &&  <button onClick={() => this.addTodo(this.state.dodo)}>ButTon</button> }
                {todoList}
        </ul>
      </div>
    );
  }
}

export default App;
