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
      nameFirst: '',
      image: '',
      login: '',
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
          nameFirst: data.results[0].name.first.charAt(0).toUpperCase() + data.results[0].name.first.slice(1),
          nameLast: data.results[0].name.last.charAt(0).toUpperCase() + data.results[0].name.last.slice(1),
          image: data.results[0].picture,
          login: data.results[0].login,
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
    console.log( this.state.loading)
      const firstName = this.state.nameFirst
      const firstNameEndsWithS = firstName.slice(-1) === 's' ? '' : 's'
      const todoList = this.state.todos.map(item => <ToDoItem key={item.id} item={item} handleChange = {this.handleChange}/>)
      console.log(typeof firstName)
      return (
      <div className="App center">{ this.state.loading ? 
            <div className="lds-hourglass"></div> :
        <ul>
          <li className="user-card"> 
            <div className="user-card-inner"> 
              <img src={this.state.image.large} alt={this.state.nameFirst + ' ' +this.state.nameLast} />  
              <div className="bold-plus center-text">{this.state.nameFirst} {this.state.nameLast}</div>
              <div className="italisized center-text">{this.state.login.username}</div>    
            </div> 
        </li>
        <li className="todo-list">
          <h3>{this.state.nameFirst + firstNameEndsWithS} att göra lista</h3>
          <div className="todo-list-inner"> 
          <ul>
            <li>
              <form>
                <input 
                  type="text" 
                  value={this.state.dodo} 
                  name="dodo" 
                  placeholder="Skriv något här..." 
                  onChange={this.handleForm} 
                 /><br/>
              </form>
            </li>
          {this.state.dodo &&  <button className="todo-button" onClick={() => this.addTodo(this.state.dodo)}>Lägg till...</button> }
          {todoList}
          </ul>
          </div>
        </li>
      </ul>}
    </div>
    );
  }
}

export default App;
